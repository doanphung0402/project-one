import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import SurveyModelReceived from '../models/surveyReceivedModel';
import * as SurveyService from '../Service/SurveyService'; 
import  Random  from '../helper/random';
import * as ScheduleService from '../Service/ScheduleService'
function  CalendarRoute(){
    const route = express.Router(); 
    route.post("/create-schedule",async(req,res)=>{
        const schedule = req.body ; 
        const rsCreate  =await ScheduleService.addSchedule(schedule); 
        if(!rsCreate){
         res.status(200).json("Success"); 
        }else { 
          res.status(404).json("Failse"); 
        }
    })
    route.post("/get-all-schedule-send",async(req,res)=>{
         const email_user  = req.body.email; 
      
         const ListSchedule = await ScheduleService.getAllScheduleSend(email_user); 
       
         res.json(ListSchedule) ; 
    })
    route.post("/get-all-my-schedule",async(req,res)=>{
         const email_user = req.body.email ; 
         const ListSchedule = await ScheduleService.getAllMySchedule(email_user); 
        //  console.log("🚀 ~ file: Calendar.js ~ line 28 ~ route.post ~ ListSchedule", ListSchedule)
         res.status(200).json(ListSchedule); 
    })
    route.post("/get-all-schedule-received",async(req,res)=>{
        const email = req.body.email ; 
        const scheduler = await ScheduleService.getAllScheduleReceived(email); 
        if(scheduler){
             res.status(200).json(scheduler); 
        }else {
             res.status(400); 
        }
     })
    route.post("/change-status-schedule-received",async(req,res)=>{
         const {schedule,status,email_user} = req.body ; 
         try {
            await ScheduleService.changeStatusScheduleRecieved(schedule,status,email_user)
            res.status(200).json("SUCCESS"); 
         } catch (error) {
             res.status(400); 
         }
    })
    route.post("/delete-schedule-by-id",async(req,res)=>{
          const {id,email_user} = req.body ; 
          try {
               const rsDeleteSchedule = await ScheduleService.deleteScheduleById(id,email_user); 
               res.status(200).json("Success"); 
          } catch (error) {
               res.status(400).json("Failse"); 
          }
    })
    return route
}
export default CalendarRoute(); 