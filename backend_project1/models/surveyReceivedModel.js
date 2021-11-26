import mongoose from 'mongoose';
import Url from '../constaint/UrlConnect'; 
mongoose.connect(Url.DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const surveySchema =new Schema({
      email_user :String  ,
      survey_received : [{
      title:String , 
      option:[String] , 
      vote_number :Number ,    //so luong nguoi da vote 
      note :String , 
      decription:String,
      received_to :String,
      id_survey_send : String , 
      user_voted :{type : Number , default : 0} , //option chon 
      create_at: { type: Date, default: Date.now },
      is_check : {type:Boolean,default : false} //kiem tra da xem chua 
      }]
},{
    collection : "survey_received"
}); 
const SurveyModelReceived = mongoose.model("SurveyModelReceived",surveySchema); 

export default SurveyModelReceived ; 