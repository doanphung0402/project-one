import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import SendSuccess from "../../asset/check-circle.gif";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllOption } from "../../features/ListOption/ListOption";
import { deleteAllSurveyInfo } from "../../features/survey/SurveyInfo";
import { deleteAllUserSend } from "../../features/UserToSend/UserToSend";
import { toast } from "react-toastify";
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
  const resultSend = useSelector(state=>state.resultSend.resultSend);  //mang ket qua gui 
  const ListUserSend  = useSelector(state=>state.UserSendList.ListUser); //Mang nguoi gui 
 
  const [listFalse,setListFalse] =useState([]); 

   useEffect(()=>{ 
    let ListUserSendFalse = []; 
    for (let k = 0 ; k < ListUserSend.length ; k++){      
        if(resultSend[k] === false){
             ListUserSendFalse.push(k); 
        }      
   } 
    if(ListUserSendFalse.length >0){
         toast.error("Không thể gửi tới một số email !")
    }else{
        toast.success("Gửi thành công !"); 
    }
   setListFalse(ListUserSendFalse); 
  },[]);

  const renderResultSend = (listFalse)=>{ 
   console.log("🚀 ~ file: SendSucessSurvey.js ~ line 40 ~ renderResultSend ~ listFalse", resultSend)
   const xml = listFalse.map((data,index)=>{
        return (
            <Typography key={index} variant="p" style={{color:"red",marginRight:"10px"}}>{ListUserSend[data]},</Typography>
        )
   })
   return xml ; 
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <img src={SendSuccess} alt="check-icon" />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Typography variant="h3">Gửi khảo sát thành công !</Typography>
           <Box style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"50px"}}>
                <Typography style={{marginRight:"10px"}} variant="p">Không thể gửi cho :</Typography>
                {renderResultSend(listFalse)}
           </Box>
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
