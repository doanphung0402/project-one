import Survey from '../Component/Survey'
import SignIn from '../Component/SignIn'
import SignUp from '../Component/SignUp'
import home from '../page/home'
import CreateSurvey from '../Component/CreateSurvey'
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
         path:'/my-survey', 
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
    }
]