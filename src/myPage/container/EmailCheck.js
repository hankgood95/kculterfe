import axios from 'axios';

export async function checkEmail(email){
  axios.defaults.baseURL = 'https://wooks-weather.com';

  let result;
  return await axios.get("/member/emaildup?email="+email)
  .then(function(res){
    result = res.data;
    return result;
  })
  .catch(function(error){
    console.log(error);
  })
}