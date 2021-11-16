import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import {deleteOption} from '../features/ListOption/ListOption'
import { useHistory } from "react-router-dom";
const ListItemOption = (props) => {
    const {option,position} = props; 
    const history =useHistory(); 
    const dispath = useDispatch(); 
    const onDeleteOption = (index) =>{
      dispath(deleteOption(index)); 
  
    }
  return (
    <Fragment>
      <ListItem button>
        <ListItemIcon>{position}</ListItemIcon>
        <ListItemText primary={option} />
        <ListItemIcon>
          <DeleteIcon onClick={()=>onDeleteOption(position-1)}  />
        </ListItemIcon>
      </ListItem>
    </Fragment>
  );
};

export default ListItemOption;
