import axios from 'axios';

export async function DeleteCourse( CourseHash ) {
    axios.defaults.baseURL = 'https://kculter-be-lb-830632987.ap-northeast-2.elb.amazonaws.com';

    let result;

    return await axios.delete('/course', {
        headers: {
            CourseHash: CourseHash,
        }
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