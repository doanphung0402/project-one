import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { deleteUserSend } from "../../features/UserToSend/UserToSend";
const ListUserItem = (props) => {
    const {option,position} = props; 
    const dispath = useDispatch(); 
    const deleteUserItemOption = (index) =>{
      dispath((deleteUserSend(index)));    
    }
    const  onChangeSurvey = (event)=>{
        
    }
  return (
    <Fragment>
      <ListItem button>
        <ListItemIcon>{position+1}</ListItemIcon>
        <ListItemText primary={option} onChange={onChangeSurvey}/>
        <ListItemIcon>
          <DeleteIcon onClick={()=>deleteUserItemOption(position)}  />
        </ListItemIcon>
      </ListItem>
    </Fragment>
  );
};

export default ListUserItem;
