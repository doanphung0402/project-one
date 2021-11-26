import mongoose from 'mongoose';
import Url from '../constaint/UrlConnect'; 
mongoose.connect(Url.DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const surveySchema =new Schema({
      email_user :String  ,
      survey_send : [{
        title:String , 
        option:[String] , 
        vote_number :Number ,   
        decription:String,
        send_to : [String], 
        note :String,
        user_voted :[{email:String,option:Number}], 
        create_at: { type: Date, default: Date.now },
        id_survey_send : String , 
      }]
},{
    collection : "survey_send"
}); 
const SurveyModelSend = mongoose.model("SurveyModelSend",surveySchema); 

export default SurveyModelSend ; 