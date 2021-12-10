import { createSlice } from "@reduxjs/toolkit";
const DetailSchedule  = createSlice({
  name: "DetailSchedule",
  initialState: {
     DetailSchedule  :{},
  },
  reducers: {
       addDetailSchedule :(state,action)=>{
            state.DetailSchedule = action.payload ; 
       }
     }
});

const { actions, reducer } = DetailSchedule;
export const { addDetailSchedule } = actions;
export default reducer;
