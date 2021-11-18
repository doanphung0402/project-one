import mongoose from 'mongoose';
import Url from '../constaint/UrlConnect'; 
mongoose.connect(Url.DbUrl, {
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