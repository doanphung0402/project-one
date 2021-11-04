import { Avatar, Box, Button, Card, Typography } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';

let RandomColor =()=>{
     const color =['orange','yellow','blue','pink','red','green']; 
     let randomColor =  Math.floor(Math.random() * color.length);
     return color[randomColor]; 
}

const ServeyItems = () => {
    return (
            <Button>
            <Card style={{height:"150px",width:"500px" ,border:"1px solid"}}>
                 <Box style={{margin:"5px"}} display="flex" >
                     <Box><Avatar style={{marginRight:"2px",backgroundColor:RandomColor()}}>OP</Avatar></Box>
                     <Box> <Typography variant='subtitle1' style={{marginLeft:"12px",marginTop:"2px"}}>Hop</Typography></Box>
                 </Box>   
                <Box style={{marginTop:"20px",marginLeft:"5px"}} display="flex">
                    <DateRangeIcon/> 
                    <Typography style={{marginLeft:"5px"}} variant="subtitle">3 options</Typography>
                </Box>
                <Box display="flex" style={{marginTop:"20px",marginLeft:"5px"}}>
                  <GroupIcon/>
                   <Typography  style={{marginLeft:"5px"}} variant='subtitle'>2 out of 3 votes </Typography>
                </Box>
                      
             </Card>
            </Button>
    );
};

export default ServeyItems;