// import GoogleStrategy from 'passport-google-oauth20'
// const GOOGLE_CLIENT_ID = "205049119832-lrduefk5jf1aesavr3e7c1b655dchuua.apps.googleusercontent.com"; 
// const GOOGLE_CLIENT_SECRET ="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"; 


// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3001/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//   console.log("🚀 ~ file: oauth.js ~ line 12 ~ profile", profile)
//     cb(null,profile);
//   }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//      done(null,user); 
//   });