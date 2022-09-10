import axios from 'axios';

export async function getMemberInfo() {
    axios.defaults.baseURL = 'http://3.37.88.220:8080';
    let list;
    //await 한 값을 보내준다.
    const memberHash = window.sessionStorage.getItem("memberHash")

    return await axios.get('/member', {
        headers: {
            Authorization: memberHash,
        },
        responseType: 'json'
    })
    .then(function(res){
        list = res.data;
        return list;
    })
    .catch(function(error){
        alert("서버 통신 실패");
    });
}