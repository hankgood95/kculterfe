import axios from 'axios';

export async function  EditMemberInfo(formValue) {
    axios.defaults.baseURL = 'https://wooks-weather.com';
    
    let result;

    return await axios.put('/member', formValue, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })
    .then(function(res){
        result = res.data;
        return result;        
    })
    .catch(function(error){
        console.log(error);
        result = 500;
        return result;
    })
}