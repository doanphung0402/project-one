import Servey from '../Component/Servey'
import SignIn from '../Component/SignIn'
import SignUp from '../Component/SignUp'
import home from '../page/home'
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
         name:'servey', 
         path:'/my-servey', 
         component: Servey
    }
]