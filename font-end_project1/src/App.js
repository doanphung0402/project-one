import React, { useEffect } from "react";
import "./App.css";
import {Router, Router3,Router1} from "./Constaint/Router";
import DashBoard from "./Container/DashBoard";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./Config/Protected.router";
import {login, updateUserInfo} from './features/auth/authSlice'; 
import { useDispatch } from "react-redux";
import axios from 'axios'
import NonProtected from "./Config/NonProtected.router";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import URL from "./Config/URL";
const renderRouterPageWithoutDB =(Router) =>{
  let xml =null ; 
  xml = Router.map((route,index) =>{
    const Component = route.component; 
    return (<Route key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           render ={()=>{
                              return (<Component/>  )
                           }}
                          />)
  })
  return xml;    
}
const renderRouterPageWithDB =(Router1) =>{
  let xml =null ; 
  xml = Router1.map((route,index) =>{

    return (<ProtectedRoute key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           component={route.component}
                           parentComponent= {DashBoard}
                           />)
  })
  return xml;    
}
const renderRouterPageWithDBNonProtected = (Router3)=>{
   let xml  = null  ; 
   xml =Router3.map((route,index) =>{

    return (<NonProtected key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           component={route.component}
                           parentComponent= {DashBoard}
                           />)
  })
  return xml;    
}
function App() {
  
  // useEffect(()=>{
   
  //    const email = sessionStorage.getItem("email"); 
  //    const first_name = sessionStorage.getItem("first_name"); 
  //    const last_name = sessionStorage.getItem("last_name"); 
  //    const userInfo1 = {
  //       email : email ,
  //       first_name : first_name , 
  //       last_name : last_name, 
  //    }
  //    dispath(updateUserInfo(userInfo1)); 
  //   }); 
  return (
      <div className="App">
         <Switch>
             {renderRouterPageWithDB(Router1)}
             {renderRouterPageWithoutDB(Router)}
             {renderRouterPageWithDBNonProtected(Router3)}
         </Switch>
         
      </div>
  );
}

export default App;
