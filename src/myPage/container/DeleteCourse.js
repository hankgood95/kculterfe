import axios from 'axios';

export async function DeleteCourse( CourseHash ) {
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