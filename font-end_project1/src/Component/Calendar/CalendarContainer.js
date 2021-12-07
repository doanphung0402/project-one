import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useHistory } from "react-router-dom";
const CalendarContainer = () => {
  const history = useHistory(); 
  const handleButton =() =>{
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
               <Button onClick={handleButton} color ="secondary" contained >go</Button>
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
