import { createSlice } from "@reduxjs/toolkit";
const ListScheduleSend  = createSlice({
  name: "SurveyStatusItem",
  initialState: {
    ListSchedule : [],
  },
  reducers: {
    addScheduleList : (state,action)=>{
          state.ListEmail = action.payload 
     }
  },
});

const { actions, reducer } = ListScheduleSend;
export const { addScheduleList }  = actions;
export default reducer;
