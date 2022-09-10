import axios from 'axios';
import {hashPwd} from '../../login/presentation/Encryptpwd'

export async function  ChangeNewPwd(newPwd) {
    axios.defaults.baseURL = 'http://kculter-lb-1250111111.ap-northeast-2.elb.amazonaws.com';

    const hash = hashPwd(sessionStorage.getItem("memberHash")+newPwd);
    let result;
    return await axios.put("/member/pwd",null,{
        headers: {
            Authorization:hash
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