import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'; 
import listOption from '../features/ListOption/ListOption'; 
import UserSendList from '../features/UserToSend/UserToSend'; 
import SurveyInfo from '../features/survey/SurveyInfo'
import { addResultSend } from '../features/resultSend/resultSend';
import resultSend from '../features/resultSend/resultSend';
const rootReducer = {
  auth : authSlice, 
  listOption : listOption, 
  UserSendList : UserSendList, 
  SurveyInfo : SurveyInfo ,
  resultSend : resultSend 
}
export const store = configureStore({
  reducer: rootReducer
});
