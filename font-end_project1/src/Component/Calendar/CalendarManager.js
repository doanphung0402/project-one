import React, { useEffect, useState } from "react";
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
import CalendarItem from "./CalendarItemReceived";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addListScheduleReceived } from "../../features/Calendar/ListScheduleReceived";
let scheduleArray = [];
const CalendarManager = () => {
 
  const userInfo = useSelector((state) => state.auth.userInfo);
 
  const dispath = useDispatch(); 
  useEffect(() => {
    axios({
      url: URL.getAllScheduleReceived,
      method: "post",
      data: {
        email: userInfo.email,
      },
    })
      .then((data) => {
        console.log(
          "🚀 ~ file: CalendarManager.js ~ line 27 ~ useEffect ~ data",
          data
        );
        dispath(addListScheduleReceived(data.data)); 
        if (data.status === 200) {
        
        } else {
          toast.warning("Co loi , thu lai ");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [status, setStatus] = useState("RECEIVED"); // RECEIVED CANCER
  const  schedule = useSelector(state=>state.ListScheduleReceived.ListScheduleReceived); 
  console.log("🚀 ~ file: CalendarManager.js ~ line 53 ~ CalendarManager ~ schedule", schedule)
  const renderEventItem = (schedule) => {
    let xml;
    const scheduleReceived = schedule.filter((schedule) => {
      return schedule.status === status;
    });
    xml = scheduleReceived.map((schedule, index) => {
      return <CalendarItem schedule={schedule} key={index} />;
    });
    return xml;
  };

  const handleButton = (status1) => {
    setStatus(status1);
  };

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
            Sự kiện của bạn{" "}
          </Typography>
          <Typography variant="h5">Quản lí các sự kiện của bạn !</Typography>
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
                        <Button
                          onClick={() => handleButton("CANCER")}
                          variant="contained"
                          style={{ width: "100%"}}
                          color = {status==="CANCER"? "primary":""}
                        >
                          Đã hủy
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          onClick={() => handleButton("RECEIVED")}
                          variant="contained"
                          style={{ width: "100%" }}
                          color = {status==="RECEIVED"? "primary":""}
                        >
                          Nhận được
                        </Button>
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
                  <Box style={{ marginTop: "50px" }}>
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
