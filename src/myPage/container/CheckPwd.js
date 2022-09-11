import axios from 'axios';
import {hashPwd} from '../../login/presentation/Encryptpwd'

export async function  CheckPwd(pwd) {
    axios.defaults.baseURL = 'https://kculter-lb-1250111111.ap-northeast-2.elb.amazonaws.com';

    const hash = hashPwd(sessionStorage.getItem("memberHash")+pwd);

    let result;
    return await axios.get("/member/pwd", {
        headers: {
            Authorization: hash,
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