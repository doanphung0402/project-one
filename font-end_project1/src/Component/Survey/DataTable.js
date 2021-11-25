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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  addSurveyChooseSend,
  addSurveyChooseReceived,
  cancerSurveyChoose,
} from "../../features/survey/SurveyChoose";
import axios from "axios";
import URL from "../../Config/URL";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function DataTable(props) {
  const classes = useStyles();
  const survey = props.survey;
  const history = useHistory();
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
    dispath(cancerSurveyChoose());
    if (survey.send_to) {
      for (let k = 0; k < survey.send_to.length; k++) {
        let email = survey.send_to[k];
        let flag = survey.user_voted.find((data, index) => {
          return data.email === email;
        });
        if (flag) {
          let rs = option.map((data, index) => {
            if (index + 1 === flag.option) return true;
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
      let optionChoose = [];
      for (let k = 0; k < option.length; k++) {
        optionChoose.push(false);
      }
      const createData = { email: emailReceivedTo, resultOption: optionChoose };
      dispath(addSurveyChooseReceived([createData]));
    }
  }, []);
  const [checked, setChecked] = useState([]);
  const Check = (props) => {
    const status = props.status;
    const index = props.index;
    let statusCheckBox = survey.send_to ? true : false;
    if (status === true) {
      return (
        <Checkbox
          checked
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={index}
          onChange={handleChange}
          disabled={statusCheckBox}
        />
      );
    } else {
      return (
        <Checkbox
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={index}
          disabled={statusCheckBox}
          checked={checked[index]}
          onChange={handleChange}
        />
      );
    }
  };

  const handleChange = (event) => {
    const value = event.target;
    let checked = survey.option.map((value) => {
      return false;
    });
    checked[value.value] = true;
    setChecked(checked);

    const SurveyChoose = {
      email_received: userInfo.email,
      option: value.value,
    };
    dispath(addSurveyAfterChoose(SurveyChoose));
  };
  const rows = useSelector((state) => state.SurveyChoose.SurveyChoose);
  console.log("🚀 ~ file: DataTable.js ~ line 80 ~ DataTable ~ rows", rows);
  const SurveyAfterChoose = useSelector(
    (state) => state.SurveyAfterChoose.SurveyAfterChoose
  );
  const showChooseItem = (row) => {
    const xml = row.resultOption.map((option, index) => {
      if (option === true) {
        return (
          <TableCell key={index} align="right">
            {" "}
            <Check status={true} />{" "}
          </TableCell>
        );
      } else {
        return (
          <TableCell key={index} align="right">
            {" "}
            <Check index={index + 1} status={false} />{" "}
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

    console.log(
      "🚀 ~ file: DataTable.js ~ line 163 ~ handleSendSurvey ~ SurveySendAfterCheck",
      SurveySendAfterCheck
    );
    axios({
      url: URL.updateSurveyCheck,
      method: "Post",
      data: SurveySendAfterCheck,
    }).then((data) => {
      toast.success("Gửi thành công lựa chon của bạn !");
    });
  };
  const renderButtonSend = (survey) => {
    console.log(
      "🚀 ~ file: DataTable.js ~ line 172 ~ renderButtonSend ~ survey",
      survey
    );
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
  const goBack =()=>{
     history.push("/survey/my-survey"); 
  }
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
      <Box style={{ float: "left", marginTop: "50px" , marginBottom:"60px" }}>
        <Button variant="contained" color="secondary" startIcon={<ArrowBackIosIcon/>} onClick={goBack}>
           Quay lại 
        </Button>
      </Box>
    </>
  );
}
