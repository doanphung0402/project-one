import axios from 'axios';
import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import URL from '../../Config/URL';
import { login } from '../../features/auth/authSlice';

const SignInWithGoogle = () => {
   
    const LoginGoogle = ()=>{
        window.open("http://localhost:3000/auth/google","_self");
      }
    return (
        <div>
             <GoogleButton
                 onClick={LoginGoogle}
              />
        </div>
    );
};

export default SignInWithGoogle;