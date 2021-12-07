import HttpCode from "../helper/HttpCode";
import CalendarModelReceived from "../models/Calendar/CalendarModelReceived";
import CalendarModelSend from "../models/Calendar/CalendarModelSend";
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
export async function addSchedule(schedule) {
  try {
    const email_user = schedule.email_user ;
    const send_to = schedule.scheduler.send_to ;
    let rsSend =[]; 
    if (send_to.length !== 0) {
       for(let k =0 ; k<send_to.length ; k++){
        try {
          const rsFindScheduleRecieved = CalendarModelReceived.findOne({
            email_user: email,
          });
          if (rsFindScheduleRecieved) {
            const schedule2 = schedule.scheduler;
            const scheduler = {
              id: schedule2.id,
              title: schedule2.title,
              startDate: new Date(schedule2.startDate),
              endDate: new Date( schedule2.endDate),
              allDay: schedule2.allDay,
              notes: schedule2.notes,
              total_number_user_send: schedule2.send_to.length,
            };
            await CalendarModelReceived.updateOne(
              {
                email_user: email_user,
              },
              {
                scheduler: schedule2.scheduler.push(scheduler),
              }
            );
            rsSend.push(true);
          } else {
            rsSend.push(false);
          }
        } catch (error) {
            rsSend.push(false);
        }
      }
    }; //end map
      try {
        const scheduleSend = await CalendarModelSend.findOne({
          email_user: email_user,
        });
        const scheduler = scheduleSend.scheduler;
        const x ={...schedule.scheduler, result_send: rsSend }
        scheduler.push(x);
        await CalendarModelSend.updateOne(
          {
            email_user: email_user
          },
          {
            scheduler: scheduler
          }
        );
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
      email_user: email_user
    });
    console.log("🚀 ~ file: ScheduleService.js ~ line 116 ~ getAllScheduleSend ~ schedule", schedule)
    return schedule.scheduler; //array
  } catch (error) {
    return error;
  }
}
