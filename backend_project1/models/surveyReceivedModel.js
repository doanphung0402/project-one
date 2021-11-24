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
      vote_number :Number , 
      note :String , 
      decription:String,
      received_to :String,
      user_voted :[{email:String,option:Number}], 
      create_at: { type: Date, default: Date.now },
      }]
},{
    collection : "survey_received"
}); 
const SurveyModelReceived = mongoose.model("SurveyModelReceived",surveySchema); 

export default SurveyModelReceived ; 