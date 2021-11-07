import Cookies from 'universal-cookie';

const userApi = {
     getToken : async()=>{
        const cookies = new Cookies(); 
        const token = await cookies.get("user");
        return token ;  
     }
}
export default userApi ; 