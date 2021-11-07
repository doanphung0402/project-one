import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import cors from 'cors'
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname,'public')));
app.set('trust proxy', 1); 
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(router)

app.listen(3000,(req,res)=>{
    console.log("App is listening in port 3000")
})
