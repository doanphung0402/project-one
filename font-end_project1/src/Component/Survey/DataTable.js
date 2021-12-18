import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addSurveyAfterChoose } from "../../features/survey/surveyAfterChoose";
import StatusSurveyItem from "../../Constaint/StatusSurveyItem";
import {
  addSurveyChooseSend,
  addSurveyChooseReceived,
  cancerSurveyChoose,
} from "../../features/survey/SurveyChoose";
import {
  showLoading,
  disableShowLoading,
} from "../../features/loading/loading";
import axios from "axios";
import URL from "../../Config/URL";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function DataTable(props) {
  const classes = useStyles();
  const survey = props.survey;
  
  console.log("🚀 ~ file: DataTable.js ~ line 23 ~ DataTable ~ survey", survey);
  const renderOption = (survey) => {
    const option = survey.option;
    const xml = option.map((option, index) => {
      return (
        <TableCell key={index} align="right">
          {option} &nbsp;
        </TableCell>
      );
    });
    return xml;
  };

  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispath = useDispatch();

  useEffect(() => {
    const option = survey.option;
    console.log("🚀 ~ file: DataTable.js ~ line 54 ~ useEffect ~ survey", survey)
    dispath(cancerSurveyChoose());

    if (survey.send_to) {
      for (let k = 0; k < survey.send_to.length; k++) {
        let email = survey.send_to[k];
        let flag = survey.user_voted.find((data, index) => {
          return data.email === email;
        });
        if (flag) {
          let rs = option.map((data, index) => {
            if (index === flag.option[index]) return true;
            else return false;
          });
          let createData = { email: email, resultOption: rs };
          dispath(addSurveyChooseSend(createData));
        } else {
          let rs = option.map((data) => {
            return false;
          });
          let createData = { email: email, resultOption: rs };
          dispath(addSurveyChooseSend(createData));
        }
      }
    } else {
      const emailReceivedTo = userInfo.email;
      let optionChoose = survey.option.map(rs=>{
         return false ; 
      });
      for (let k = 0; k < survey.user_voted.length; k++) {
         optionChoose[survey.user_voted[k]] = true ; 
      }
      console.log("🚀 ~ file: DataTable.js ~ line 83 ~ useEffect ~ optionChoose", optionChoose); 
      const createData = { email: emailReceivedTo, resultOption: optionChoose };
      setChecked(optionChoose); 
      dispath(addSurveyChooseReceived([createData]));
    }
  }, []);
  const defaultChecked = survey.option.map(survey=>{
     return false ; 
  })
  const [checked, setChecked] = useState(defaultChecked);
  console.log("🚀 ~ file: DataTable.js ~ line 92 ~ DataTable ~ checked", checked)


  const Check = (props) => {
    const status = props.status;
    const index = props.index;
    let statusCheckBox = survey.send_to ? true : false;
    console.log("🚀 ~ file: DataTable.js ~ line 114 ~ Check ~ checked", checked)
    if (status === true) {
      return (
        <Checkbox
          // defaultChecked={isChecked}
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={index}
          onChange={handleChange}
          disabled={statusCheckBox}
          // defaultChecked={checked[index]}
          checked={checked[index]}
         
        />
      );
    } else {
      return (
        <Checkbox
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={index}
          disabled={statusCheckBox}
          onChange={handleChange}
          checked={checked[index]}
          // defaultChecked={checked[index]}
        />
      );
    }
  };

  const handleChange = (event) => {
    const value = event.target;

    let checked1 = checked.map(rs=>{return rs})
    checked1[value.value] = !checked[value.value];
    setChecked(checked1);
    console.log("🚀 ~ file: DataTable.js ~ line 141 ~ handleChange ~ checked", checked)
    const SurveyChoose = {
      email_received: userInfo.email,
      option: checked1
    };
    
    dispath(addSurveyAfterChoose(SurveyChoose));

  };

  const rows = useSelector((state) => state.SurveyChoose.SurveyChoose);

  const SurveyAfterChoose = useSelector(
    (state) => state.SurveyAfterChoose.SurveyAfterChoose
  );
  console.log("🚀 ~ file: DataTable.js ~ line 143 ~ DataTable ~ SurveyAfterChoose", SurveyAfterChoose)


  const showChooseItem = (row) => {
    console.log(
      "🚀 ~ file: DataTable.js ~ line 134 ~ showChooseItem ~ row",
      row
    );
    const xml = row.resultOption.map((option, index) => {
      if (option === true) {
        return (
          <TableCell key={index} align="right">
            {" "}
            <Check index={index} status={true} />{" "}
          </TableCell>
        );
      } else {
        return (
          <TableCell key={index} align="right">
            {" "}
            <Check index={index} status={false} />{" "}
          </TableCell>
        );
      }
    });
    return xml;
  };



  const renderShowOption = (rows) => {
 
    const xml = rows.map((row, index) => {
      return (
        <TableRow key={row.email}>
          <TableCell component="th" scope="row">
            {row.email}
          </TableCell>
          {showChooseItem(row)}
        </TableRow>
      );
    });
    return xml;
  };



  const handleSendSurvey = () => {
    const SurveySendAfterCheck = {
      ...SurveyAfterChoose,
      email_send: survey.received_to,
      id_survey_send: survey.id_survey_send,
    };
    dispath(showLoading());
    axios({
      url: URL.updateSurveyCheck,
      method: "Post",
      data: SurveySendAfterCheck,
    })
      .then((data) => {
        if (data.status === 200) {
          axios({
            url: URL.changeStatusSurveyItem,
            data: {
              status: StatusSurveyItem.DONE,
              email: userInfo.email,
              id_survey_send: survey.id_survey_send,
            },
            method: "post",
          })
            .then((data) => {
              console.log(
                "🚀 ~ file: DataTable.js ~ line 198 ~ handleSendSurvey ~ data",
                data
              );
              dispath(disableShowLoading());
              toast.success("Thay đổi lựa chon của bạn!");
            })
            .catch((error) => {
              dispath(disableShowLoading());
              toast.error("Lỗi hệ thống , thử lại !");
            });
        }
        dispath(disableShowLoading());
        toast.success("Thay đổi lựa chon của bạn !");
      })
      .catch((error) => {
        dispath(disableShowLoading());
        toast.error("Có lỗi thử lại !");
      });
  };



  const renderButtonSend = (survey) => {
    let xml;
    if (survey.send_to) {
      xml = "";
    } else {
      xml = (
        <Box style={{ float: "right", marginTop: "50px" }}>
          <Button
            style={{ marginRight: "30px", marginBottom: "30px" }}
            onClick={handleSendSurvey}
            variant="contained"
            color="secondary"
          >
            Gửi khảo sát
          </Button>
        </Box>
      );
    }
    return xml;
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              {renderOption(survey)}
            </TableRow>
          </TableHead>
          <TableBody>{renderShowOption(rows)}</TableBody>
        </Table>
      </TableContainer>
      {renderButtonSend(survey)}
    </>
  );
}
