import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Redirect ,Route } from 'react-router-dom'
import Cookies from 'universal-cookie';
export const ProtectedRoute = ({component: Component,parentComponent:ParentComponent, ...rest}) => {
    const cookies= new Cookies(); 
    const token = cookies.get("user")
    useEffect(()=>{
         
    })
     return (
          <Route {...rest} render={
               (routeProps)=>{
                   if(1===1 ){
                       return  (<ParentComponent>
                                   <Component {...routeProps} />
                                </ParentComponent> )
                   }
                   else{
                       return <Redirect to ="/login" />
                   }
               }
          }/>
     )
}