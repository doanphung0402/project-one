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
        surveyReceived.survey_received.push(surveySend);
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
  console.log(
    "🚀 ~ file: SurveyService.js ~ line 69 ~ updateUserReceivedSurvey ~ resultFindEmail",
    resultFindEmail
  );
  return resultFindEmail ; 
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

    surveySend.survey_send.push(newSurvey.survey_send);
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

export async function paginationPage(page, email_user) {
  let perPage = 2;
  let totalSurvey;
  try {
    const data = await SurveyModelSend.findOne({ email_user: email_user });
    if (data) {
      totalSurvey = data.survey_send.length;
      const totalPage = Math.ceil(totalSurvey / perPage);
      const ListSurveySend = data.survey_send;
      const startSurvey = perPage * (page - 1);
      const currentListSurveySend = ListSurveySend.slice(
        startSurvey,
        startSurvey + perPage + 1
      );
      return { survey: currentListSurveySend, totalPage: totalPage };
    } else {
      return { survey: [], totalPage: 1 };
    }
  } catch (error) {
    return error;
  }
}
