import HttpCode from "../helper/HttpCode";
import CalendarModelReceived from "../models/Calendar/CalendarModelReceived";
import CalendarModelSend from "../models/Calendar/CalendarModelSend";
import SurveyModelSend from "../models/surveyModel";
export async function createDefaultSchedule(email) {
  try {
    await CalendarModelSend.create({
      email_user: email,
      scheduler: [],
    });
    await CalendarModelReceived.create({
      email_user: email,
      scheduler: [],
    });
    return HttpCode.SUCCESS;
  } catch (error) {
    return error;
  }
}
export async function addSchedule(schedule,schedule_survey_send,id_survey_send) {
console.log("🚀 ~ file: ScheduleService.js ~ line 21 ~ addSchedule ~ schedule_survey_send", schedule_survey_send)
 
  const email_user = schedule.email_user;
  const send_to = schedule.scheduler.send_to;
  
  try {
    const SurveySend =  await SurveyModelSend.findOne({
      email_user : email_user
   })
    if(!SurveySend) {
       return error ; 
    }else {
       let survey = SurveySend.survey_send ; 
       const indexSurveyUpdate = survey.findIndex((rs=>{
          return rs.id_survey_send = id_survey_send 
       })); 
       const surveyNeedUpdate = survey[indexSurveyUpdate]; 
    
       
       const schedule_update = {
          option:surveyNeedUpdate.option,
          schedule_survey_send:schedule_survey_send, 
          flag:surveyNeedUpdate.flag, 
          send_to:surveyNeedUpdate.send_to,
          title:surveyNeedUpdate.title, 
          vote_number:surveyNeedUpdate.vote_number, 
          decription:surveyNeedUpdate.decription, 
          note:surveyNeedUpdate.note,
          id_survey_send:surveyNeedUpdate.id_survey_send, 
          schedule_survey:surveyNeedUpdate.schedule_survey, 
          user_voted:surveyNeedUpdate.user_voted 
       }
      survey[indexSurveyUpdate] = schedule_update ;
      console.log("🚀 ~ file: ScheduleService.js ~ line 54 ~ addSchedule ~ survey[indexSurveyUpdate] ", survey[indexSurveyUpdate] )

      await SurveyModelSend.updateOne({
         email_user : email_user 
      },{
        survey_send : survey 
      })

    }
    let rsSend = [];
    if (send_to.length !== 0) {
      for (let k = 0; k < send_to.length; k++) {
        try {
          const rsFindScheduleRecieved = await CalendarModelReceived.findOne({
            email_user: send_to[k],
          });
          if (rsFindScheduleRecieved !== null) {
            const schedule2 = schedule.scheduler;
            const scheduler = {
              id: schedule2.id,
              title: schedule2.title,
              startDate: new Date(schedule2.startDate),
              endDate: new Date(schedule2.endDate),
              allDay: schedule2.allDay,
              notes: schedule2.notes,
              total_number_user_send: schedule2.send_to.length,
              received_to: email_user,
            };

            rsFindScheduleRecieved.scheduler.unshift(scheduler);
            await CalendarModelReceived.updateOne(
              {
                email_user: send_to[k],
              },
              {
                scheduler: rsFindScheduleRecieved.scheduler,
              }
            );
            rsSend.push(true);
          } else {
            rsSend.push(false);
          }
        } catch (error) {
          rsSend.push(false);
        }
      } //end for
    }
    try {
      const scheduleSend = await CalendarModelSend.findOne({
        email_user: email_user,
      });
      const scheduler = scheduleSend.scheduler;
      const x = { ...schedule.scheduler, result_send: rsSend };
      scheduler.push(x);
      await CalendarModelSend.updateOne(
        {
          email_user: email_user,
        },
        {
          scheduler: scheduler,
        }
      );
      return rsSend ; 
    } catch (error) {
      throw error;
    }
  } catch (error) {
    return error;
  }
  
}
export const updateSchedule = async (schedule) => {
  const id = schedule.id;
  const send_to = schedule.send_to;
  const email_user = schedule.email_user;
  try {
    if (send_to.length === 0) {
      const rsFind = await CalendarModelSend.findOne({
        email_user: email_user,
      });
      const scheduler = rsFind.scheduler;
      const indexScheduler = scheduler.findIndex((schedule) => {
        return (schedule.id = id);
      });
      scheduler[indexScheduler] = schedule;
      await CalendarModelSend.updateOne(
        {
          email_user: emai_user,
        },
        {
          scheduler: scheduler,
        }
      );
    } else {
      throw error;
    }
  } catch (error) {
    return error;
  }
};

export async function getAllScheduleSend(email_user) {
  try {
    const schedule = await CalendarModelSend.findOne({
      email_user: email_user,
    });
    return schedule.scheduler; //array
  } catch (error) {
    return error;
  }
}
export async function getAllScheduleReceived(email,page,status) {

  try {
    const schedule = await CalendarModelReceived.findOne({
      email_user: email,
    });
    if (schedule){
     
      return schedule;
    }
  } catch (error) {
    return error;
  }
}
export async function getAllMySchedule(email_user) {
  try {
    const scheduleSend = await CalendarModelSend.findOne({
      email_user: email_user,
    });

    const scheduleReceived = await CalendarModelReceived.findOne({
      email_user: email_user,
    });
    const scheduleReceived1 = scheduleReceived.scheduler.filter((schedule) => {
      return schedule.status === "ACCEPT";
    });
    return [...scheduleSend.scheduler, ...scheduleReceived1];
  } catch (error) {
    return error;
  }
}
export async function changeStatusScheduleRecieved(
  schedule,
  status,
  email_user
) {
  const id = schedule.id;
  const received_to = schedule.received_to;
  try {
    const rsFindScheduleRecieved = await CalendarModelReceived.findOne({
      email_user: email_user,
    });
    if (rsFindScheduleRecieved) {
      const scheduleUpdate = rsFindScheduleRecieved.scheduler.find(
        (schedule) => {
          return schedule.id === id;
        }
      );

      const scheduleUpdateIndex = rsFindScheduleRecieved.scheduler.findIndex(
        (schedule) => {
          return schedule.id === id;
        }
      );

      const scheduleUpdated = {
        title: scheduleUpdate.title,
        status: status,
        total_number_user_send: scheduleUpdate.total_number_user_send,
        id: scheduleUpdate.id,
        startDate: scheduleUpdate.startDate,
        endDate: scheduleUpdate.endDate,
        allDay: scheduleUpdate.allDay,
        notes: scheduleUpdate.notes,
        received_to: scheduleUpdate.received_to,
        create_at: scheduleUpdate.create_at,
      };

      rsFindScheduleRecieved.scheduler[scheduleUpdateIndex] = scheduleUpdated;
      await CalendarModelReceived.updateOne(
        {
          email_user: email_user,
        },
        {
          scheduler: rsFindScheduleRecieved.scheduler,
        }
      );
    }
    const rsFindSendSchedule = await CalendarModelSend.findOne({
      email_user: received_to,
    });
    if (rsFindSendSchedule) {
      const scheduler = rsFindSendSchedule.scheduler;

      const scheduleSendIndex = scheduler.findIndex((schedule) => {
        return schedule.id === id;
      });
      const scheduleSend = scheduler.find((schedule) => {
        return schedule.id === id;
      });
      const scheduleSendUpdate = {
        title: scheduleSend.title,
        startDate: scheduleSend.startDate,
        endDate: scheduleSend.endDate,
        allDay: scheduleSend.allDay,
        id: scheduleSend.id,
        create_at: scheduleSend.create_at,
        notes: scheduleSend.notes,
        send_to: scheduleSend.send_to,
        result_send: scheduleSend.result_send,
        accept: [...scheduleSend.accept, email_user],
      };
      scheduler[scheduleSendIndex] = scheduleSendUpdate;
      await CalendarModelSend.updateOne(
        {
          email_user: received_to,
        },
        {
          scheduler: scheduler,
        }
      );
    } else {
      throw error;
    }
  } catch (error) {
    return error;
  }
}
export async function deleteScheduleById(id, email_user) {
  try {
    const scheduleSendFind = await CalendarModelSend.findOne({
      email_user: email_user,
    });
    const scheduleReceivedFind = await CalendarModelReceived.findOne({
      email_user: email_user,
    });
    if (scheduleSendFind !== null) {
      const scheduleSend = scheduleSendFind.scheduler;
      const updateScheduleSend = scheduleSend.filter((schedule) => {
        return schedule.id !== id;
      });
      await CalendarModelSend.updateOne(
        {
          email_user: email_user,
        },
        {
          scheduler: updateScheduleSend,
        }
      );
    }
    if (scheduleReceivedFind !== null) {
      const scheduleReceived = scheduleReceivedFind.scheduler;

      const updateScheduleReceived = scheduleReceived.filter((schedule) => {
        return schedule.id !== id;
      });

      await CalendarModelReceived.updateOne(
        {
          email_user: email_user,
        },
        {
          scheduler: updateScheduleReceived,
        }
      );
    }
  } catch (error) {
    return error;
  }
}
export async function deleteScheduleReceivedById(id,email){
    try {
        const schedulerReceived = await CalendarModelReceived.findOne({
           email_user : email 
        }); 
        if (schedulerReceived!==null){
           const scheduler = schedulerReceived.scheduler ; 
           const updateSchedule = scheduler.filter(schedule=>schedule.id !== id); 
           await CalendarModelReceived.updateOne({
              email_user : email 
           },{
              scheduler : updateSchedule
           })
        }else{
           throw error ; 
        }
    } catch (error) {
      return error ; 
    }
}