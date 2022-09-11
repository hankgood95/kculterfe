import axios from 'axios';

export async function checkNick(nickname){
  axios.defaults.baseURL = 'https://wooks-weather.com';

  let result;
  return await axios.get("/member/nicknamedup?nickname="+nickname)
  .then(function(res){
    result = res.data;
    return result;
})
.catch(function(error){
  console.log(error);
})
}