import express from 'express';
import SignupRouter from './signup'; 
import SigninRouter from './signin'; 
import SurveyRoute from './survey'; 
import CalendarRoute from './Calendar'; 

import auth from './auth';
import './oauth'; 
var router = express.Router();
router.use("/signup",SignupRouter);
router.use("/login",SigninRouter); 

router.use(auth) ; 


router.use("/survey",SurveyRoute); 
router.use("/scheduler",CalendarRoute);










export default router ; 
