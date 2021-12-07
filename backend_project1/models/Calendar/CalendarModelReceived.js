import mongoose from 'mongoose';
import Url from '../../constaint/UrlConnect'; 
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
               received_to :String , 
               status : Boolean,   // true or false : dong y || tu choi cuoc hen
               endDate : Date , 
               allDay : Boolean, 
               id : String,
               notes : String , 
               create_at: { type: Date, default: Date.now },    
               total_number_user_send : Number 
          }
     ]
    
},{
    collection :"CalendarModelReceived"
}); 
const CalendarModelReceived = mongoose.model("CalendarModelReceived",SchedulerSchema); 

export default CalendarModelReceived ; 