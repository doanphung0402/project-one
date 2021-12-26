import express from "express";
import  bcrypt from 'bcrypt'
import * as AccountService from '../Service/AccountService'
import { withCookies, Cookies } from "react-cookie";
import HttpCode from "../helper/HttpCode";
import UserModel from "../models/userModel";
import jwt from 'jsonwebtoken'; 

function SigninRouter() {
  const router = express.Router();    
    router.post("/", async (req, res) => {
      const user = req.body; 
      const email = {email : user.email}
      const result = AccountService.findAdmin(email); 
      result.then(data =>{
            if(data==null){
                  res.json({message:HttpCode.FAILSE,payload:{error:"Email không tồn tại!..."}})
            }else{
               const userInfo =   {
                  email : data.email , 
                  first_name:data.first_name, 
                  last_name:data.last_name
             };
               bcrypt.compare(user.password,data.password,function(err, result) {
                    if(result ==true){
                        jwt.sign(
                              {
                                  email : data.email , 
                                  first_name:data.first_name, 
                                  last_name:data.last_name
                              },
                              "ak47",{ expiresIn: '1h' } ,(error,token)=>{
                                  if(error){
                                    res.json({message:HttpCode.FAILSE,payload:{error:"Lỗi hệ thống , vui lòng thử lại"}})
                                  }else {
                                    res.json({message:HttpCode.SUCCESS,payload:{token:token,userInfo:userInfo}}); 
                                  }
                              }
                            )
                    }else{
                        res.json({message:HttpCode.FAILSE,payload:{error:"Mật khẩu sai ,Thử lại "}})
                    }
                });
            }
      }).catch(error =>{
            res.json({message:HttpCode.FAILSE,payload:{error:"Lỗi hệ thống , vui lòng thử lại "}})
      })
  })
    
  return router;
}
export default SigninRouter();
