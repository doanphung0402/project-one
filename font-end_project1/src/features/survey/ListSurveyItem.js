import { createSlice } from "@reduxjs/toolkit";

const ListSurvey = createSlice({
  name: "ListSurvey",
  initialState: {
    ListSurvey: [],
  },
  reducers: {
     getListSurvey : (state,action)=>{
          state.ListSurvey = action.payload; 
     }
  },
});

const { actions, reducer } = ListSurvey;
export const { getListSurvey } = actions;
export default reducer;
