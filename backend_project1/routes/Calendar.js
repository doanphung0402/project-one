import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import SurveyModelReceived from '../models/surveyReceivedModel';
import * as SurveyService from '../Service/SurveyService'; 
import  Random  from '../helper/random';
function  CalendarRoute(){
    const route = express.Router(); 
    route.post("/add-schedule",async(req,res)=>{
        const schedule = req.body ; 

    })
    return route
}
export default CalendarRoute()