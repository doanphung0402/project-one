import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListSurveySchedule } from "../../features/Calendar/SurveySchedule";
const ScheduleSurvey = () => {
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [day,setDay] = useState(""); 
  const dispath = useDispatch();
  const handleStartDate = (event) => {
    const time = event.target.value;
    setStartDate(time);
  };
  const handleEndDate = (event) => {
    const time = event.target.value;
    setEndDate(time);
  };
  const handleChangeDay =(event)=>{
     const time = event.target.value ; 
     setDay(time)
  }
  const handleSubmitOption = () => {
    const time = {
      startDate: startDate,
      endDate: endDate,
      day : day 
    };
    dispath(addListSurveySchedule(time));
  };
  
  return (
    <div>
      <Box style={{ marginTop: "60px" }}>
        <Box display="flex" justifyContent="left">
          <TextField
          style={{marginRight:"40px"}}
            id="date"
            label="Ngày diễn ra"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeDay}
          />
          <TextField
            id="time"
            style={{marginRight:"40px"}}
            label="Bắt đầu lúc"
            type="time"
            
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleStartDate}
          />
          <TextField
            id="time"
            style={{marginRight:"40px"}}
            label="Kết thúc lúc"
            type="time"
           
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleEndDate}
          />
        </Box>

        <Button
          variant="contained"
          style={{
            marginLeft: "",
            marginTop: "30px",
            backgroundColor: "#6AE2FF",
            float: "left",
          }}
          onClick={handleSubmitOption}
        >
          Thêm
        </Button>
      </Box>
    </div>
  );
};

export default ScheduleSurvey;
