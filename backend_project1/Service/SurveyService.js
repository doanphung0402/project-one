import q, { defer } from "q";
import UserModel from "../models/userModel";
import SurveyModelSend from "../models/surveyModel";
export function getAllSurvey() {
  const defer = q.defer();
  SurveyModelSend.find({}, (error, data) => {
    if (!error) {
      defer.resolve(data);
    } else {
      defer.reject(error);
    }
  });
  return defer.promise;
}

export function findSurveyByEmail(email) {
  const defer = q.defer();
  SurveyModelSend.find({ email_user: email }, (error, data) => {
    if (!error) {
      defer.resolve(data);
    } else {
      defer.reject(error);
    }
  });
  return defer.promise;
}

export async function updateUserSendSurvey(newSurvey) {
  try {
    let surveySend = await SurveyModelSend.findOne({
      email_user: newSurvey.email_user
    });
    if (surveySend==null) {
     surveySend = await SurveyModelSend.create({
        email_user: newSurvey.email_user,
        survey_send: [],
      });  
    }
     surveySend.survey_send.push(newSurvey.survey_send);
     const rsCreateSurveySend = await SurveyModelSend.updateOne({email_user:newSurvey.email_user},{
          survey_send: surveySend.survey_send 
    });
    console.log("user_email :"+newSurvey.email_user);
    return rsCreateSurveySend ;
  } catch (error) {
    return error;
  }
}
export async function paginationPage(page, email_user) {
  const defer = q.defer();
  let perPage = 5;
  let totalSurvey;
  SurveyModelSend.find({ email_user: email_user }, (error, data) => {
    if (!error) {
      if(data){
          totalSurvey = data.survey_send.length;
          const totalPage = Math.ceil(totalSurvey/perPage);
          const ListSurveySend = data.survey;
          const startSurvey = perPage*(page-1);
          const currentListSurveySend = ListSurveySend.slice(startSurvey,startSurvey+perPage+1);
          defer.resolve({survey:currentListSurveySend,totalPage:totalPage});       
      } else{
          defer.resolve({survey:[],totalPage:1}); 
      }
    } else {
      defer.reject(error);
    }
  });
  return defer.promise;
}
