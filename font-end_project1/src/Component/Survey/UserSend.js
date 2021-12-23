import { Box, Grid, List, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Fragment } from "react";
import CreateSurveyStyle from "../styleComponent/CreateSurveyStyle";
import Button from "@material-ui/core/Button";
import ListUserItem from "./ListUserItem";
import { useDispatch, useSelector } from "react-redux";
import ModalUserSend from "./ModalUserSend";
import axios from "axios";
import HttpCode from "../../Constaint/HttpCode";
import URL from "../../Config/URL";
import { toast } from "react-toastify";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useHistory } from "react-router-dom";
import { addResultSend } from "../../features/resultSend/resultSend";
import Cookies from "universal-cookie";
const UserSend = (props) => {
  const classes = props.classes;
  const history = useHistory();
  const dispath = useDispatch(); 
  const ListUserSend = useSelector((state) => state.UserSendList.ListUser);
  const SurveyInfo = useSelector((state) => state.SurveyInfo.SurveyInfo);
  const ListOption = useSelector((state) => state.listOption.ListOption);
  const ListUser = useSelector((state) => state.UserSendList.ListUser);
  const UserInfo = useSelector((state) => state.auth);
  let ListSurveySchedule =  useSelector(state=>state.SurveySchedule.ListSurveySchedule); 
  const renderUserSend = (listOption) => {
    const xml = listOption.map((option, index) => {
      return <ListUserItem key={index} position={index} option={option}  />;
    });
    return xml;
  };
  const onSendSurvey = () => {
     
     if(ListUserSend.length ===0){
        toast.warning("Nhập ít nhất 1 email người gửi ! "); 
     }else{
       if(ListOption.length !==0){
        ListSurveySchedule =[]; 
       }
      const Survey = {
        email_user: UserInfo.userInfo.email,
        title: SurveyInfo.title,
        option: ListOption,
        vote_number: ListUser.length,   //so luong nguoi gui 
        decription: SurveyInfo.decription,
        note: SurveyInfo.note,      
        send_to: ListUser,      
        schedule_survey :ListSurveySchedule
      };
      console.log("🚀 ~ file: UserSend.js ~ line 48 ~ onSendSurvey ~ Survey", Survey)
      const cookies= new Cookies(); 
      const token = cookies.get("user")
      axios({
        url: URL.sendSurvey,
        method: "Post",
        data: {survey : Survey,cookies :token },
      
      }).then((data) => {
        if (data.data.status === HttpCode.SUCCESS){
          const resultSend =  data.data.payload ;
          dispath(addResultSend(resultSend)); 
          history.push("/survey/send-survey-success");
         
        }else if(data.status ===501){
          toast.warning("Hết phiên làm việc!")
          history.push("login"); 
        }
        else{
          toast.error("Có lỗi thử lại sau !")
        }
      });
     }
  };
  const goBack = () => {
    history.push("/survey/create-survey");
  };
  return (
    <Fragment>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} className={classes.container}>
          <Typography variant="h5">Lựa chọn người gửi:</Typography>
          <Box className={classes.box}>
            <Box>
              <List>{renderUserSend(ListUserSend)}</List>
            </Box>
            <Box style={{ margin: "40px" }}>
              <ModalUserSend />
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "50px",
            }}
          >
            <Button
              variant="contained"
              onClick={goBack}
              color="primary"
              style={{ margin: "30px" }}
              startIcon={<ArrowBackIosIcon />}
            >
              Quay lai
            </Button>
            <Button
              style={{ margin: "30px" }}
              variant="contained"
              color="secondary"
              onClick={onSendSurvey}
              endIcon={<DoubleArrowIcon />}
              type="submit"
            >
              Gửi khảo sát
            </Button>
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(CreateSurveyStyle)(UserSend);
