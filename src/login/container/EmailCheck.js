import axios from 'axios';

export async function checkEmail(email){
  axios.defaults.baseURL = 'https://wooks-weather.com';
  let result;
  return await axios.get("/member/emaildup?email="+email) //조회시 사용, 중복검사 
  .then(function(res){
    result = res.data;
    return result;
  })
  .catch(function(error){
  })
}