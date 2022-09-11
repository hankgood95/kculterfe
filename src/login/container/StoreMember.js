import axios from 'axios';

export async function  storeMember(formData) {
    axios.defaults.baseURL = 'https://wooks-weather.com';
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