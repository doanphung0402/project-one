import q, { defer } from "q";
import UserModel from "../models/userModel";
import SurveyModelSend from "../models/surveyModel";
import SurveyModelReceived from "../models/surveyReceivedModel";
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

export async function updateUserReceivedSurvey(ListUserSend, surveySend) {
  let surveyReceived;
  let resultFindEmail = [];
  try {
    for (let k1 = 0; k1 < ListUserSend.length; k1++) {
      surveyReceived = await SurveyModelReceived.findOne({
        email_user: ListUserSend[k1],
      });
      if (!surveyReceived) {
        resultFindEmail.push(false);
      } else {
        surveyReceived.survey_received.unshift(surveySend);
        await SurveyModelReceived.updateOne(
          { email_user: ListUserSend[k1] },
          {
            survey_received: surveyReceived.survey_received,
          }
        );
        resultFindEmail.push(true);
      }
    }
  } catch (error) {
    return error;
  }
  return resultFindEmail;
}

export async function updateUserSendSurvey(newSurvey) {
  //update khao sat gui di vao csdl nguoi gui
  try {
    let surveySend = await SurveyModelSend.findOne({
      email_user: newSurvey.email_user,
    });
    if (!surveySend) {
      return error;
    }

    surveySend.survey_send.unshift(newSurvey.survey_send);
    await SurveyModelSend.updateOne(
      { email_user: newSurvey.email_user },
      {
        survey_send: surveySend.survey_send,
      }
    );
  } catch (error) {
    return error;
  }
}
export async function createDefaultReceivedSurvey(email_user) {
  try {
    const rscreateDefaultReceivedSurvey = await SurveyModelSend.create({
      email_user: email_user,
      survey_received: [],
    });
    return rscreateDefaultReceivedSurvey;
  } catch (error) {
    return error;
  }
}
export async function createDefaultSendSurvey(email_user) {
  try {
    const rsCreateDefaultSendSurvey = await SurveyModelReceived.create({
      email_user: email_user,
      survey_send: [],
    });
    return rsCreateDefaultSendSurvey;
  } catch (error) {
    return error;
  }
}

export async function paginationPage(page,email_user,status) {
console.log("🚀 ~ file: SurveyService.js ~ line 101 ~ paginationPage ~ page", page)
console.log("🚀 ~ file: SurveyService.js ~ line 101 ~ paginationPage ~ status", status)
console.log("🚀 ~ file: SurveyService.js ~ line 101 ~ paginationPage ~ email_user", email_user)
 
  let perPage = 5;
  let totalSurvey;
  try {
       let data ; 
       if (status ==="SEND"){ 
               let rs =  await SurveyModelSend.findOne({
                  email_user: email_user,
             });
             data = rs.survey_send ; 
       }else if (status === "RECEIVED"){
            let rs1= await SurveyModelReceived.findOne({
               email_user: email_user,
             });
             data = rs1.survey_received ; 
       }else{
             throw error ; 
       }
    if (data) {
    
      totalSurvey = data.length;
      const totalPage = Math.ceil(totalSurvey / perPage);
      const ListSurvey = data;
      const startSurvey = perPage * (page - 1);
      const currentListSurvey = ListSurvey.slice(
        startSurvey,
        startSurvey + perPage
      );
      return { survey: currentListSurvey, totalPage: totalPage };
    } else {
      return { survey: [], totalPage: 1 };
    }
  } catch (error) {
    return error;
  }
}
export async function getSurveyReceived(email_user) {
  //lay survey nhan duoc
  try {
    const userSurveyReceived = await SurveyModelReceived.findOne({
      email_user: email_user,
    });
    const listSurveyReceived = userSurveyReceived.survey_received;
    console.log(
      "🚀 ~ file: SurveyService.js ~ line 126 ~ getSurveyReceived ~ listSurveyReceived",
      listSurveyReceived
    );
    return listSurveyReceived;
  } catch (error) {
    return error;
  }
}
export async function getSurveySend(email_user) {
     try {
          const userSurveyReceived = await SurveyModelSend.findOne({
            email_user: email_user,
          });
          const listSurveySend = userSurveyReceived.survey_send;
          return listSurveySend;
        } catch (error) {
          return error;
        }
}

export async function voteOptionSurveyReceived(){
      
}