import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useHistory } from "react-router-dom";
import DetailsIcon from '@material-ui/icons/Details';
const CalendarContainer = () => {
  const history = useHistory(); 
  const handleButtonGoDetail =() =>{
     history.push("/calendar/manager"); 
  }
  return (
    <>
      <Grid container>
        <Grid xs={12} item>      
           <Box>
            <Box>  
              <Typography
                variant="h4"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                Công việc của bạn
              </Typography>
                <Box style={{float:"left"}}>
                   <Button style={{marginLeft:"22px",marginBottom:"30px",marginTop:"20px",backgroundColor:"#32DB81"}} variant="contained" onClick={handleButtonGoDetail} startIcon={<DetailsIcon/>}>Quản lí sự kiện</Button>
                </Box>
              <Grid item xs={12}>
                  <Calendar />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CalendarContainer;
