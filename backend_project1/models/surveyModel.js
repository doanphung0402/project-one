import mongoose from 'mongoose';
import Url from '../constaint/UrlConnect'; 
mongoose.connect(Url.DbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const surveySchema =new Schema({
      email_user :String  ,
      title:String , 
      options:[String] , 
      voted_number :Number , 
      decription:String,
      received_to :[String], 
      send_to : [String], 
      user_voted :[{email:String,option:Number}], 
      timeout:Date, 
      status:String
},{
    collection :"servey"
}); 
const SurveyModel = mongoose.model("SurveyModel",surveySchema); 

export default SurveyModel ; 