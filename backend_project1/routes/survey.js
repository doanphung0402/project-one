import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import SurveyModelReceived from '../models/surveyReceivedModel';
import * as SurveyService from '../Service/SurveyService'; 
function  SurveyRoute(){
    const route = express.Router(); 
    route.post("/get-survey",async(req,res)=>{
        const page = req.query.page; 
        const email_user = req.body.email;
        console.log("🚀 ~ file: survey.js ~ line 10 ~ route.post ~ email_user", email_user)
        const status = req.body.status ; 
        console.log("🚀 ~ file: survey.js ~ line 11 ~ route.post ~ status", status)
      try {
           const data =await SurveyService.paginationPage(page,email_user,status); 
           res.json({message:HttpCode.SUCCESS,payload:{data}});       
        } catch (error) {
          res.json({message:HttpCode.ERROR}); 
        }
    });
    route.post("/create-send-survey", async(req,res)=>{
         const resultReq = req.body;  
         let newSurvey = {          
              title : resultReq.title , 
              option : resultReq.option, 
              vote_number: resultReq.vote_number,
              decription : resultReq.decription , 
              send_to : resultReq.send_to ,  
              note:resultReq.note,       
         }; 
         const surveySend = {
            email_user : resultReq.email_user, 
            survey_send : newSurvey   
         }
         let resultSend ; 
          try {
              await SurveyService.updateUserSendSurvey(surveySend); 
              const surveySendTo = {
                title : newSurvey.title, 
                option:newSurvey.option , 
                note : newSurvey.note , 
                vote_number:newSurvey.vote_number, 
                decription:newSurvey.decription, 
                received_to : resultReq.email_user
              }
              resultSend = await SurveyService.updateUserReceivedSurvey(newSurvey.send_to,surveySendTo) ;    
              res.json({status:HttpCode.SUCCESS,payload:resultSend}); 
          } catch (error) {
               res.json({message:HttpCode.FAILSE});
          }
    })
//     route.post("/get-all-survey-received",async(req,res)=>{
//           const email_user = req.body.email;  
//           try {
//               const  listSurveyReceived =await SurveyService.getSurveyReceived(email_user); 
//               res.json({status:HttpCode.SUCCESS,payload:listSurveyReceived})
//           } catch (error) {
//                res.json({status:HttpCode.FAILSE}); 
//           }
//     })
//     route.post("/get-all-survey-send",async(req,res)=>{
//      const email_user = req.body.email;  
//      try {
//          const listSurveySend =await SurveyService.getSurveySend(email_user); 
//          res.json({status:HttpCode.SUCCESS,payload:listSurveySend})
//      } catch (error) {
//           res.json({status:HttpCode.FAILSE}); 
//      }
// })
    return route
}
export default SurveyRoute()