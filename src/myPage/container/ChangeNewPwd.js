import axios from 'axios';
import {hashPwd} from '../../login/presentation/Encryptpwd'

export async function  ChangeNewPwd(newPwd) {
    const hash = hashPwd(sessionStorage.getItem("memberHash")+newPwd);
    let result;
    return await axios.put("/member/pwd",null,{ //put method 에서 header는 세번째 인자로 들어가야 한다.
        headers: {
            Authorization:hash
        }
    })
    .then(function(res){
        result = res.data;
        return result;        
    })
    .catch(function(error){
        result = 500;
        return result;
    })
}