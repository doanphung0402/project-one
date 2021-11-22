import { Button, Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import SendSuccess from "../../asset/check-circle.gif";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAllOption } from "../../features/ListOption/ListOption";
import { deleteAllSurveyInfo } from "../../features/survey/SurveyInfo";
import { deleteAllUserSend } from "../../features/UserToSend/UserToSend";
const SendSucessSurvey = () => {
  const history = useHistory();
  const dispath = useDispatch();
  const continueButton = () => {
    dispath(deleteAllOption());
    dispath(deleteAllUserSend());
    dispath(deleteAllSurveyInfo());
    history.push("/survey/create-survey");
  };
  const goBackHome = () => {
    dispath(deleteAllOption());
    dispath(deleteAllUserSend());
    dispath(deleteAllSurveyInfo());
    history.push("/home");
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <img src={SendSuccess} alt="check-icon" />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Typography variant="h3">Gửi khảo sát thành công !</Typography>
          <Grid container style={{ textAlign: "right", marginTop: "50px" }}>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                onClick={goBackHome}
                style={{ marginRight: "30px" }}
                startIcon={<ArrowBackIosIcon />}
              >
                Quay về trang chủ
              </Button>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "left" }}>
              <Button
                onClick={continueButton}
                style={{ marginLeft: "30px" }}
                endIcon={<ArrowForwardIosIcon />}
              >
                Tạo khảo sát mới
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SendSucessSurvey;
