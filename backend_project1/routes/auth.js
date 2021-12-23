import express from "express";
import jwt from 'jsonwebtoken'
import HttpCode from "../helper/HttpCode";
const auth =  () =>  {
    const router1 = express.Router();
    router1.use((req, res , next) => {
      console.log("hello"); 
      const body = req.body ; 
      const cookies = req.body.cookies;
      try {
        const cookies = req.body.cookies;
        const result = jwt.verify(cookies, "ak47");
        if (result) {
          next();
        }
      } catch (error) {
            res.json({message:HttpCode.FAILSE})
      }
    });
   return router1 ; 
}
export default auth() ; 