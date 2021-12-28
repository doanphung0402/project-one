import Survey from '../Component/Survey/Survey'
import SignIn from '../Component/Auth/SignIn'
import SignUp from '../Component/Auth/SignUp'
import Home from '../page/home'
import CreateSurvey from '../Component/Survey/CreateSurvey'
import UserSend from '../Component/Survey/UserSend'; 
import SendSucessSurvey from '../Component/Survey/SendSucessSurvey'
import ChooseSurvey from '../Component/Survey/ChooseSurvey'
import CalendarContainer from '../Component/Calendar/CalendarContainer'
import CalendarManager from '../Component/Calendar/CalendarManager'
import DetailScheduleSend from '../Component/Calendar/DetailScheduleSend'
import SignInWithGoogle from '../Component/Auth/SignInWithGoogle'
export const Router = [
    {
        name :"Đăng nhập",
        path : '/login', 
        component: SignIn, 
        exact :false
    },
    {
        name :"Đăng ki",
        path : '/signup', 
        component:SignUp, 
        exact :false
}
]
 
export const Router1 = [
    {
         name:'survey', 
         path:'/survey/my-survey', 
         component: Survey,
         exact :false
    }, 
    {
         name :"create-survey", 
         exact:false ,
         path:"/survey/create-survey", 
         component:CreateSurvey
    }, 
    {
        name :"create-survey", 
        exact : true , 
        path :"/survey/create-survey-send-to", 
        component : UserSend
    }, 
    {
         name :"send-survey-success", 
         exact : true , 
         path : "/survey/send-survey-success", 
         component : SendSucessSurvey
    }, 
    { 
        name :"detail-survey-item", 
        exact : true , 
        path :"/survey/get-detail-survey-item", 
        component: ChooseSurvey
    }, 
    {
         name :"calendar", 
         exact : true, 
         path:"/calendar/my-calendar", 
         component:CalendarContainer 
    }, 
    {
         name :"calendar-madnager", 
         exact : true , 
         path : "/calendar/manager", 
         component:CalendarManager
    }, 
    {
         name :"detail-schedule-send", 
         exact : true , 
         path : "/scheduder/detail-schedule-send", 
         component :DetailScheduleSend
    }, 
   
]
export const Router3 =[ 
    {
        name :"", 
        path:'/', 
        exact:true,
        component:Home 
    },
    {
        name :"home", 
        path:'/home', 
        exact :false, 
        component: Home
    }
]