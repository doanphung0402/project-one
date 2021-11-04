import React from "react";
import "./App.css";
import {Router} from "./Constaint/Router";
import DashBoard from "./Container/DashBoard";
import { Switch } from "react-router-dom";
import { Router1 } from "./Constaint/Router";
import { Route } from "react-router-dom";
const renderRouterPageWithoutDB =(Router) =>{
  let xml =null ; 
  xml = Router.map((route,index) =>{
    const YourComponent = route.component ; 
    return (<Route key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           render={()=>{
                              return <YourComponent/>
                           }}
                           />)
  })
  return xml;    
}
const renderRouterPageWithDB =(Router1) =>{
  let xml =null ; 
  xml = Router1.map((route,index) =>{
    const YourComponent1 = route.component ; 
    return (<Route key ={index} 
                           path={route.path}
                           exact= {route.exact}
                           render={()=>{
                              return <DashBoard><YourComponent1/></DashBoard>
                           }}
                           />)
  })
  return xml;    
}
function App() {
  return (
      <div className="App">
         <Switch>
             {renderRouterPageWithDB(Router1)}
             {renderRouterPageWithoutDB(Router)}
         </Switch>
      </div>
  );
}

export default App;
