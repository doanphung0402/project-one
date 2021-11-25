import { createSlice } from "@reduxjs/toolkit";

const SurveyAfterChoose = createSlice({
  name: "SurveyAfterChoose",
  initialState: {
    SurveyAfterChoose : {},
  },
  reducers: {
     addSurveyAfterChoose: (state,action)=>{
          state.SurveyAfterChoose = action.payload 
     }
  },
});

const { actions, reducer } = SurveyAfterChoose;
export const { addSurveyAfterChoose} = actions;
export default reducer;
