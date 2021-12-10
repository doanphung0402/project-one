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
import {Link} from 'react-router-dom'; 
import PersonIcon from '@material-ui/icons/Person';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../features/Calendar/StatusButtonShare";
import ShareIcon from "@material-ui/icons/Share";
import { green } from "@material-ui/core/colors";
import UserSendSchedule from "./UserSendSchedule";
import axios from "axios";
import URL from "../../Config/URL";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { toast } from "react-toastify";
import { addDetailSchedule } from "../../features/Calendar/DetailSchedule";
const Calendar = (props) => {
  const dispath = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [data, setData] = useState([]);
  const [datadis,setDataDis] = useState([]); 
  useEffect(()=>{
      const fetchData = async()=>{
        await axios({
          url : URL.getAllMySchedule, 
          method:"Post", 
          data: {email:userInfo.email}
       }).then(data=>{
          console.log("🚀 ~ file: Calendar.js ~ line 57 ~ useEffect ~ data", data)
          setData(data.data)
       }).catch(error=>{
          toast.error(error)
       })
      }
      fetchData(); 
  },[])
  const [currentViewName, setCurrentViewName] = useState("work-week");
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

 

  const CommandLayout = ({ ...restProps }) => (
    <AppointmentForm.CommandLayout {...restProps}>
      <Button
        style={{ marginLeft: "30px" }}
        color="primary"
        variant="contained"
      
        endIcon={<ShareIcon />}
      >
        Share
      </Button>
    </AppointmentForm.CommandLayout>
  );
  const [checkedB, setCheckedB] = useState(false);
  const handleChangeCheckBox = (event) => {
    setCheckedB(event.target.checked);
  };
  const renderEmailUserSend = () => {
    let xml = "";
    if (checkedB) {
      xml = <UserSendSchedule />;
    } else {
      xml = "";
    }
    return xml;
  };
  const BasicLayout = ({ ...restProps }) => (
    <AppointmentForm.BasicLayout {...restProps}>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={<GreenCheckbox name="checkedG" />}
            label="Share"
            checked={checkedB}
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
    //
    console.log(
      "🚀 ~ file: Calendar.js ~ line 35 ~ changeAddedAppointment ~ addedAppointment",
      addedAppointment
    );
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    console.log(
      "🚀 ~ file: Calendar.js ~ line 40 ~ changeAppointmentChanges ~ appointmentChanges",
      appointmentChanges
    );
  };

  const changeEditingAppointment = (editingAppointment) => {
    console.log(
      "🚀 ~ file: Calendar.js ~ line 45 ~ changeEditingAppointment ~ editingAppointment",
      editingAppointment
    );
  };
  const UserInfo = useSelector((state) => state.auth);
  var ListEmail =  useSelector(state=>state.EmailUserSendSchedule.ListEmailSend);
  const commitChanges = async({ added, changed, deleted }) => {
   
  
    if (added) {
     
      const newListEmail = ListEmail.map(data=>{
        return data.email
      })
      const schedule1 = { id: Random.alphabet(8), ...added };
     
      setData([...data,schedule1]); 
      const schedule = {
        email_user: UserInfo.userInfo.email,
        scheduler: {...schedule1,send_to: newListEmail},
      };
       
       await axios({
          url: URL.createSchedule,
          method: "Post",
          data: schedule,
        })
        .then((data) => {
            console.log("🚀 ~ file: Calendar.js ~ line 174 ~ .then ~ data", data)   
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: Calendar.js ~ line 178 ~ commitChanges ~ error",
            error
          );
        });
    }
    if (changed) {
      console.log(
        "🚀 ~ file: Calendar.js ~ line 52 ~ commitChanges ~ changed",
        changed
      );
      let data1 = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      setData(data1)
    }
    if (deleted !== undefined) {
      console.log(
        "🚀 ~ file: Calendar.js ~ line 56 ~ commitChanges ~ deleted",
        deleted
      );
      let data1 = data.filter((appointment) => appointment.id !== deleted);
      setData(data1);
    }
    
  };
  const date = new Date();
  let defaultCurrentDate = `${date.getFullYear()},${
    date.getMonth() + 1
  },${date.getDate()}`;

  const renderShowPersonSend =(appointmentData) =>{
    dispath(addDetailSchedule(appointmentData)); 
    let xml =""; 
     if(appointmentData.send_to  &&  appointmentData.send_to.length !== 0){
            xml = (
               <>
                 <GroupAddIcon style={{ marginRight: "20px", color: "#707070" }} />
                 <span>Chia sẻ với {appointmentData.send_to.length} người khác </span>
                 <Link to="/scheduder/detail-schedule-send">     Xem chi tiết ...</Link>
                </>
            )
     }else{
        xml = (
            <>
               <PersonIcon style={{ marginRight: "20px", color: "#707070" }} />
               <span>Gửi bởi : {appointmentData.received_to} tới {appointmentData.total_number_user_send} người khác</span>
            </>
        )
     }
     return xml ; 
  }

  const Content = ({children, appointmentData, classes, ...restProps }) => (
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
          <span>{appointmentData.notes}</span>
          
        </Grid>
         <Grid item xs={12} display="flex" style={{marginTop:"20px",marginLeft:"18px"}}>
            {renderShowPersonSend(appointmentData)}
         </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );


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
            //  addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
            //  appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}
            //  editingAppointment={editingAppointment}
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
