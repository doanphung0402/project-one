import express from "express";
import jwt from 'jsonwebtoken'
function auth() {
    const router = express.Router();
    router.use(async(req, res, next) => {
        try {
          const cookies = req.cookies.user;
          const result = jwt.verify(cookies, "ak47");
          if (result) {
            next();
          }
        } catch (error) {
              res.json({message:HttpCode.FAILSE})
        }
      });
   return router ; 
}
export default auth ; 