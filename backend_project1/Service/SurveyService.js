import q, { defer } from "q";
import UserModel from "../models/userModel";
import SurveyModelSend from "../models/surveyModel";
import SurveyModelReceived from "../models/surveyReceivedModel";
import HttpCode from "../helper/HttpCode";
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
/////////////////////////////////
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

//////

export async function updateSurveyChoose(surveyCheck){  //cap nhat db khi nguoi dung chon 1 option
  console.log("🚀 ~ file: SurveyService.js ~ line 82 ~ updateSurveyChoose ~ surveyCheck", surveyCheck)
  const {email_received,option,email_send,id_survey_send} = surveyCheck; 
  let optionUpdate =[]; 
   for (let k =0 ; k<option.length ; k++){
      if(option[k]===true){
          optionUpdate.push(k); 
      }
   }
  console.log("🚀 ~ file: SurveyService.js ~ line 88 ~ optionUpdate ~ optionUpdate", optionUpdate)
  try {
      const surveySend = await SurveyModelSend.findOne({email_user:email_send}); //cap nhat cho nguoi gui
      if(!surveySend) {
            throw error
      }else {
         const survey_send =  surveySend.survey_send;  //array
         let surveySendItem ; 
         let positionSurveySendItem ; 
         for (let i = 0 ;i< survey_send.length; i++){
               if(survey_send[i].id_survey_send === id_survey_send){
                    surveySendItem = survey_send[i]; 
                    positionSurveySendItem = i 
               }
         } 
         const user_voted = surveySendItem.user_voted ; 
      
         let user_voted_exist_index = user_voted.findIndex((data,index)=>{
              return data.email === email_received
         })
         if(user_voted_exist_index === -1){
              user_voted.push({
                   email  : email_received, 
                   option : optionUpdate
             })
         }else{
               user_voted[user_voted_exist_index] = {
                     email : email_received , 
                     option : optionUpdate 
               }
         }
        
         surveySendItem.user_voted = user_voted; 
         survey_send[positionSurveySendItem] = surveySendItem ; 
        
          await SurveyModelSend.updateOne({email_user:email_send},{
               survey_send : survey_send 
         })
      }
      //cap nhan cho nguoi nhan A
       const surveyReceived =await SurveyModelReceived.findOne({
          email_user : email_received 
       }); 
      
       if(surveyReceived){
         const survey_received = surveyReceived.survey_received ; 
         const surveyReceivedItem = survey_received.find((data,index)=>{
                return data.id_survey_send === id_survey_send 
         })
         const positionSurveyReceivedItem = survey_received.findIndex((data,index)=>{
                return data.id_survey_send === id_survey_send 
         })
         surveyReceivedItem.user_voted = optionUpdate ; 
         survey_received[positionSurveyReceivedItem].user_voted =optionUpdate ;
         await SurveyModelReceived.updateOne({
              email_user : email_received
         },{
             survey_received : survey_received   
         })
       }else{
         throw error ; 
       }
  } catch (error) {
     console.log("🚀 ~ file: SurveyService.js ~ line 175 ~ updateSurveyChoose ~ error", error)
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
  let perPage = 5; ///
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
  //lay list survey nhan duoc
  try {
    const userSurveyReceived = await SurveyModelReceived.findOne({
      email_user: email_user,
    });
    const listSurveyReceived = userSurveyReceived.survey_received;
   
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

// export async function getSurveyReceivedById(id_survey_send ,email){
//       try {
//            const SurveyReceived = await SurveyModelReceived.findOne({
//                  email_user : email
//            }); 
//            if(survey_received){
//                  const survey_received = SurveyReceived.survey_received; 
//                  const survey = survey_received.find((data,index)=>{
//                        return  data.id_survey_send = id_survey_send  
//                  })
//                   return survey ; 
//            }else{
//                  throw error 
//            }
//       } catch (error) {
//            return error ; 
//       }
// }
export async function handleCheckSurvey(data){ //thay doi is_check 
  console.log("🚀 ~ file: SurveyService.js ~ line 247 ~ handleCheckSurvey ~ data", data)
  const {status,email,id_survey_send} = data ; 
  try {
    let survey =await SurveyModelReceived.findOne({
      email_user : email 
   })
   if(survey){
      if(survey==null){
         return HttpCode.NOT_FOUND
      }else{
         let survey_received = survey.survey_received; 
         let updateSurveyPosititon =survey_received.findIndex((survey_item)=>{
             return survey_item.id_survey_send === id_survey_send 
          });

         let updateSurvey = survey_received.find((survey_item)=>{
             return survey_item.id_survey_send === id_survey_send 
         })
         updateSurvey.is_check = status ; 
         survey_received[updateSurveyPosititon] = updateSurvey ; 
         const rsUpdate =  await SurveyModelReceived.updateOne({
            email_user : email
         }, {
            survey_received : survey_received
         })
         console.log("🚀 ~ file: SurveyService.js ~ line 271 ~ handleCheckSurvey ~ rsUpdate", rsUpdate)
         return rsUpdate ; 
      }
   }else {
      throw error; 
   }
  } catch (error) {
    return error ; 
  }
}