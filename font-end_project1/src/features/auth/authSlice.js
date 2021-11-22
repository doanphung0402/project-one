import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const auth = createSlice({
     name : "authentication", 
     initialState:{
        isAuthenticed: false, 
        userInfo :{}
     },
     reducers : { 
        login : (state,action) =>{ 
             state.isAuthenticed = true ;
             state.userInfo = action.payload; 
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
              state.userInfo = action.payload; 
              toast.success("Tạo thành công!"); 
        },
          signupFailse :(state,action) =>{ 
               state.isAuthenticed =false ; 
               toast.error(`${action.payload}`)
          }, 
      updateUserInfo :(state,action)=>{
            state.userInfo = action.payload ; 
      }
     }
})

const {actions,reducer} = auth; 
export const {login,logout,loginFailse,signupSuccess,signupFailse,updateUserInfo} = actions; 
export default reducer ; 
