import { toast } from "react-toastify"
const ToastifyHelper =(error,success) => { 
   let message = null; 
   if (error){
    if(typeof error =='object' && error.message){
        message = error.message ; 
   }
   if (message!=null && typeof message !='undefined' && message !== ''){
        toast.error(message);
   }
   }
   if(success === true){
    message="Thành công!"
    toast.success(message); 
   }
    
}; 
export default ToastifyHelper ; 