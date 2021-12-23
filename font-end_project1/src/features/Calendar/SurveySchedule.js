import { createSlice } from "@reduxjs/toolkit";
const SurveySchedule  = createSlice({
  name: "SurveySchedule",
  initialState: {
    ListSurveySchedule : [],
  },
  reducers: {
    addListSurveySchedule : (state,action)=>{
          state.ListSurveySchedule.push(action.payload) ; 
     }, 
     deleteSurveyScheduleByPosition :(state,action)=>{
        const position = action.payload ; 
        state.ListSurveySchedule = state.ListSurveySchedule.filter((schedule,index)=>index !== position)
     }, 
     deleteAllSchedule :(state,action)=>{ 
       state.ListSurveySchedule =[]; 
     }
  },
});

const { actions, reducer } = SurveySchedule;
export const { addListSurveySchedule,deleteSurveyScheduleByPosition,deleteAllSchedule}  = actions;
export default reducer;
