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
      voted_number :Number , 
      decription:String,
      received_to :[{email:String,option:Number}],
      user_voted :[{email:String,option:Number}], 
      }]
},{
    collection : "survey_received"
}); 
const SurveyModelReceived = mongoose.model("SurveyModelReceived",surveySchema); 

export default SurveyModelReceived ; 