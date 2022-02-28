import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import SurveyModelReceived from '../models/surveyReceivedModel';
import * as SurveyService from '../Service/SurveyService'; 
import  Random  from '../helper/random';
import * as ScheduleService from '../Service/ScheduleService'
function  CalendarRoute(){
    const route = express.Router(); 
    route.post("/create-schedule",async(req,res)=>{
        const id_survey_send = req.body.id_survey_send ; 
        const schedule = req.body.schedule; 
        const schedule_survey_send =req.body.schedule_survey_send; 
        try {
          const rsCreate  =await ScheduleService.addSchedule(schedule,schedule_survey_send,id_survey_send); 
          res.status(200).json(rsCreate); 

        }catch (error) {
             res.status(404).json("failse"); 
        } 
    })
    route.post("/get-all-schedule-send",async(req,res)=>{
         const email_user  = req.body.email; 
      
         const ListSchedule = await ScheduleService.getAllScheduleSend(email_user); 
       
         res.status(200).json(ListSchedule) ; 
    })
    route.post("/get-all-my-schedule",async(req,res)=>{
         const email_user = req.body.email ; 
         const ListSchedule = await ScheduleService.getAllMySchedule(email_user); 
         res.status(200).json(ListSchedule); 
    })
    route.post("/get-scheduler-with-pagination",async(req,res)=>{
        const email = req.body.email ; 
        const page = req.query.page; 
        const status = req.body.status; 
       try {
          const paginationScheduleList = await ScheduleService.paginationPageSchedule(email,page,status); 
          res.status(200).json(paginationScheduleList); 
       } catch (error) {
          res.status(400).json("failse"); 
       }
     })
    route.post("/change-status-schedule-received",async(req,res)=>{
         const {schedule,status,email_user} = req.body ; 
         try {
            await ScheduleService.changeStatusScheduleRecieved(schedule,status,email_user)
            res.status(200).json("SUCCESS"); 
         } catch (error) {
             res.status(404).json("failse"); 
         }
    })
    route.post("/delete-schedule-by-id",async(req,res)=>{
          const {id,email_user} = req.body ; 
          try {
               const rsDeleteSchedule = await ScheduleService.deleteScheduleById(id,email_user); 
               res.status(200).json("Success"); 
          } catch (error) {
               res.status(404).json("Failse"); 
          }
    })
    route.post("/delete-scheduler-received-by-id",async(req,res)=>{
          const {id,email} = req.body; 
          try {
               await ScheduleService.deleteScheduleReceivedById(id,email); 
               res.status(200).json("Success"); 
          } catch (error) {
               res.status(404).json("FAILSE"); 
          }
    })
   
    return route ; 
}
export default CalendarRoute(); 