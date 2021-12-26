import express from "express";
import jwt from 'jsonwebtoken'
import HttpCode from "../helper/HttpCode";
const auth =  () =>  {
    const router1 = express.Router();
    router1.use((req, res , next) => {
      console.log("hello"); 
      const body = req.body ; 
      const user = req.user ; 
      console.log("🚀 ~ file: auth.js ~ line 10 ~ router1.use ~ user", user)
      const cookies = req.body.cookies;
      try {
        const cookies = req.body.cookies;
        const result = jwt.verify(cookies, "ak47");
        if (result) {
          next();
        }
      } catch (error) {
           res.status(404).json("FAILSE"); 
      }
    });
   return router1 ; 
}
export default auth() ; 