import { createSlice } from "@reduxjs/toolkit";

const UserSendList = createSlice({
  name: "OptionListUser",
  initialState: {
    ListUser: [],
  },
  reducers: {
    addListUser: (state, action) => {
      state.ListUser.push(action.payload);
    },
    deleteUserSend: (state, action) => {
      state.ListUser.splice(action.payload, 1);
    },
    deleteAllUserSend: (state, action) => {
      state.ListUser = [];
    },
  },
});

const { actions, reducer } = UserSendList;
export const { addListUser, deleteUserSend, deleteAllUserSend } = actions;
export default reducer;
