import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import URL from '../../Config/URL'
export const changeStatus =  createAsyncThunk("change-status-survey",async(params,Thunk_API)=>{
     await axios({
        
          data : params, 
          method : "post"
     }).then()
})
const SurveyStatusItem = createSlice({
  name: "SurveyStatusItem",
  initialState: {
    status : "NOT SEEN" // NOT SEEN , SEEN , NOT DONE
  },
  reducers: {
     
  },
});

const { actions, reducer } = SurveyStatusItem;
export const {  } = actions;
export default reducer;
