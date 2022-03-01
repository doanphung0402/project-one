import React from 'react';
import { Box, Card, Typography } from '@material-ui/core';

export default function TableSchedule(props) {
    const schedule =props.schedule ; 
   const accept = schedule.accept ; 
   const send_to =schedule.send_to ; 
   let refuse = []; 
    if(accept !== undefined){
      for(let k =0;k<send_to.length;k++){
         let rsFind = accept.find(acceptItem=>{
            return acceptItem === send_to[k]
          })
         if(rsFind===undefined){
            refuse.unshift(send_to[k]); 
         }
       }
    }
   const renderEmailAccept =(accept)=>{
      let xml =""; 
      if(  accept === undefined || accept.length ===0){
           xml ="Hiện chưa có người tham gia sự kiện này !"
      }else{
         let ListAccept=""; 
          accept.map(email=>{
             ListAccept += email +"  ,   "
         })
         xml =ListAccept ; 
      }
      return xml; 
   }
   const renderEmailCancer = (refuse)=>{
       let mess = ""; 
       refuse.map(email=>{
          mess=mess+email+"  ,  "; 
       })
       return mess; 
   }
  return (
     <Card >
        <Box style={{margin:"30px"}} display="flex"> 
              <Typography style={{marginRight:"30px"}} variant="h5">Đồng ý tham gia       :</Typography>
              <Typography style={{marginTop:"8px",marginLeft:"5px",color:"blue"}} variant="subtitle2"> {renderEmailAccept(accept)} </Typography>
        </Box>
        <Box  display="flex" style={{marginTop:"30px" ,margin:"30px"}}> 
             <Typography variant="h5">Những người còn lại :</Typography>
             <Typography style={{marginTop:"8px",marginLeft:"5px",color:"red"}} variant="subtitle2"> {renderEmailCancer(refuse)}  </Typography>
        </Box>
        <Box style={{marginTop:"50px"}}>
            <Typography variant="subtitle1">Số người đồng ý tham gia :{accept.length}/{schedule.send_to.length} </Typography>
        </Box>
     </Card>
  );
}
