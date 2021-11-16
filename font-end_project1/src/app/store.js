import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'; 
import listOption from '../features/ListOption/ListOption'
const rootReducer = {
  auth : authSlice, 
  listOption : listOption 
}
export const store = configureStore({
  reducer: rootReducer
});
