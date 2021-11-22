import { createSlice } from "@reduxjs/toolkit";

const SurveyInfo = createSlice({
     name : "SurveyOption ", 
     initialState: {
        SurveyInfo:{
           title:"", 
           decription:"", 
           note :""
        }, 
     },
     reducers : {      
      addSurveyInfo :(state,action) =>{ 
         state.SurveyInfo = action.payload; 
      }, 
      deleteAllSurveyInfo :(state,action) =>{
          state.SurveyInfo = {
             title:"", 
             decription:"", 
             note : ""
          }
      }
     }
})

const {actions,reducer} = SurveyInfo; 
export const {addSurveyInfo,deleteAllSurveyInfo} = actions; 
export default reducer ; 
