import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Calendar from "./Calendar";
const CalendarContainer = () => {
  const status = useSelector(state=>state.StatusButtonShare.status); 
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
