import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import { Box } from "devextreme-react";
import { Button, Grid, TextField } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FaceIcon from '@material-ui/icons/Face';
import { useSelector } from "react-redux";
import { changeListEmailUserSend , addEmailUserSendItem } from "../../features/Calendar/EmailUserSendSchedule";
import { useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
//chip : {key + label}
export default function ChipsShareButton() {
  const classes = useStyles();
  const dispath = useDispatch(); 
  const ListEmailSend = useSelector(state=>state.EmailUserSendSchedule.ListEmailSend);
  console.log("🚀 ~ file: ChipsShareButton.js ~ line 32 ~ ChipsShareButton ~ ListEmailSend", ListEmailSend)
  useEffect(()=>{
  
  },[])
  const handleDelete = (indexKey) => {
  
    let chipData1 = ListEmailSend.filter((chip) => chip.key !== indexKey)
    dispath(changeListEmailUserSend(chipData1)); 
    let rsList = chipData1.map((data,index)=>{
        return data.email 
    })
    console.log("🚀 ~ file: ChipsShareButton.js ~ line 43 ~ rsList ~ rsList", rsList)
    dispath(changeListEmailUserSend(rsList)); 

  };
  const color =["primary","secondary","GREEN","YELLOW"]; 

  const renderChip = (ListEmailSend) => {
      let xml; 
     if(ListEmailSend.length===0){
          xml =  "Nhập ít nhất 1 email để gửi "
     }else{
         xml = ListEmailSend.map((data,index) => {
          return (
              <>
                <li  key={index}>             
                  <Chip
                    key ={data.key}
                    icon={<FaceIcon />}
                    variant="outlined"
                    label={data.email}
                    onDelete={()=>handleDelete(data.key)}
                    className={classes.chip}
                    color="secondary"
                  />
                </li>
              </>
            );
          })
     }
     return xml ;
  }
  return (
    <Paper component="ul" className={classes.root}>
       {renderChip(ListEmailSend)}
    </Paper>
  );
}
