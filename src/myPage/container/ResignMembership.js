import axios from 'axios';

export async function ResignMembership() {
    axios.defaults.baseURL = 'http://kculter-lb-1250111111.ap-northeast-2.elb.amazonaws.com';

    let result;

    const memberHash = window.sessionStorage.getItem("memberHash")

    return await axios.put('/member/secession',null, {
        headers: {
            Authorization: memberHash,
        },
        responseType: 'json'
    })
    .then(function(res){
        result = res.data;
        return result;
    })
    .catch(function(error){
        console.log(error);
        return 401;
    });
}