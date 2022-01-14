import React, { Fragment ,  useEffect, useState   } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Card,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import GradeIcon from "@material-ui/icons/Grade";
import SubjectIcon from "@material-ui/icons/Subject";
import NoteIcon from "@material-ui/icons/Note";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DataTable from "./DataTable";
import ChartSurvey from "./ChartSurvey";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import Random from "../../Config/random";
import axios from "axios";
import { toast } from "react-toastify";
import URL from "../../Config/URL";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ede7f6",
  },
  iconSurvey: {
    marginTop: "8px",
    marginRight: "15px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const renderChartSurvey = (survey) => {
  let xml;
  if (survey.send_to) {
    xml = (
      <Box style={{ marginTop: "30px" }}>
        <ChartSurvey style={{ marginTop: "20px" }} survey={survey} />
      </Box>
    );
  } else {
    xml = "";
  }
  return xml;
};
const ChooseSurvey = () => {
  const classes = useStyles();
  const history = useHistory();
  let survey = useSelector((state) => state.DetailSurvey.DetailSurvey);
  console.log(
    "🚀 ~ file: ChooseSurvey.js ~ line 40 ~ ChooseSurvey ~ survey",
    survey
  );
  const infoSurvey = (survey) => {
    let xml;
    if (survey.send_to) {
      xml = (
        <Box
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1">
            Được gửi đi tới {survey.send_to.length} người khác
          </Typography>
          <GradeIcon style={{ marginLeft: "6px", marginRight: "6px" }} />
          <Typography variant="subtitle1">
            Gửi đi lúc {survey.create_at}
          </Typography>
        </Box>
      );
    } else {
      xml = (
        <Box
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1">
            Nhận được từ :{survey.received_to} *
          </Typography>
          <GradeIcon style={{ marginLeft: "6px", marginRight: "6px" }} />
          <Typography variant="subtitle1">
            Nhận được lúc : {survey.create_at}
          </Typography>
        </Box>
      );
    }
    return xml;
  };
  const goBack = () => {
    history.push("/survey/my-survey");
  };
  const UserInfo = useSelector((state) => state.auth);
  const handleSendSchedule = (schedule,index) => {
    console.log(
      "🚀 ~ file: ChooseSurvey.js ~ line 104 ~ handleSendSchedule ~ schedule",
      schedule
    );
    const schedule_survey = survey.schedule_survey ; 
    let schedule_survey_send = survey.schedule_survey_send ; 
    let schedule_survey_send_update = [...schedule_survey_send]; 
     if(schedule_survey_send.length===0){
      schedule_survey_send_update = schedule_survey.map(rs=>{
            return  false ; 
         })
         schedule_survey_send_update[index] =true ; 
     }else {
      schedule_survey_send_update[index] =true ;
     }

    let startDate = schedule.startDate;
    let endDate = schedule.endDate;
    const day = schedule.day;
    let startDateString = `${day},${startDate}`;
    let startDateUpdate = new Date(startDateString);
    let endDateString = `${day},${endDate}`;
    let endDateUpdate = new Date(endDateString);
    
    const scheduleSend = {
      email_user: UserInfo.userInfo.email,
      scheduler: {
        id: Random.alphabet(8),
        endDate: endDateUpdate,
        startDate: startDateUpdate,
        title: survey.title,
        notes: survey.notes,
        send_to: survey.send_to,
        
      },
    };
    const cookies = new Cookies();
    const token = cookies.get("user");

    axios({
      url: URL.createSchedule,
      method: "Post",
      data: { schedule: scheduleSend, cookies: token, schedule_survey_send :schedule_survey_send_update,
        id_survey_send : survey.id_survey_send}
    })
      .then((data) => {
        console.log("🚀 ~ file: ChooseSurvey.js ~ line 154 ~ .then ~ data", data)
        if (data.status === 200) {
          const totalSend = data.data;
          const sendSuccess = totalSend.filter((rs) => rs === true);
          console.log(
            "🚀 ~ file: ChooseSurvey.js ~ line 130 ~ .then ~ sendSuccess",
            sendSuccess
          );
          toast.success(`Đã chia sẻ tới ${sendSuccess.length} người khác`);
        } else {
          toast.error("Thất bại !");
        }
      })
      .catch((error) => {
        toast.warning("Hết phiên làm việc survey!");
        history.push("/login");
      });
  };
  const [statusButton,setStatusButton] = useState(true); 
  const renderButtonAccept = (schedule,index) => {
    let xml;
    let schedule_survey_send =survey.schedule_survey_send ; 
    if (survey.send_to) {
      xml = (
        <Button
          onClick={() => handleSendSchedule(schedule,index)}
          style={{ float: "left", marginTop: "20px" }}
          variant="contained"
          color="primary"
          disabled ={schedule_survey_send[index]}
        >
          Accept
        </Button>
      );
    } else {
      xml = "";
    }
    return xml;
  };
  const renderScheduleItem = () => {
    const survey_schedule = survey.schedule_survey;
    const xml = survey_schedule.map((schedule, index) => {
      return (
        <Card
          style={{ marginLeft: "80px", padding: "30px", marginBottom: "20px" }}
        >
          <Typography
            variant="subtitle1"
            style={{
              marginTop: "15px",

              fontSize: "20px",
            }}
          >
            Option {index} : {schedule.startDate} - {schedule.endDate}{" "}
            {schedule.day}
          </Typography>
          {renderButtonAccept(schedule,index)}
        </Card>
      );
    });
    return xml;
  };
  const renderInfoSchedule = () => {
    let xml;
    if (survey.option.length !== 0 && survey.schedule_survey.length === 0) {
      xml = (
        <Box style={{ display: "flex", alignItems: "baseline" }}>
          <CheckCircleOutlineIcon className={classes.iconSurvey} />
          <Typography
            variant="subtitle1"
            style={{
              marginTop: "30px",
              fontSize: "20px",
              fontStyle: "italic",
            }}
          >
            Đánh dấu vào các hộp để chọn phiếu bầu .
          </Typography>
        </Box>
      );
    } else {
      xml = (
        <>
          <Box style={{ display: "flex", alignItems: "baseline" }}>
            <CheckCircleOutlineIcon className={classes.iconSurvey} />
            <Typography
              variant="subtitle1"
              style={{
                marginTop: "30px",
                fontSize: "20px",
                fontStyle: "italic",
              }}
            >
              Sự kiện : {survey.title}
            </Typography>
          </Box>
          {renderScheduleItem()}
        </>
      );
    }

    return xml;
  };
  return (
    <Fragment>
      <Container style={{ backgroundColor: "", padding: "20px" }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={10}
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            <Card>
              <Typography variant="h3">{survey.title}</Typography>
              {infoSurvey(survey)}
              <Box
                style={{
                  marginTop: "50px",
                  marginLeft: "30px",
                  fontSize: "20px",
                }}
              >
                <Box
                  style={{
                    marginTop: "25px",
                    float: "left",
                    marginBottom: "75px",
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <SubjectIcon className={classes.iconSurvey} />
                    <Typography
                      variant="subtitle1"
                      style={{ fontSize: "20px", marginTop: "30px" }}
                    >
                      {survey.decription}
                    </Typography>
                  </Box>
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <NoteIcon className={classes.iconSurvey} />
                    <Typography
                      variant="subtitle1"
                      style={{ marginTop: "30px", fontSize: "20px" }}
                    >
                      {survey.note}
                    </Typography>
                  </Box>
                  {renderInfoSchedule()}
                </Box>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    marginRight: "20px",
                  }}
                >
                  <DataTable style={{ marginTop: "50px" }} survey={survey} />
                </div>
                <Box
                  style={{
                    float: "left",
                    marginTop: "50px",
                    marginBottom: "60px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArrowBackIosIcon />}
                    onClick={goBack}
                  >
                    Quay lại
                  </Button>
                </Box>
              </Box>

              {renderChartSurvey(survey)}
            </Card>
          </Grid>
          <Grid xs={1} item></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ChooseSurvey;
