import q from "q";
import UserModel from '../models/userModel'
export function findAdmin(user) {   
    const defer = q.defer();  
    UserModel.findOne(user,(error,data) =>{ 
       if(!error){ 
         defer.resolve(data); 
       }else{ 
         defer.reject(error)
       }
     })
      return defer.promise; 
 }
      
export function createAdmin(user){
   const deferCreate =q.defer(); 
   UserModel.create(user,(error,data)=>{
      if(!error){
         deferCreate.resolve(data);
      }else{
         deferCreate.reject(error); 
      }
   })
   return deferCreate.promise; 
}