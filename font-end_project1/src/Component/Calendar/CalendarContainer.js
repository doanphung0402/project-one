import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Calendar from './Calendar';
const CalendarContainer = () => {
    return (
        <>
          <Grid container>
             <Grid xs={12}>
                <Box>
                  <Box>
                    <Typography variant ="h4" style={{textAlign:"center",marginBottom:"30px"}}>
                        Công việc của bạn     
                    </Typography>    
                  <Box>
                      <Calendar/>
                  </Box>
                  </Box> 
                </Box>
             </Grid>
          </Grid>
        </>
    );
};

export default CalendarContainer;