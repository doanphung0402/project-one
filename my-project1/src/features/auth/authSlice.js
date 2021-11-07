import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const auth = createSlice({
     name : "authentication", 
     initialState:{
        isAuthenticed: false
     },
     reducers : { 
        login : (state,action) =>{ 
             state.isAuthenticed = true ;
             toast.success("Đăng nhập thành công ")
        }, 
        logout: (state,action)=>{
             state.isAuthenticed = false; 
        }, 
        loginFailse :(state,action)=>{
          console.log(action.payload)
          toast.error(`${action.payload}`) ;
          return state ; 
        },
        signupSuccess:(state,action)=>{
              state.isAuthenticed = true ; 
              toast.success(`${action.payload}`)
        },
      signupFailse :(state,action) =>{ 
           state.isAuthenticed =false ; 
           toast.error(`${action.payload}`)
      }
     }
})

const {actions,reducer} = auth; 
export const {login,logout,loginFailse,signupSuccess,signupFailse} = actions; 
export default reducer ; 
