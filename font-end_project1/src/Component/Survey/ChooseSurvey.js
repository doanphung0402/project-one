import React, { Fragment } from "react";
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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from "react-router-dom";
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
const renderChartSurvey = (survey) =>{
  let xml ; 
   if (survey.send_to){
      xml = (
        <Box style={{marginTop:"30px"}}>
           <ChartSurvey style ={{marginTop:"20px"}} survey={survey} />
        </Box>
      )
   }else{
      xml = ""
   }
   return xml ; 
}
const ChooseSurvey = () => {
  const classes = useStyles();
  const history = useHistory();
  let survey = useSelector((state) => state.DetailSurvey.DetailSurvey);
  console.log("🚀 ~ file: ChooseSurvey.js ~ line 40 ~ ChooseSurvey ~ survey", survey)
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
  const goBack =()=>{
    history.push("/survey/my-survey"); 
 }
  return (
    <Fragment>
      <Container style={{ backgroundColor: "",padding:"20px" }}>
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
