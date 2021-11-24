import { createSlice } from "@reduxjs/toolkit";

const DetailSurvey = createSlice({
  name: "ListSurvey",
  initialState: {
    DetailSurvey: {},
  },
  reducers: {
      addSurveyDetail : (state,action)=>{
          state.DetailSurvey = action.payload; 
     }
  },
});

const { actions, reducer } = DetailSurvey;
export const { addSurveyDetail } = actions;
export default reducer;
