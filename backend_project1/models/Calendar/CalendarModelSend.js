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
               endDate : Date , 
               allDay : Boolean, 
               id : String , 
               create_at: { type: Date, default: Date.now },
               notes : String , 
               send_to :[String], 
               result_send :[Boolean],
               accept : [String],  //true : tham gia , false : khong tham gia  
              
          }
     ]
    
},{
    collection :"CalendarModelSend"
}); 
const CalendarModelSend = mongoose.model("CalendarModelSend",SchedulerSchema); 

export default CalendarModelSend ; 