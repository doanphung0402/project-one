import express from "express";
import jwt from 'jsonwebtoken'
import HttpCode from "../helper/HttpCode";
const auth =  () =>  {
    const router1 = express.Router();
    router1.use((req, res , next) => {
      const body = req.body ; 
      const user = req.user ; 
      try {
        const cookies = req.body.cookies ;
        console.log("🚀 ~ file: auth.js ~ line 13 ~ router1.use ~ cookies", cookies)
        jwt.verify(cookies, "ak47");
        next()
      } catch (error) {
           res.status(501).json("FAILSE"); 
      }
    });
   return router1 ; 
}
export default auth() ; 