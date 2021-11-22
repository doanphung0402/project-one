import { createSlice } from "@reduxjs/toolkit";

const listOption = createSlice({
  name: "OptionList",
  initialState: {
    ListOption: [],
  },
  reducers: {
    addListOption: (state, action) => {
      state.ListOption.push(action.payload);
    },
    deleteOption: (state, action) => {
      state.ListOption.splice(action.payload, 1);
    },
    deleteAllOption: (state, action) => {
      const emptyArray = [];
      state.ListOption = emptyArray;
    },
  },
});

const { actions, reducer } = listOption;
export const { addListOption, deleteOption, deleteAllOption } = actions;
export default reducer;
