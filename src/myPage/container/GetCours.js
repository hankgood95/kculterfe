import axios from 'axios';

export async function getCourseList() {
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