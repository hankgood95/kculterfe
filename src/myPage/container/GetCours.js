import axios from 'axios';

export async function getCourseList() {
    axios.defaults.baseURL = 'http://3.37.88.220:8080';

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