import { createSlice } from "@reduxjs/toolkit";

const Loading  = createSlice({
  name: "loading",
  initialState: {
     statusLoading : false 
  },
  reducers: {
    showLoading : (state,action)=>{
         state.statusLoading = true ; 
    }, 
    disableShowLoading :(state,action)=>{
         state.statusLoading = false ; 
    }
  },
});

const { actions, reducer } = Loading;
export const { showLoading,disableShowLoading} = actions;
export default reducer;
