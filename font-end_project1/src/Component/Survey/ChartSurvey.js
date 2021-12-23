import React, { Fragment, useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';

import PieChart, {
    Legend,
    Series,
    Tooltip,
    Format,
    Label,
    Connector,
    Export,
  } from 'devextreme-react/pie-chart';
import { Box, Card, Typography } from "@material-ui/core";
  const customizeTooltip = (arg) => {
    return {
      text: `${arg.valueText} vote`
    }
  }
const ChartSurvey = (props)=>{
    const survey = props.survey ; 
    console.log("🚀 ~ file: ChartSurvey.js ~ line 22 ~ ChartSurvey ~ survey", survey)
    const [optionNumberChoose,setOptionNumberChoose] =useState([]); 
    useEffect (()=>{
        
        let totalVoted =survey.option.map(data=>{
             return 0 ; 
        }); 
        // for(let k =0 ;k<survey.user_voted.length;k++){
        //     const vote = survey.user_voted[k].option -1 ; 
        //     totalVoted[vote] = totalVoted[vote] + 1; 
        // };  
        for (let k =0 ; k < survey.user_voted.length ; k++){
           console.log("🚀 ~ file: ChartSurvey.js ~ line 33 ~ useEffect ~ user_voted", survey.user_voted)
           const option = survey.user_voted[k].option; 
       
           for (let i= 0; i<option.length; i++){
              totalVoted[option[i]] = totalVoted[option[i]]+1; 
           }
        }
        let  optionNumberChoose = totalVoted.map((option,index)=>{
            return  {
                     region: survey.option[index],
                     val: totalVoted[index],
                  }
       })
        console.log("🚀 ~ file: ChartSurvey.js ~ line 55 ~ optionNumberChoose ~ optionNumberChoose", optionNumberChoose)
       setOptionNumberChoose(optionNumberChoose)
    },[])
    return (
      <Box>
        <PieChart
        id="pie"
        type="doughnut"
        title="Thống kê lựa chọn"
        palette="Soft Pastel"
        dataSource={optionNumberChoose} 
      >
        <Series argumentField="region">
          <Label visible={true} format="">
            <Connector visible={true} />
          </Label>
        </Series>
        <Export enabled={true} />
        <Legend
          margin={30}
          horizontalAlignment="right"
          verticalAlignment="top"
        />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
          <Format type="" />
        </Tooltip>
      </PieChart>
      <Box style={{marginTop :"70px",marginRight:"120px"}}>
                  <Typography>Tổng số lựa chọn khảo sát : {survey.option.length}</Typography>
                   <Typography>Số người tham gia :{survey.user_voted.length}</Typography>
              </Box>
      </Box>
    );
  }

  export default ChartSurvey ; 

