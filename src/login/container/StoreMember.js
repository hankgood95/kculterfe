import axios from 'axios';

export async function  storeMember(formData) {
    axios.defaults.baseURL = 'http://3.37.88.220:8080';
    let result;
    return await axios.post("/member/signup",formData)
    .then(function(res){
        result = res.data;
        return result;        
    })
    .catch(function(error){
        result = 500;
        return result;
    })
}