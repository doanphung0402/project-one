import { createSlice } from "@reduxjs/toolkit";
const ListScheduleReceived  = createSlice({
  name: "ListScheduleReceived",
  initialState: {
    ListScheduleReceived  : [],
  },
  reducers: {
    addListScheduleReceived :(state,action)=>{
        state.ListScheduleReceived = action.payload ; 
     }
  },
});

const { actions, reducer } = ListScheduleReceived;
export const { addListScheduleReceived} = actions;
export default reducer;
