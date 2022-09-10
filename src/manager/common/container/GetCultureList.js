import axios from 'axios';

export async function getCultureList() {
    axios.defaults.baseURL = 'http://3.37.88.220:8080';
    let list;
    //await 한 값을 보내준다.
    return await axios.get('/cultures')
    .then(function(res){
        list = res.data;
        return list;
    })
    .catch(function(error){
        console.log(error);
        alert("서버 통신 실패");
    });
}