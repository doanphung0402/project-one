import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'; 
const rootReducer = {
  auth : authSlice
}
export const store = configureStore({
  reducer: rootReducer
});
