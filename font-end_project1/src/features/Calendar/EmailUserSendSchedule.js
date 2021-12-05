import { createSlice } from "@reduxjs/toolkit";
const EmailUserSendSchedule  = createSlice({
  name: "SurveyStatusItem",
  initialState: {
     ListEmailSend  : [],
  },
  reducers: {
    changeListEmailUserSend :(state,action)=>{
        state.ListEmailSend = action.payload ; 
     }, 
     addEmailUserSendItem :(state,action)=>{
         state.ListEmailSend.push(action.payload);
     }
  },
});

const { actions, reducer } = EmailUserSendSchedule;
export const { changeListEmailUserSend,addEmailUserSendItem } = actions;
export default reducer;
