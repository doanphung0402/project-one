import q from "q";
import SurveyModelSend from "../models/surveyModel";
import UserModel from "../models/userModel";
export function findAdmin(user) {
  const defer = q.defer();
  UserModel.findOne(user, (error, data) => {
    if (!error) {
      defer.resolve(data);
    } else {
      defer.reject(error);
    }
  });
  return defer.promise;
}


export async function createAdmin(user) {
    try {
      const rsCreateAdmin =  await UserModel.create(user); 
      return rsCreateAdmin 
    } catch (error) {
       return error  
    }
}
