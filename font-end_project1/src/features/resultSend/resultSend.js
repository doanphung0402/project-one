import { createSlice } from "@reduxjs/toolkit";

const resultSend = createSlice({
  name: "OptionListUser",
  initialState: {
     resultSend : []
  },
  reducers: {
    addResultSend: (state, action) => {
      state.resultSend = action.payload ; 
    }
  },
});

const { actions, reducer } = resultSend;
export const { addResultSend } = actions;
export default reducer;
