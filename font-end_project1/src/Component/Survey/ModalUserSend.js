import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box, Button, Fab, TextField } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { addListUser } from '../../features/UserToSend/UserToSend';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root:{
     display:"flex", 
     flexDirection:"column"
  }
}));

export default function ModalUserSend() {
  const [option,setOption] = useState(""); 
  const dispath = useDispatch(); 
  const  handleChangeOption =(event)=>{ 
       const {value} = event.target; 
       setOption(value); 
    
  }
  const handleSubmitOption =() => {
     dispath(addListUser(option)); 
     setOption(""); 
  }

  return (
    <div>
      <Box style={{float:"left",marginTop:"30px"}} display="flex">
        <TextField id="standard-basic" style={{width:"400px"}} value={option} onChange={handleChangeOption} label="Nhập lựa chon khảo sát ..." />
        <Button variant="contained" style={{marginLeft:"40px",backgroundColor:"#6AE2FF"}}  onClick ={handleSubmitOption}>Lưu</Button>
    </Box>
    </div>
  );
}
