import axios from 'axios';
import {
	MODIFY_COURSE,
	SAVE_COURSE,
} from '../../../../redux/reducer';

export function handleOnClickAdd(place, course, setCourse, dispatch) {
	if (!place.lat && !place.lng) {
		alert("Please select the place before add the course.");
		return;
	}
	if (course && course.length > 15) {
		alert("Too many courses.");
		return;
	}
	let newCourse = [...course];
	const newPlace = {
		...place,
		photos: null,
	}
	newCourse.push(newPlace);
	setCourse(() => newCourse);
	dispatch({
		type: MODIFY_COURSE,
		data: newCourse,
	})
}

export function handleOnClickSave(setModalIsOpen, course) {
	if (!course && !course.length) {
		alert("Please add course before save the course list.");
		return;
	}
	setModalIsOpen(true);
}

export function handleOnSubmit(e, courseData, course, setCourse, courseName, memberHash, setModalIsOpen, dispatch) {
	e.preventDefault();
	setModalIsOpen(false);
	if (!memberHash) {
		alert("Please login first");
		return ;
	}
	dispatch({
		type: SAVE_COURSE,
		data: {
			memberHash: courseData.memberHash ? courseData.memberHash : memberHash,
			courseHash: courseData.courseHash ? courseData.courseHash : null,
			courseName: courseData.courseName ? courseName : courseData.courseName,
			course: course,
		}
	})
	const jsonData = JSON.stringify({
		memberHash: courseData.memberHash ? courseData.memberHash : memberHash,
		courseHash: courseData.courseHash ? courseData.courseHash : null,
		courseName: courseData.courseName ? courseName : courseData.courseName,
		course: course,
	});
	axios.defaults.baseURL = 'https://wooks-weather.com';
	axios.post('/course/', jsonData, {
		headers:{
			'Content-Type':'application/json'
		}
	})
		.then(function(res){
			const newCourse = [];
			setCourse(() => newCourse);
			dispatch({
				type: MODIFY_COURSE,
				data: newCourse,
			})
			setModalIsOpen(() => false);
			alert("Sucess Save");
		})
		.catch(function(error){
			console.log(error, "서버 통신 실패");
			alert("Fail Save");
	})
}