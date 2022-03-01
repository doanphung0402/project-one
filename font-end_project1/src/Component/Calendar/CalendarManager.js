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
import axios from "axios";
import URL from "../../Config/URL";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import CalendarItem from "./CalendarItemReceived";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addListScheduleReceived } from "../../features/Calendar/ListScheduleReceived";
import background1 from '../../asset/background1.gif'
import Cookies from "universal-cookie";
const CalendarManager = () => {
  const history = useHistory(); 
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [page,setPage] = useState(1); 
  const [totalPage,setTotalPage] =useState(1); 
  const dispath = useDispatch(); 
  const handlePaginationPage = (event, page) => {
       setPage(page);
  };
  const [status,setStatus] = useState("RECEIVED"); // RECEIVED CANCER
  useEffect(() => {
    const cookies= new Cookies(); 
    const token = cookies.get("user")
    const email_user = sessionStorage.getItem("email"); 
    axios({
      url: `${URL.getSchedulePagination}?page=${page}`,
      method: "post",
      data: {
        email: email_user,
        status : status , 
        cookies:token
      },
    })
      .then((data) => {
        if (data.status === 200) {

          const scheduler = data.data.scheduler ; 
          setTotalPage(data.data.totalPage);
          dispath(addListScheduleReceived(scheduler)); 
          
        }else if(data.status === 501){
          toast.warning("Hết phiên làm việc!")
          history.push("/login"); 
        } else {
           toast.error("Có lỗi ,thử lại !")
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  },[page,status]);

 
  const  schedule = useSelector(state=>state.ListScheduleReceived.ListScheduleReceived); 

  const renderEventItem = (schedule) => {
    let xml = null ;
    if(schedule.length >0 ){
      xml = schedule.map((schedule, index) => {
        return <CalendarItem schedule={schedule} key={index} />;
      });
    }else{ 
      xml = null ; 
    }
    return xml;
  };

  const handleButton = (status1) => {
    setStatus(status1);
  };

  return (
    <div style={{backgroundImage:`url(https://accounts.sapo.vn/images/background-bottom-pos-app.svg)`}}>
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
            Sự kiện của bạn
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
                      onChange={handlePaginationPage}
                      count={totalPage}
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
