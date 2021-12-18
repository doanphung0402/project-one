import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import {deleteOption} from '../../features/ListOption/ListOption'
import { useHistory } from "react-router-dom";
import { deleteSurveyScheduleByPosition } from "../../features/Calendar/SurveySchedule";
const ListItemOption = (props) => {
    let flag = props.flag ;  
    const {option,position} = props; 
    const dispath = useDispatch(); 
    const onDeleteOption = (index) =>{
      dispath(deleteOption(index));   
    }
    const onDeleteOptionSchedule =(position)=>{
       dispath(deleteSurveyScheduleByPosition(position))
    }
    const renderListItem =()=>{
      let xml; 
       if(flag===false){
          xml =  (
             <ListItem button>
             <ListItemIcon>{position+1}</ListItemIcon>
             <ListItemText primary={`${option}`} />
            
             <ListItemIcon>
               <DeleteIcon onClick={()=>onDeleteOption(position)}  />
             </ListItemIcon>
             </ListItem> 
          ) 
       }else{
          const {startDate,endDate,day} =  option ; 
         
          const timeSchedule = `${startDate} - ${endDate} \u00A0\u00A0\u00A0\u00A0 ${day}` ; 
          xml = (
            <ListItem button>
            <ListItemIcon>{position+1}</ListItemIcon>
            <ListItemText primary={timeSchedule} />
            <ListItemIcon>
               <DeleteIcon onClick={()=>onDeleteOptionSchedule(position)}  />
            </ListItemIcon>
          </ListItem>
          )
       }
       return xml ; 
    }
  return (
    <Fragment>
       {renderListItem()}
    </Fragment>
  );
};

export default ListItemOption;
