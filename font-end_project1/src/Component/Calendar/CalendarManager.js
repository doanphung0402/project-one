import React, { useState } from 'react';
import {
    Card,
    Typography,
    CssBaseline,
    Grid,
    Container,
    Button,
    Box,
  } from "@material-ui/core";
  import AddBoxIcon from "@material-ui/icons/AddBox";
  import axios from "axios";
  import URL from "../../Config/URL";
  import { useHistory } from "react-router-dom";
  import { Pagination } from "@material-ui/lab";
  import CalendarItem from "./CalendarItem"
let scheduleArray = []
const CalendarManager = () => {
    const [schedule,setSchedule] = useState(scheduleArray); 
    

  const renderEventItem =(schedule)=>{
        return (
          <>
                <CalendarItem/>
                <CalendarItem/>
                <CalendarItem/>
                <CalendarItem/>
                <CalendarItem/>
          </>
        )
  }
    return (
        <div>
        <Container>
          <Card
            style={{
              border: "2px",
              height: "250px",
              marginTop: "33px",
              marginLeft: "188px",
              marginRight: "188px",
            }}
          >
            <Typography variant="h4" style={{ margin: "33px" }}>
             Sự kiện của bạn {" "}
            </Typography>
            <Typography variant="h5">
               Quản lí các sự kiện của bạn !
            </Typography>
          </Card>
          <CssBaseline />
          <Grid container style={{ marginTop: "100px" }}>
            <Grid item xs={8}>
              <Box>
                <Card
                  style={{
                    marginLeft: "33px",
                    marginBottom: "50px",
                    padding: "25px",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={3}
                        style={{ marginBottom: "90px" }}
                      >
                        <Grid item xs={4}>
                          <Button variant="contained" style={{width:"100%"}}>Đã hủy</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained"  style={{width:"100%"}}>Gửi đi</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained"  style={{width:"100%",}}>Nhận được</Button>
                        </Grid>
                        <CssBaseline />
                      </Grid>
                    </Grid>
  
                    <Grid
                      container
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      wrap="nowrap"
                    >
                      {renderEventItem(schedule)}
                    </Grid>
                    <Box  style ={{marginTop:"50px"}}>
                      <Pagination
                        // onChange={}
                        // count={totalPage}
                        color="primary"
                      />
                    </Box>
                  </Grid>
                </Card>
                <CssBaseline />
              </Box>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Container>
      </div>
    );
};

export default CalendarManager;