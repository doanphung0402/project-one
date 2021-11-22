import bcrypt from 'bcrypt';
import config from 'config'; 
function hash_password(password){
     var saltRounds = config.get("salt"); //salt : 10 
     const salt = bcrypt.genSaltSync(saltRounds)
     var hash = bcrypt.hashSync(password,salt); 
     return hash ; 
}
export default hash_password ; 