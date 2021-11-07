import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost/project1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Schema } = mongoose;

const bookingSchema =new Schema({
    id_user:String , 
    title:String , 
    decription : String , 
    location:String , 
    period : Number , 
    time_start:Date , 
    sendto :[String], 
    receivedfrom:[String]
    
},{
    collection :"booking"
}); 
const BookingModel = mongoose.model("bookingModel",bookingSchema); 

export default BookingModel ; 