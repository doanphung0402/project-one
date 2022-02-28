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
import SubjectIcon from "@material-ui/icons/Subject";
import axios from "axios";
import { toast } from "react-toastify";
import URL from "../../Config/URL";
import { addListScheduleReceived } from "../../features/Calendar/ListScheduleReceived";
import Cookies from "universal-cookie";
const CalendarItem = (props) => {
  const dispath = useDispatch();
  const schedule = props.schedule;
  const startDate = new Date(schedule.startDate);
  const endDate = new Date(schedule.endDate);
  const status = schedule.status;
  const color = ["orange", "yellow", "blue", "pink", "red", "green"];
  const history = useHistory();
  let title = schedule.title;
  const titleLength = title.length;
  const indexColor = Math.ceil(titleLength / color.length);
  const colorAvatar = color[indexColor];
  title = title.trim();
  const str1 = title.substring(title.length - 1, title.length);
  const str2 = title.substring(0, 1);
  let avataTitle = str2.concat(str1);
  avataTitle = avataTitle.toUpperCase();
  const showTime = (create_at) => {
    //ham tgian
    let xml;

    const timeAgo = new TimeAgo("vn");

    const d = new Date();

    const t = new Date(create_at);
    let now = d.getTime() - t.getTime();
    xml = timeAgo.format(new Date() - now);
    return xml;
  };
  const userInfo = useSelector((state) => state.auth.userInfo);
  const schedule1 = useSelector(
    (state) => state.ListScheduleReceived.ListScheduleReceived
  );
  const acceptSchedule = (schedule) => {
    const cookies = new Cookies();
    const token = cookies.get("user");

    axios({
      url: URL.changeStatusSchedule,
      method: "POST",
      data: {
        email_user: userInfo.email,
        status: "ACCEPT",
        schedule: schedule,
        cookies: token,
      },
    })
      .then((data) => {
        const newSchedule1 = schedule1.filter((schedule2) => {
          return schedule2.id !== schedule.id;
        });
        dispath(addListScheduleReceived(newSchedule1));
        toast.success("Cập nhật thành công !");
      })
      .catch((error) => {
        toast.warning("Hết phiên làm việc!");
        history.push("/login");
      });
  };

  const deleteSchedule = (schedule) => {
    const id = schedule.id;
    const email = userInfo.email;
    const cookies = new Cookies();
    const token = cookies.get("user");
    axios({
      url: URL.deleteScheduleReceivedById,
      method: "post",
      data: {
        id: id,
        email: email,
        cookies: token,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          const newScheduleList = schedule1.filter((schedule) => {
            return schedule.id !== id;
          });
          dispath(addListScheduleReceived(newScheduleList));
          toast.success("Xóa thành công !");
        } else {
          toast.warning("Xóa thất bại ! Thử lại!");
        }
      })
      .catch((error) => {
        toast.warning("Hết phiên làm việc!");
        history.push("/login");
      });
  };

  const cancerSchedule = (schedule) => {
    const id = schedule.id;
    const cookies = new Cookies();
    const token = cookies.get("user");
    axios({
      url: URL.changeStatusSchedule,
      method: "post",
      data: {
        email_user: userInfo.email,
        status: "CANCER",
        schedule: schedule,
        cookies: token,
      },
    }).then((data) => {
      if (data.status === 200) {
        const updateListSchedule = schedule1.filter((schedule) => {
          return schedule.id !== id;
        });
        dispath(
          addListScheduleReceived(updateListSchedule)
        );
        toast.success("Cập nhật thành công  !");
      } else if (data.status === 501) {
        toast.warning("Hết phiên làm việc !");
        history.push("/login");
      } else {
        toast.warning("Có lỗi thử lại  ! ");
      }
    });
  };
  const renderButtonCancer = (status) => {
    let xml;
    if (status === "RECEIVED") {
      xml = (
        <Button
          onClick={() => cancerSchedule(schedule)}
          style={{ float: "right", marginRight: "8px" }}
          variant="contained"
          color="secondary"
        >
          Hủy
        </Button>
      );
    } else {
      xml = (
        <Button
          onClick={() => deleteSchedule(schedule)}
          style={{ float: "right", marginRight: "8px" }}
          variant="contained"
          color="secondary"
        >
          Xóa
        </Button>
      );
    }
    return xml;
  };
  return (
    <Card
      style={{
        height: "270px",
        width: "500px",
        border: "1px solid",
        marginTop: "10px",
        position: "relative",
      }}
    >
      <Typography
        style={{
          top: 0,
          right: 0,
          position: "absolute",
          margin: "10px",
          color: "blue",
        }}
      >
        {showTime(schedule.create_at)}
      </Typography>
      <Box style={{ margin: "5px" }} display="flex">
        <Box style={{ display: "flex" }}>
          <Avatar style={{ marginRight: "2px", backgroundColor: colorAvatar }}>
            {avataTitle}
          </Avatar>
        </Box>
        <Box>
          {" "}
          <Typography
            variant="subtitle1"
            style={{ marginLeft: "12px", marginTop: "2px", textAlign: "left" }}
          >
            {schedule.title}
          </Typography>
          <Typography
            variant="caption"
            style={{ marginLeft: "12px", marginTop: "2px" }}
          >
            {startDate.toDateString()}
          </Typography>{" "}
          <br></br>
        </Box>
      </Box>
      <Typography
        variant="caption"
        style={{ marginLeft: "12px", marginTop: "2px", float: "left" }}
      >
        {schedule.received_to}
      </Typography>
      <Box display="flex" style={{ marginTop: "45px", marginLeft: "5px" }}>
        <SubjectIcon />
        <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
          {schedule.notes}
        </Typography>
      </Box>
      <Box style={{ marginTop: "15px", marginLeft: "5px" }} display="flex">
        <AccessTimeIcon />

        <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
          {startDate.getHours()}:
          {startDate.getMinutes() === 0 ? "00" : startDate.getMinutes()} -{" "}
          {endDate.getHours()}:
          {endDate.getMinutes() === 0 ? "00" : endDate.getMinutes()}
        </Typography>
      </Box>
      <Box display="flex" style={{ marginTop: "15px", marginLeft: "5px" }}>
        <GroupIcon />
        <Typography style={{ marginLeft: "23px" }} variant="subtitle2">
          {schedule.total_number_user_send} người tham gia
        </Typography>
      </Box>

      <Box style={{ width: "100%", marginTop: "15px" }}>
        {renderButtonCancer(status)}
        <Button
          onClick={() => acceptSchedule(schedule)}
          style={{ float: "left", marginLeft: "8px" }}
          variant="contained"
          color="primary"
        >
          Đồng ý{" "}
        </Button>
      </Box>
    </Card>
  );
};

export default CalendarItem;
