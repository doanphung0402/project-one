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
         res.status(200); 
        }else { 
          res.status(404); 
        }
    })
    route.post("/get-all-schedule-send",async(req,res)=>{
         const email_user  = req.body.email; 
      
         const ListSchedule = await ScheduleService.getAllScheduleSend(email_user); 
       
         res.json(ListSchedule) ; 
    })
    return route
}
export default CalendarRoute(); 