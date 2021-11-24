import { createSlice } from "@reduxjs/toolkit";

const SplitButton = createSlice({
  name: "ListSurvey",
  initialState: {
    SplitButton: 1 ,
  },
  reducers: {
    changeSplitButton : (state,action)=>{
          state.SplitButton = action.payload; 
     }
  },
});

const { actions, reducer } = SplitButton;
export const { changeSplitButton } = actions;
export default reducer;
