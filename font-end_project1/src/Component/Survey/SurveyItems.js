import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Random from "../../Config/random";
import { addSurveyDetail } from "../../features/survey/detailSurvey";
import StatusSurveyItem from "../../Constaint/StatusSurveyItem";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
TimeAgo.addDefaultLocale(vi)
const SurveyItems = (props) => {
  const dispath = useDispatch();
  const color = ["orange", "yellow", "blue", "pink", "red", "green"];
  let survey = props.survey;
 
  const index = props.index;
  const history = useHistory();
  let title = survey.title;
  const titleLength = title.length;
  const indexColor = Math.ceil(titleLength / color.length);
  const colorAvatar = color[indexColor];
  title = title.trim();
  const str1 = title.substring(title.length - 1, title.length);
  const str2 = title.substring(0, 1);
  const avataTitle = str2.concat(str1);
  const detailSurvey = (survey) => {
    dispath(addSurveyDetail(survey));
    history.push(`/survey/get-detail-survey-item?item=${index}`);
  };
  const showNumberPersonVote = (survey) => {
    let xml = "hello";
    if (survey.send_to) {
      xml = (
        <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
          {survey.user_voted.length}/{survey.vote_number} voted
        </Typography>
      );
    } else {
      xml = (
        <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
          {survey.vote_number} person vote
        </Typography>
      );
    }
    return xml;
  };
  const renderStatus = (survey) => {
    if (survey.received_to) {
      if (survey.is_check === StatusSurveyItem.NOT_DONE) {
        return (
          <Typography
            style={{
              top: 0,
              right: 0,
              position: "absolute",
              margin: "10px",
              color: "red",
            }}
          >
            Chưa Hoàn Thành
          </Typography>
        );
      } else {
        return (
          <Typography
            style={{
              top: 0,
              right: 0,
              position: "absolute",
              margin: "10px",
              color: "blue",
            }}
          >
            Đã Hoàn Thành
          </Typography>
        );
      }
    }
  };
  const showTime = (survey) => {
    //ham tgian
    let xml;
    const timeAgo = new TimeAgo("vn");
    const d = new Date();
    const t = new Date(survey.create_at);
    let now = d.getTime() - t.getTime();
    xml = timeAgo.format(new Date() - now);
    return xml;
  };
  return (
    <Button onClick={() => detailSurvey(survey)}>
      <Card style={{ height: "180px", width: "500px", border: "1px solid" }}>
        {renderStatus(survey)}
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
              style={{ marginLeft: "12px", marginTop: "2px" }}
            >
              {survey.title}
            </Typography>
          </Box>
        </Box>
        <Box style={{ marginTop: "20px", marginLeft: "5px" }} display="flex">
          <DateRangeIcon />
          <Typography style={{ marginLeft: "5px" }} variant="subtitle2">
            {survey.option.length} options
          </Typography>
        </Box>
        <Box display="flex" style={{ marginTop: "20px", marginLeft: "5px" }}>
          <GroupIcon />
          {showNumberPersonVote(survey)}
        </Box>
        <Box style={{ marginTop: "20px", marginLeft: "5px" }} display="flex">
          <AccessTimeIcon />
              <Typography variant="subtitle2" style={{ marginLeft: "5px" }}>
            {showTime(survey)}
          </Typography>
        </Box>
      </Card>
    </Button>
  );
};

export default SurveyItems;
