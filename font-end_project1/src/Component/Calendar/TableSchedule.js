import React from 'react';
import { Box, Card, Typography } from '@material-ui/core';

export default function TableSchedule(props) {
    const schedule =props.schedule ; 
   const accept = schedule.accept ; 
   const send_to =schedule.send_to ; 
   let refuse = []; 
   for(let k =0;k<send_to.length;k++){
     let rsFind = accept.find(acceptItem=>{
        return acceptItem === send_to[k]
      })
     if(rsFind===null){
        refuse.push(send_to[k]); 
     }
   }
   const renderEmailAccept =(accept)=>{
      let xml =""; 
      if(accept.length ===0){
           xml ="Hiện chưa có người tham gia sự kiện này !"
      }else{
         xml = accept ; 
      }
      return xml; 
   }
  return (
     <Card>
        <Box display="flex"> 
              <Typography style={{marginRight:"30px"}} variant="h5">Đồng ý tham gia       :</Typography>
              <Typography style={{marginTop:"8px",marginLeft:"5px",color:"blue"}} variant="subtitle2"> {renderEmailAccept(accept)} </Typography>
        </Box>
        <Box display="flex" style={{marginTop:"30px"}}> 
             <Typography variant="h5">Những người còn lại :</Typography>
             <Typography style={{marginTop:"8px",marginLeft:"5px",color:"red"}} variant="subtitle2"> {refuse}  </Typography>
        </Box>
        <Box style={{marginTop:"50px"}}>
            <Typography variant="subtitle1">Tổng người đã gửi :{schedule.send_to.length} </Typography>
        </Box>
     </Card>
  );
}
