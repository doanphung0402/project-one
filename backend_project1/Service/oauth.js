import GoogleStrategy from 'passport-google-oauth20'; 
import passport from 'passport';
const GOOGLE_CLIENT_ID = "205049119832-lrduefk5jf1aesavr3e7c1b655dchuua.apps.googleusercontent.com"; 
const GOOGLE_CLIENT_SECRET ="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"; 


passport.use(new GoogleStrategy.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",

  },
  function(accessToken, refreshToken, profile, cb) {
    cb(null,profile);
  }
));

passport.serializeUser(function(profile, done) {
    done(null, profile);
  });
  
passport.deserializeUser(function(profile, done) {
     done(null,profile); 
  });

