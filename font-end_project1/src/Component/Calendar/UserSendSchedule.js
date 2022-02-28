import { Box, Button, Grid, TextField } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmailUserSendItem, changeListEmailUserSend } from "../../features/Calendar/EmailUserSendSchedule";
import ChipsShareButton from "./ChipsShareButton";

import ClearAllIcon from '@material-ui/icons/ClearAll';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
const UserSendSchedule = () => {
  const dispath = useDispatch();
  const [user, setEmail] = useState({email:"",key:null});
  const handleChangeInput = (event) => {
    const emailEvent = event.target.value;
    setEmail({ email: emailEvent, key: emailEvent });
  };
  const addEmail = (user) => {
    dispath(addEmailUserSendItem(user));
    setEmail({email:"",key:null}); 
  };
  const handleClearChip = ()=>{
     setEmail({email:"",key:null}); 
     dispath(changeListEmailUserSend([])); 
  }
  return (
    <>
      <Grid container style={{marginTop :"20px"}}>
        <Grid item xs={12}>
          <ChipsShareButton />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "40px",textAlign:"left"}} display="flex">
          <AccountCircle
            style={{
              marginTop: "20px",
              marginRight: "15px",
              marginLeft: "5px",
            }}
          />
          <TextField
            id="input-with-icon-grid"
            label="Enter email : "
            name="email"
            value={user.email}
            onChange={handleChangeInput}
          />
          
          <Button
            variant="contained"      
            style={{ marginTop: "15px", marginLeft: "50px",backgroundColor:"#43A047",color:"white"}}
            onClick={() => addEmail(user)}
            startIcon={<AddCircleOutlineIcon/>}
          >
            Add
          </Button>
           <Button
              variant="contained"
              color="secondary"
              startIcon={<ClearAllIcon/>}
              style={{ marginTop: "15px", marginLeft: "30px"}}
              onClick={handleClearChip}
            >
             Clear
           </Button>

        </Grid>
      </Grid>
    </>
  );
};
export default UserSendSchedule;
