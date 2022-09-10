import axios from 'axios';

export async function DeleteCourse( CourseHash ) {
    axios.defaults.baseURL = 'http://3.37.88.220:8080';

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