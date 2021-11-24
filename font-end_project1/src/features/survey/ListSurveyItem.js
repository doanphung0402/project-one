import { createSlice } from "@reduxjs/toolkit";

const ListSurvey = createSlice({
  name: "ListSurvey",
  initialState: {
    ListSurvey: [],
  },
  reducers: {
     getListSurvey : (state,action)=>{
          state.getListSurvey = action.payload; 
     }
  },
});

const { actions, reducer } = ListSurvey;
export const { getListSurvey } = actions;
export default reducer;
