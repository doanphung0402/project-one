import express from 'express';
import SignupRouter from './signup'; 
import SigninRouter from './signin'; 
import SurveyRoute from './survey'; 
var router = express.Router();
// router.use(auth) ; 

router.use("/signup",SignupRouter);
router.use("/login",SigninRouter); 
router.use("/survey",SurveyRoute); 


export default router ; 
