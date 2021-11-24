import { createSlice } from "@reduxjs/toolkit";

const SurveyChoose = createSlice({
  name: "ListSurvey",
  initialState: {
    SurveyChoose : [],
  },
  reducers: {
     addSurveyChooseSend : (state,action)=>{
          state.SurveyChoose.push(action.payload); 
     },
     addSurveyChooseReceived :(state,action)=>{
          state.SurveyChoose = action.payload ; 
     }, 
     cancerSurveyChoose :(state,action)=>{
         state.SurveyChoose =[];
     }
  },
});

const { actions, reducer } = SurveyChoose;
export const { addSurveyChooseSend,addSurveyChooseReceived,cancerSurveyChoose} = actions;
export default reducer;
