import mongoose from 'mongoose';
import Url from '../constaint/UrlConnect'; 
mongoose.connect(Url.DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const SchedulerSchema =new Schema({
     email_user : String, 
     scheduler : [
          {
               title : {type:String , default : "Không có tiêu đề "} , 
               startDate : Date, 
               endDate : Date , 
               allDay : Boolean, 
               id : String,
               notes : String
          }
     ]
    
},{
    collection :"CalendarModel"
}); 
const CalendarModelReceived = mongoose.model("CalendarModel",SchedulerSchema); 

export default CalendarModel; 