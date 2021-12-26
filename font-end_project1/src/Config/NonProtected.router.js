import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Redirect ,Route } from 'react-router-dom'
import Cookies from 'universal-cookie';

const NonProtected = ({component: Component,parentComponent:ParentComponent, ...rest}) => {
        return (
            <Route {...rest} render={
                 ()=>{
                         return  (<ParentComponent>
                                     <Component />
                                  </ParentComponent> )

                 
            } }/>
        
   )
};

export default NonProtected;