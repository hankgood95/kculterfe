import axios from 'axios';

export async function getCourseList() {
    axios.defaults.baseURL = 'https://kculter-be-lb-830632987.ap-northeast-2.elb.amazonaws.com';
    let list;

    const memberHash = window.sessionStorage.getItem("memberHash")

    return await axios.get('/course/'+ memberHash, {
        responseType: 'json'
    })
    .then(function(res){
        list = res.data;
        return list;
    })
    .catch(function(error){
        console.log(error);
        return 
    });
}