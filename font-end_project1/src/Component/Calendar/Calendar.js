import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  AppointmentTooltip,
  AllDayPanel,
  DragDropProvider,
  EditRecurrenceMenu,
  ContextMenu,
  ConfirmationDialog,
  AppointmentForm,
  Resources,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import RoomIcon from "@material-ui/icons/Room";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Random from "../../Config/random";
import { EditingState } from "@devexpress/dx-react-scheduler";
import { appointments } from "./data-calendar/month-appointments";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  withStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../features/Calendar/StatusButtonShare";
import ShareIcon from "@material-ui/icons/Share";
import { green } from "@material-ui/core/colors";
import UserSendSchedule from "./UserSendSchedule";
const Calendar = (props) => {
  const dispath = useDispatch();
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("work-week");
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);
  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  };
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const Content = ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <Grid
          item
          xs={12}
          display="flex"
          style={{ marginTop: "20px", marginLeft: "18px" }}
        >
          <SpeakerNotesIcon style={{ marginRight: "20px", color: "#707070" }} />
          <span>{appointmentData.note}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );


  const handleClickShare = () => {
    console.log("🚀 ~ file: Calendar.js ~ line 59 ~ handleClickShare ~ hihi");
  };


  const CommandLayout = ({ ...restProps }) => (
    <AppointmentForm.CommandLayout {...restProps}>
      <Button
        style={{ marginLeft: "30px" }}
        color="primary"
        variant="contained"
        onClick={handleClickShare}
        endIcon={<ShareIcon />}
      >
        Share
      </Button>
    </AppointmentForm.CommandLayout>
  );
  const [checkedB , setCheckedB]= useState(false); 
  console.log("🚀 ~ file: Calendar.js ~ line 101 ~ Calendar ~ checkedB", checkedB)
  const handleChangeCheckBox = (event) =>{ 
      setCheckedB(event.target.checked)
  }
  const renderEmailUserSend = ()=>{
    let xml = ""; 
    if(checkedB){
      setCheckedB(true)
       xml =  <UserSendSchedule />; 
    }else{
      xml =""; 
    }
     return xml ; 
  }
  const BasicLayout = ({ ...restProps }) => (
    <AppointmentForm.BasicLayout {...restProps}>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={<GreenCheckbox name="checkedG" />}
            label="Share"
            checked ={checkedB}
            style={{ float: "left", marginTop: "20px" }}
            onChange={handleChangeCheckBox}
          />
        </Grid>
        <Grid item xs={12}>
          {renderEmailUserSend()}
        </Grid>
      </Grid>
    </AppointmentForm.BasicLayout>
  );
  ///edit


  const changeAddedAppointment = (addedAppointment) => {
    dispath(changeStatus());
    console.log(
      "🚀 ~ file: Calendar.js ~ line 35 ~ changeAddedAppointment ~ addedAppointment",
      addedAppointment
    );
    setAddedAppointment(addedAppointment);
  };


  const changeAppointmentChanges = (appointmentChanges) => {
    console.log(
      "🚀 ~ file: Calendar.js ~ line 40 ~ changeAppointmentChanges ~ appointmentChanges",
      appointmentChanges
    );
    setAppointmentChanges(appointmentChanges);
  };


  const changeEditingAppointment = (editingAppointment) => {
    console.log(
      "🚀 ~ file: Calendar.js ~ line 45 ~ changeEditingAppointment ~ editingAppointment",
      editingAppointment
    );
    console.log(
      "🚀 ~ file: Calendar.js ~ line 57 ~ changeEditingAppointment ~ data",
      data
    );
    setEditingAppointment(editingAppointment);
  };

  const UserInfo = useSelector((state) => state.auth);
  const commitChanges = ({ added, changed, deleted }) => {
    let data1 = data;
    if (added) {
      const schedule1 = { id: Random.alphabet(8), ...added };
      const schedule = {
        email_user: UserInfo.userInfo.email,
        schedule: schedule1,
      };
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data1 = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      console.log(
        "🚀 ~ file: Calendar.js ~ line 52 ~ commitChanges ~ changed",
        changed
      );
      data1 = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      console.log(
        "🚀 ~ file: Calendar.js ~ line 56 ~ commitChanges ~ deleted",
        deleted
      );
      data1 = data.filter((appointment) => appointment.id !== deleted);
    }
    setData(data1);
  };
  const date = new Date();
  let defaultCurrentDate = `${date.getFullYear()},${
    date.getMonth() + 1
  },${date.getDate()}`;
  return (
    <>
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            defaultCurrentDate={defaultCurrentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />

          <WeekView
            name="work-week"
            displayName="Week"
            excludedDays={[]}
            startDayHour={5}
            endDayHour={24}
          />

          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={changeEditingAppointment}
          />
          <EditRecurrenceMenu />
          {/* <ConfirmationDialog /> */}
          <MonthView />
          <DayView />
          <AllDayPanel />

          <Toolbar />

          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
            contentComponent={Content}
          />
          <AppointmentForm
            commandLayoutComponent={CommandLayout}
            basicLayoutComponent={BasicLayout}
          />
          <DateNavigator />
          <TodayButton />
          {/* <DragDropProvider
            allowDrag={allowDrag}
          /> */}
        </Scheduler>
      </Paper>
    </>
  );
};

export default Calendar;
