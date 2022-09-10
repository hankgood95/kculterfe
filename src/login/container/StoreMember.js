import axios from 'axios';

export async function  storeMember(formData) {
    axios.defaults.baseURL = 'http://kculter-lb-1250111111.ap-northeast-2.elb.amazonaws.com';
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