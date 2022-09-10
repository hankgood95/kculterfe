import axios from 'axios';

export async function checkNick(nickname){
  axios.defaults.baseURL = 'http://3.37.88.220:8080';

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