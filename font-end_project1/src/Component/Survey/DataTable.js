import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addSurveyChooseSend,addSurveyChooseReceived,cancerSurveyChoose } from '../../features/survey/SurveyChoose';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function DataTable(props) {
  const classes = useStyles();
  const survey = props.survey ; 
   const renderOption =(survey) =>{
      const option =survey.option; 
      const xml = option.map((option,index)=>{
        return  <TableCell key ={index} align="right">{option} &nbsp;</TableCell>
      })
      return xml; 
   }
    const Check = (props) =>{
      const status = props.status ; 
       if(status===true){
        return ( <Checkbox
             defaultChecked
             color="primary"
             inputProps={{ 'aria-label': 'secondary checkbox' }}
        />)
       }else {
        return ( <Checkbox
               color="primary"
               inputProps={{ 'aria-label': 'secondary checkbox' }}
               />)
        }
    }
   const userInfo = useSelector(state=>state.auth.userInfo); 
   const dispath = useDispatch(); 

   useEffect(()=>{
    const option = survey.option ; 
    dispath(cancerSurveyChoose())
    if (survey.send_to){
        for (let k =0 ;k<survey.send_to.length;k++){
          const user = survey.send_to[k]; 
          const email = user ; 
          const optionNumber = survey.user_voted.option; 
          const rs = option.map((optionItem,index)=>{
             if(index+1 === optionNumber){
                return true ; 
             }else{
                return false; 
             }
          })
          console.log("🚀 ~ file: DataTable.js ~ line 59 ~ rs ~ rs", rs)
         const createData = {email :email,resultOption : rs}
         dispath(addSurveyChooseSend(createData))
         console.log("🚀 ~ file: DataTable.js ~ line 62 ~ useEffect ~ createData", createData)
        }  
    }else {
        const emailReceivedTo = userInfo.email ; 
        console.log("🚀 ~ file: DataTable.js ~ line 85 ~ useEffect ~ emailReceivedTo", emailReceivedTo)
        let optionChoose=[]; 
        for (let k =0 ; k< option.length ; k++){
            optionChoose.push(false);    
        }
        const createData = {email:emailReceivedTo,resultOption : optionChoose}; 
        dispath(addSurveyChooseReceived([createData]))
    }
   },[]); 


   const rows = useSelector(state=>state.SurveyChoose.SurveyChoose); 
   console.log("🚀 ~ file: DataTable.js ~ line 80 ~ DataTable ~ rows", rows)


  const showChooseItem =(row)=>{
     const xml = row.resultOption.map((option,index)=>{
      if(option===true){
         return (<TableCell key={index} align="right"> <Check status={true}/> </TableCell>)
      }else{
         return (<TableCell key={index} align="right"> <Check status={false}/> </TableCell>)
      }
     })
     return xml ; 
  }
   const renderShowOption =  (rows)=>{
        const xml = rows.map((row,index)=>{
           return (
            <TableRow key={row.email}>
            <TableCell component="th" scope="row">
                {row.email}
            </TableCell>
             {showChooseItem(row)}
            </TableRow>
           )
        })     
        return xml ;      
    }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            {renderOption(survey)}
          </TableRow>
        </TableHead>
        <TableBody>
           {renderShowOption(rows)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
