import { Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import background1 from '../asset/background1.gif'
import URL from '../Config/URL';
import { login, updateUserInfo } from '../features/auth/authSlice';
const Home = () => {
    const dispath = useDispatch(); 
  const history = useHistory(); 
  
  useEffect(()=>{
      axios({
       url :URL.checkLoginAuth , 
       method : "GET",
       withCredentials: true 
     }).then(data=>{
         console.log("🚀 ~ file: App.js ~ line 62 ~ useEffect ~ data", data)
        
     })
 })
    return (
        <div style={{backgroundImage:`url(${background1})`}}>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
            <Typography variant ="h1">
                this is a home page 
            </Typography>
        </div>
    );
};

export default Home;