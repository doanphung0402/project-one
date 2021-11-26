import { Avatar, Badge, Box, Button, Card, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import React from "react";
import { useDispatch } from "react-redux";
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
  let survey = props.survey;
  console.log("🚀 ~ file: SurveyItems.js ~ line 18 ~ SurveyItems ~ survey", survey)
  let status =props.status ; 
  const index = props.index ; 
  const history = useHistory(); 
  const avataTitle = Random.uppercase(2);
  console.log(
    "🚀 ~ file: SurveyItems.js ~ line 20 ~ SurveyItems ~ avataTitle",
    avataTitle
  );
  const detailSurvey =(survey)=>{
      // set trang thai thanh da xem 
      
     dispath(addSurveyDetail(survey))
     history.push(`/survey/get-detail-survey-item?item=${index}`)
  }
  const showNumberPersonVote =(survey)=>{ 
     let xml = "hello";  
     if(survey.send_to) {
          xml =(
            <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
                {survey.user_voted.length}/{survey.vote_number}  voted
            </Typography>
          )
     }else{
          xml = (
                <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
                    {survey.vote_number} person vote 
                </Typography>
          )
     }
     return xml; 
  }
  const renderStatus =(status,survey)=>{
     if(survey.send_to){
        
     }else{
      if(status){
        return ( <Typography style={{top:0,right:0,position:"absolute",margin:"10px",color:"blue"}}>Đã xem </Typography> )

       }else{
        return ( <Typography style={{top:0,right:0,position:"absolute",margin:"10px",color:"red"}}> Chưa xem </Typography>)
       }
     }
  }
  return (
    <Button onClick={()=>detailSurvey(survey)}>
      <Card style={{ height: "150px", width: "500px", border: "1px solid" }} >
         {renderStatus(status,survey)}
        <Box style={{ margin: "5px" }} display="flex">
          <Box style={{display:"flex"}}>
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
              {showNumberPersonVote(survey)}
        </Box>
      </Card>
    </Button>
  );
};

export default SurveyItems;
