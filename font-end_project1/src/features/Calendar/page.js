import { createSlice } from "@reduxjs/toolkit";
const page  = createSlice({
  name: "SurveyStatusItem",
  initialState: {
    page : 1,
  },
  reducers: {
    changePage : (state,action)=>{
          state.page = action.payload 
     }
  },
});

const { actions, reducer } = page;
export const { changePage }  = actions;
export default reducer;
