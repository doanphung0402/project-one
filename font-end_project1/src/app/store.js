import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'; 
import listOption from '../features/ListOption/ListOption'; 
import UserSendList from '../features/UserToSend/UserToSend'; 
import SurveyInfo from '../features/survey/SurveyInfo'
import  ListSurvey from '../features/survey/ListSurveyItem'; 
import resultSend from '../features/resultSend/resultSend';
import SplitButton from '../features/survey/SplitButton';
import DetailSurvey from '../features/survey/detailSurvey'; 
import SurveyChoose from '../features/survey/SurveyChoose'; 
import SurveyAfterChoose from '../features/survey/surveyAfterChoose'
const rootReducer = {
  auth : authSlice, 
  listOption : listOption, 
  UserSendList : UserSendList, 
  SurveyInfo : SurveyInfo ,
  resultSend : resultSend , 
  ListSurvey : ListSurvey , 
  SplitButton:SplitButton,
  DetailSurvey:DetailSurvey,
  SurveyChoose:SurveyChoose,
  SurveyAfterChoose :SurveyAfterChoose
}
export const store = configureStore({
  reducer: rootReducer
});
