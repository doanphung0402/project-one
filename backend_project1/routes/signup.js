import express from "express";
import validator from "validator";
import hash_password from "../helper/bcriptPassword";
import HttpCode from "../helper/HttpCode";
import * as AccountService from "../Service/AccountService";
import  * as SurveyService from '../Service/SurveyService'; 
import jwt from "jsonwebtoken";
import SurveyModelReceived from "../models/surveyReceivedModel";
import * as ScheduleService from '../Service/ScheduleService'
function SignupRouter() {
  //SignupService
  var router = express.Router();
  router.post("/", async (req, res) => {
    let user = req.body;
    if (!validator.isEmail(user.email)) {
      res.json({
        message: HttpCode.FAILSE,
        payload: { error: "email không hợp lệ" },
      });
    } else if (user.password.length < 8) {
      res.json({
        message: HttpCode.FAILSE,
        payload: { error: "mật khẩu ít nhất 8 kí tự" },
      });
    } else if (user.password != user.confirm_password) {
      res.json({
        message: HttpCode.FAILSE,
        payload: { error: "mật khẩu không chính xác " },
      });
    }
    let newuser = {
      email: user.email,
    };
    try {
      let result =await AccountService.findAdmin(newuser);  
      if (result != null) {
        res.json({
          message: HttpCode.FAILSE,
          payload: { error: "Account đã tồn tại" },
        });
      } else {
        const userInfo = {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        };
        let createUser = {
         email: user.email,
         password: hash_password(user.password),
         first_name: user.first_name,
         last_name: user.last_name,
       };
        const data =await AccountService.createAdmin(createUser);
        await SurveyService.createDefaultSendSurvey(userInfo.email); 
        await SurveyService.createDefaultReceivedSurvey(userInfo.email); 
        await ScheduleService.createDefaultSchedule(userInfo.email);
        const token =await jwt.sign(
          {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
          },
          "ak47",
          { expiresIn: "1h" }
        );
        res.json({
          message: HttpCode.SUCCESS,
          payload: { token: token, userInfo },
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: HttpCode.FAILSE,
        payload: { error: "Lỗi hệ thống , vui lòng thử lại" },
      });
    }
  });
  return router;
}
export default SignupRouter();
