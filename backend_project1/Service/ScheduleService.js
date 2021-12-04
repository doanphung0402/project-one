import CalendarModel from "../models/Calendar/Calendar";
import Calendar from "../routes/Calendar";

 
export function addSchedule(schedule){
     try {
         const email_user = schedule.email_user ; 
         const rsFind =await CalendarModel.find({email_user : email_user}); 
         if (rsFind!=null){
             const scheduler = rsFind.scheduler.push(schedule.schedule); //array
            await CalendarModel.updateOne({
                  email_user: email_user 
             },{ 
                 scheduler : scheduler 
             })
         }else{
             return error ; 
         }
     } catch (error) {
         return error 
     }
}
 