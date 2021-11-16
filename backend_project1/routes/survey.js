import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import SurveyModel from '../models/surveyModel';
import UserModel from '../models/userModel';
import * as SurveyService from '../Service/SurveyService'; 
function SurveyRoute(){
    const route = express.Router(); 
    route.get("/get-all-survey",(req,res)=>{
       const surveyResultPromise = SurveyService.getAllSurvey(); 
        surveyResultPromise.then(data=>{
             if(data==null) {
                  res.json({message:HttpCode.NOT_FOUND})
             }else{
                  console.log(data);
                  res.json(data)
             }
        }).catch(error=>{
             console.log("survey:"+error); 
             res.json({message:HttpCode.NOT_FOUND})
        })
    });
    
    route.post("/create-survey",(req,res)=>{
         const resultReq = req.body;  
         let newSurvey = {
              email_user : resultReq.email_user, 
              title : resultReq.title , 
              options : resultReq.options, 
              voted_number : resultReq.voted_number,
              received_to : resultReq.received_to, 
              send_to : resultReq.send_to , 
              user_voted : resultReq.user_voted , 
              timeout : resultReq.timeout,
              status : resultReq.status
         }; 
         const rs =  SurveyService.createSurvey(newSurvey); 
         rs.then(data=>{
             res.json({status:HttpCode.SUCCESS,payload:data}); 
         }).catch(error=>{
             console.log(error)
         })
    })

    return route
}
export default SurveyRoute()