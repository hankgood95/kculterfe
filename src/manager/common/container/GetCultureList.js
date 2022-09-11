import axios from 'axios';

export async function getCultureList() {
    axios.defaults.baseURL = 'https://kculter-be-lb-830632987.ap-northeast-2.elb.amazonaws.com';
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