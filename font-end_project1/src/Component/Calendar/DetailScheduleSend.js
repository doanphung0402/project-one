import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Card,
  Button,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import GradeIcon from "@material-ui/icons/Grade";
import SubjectIcon from "@material-ui/icons/Subject";
import TitleIcon from '@material-ui/icons/Title';
import TableSchedule from "./TableSchedule";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
const infoSchedule = (schedule) => {
  let xml;
  xml = (
    <Box
      style={{
        marginTop: "15px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="subtitle1">
        Được gửi đi tới {schedule.send_to.length} người khác
      </Typography>
      <GradeIcon style={{ marginLeft: "6px", marginRight: "6px" }} />
      <Typography variant="subtitle1">
        Gửi đi lúc {new Date(schedule.create_at).toDateString()}
      </Typography>
    </Box>
  );
  return xml;
};
const DetailScheduleSend = () => {
  const schedule = useSelector((state) => state.DetailSchedule.DetailSchedule);
  const startDate = new Date(schedule.startDate); 
  const endDate =new Date(schedule.endDate); 
  return (
    <Fragment>
      <Container style={{ backgroundColor: "", padding: "20px" }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={10}
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
            <Card>
              <Typography variant="h3">{schedule.title}</Typography>
              {infoSchedule(schedule)}
              <Box
                style={{
                  marginTop: "50px",
                  marginLeft: "30px",
                  fontSize: "20px",
                }}
              >
                <Box
                  style={{
                    marginTop: "25px",
                    float: "left",
                    marginBottom: "75px",
                  }}
                >
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <TitleIcon  style={{marginTop:"20px"}} />
                    <Typography
                      variant="subtitle1"
                      style={{ fontSize: "20px", marginTop: "30px",marginLeft:"10px"}}
                    >
                      {schedule.title}
                    </Typography>
                  </Box>
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <SubjectIcon  style={{marginTop:"20px"}} />
                    <Typography
                      variant="subtitle1"
                      style={{ fontSize: "20px", marginTop: "30px",marginLeft:"10px"}}
                    >
                      {schedule.notes}
                    </Typography>
                  </Box>
                  <Box style={{ display: "flex", alignItems: "baseline" }}>
                    <AccessTimeIcon style={{marginTop:"20px"}} />
                    <Typography
                      variant="subtitle1"
                      style={{ fontSize: "20px", marginTop: "30px",marginLeft:"10px"}}
                    >
                      {startDate.getHours()}:{startDate.getMinutes()===0?"00":startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()===0?"00":endDate.getMinutes()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
             
              {/* {renderChartSurvey(survey)} */}
            </Card>
               <Box style={{marginTop:"50px",textAlign:"left"}}>
                    <TableSchedule schedule={schedule}/>
               </Box>
          </Grid>
          <Grid xs={1} item></Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default DetailScheduleSend;
