import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost/project1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const serveySchema =new Schema({
      id_user : Number ,
      title:String , 
      options:[String] , 
      voted_number :Number , 
      received_to : String , 
      senn_to : [String], 
      user_voted :[{email : String, option:Number}], 
      timeout:Date, 
},{
    collection :"servey"
}); 
const ServeyModel = mongoose.model("ServeyModel",serveySchema); 

export default ServeyModel ; 