import express from 'express'; 
import HttpCode from '../helper/HttpCode';
import * as SurveyService from '../Service/SurveyService'; 
function SurveyRoute(){
    const route = express.Router(); 
    route.get("/get-survey",(req,res)=>{
        const page = req.query.page; 
        const paginationPage = SurveyService.paginationPage(page); 
        paginationPage.then(data=>{
           res.json({message:HttpCode.SUCCESS,payload:{data}}); 
        }).catch(error=>{
          console.log("error survey:"+error)
          res.json({message:HttpCode.ERROR}); 
        })
    });
    
    route.post("/create-send-survey",(req,res)=>{
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
         const rs =  SurveyService.updateUserSendSurvey(surveySend); 
         rs.then(data=>{
             console.log(data);
             res.json({status:HttpCode.SUCCESS});           
         }).catch(error=>{
          res.json({message:HttpCode.FAILSE})
         })
    })

    return route
}
export default SurveyRoute()