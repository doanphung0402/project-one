import React from 'react';
import loading from  '../../asset/loading.gif'
import { styleLoading } from './styleLoading'
import { withStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

const GlobalLoading =(props)=> {
    const Loading = useSelector(state=>state.Loading.statusLoading)
    const {classes} = props; 
     const showLoading =()=>{
        let xml = null; 
        if(Loading === true) {
             xml = (
                <div className={classes.backgroundLoading}>
                   <img src={loading} className={classes.imageLoading} alt="loading"  />
                </div>
             )          
        }else {
             xml =null; 
        }
        return xml ;
    }
 
        return (
           <Fragment>
               {showLoading()}
           </Fragment>
        );
}
export default (withStyles(styleLoading)(GlobalLoading));