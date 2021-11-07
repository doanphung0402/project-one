import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect ,Route } from 'react-router-dom'
import Cookies from 'universal-cookie';
export const ProtectedRoute = ({component: Component,parentComponent:ParentComponent, ...rest}) => {
    const isAuth = useSelector(state=>state.auth.isAuthenticed) 
    const cookies= new Cookies(); 
    const token = cookies.get("user")
     return (
          <Route {...rest} render={
               (routeProps)=>{
                   if(isAuth===true || token ){
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