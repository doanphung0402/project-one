import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Random from "../../Config/random";
import {addSurveyDetail} from '../../features/survey/detailSurvey'; 
let RandomColor = () => {
  const color = ["orange", "yellow", "blue", "pink", "red", "green"];
  let randomColor = Math.floor(Math.random() * color.length);
  return color[randomColor];
};

const SurveyItems = (props) => {
  const dispath =useDispatch(); 
  const survey = props.survey;
  const index = props.index ; 
  const history = useHistory(); 
  useEffect(() => {
    console.log(
      "🚀 ~ file: SurveyItems.js ~ line 14 ~ SurveyItems ~ survey",
      survey
    );
  });
  const avataTitle = Random.uppercase(2);
  console.log(
    "🚀 ~ file: SurveyItems.js ~ line 20 ~ SurveyItems ~ avataTitle",
    avataTitle
  );
  const detailSurvey =(survey)=>{
     dispath(addSurveyDetail(survey))
     history.push(`/survey/get-detail-survey-item?item=${index}`)
  }
   
  return (
    <Button onClick={()=>detailSurvey(survey)}>
      <Card style={{ height: "150px", width: "500px", border: "1px solid" }} >
        <Box style={{ margin: "5px" }} display="flex">
          <Box>
            <Avatar
              style={{ marginRight: "2px", backgroundColor: RandomColor() }}
            >
              {avataTitle}
            </Avatar>
          </Box>
          <Box>
            {" "}
            <Typography
              variant="subtitle1"
              style={{ marginLeft: "12px", marginTop: "2px" }}
            >
              {survey.title}
            </Typography>
          </Box>
        </Box>
        <Box style={{ marginTop: "20px", marginLeft: "5px" }} display="flex" >
          <DateRangeIcon />
          <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
            {survey.option.length} options
          </Typography>
        </Box>
        <Box display="flex" style={{ marginTop: "20px", marginLeft: "5px" }}>
          <GroupIcon />
          <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
            {survey.user_voted.length}/{survey.vote_number} voted{" "}
          </Typography>
        </Box>
      </Card>
    </Button>
  );
};

export default SurveyItems;
