import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const StatusButtonShare  = createSlice({
  name: "SurveyStatusItem",
  initialState: {
    status : false  
  },
  reducers: {
     changeStatus :(state,action)=>{
          state.status = !state.status
     }
  },
});

const { actions, reducer } = StatusButtonShare;
export const { changeStatus } = actions;
export default reducer;
