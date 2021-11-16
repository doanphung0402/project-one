import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Fab, TextField } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import { useSelector,useDispatch } from "react-redux";
import {addListOption} from '../features/ListOption/ListOption'
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

export default function OptionModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [option,setOption] = useState(""); 
  const dispath = useDispatch(); 
  const handleOpen = () => {
   
    setOpen(true);
  };
  const  handleChangeOption =(event)=>{ 
       const {value} = event.target; 
       setOption(value); 
    
  }
  const handleClose = () => {
    
    setOpen(false);
  };
  const handleSubmitOption =() => {
     dispath(addListOption(option)); 
     handleClose();      
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.root}>
      <TextField id="standard-basic" label="Nhập tên lựa chọn" name="option"  onChange={handleChangeOption}  />
      <Button type="button" variant="contained" style={{marginTop:"30px"}} color="primary" onClick ={handleSubmitOption}>
         Lưu
      </Button>
     </div>
    </div>
  );

  return (
    <div>
      <Fab style={{ float: "right" }} color="primary" aria-label="add">
         <AddIcon onClick={handleOpen}/>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
