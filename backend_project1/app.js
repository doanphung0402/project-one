import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import cors from 'cors'
import Url from './constaint/UrlConnect.js';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';
import  './Service/oauth'; 
import session from 'express-session';

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static',express.static(path.join(__dirname,'public')));
app.set('trust proxy', 1); 
app.use(cors({credentials: true , origin: Url.origin}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
app.use(router)
app.listen(3000,(req,res)=>{
    console.log("App is listening in port 3000")
})
