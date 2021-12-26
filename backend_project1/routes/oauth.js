import express from "express";
import jwt from 'jsonwebtoken'
import passport from "passport";
const oauth = () => {
  
  const route = express.Router();
  route.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

  
  route.get("/login/success", (req, res) => {
   
    console.log("🚀 ~ file: oauth.js ~ line 63 ~ route.get ~  req.user",  req.session.user)
    // res.redirect("http://localhost:3001/home")
  
  });
  route.get("/login/failse", (req, res) => {
    res.json(401).json("Đăng nhập thất bại , Thử lại !");
  });

  route.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:3001/home",
      failureRedirect: "http://localhost:3000/auth/login/failse",
    }),(req,res)=>{
       req.session.user = req.user ; 
    }
  );


  return route;
};
export default oauth();















//    route.route('/google/callback').get(passport.authenticate('google', {
//     failureRedirect: "http://localhost:3000/auth/login/failse",
//     successRedirect: "http://localhost:3001/home",
// }), function(req, res) {
//      console.log("🚀 ~ file: oauth.js ~ line 28 ~ route.route ~ req.user", req.user)
//     if (req.user !==null) {
//       const userInfo = req.user; 
     
//       console.log("🚀 ~ file: oauth.js ~ line 12 ~ route.get ~ userInfo", userInfo)
   
//       const {name,emails} = userInfo ; 
//       const first_name = name.givenName ; 
//       const last_name = name.familyName; 
//       const email = emails[0].value ; 
//       const user =  {
//         email : email , 
//         first_name:first_name, 
//         last_name:last_name
//       };
//       console.log("🚀 ~ file: oauth.js ~ line 22 ~ route.get ~ user", user)
//       const rs =  jwt.sign(
//         {
//             email : email , 
//             first_name:first_name, 
//             last_name:last_name
//         },
//         "ak47",{ expiresIn: '1h' } ) 
//       console.log("🚀 ~ file: oauth.js ~ line 29 ~ route.get ~ rs", rs)
//         if(!rs){
//           res.status(404).json("Failse")
//        }else {
//           res.status(200).json({token:rs,userInfo:user})
     
//        }
//     }
   
// });
