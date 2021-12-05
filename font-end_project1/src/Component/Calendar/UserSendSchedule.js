import { Button, Grid, TextField } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmailUserSendItem } from "../../features/Calendar/EmailUserSendSchedule";
import ChipsShareButton from "./ChipsShareButton";

const UserSendSchedule = () => {
  console.log("render");
  const dispath = useDispatch();
  const [email, setEmail] = useState({});
  console.log(
    "🚀 ~ file: ChipsShareButton.js ~ line 70 ~ UserSendSchedule ~ email",
    email
  );
  const handleChangeInput = (event) => {
    const emailEvent = event.target.value;
    setEmail({ email: emailEvent, key: email });
  };
  const addEmail = (email) => {
    dispath(addEmailUserSendItem(email));
  };
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
            onChange={handleChangeInput}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px", marginLeft: "30px" }}
            onClick={() => addEmail(email)}
          >
            Thêm
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default UserSendSchedule;
