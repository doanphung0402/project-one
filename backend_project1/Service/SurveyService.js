import q from "q";
import UserModel from '../models/userModel'; 
import SurveyModel from "../models/surveyModel";
export function getAllSurvey(){
     const defer = q.defer(); 
     SurveyModel.find({},(error,data)=>{
          if(!error){
               defer.resolve(data); 
          }else {
               defer.reject(error); 
          }
     })
     return defer.promise; 
}
export function createSurvey(newSurvey){
     const defer = q.defer(); 
     SurveyModel.create(newSurvey,(error,data)=>{
          if(!error){
                defer.resolve(data); 
          }else {
                defer.reject(error)
          }
     })
     return defer.promise; 
}