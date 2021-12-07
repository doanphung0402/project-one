import React from "react";
import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Random from "../../Config/random";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
const CalendarItem = () => {
  const dispath = useDispatch();
  const color = ["orange", "yellow", "blue", "pink", "red", "green"];
  const history = useHistory();
  let title;
//   const titleLength = title.length;
//   const indexColor = Math.ceil(titleLength / color.length);
//   const colorAvatar = color[indexColor];
//   title = title.trim();
//   const str1 = title.substring(title.length - 1, title.length);
//   const str2 = title.substring(0, 1);
//   const avataTitle = str2.concat(str1);
    let avataTitle = "TR"
    let colorAvatar = "yellow"
  const showTime = (survey) => {
    //ham tgian
    let xml;

    const timeAgo = new TimeAgo("vn");

    const d = new Date();

    const t = new Date(survey.create_at);
    console.log(
      "🚀 ~ file: SurveyItems.js ~ line 136 ~ showTime ~ t",
      t.getTime()
    );
    let now = d.getTime() - t.getTime();
    xml = timeAgo.format(new Date() - now);
    console.log("🚀 ~ file: SurveyItems.js ~ line 136 ~ showTime ~ xml", xml);
    return xml;
  };
  return (
      <Card style={{ height: "200px", width: "500px", border: "1px solid", marginTop:"10px",position:"relative" }}>
           <Typography
                style={{
                top: 0,
                right: 0,
                position: "absolute",
                margin: "10px",
                color: "blue",
                }}
           >
             3 ngay truoc 
          </Typography>
        <Box style={{ margin: "5px" }} display="flex">
          <Box style={{ display: "flex" }}>
            <Avatar
              style={{ marginRight: "2px", backgroundColor: colorAvatar }}
            >
              {avataTitle}
            </Avatar>
          </Box>
          <Box>
            {" "}
            <Typography
              variant="subtitle1"
              style={{ marginLeft: "12px", marginTop: "2px",textAlign:"left"}}
            
            >
              Demo
            </Typography>
            <Typography
              variant="caption"
              style={{ marginLeft: "12px", marginTop: "2px" }}
            >
               Monday ,December 6 , 2021 
            </Typography>
          </Box>
        </Box>
        <Box style={{ marginTop: "15px", marginLeft: "5px" }} display="flex">
        <AccessTimeIcon />
        
          <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
             9.30 AM - 11.30 AM
          </Typography>
        </Box>
        <Box display="flex" style={{ marginTop: "15px", marginLeft: "5px" }}>
          <GroupIcon />
                <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
                  vvv
                </Typography>
        </Box>
        <Box style ={{width:"100%",marginTop :"15px"}}>
            <Button style={{float:"left",marginLeft:"8px"}} variant ="contained" color="primary">Đồng ý </Button>
            <Button style={{float:"right",marginRight:"8px"}} variant ="contained" color="secondary">Từ chối</Button>
        </Box>
      </Card>
    
  );
};

export default CalendarItem;
