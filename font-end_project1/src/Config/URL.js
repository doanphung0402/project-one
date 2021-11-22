const url ="http://localhost:3000"; 
const URL ={
   login : `${url}/login`, 
   signup :`${url}/signup`,
   authorization:`${url}/authorization`,
   getAllSurvey : `${url}/survey/get-all-survey`,
   sendSurvey : `${url}/survey/create-send-survey`, 
   getPaginationPage :`${url}/survey/get-survey`
}
export default URL; 