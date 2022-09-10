import axios from 'axios';

export async function checkEmail(email){
  aaxios.defaults.baseURL = 'http://kculter-lb-1250111111.ap-northeast-2.elb.amazonaws.com';

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