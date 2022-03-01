import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box, Button, Fab, TextField } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { addListUser } from '../../features/UserToSend/UserToSend';

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
        <TextField id="standard-basic" style={{width:"400px"}} value={option} onChange={handleChangeOption} label="Nhập email người nhận khảo sát " />
        <Button variant="contained" style={{marginLeft:"40px",backgroundColor:"#6AE2FF"}}  onClick ={handleSubmitOption}>Lưu</Button>
    </Box>
    </div>
  );
}
