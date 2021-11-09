import  express from 'express';
import validator from 'validator';
import hash_password from '../helper/bcriptPassword';
import HttpCode from '../helper/HttpCode';
import * as AccountService from "../Service/AccountService"
import jwt from 'jsonwebtoken'
 function SignupRouter(){  //SignupService
  var router = express.Router();
  router.post("/",async(req,res)=>{
   let user = req.body ; 
   if (!validator.isEmail(user.email)){
      res.json({message:HttpCode.FAILSE,payload: {error :"email không hợp lệ"}})
   }else if(user.password.length <8){
      res.json({ message:HttpCode.FAILSE ,payload: {error:"mật khẩu ít nhất 8 kí tự"}})
   }else if(user.password != user.confirm_password) {
      res.json({ message:HttpCode.FAILSE ,payload: {error:"mật khẩu không chính xác "}})
   }
   let newuser = {
       email:user.email, 
   }
    let createUser = {
         email : user.email , 
         password:hash_password(user.password), 
         first_name:user.first_name,
         last_name :user.last_name
    } 
   let  result = AccountService.findAdmin(newuser); 
   result.then(data =>{
       if(data !=null){
         res.json({message:HttpCode.FAILSE,payload:{error:"Account đã tồn tại"}}) 
       }else{
            AccountService.createAdmin(createUser).then(data =>{
               jwt.sign(
                  {
                      email : data.email , 
                      first_name:data.first_name, 
                      last_name:data.last_name
                  },
                  "ak47",{ expiresIn: '1h' } ,(error,token)=>{
                      if(error){
                         console.log("error token :"+error)
                        res.json({message:HttpCode.FAILSE,payload:{error:"Lỗi hệ thống , vui lòng thử lại"}})
                      }else {
                        res.json({message:HttpCode.SUCCESS,payload:{token:token}}); 
                      }
                  }
                )
            }).catch(error=>{
                console.log("error:",error); 
                res.json({message:HttpCode.FAILSE,payload:{error:"Lỗi hệ thống , vui lòng thử lại"}})
            })
          }
   }).catch(error=>{
      res.json({message:HttpCode.FAILSE,payload:{error:"Lỗi hệ thống , vui lòng thử lại"}}) 
   })
})
  return router
}

export default SignupRouter(); 

