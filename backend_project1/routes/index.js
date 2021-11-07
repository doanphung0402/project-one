import express from 'express';
import SignupRouter from './signup'; 
import SigninRouter from './signin'; 
var router = express.Router();
// router.use(auth) ; 

router.use("/signup",SignupRouter);
router.use("/login",SigninRouter); 
router.get("/home",(req,res)=>{
    
}); 

export default router ; 
