import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost/project1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const userSchema =new Schema({
     email : String ,
     password : String ,
     first_name:String , 
     last_name :String 
},{
    collection :"user"
}); 
const UserModel = mongoose.model("UserModel",userSchema); 

export default UserModel ; 