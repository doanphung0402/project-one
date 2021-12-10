import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Calendar from "./Calendar";
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import DetailsIcon from '@material-ui/icons/Details';
const CalendarContainer = () => {
  const history = useHistory(); 
  const handleButtonGoDetail =() =>{
     history.push("/calendar/manager"); 
  }
  const handleButtonGoHome =()=>{
     history.push("/home"); 
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
                <Box>
                   <Button style={{marginRight:"30px"}} variant="contained" color="primary" onClick={handleButtonGoDetail} startIcon={<DetailsIcon/>}>Quản lí sự kiện</Button>
                   <Button variant="contained" color="secondary"  onClick={handleButtonGoHome} startIcon={<HomeIcon/>}>Trang chủ </Button>
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
