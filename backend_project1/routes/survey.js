import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import * as SurveyService from '../Service/SurveyService'; 
function  SurveyRoute(){
    const route = express.Router(); 
    route.post("/get-survey",async(req,res)=>{
        const page = req.query.page; 
        const email_user = req.body.email;
      try {
          const data =await SurveyService.paginationPage(page,email_user); 
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
              voted_number: 0,
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
                voted_number:0, 
                decription:newSurvey.decription, 
                received_to : resultReq.email_user
              }
              resultSend = await SurveyService.updateUserReceivedSurvey(newSurvey.send_to,surveySendTo) ;    


              res.json({status:HttpCode.SUCCESS,payload:resultSend}); 
          } catch (error) {
               res.json({message:HttpCode.FAILSE});
          }
    })

    return route
}
export default SurveyRoute()