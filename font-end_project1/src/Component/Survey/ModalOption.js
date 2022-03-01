import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useDispatch } from "react-redux";
import {addListOption} from '../../features/ListOption/ListOption'

export default function OptionModal() {
  const [option,setOption] = useState(""); 
  const dispath = useDispatch(); 
 
  const  handleChangeOption =(event)=>{ 
       const {value} = event.target ; 
       setOption(value) ; 
  }
  const handleSubmitOption =() => {
     dispath(addListOption(option)); 
     setOption("");    
  }
  return (
    <div>
    <Box style={{float:"left"}} display="flex">
        <TextField id="standard-basic" style={{width:"400px"}} value={option} onChange={handleChangeOption} label="Nhập lựa chon khảo sát ..." />
         <Button variant="contained" style={{marginLeft:"40px",backgroundColor:"#6AE2FF"}} onClick ={handleSubmitOption}>Lưu</Button>
    </Box>
    </div>
  );
}
