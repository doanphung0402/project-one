import bcrypt from 'bcrypt';
import config from 'config'; 
function hash_password(password){
     var saltRounds = config.get("salt");
     const salt = bcrypt.genSaltSync(saltRounds)
     var hash = bcrypt.hashSync(password,salt); 
     return hash ; 
}
export default hash_password ; 