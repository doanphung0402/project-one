import Survey from '../Component/Survey/Survey'
import SignIn from '../Component/Auth/SignIn'
import SignUp from '../Component/Auth/SignUp'
import home from '../page/home'
import CreateSurvey from '../Component/Survey/CreateSurvey'
import UserSend from '../Component/Survey/UserSend'; 
import SendSucessSurvey from '../Component/Survey/SendSucessSurvey'
export const Router = [
    {
             name :"Đăng nhập",
             path : '/login', 
             component: SignIn, 
             exact :false
            
    }, 
    {
             name :"đăng kí", 
             path:'/signup', 
             exact :false, 
             component:SignUp 
    },
  
]
 
export const Router1 = [
    {
        name :"home", 
        path:'/home', 
        exact :false, 
        component: home
    }, 
    {
         name:'survey', 
         path:'/survey/my-survey', 
         component: Survey
    }, 
    {
        name :"", 
        path:'/', 
        exact:true,
        component:home 
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
    }
]