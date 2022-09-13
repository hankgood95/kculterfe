import React, {
	useEffect,
	useState,
} from 'react';
import {
	useDispatch,
	useSelector
} from 'react-redux';
import {
	Modal
} from 'react-bootstrap';
import CourseCard from './CourseCard';
import {
	handleOnClickAdd,
	handleOnClickSave,
	handleOnSubmit,
} from '../container/handleMapSideNav';

function CourseBox({ place }) {
	const memberHash = window.sessionStorage.getItem("memberHash");
	const dispatch = useDispatch();
	const reduxCourse = useSelector(state => state.course);
	const reduxCourseData = useSelector(state => state.courseData);
	const [course, setCourse] = useState([])
	const [courseName, setCourseName] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const handleClose = () => setModalIsOpen(false);

	useEffect(() => {
		setCourse(() => reduxCourse);
	}, [course]);

	return (
		<div className="course">
			<div className='course-head'>
				<p>
					Course
				</p>
			</div>
      <CourseCard className='course-list'
				course={course}
				setCourse={setCourse}
			/>
			<div className="course-button">
      	<button
					onClick={() => handleOnClickAdd(place, course, setCourse, dispatch)}
				>
      	  ADD
      	</button>
				{
					course.length > 0 &&
					<button
						onClick={() => handleOnClickSave(setModalIsOpen, course)}
					>
      		  SAVE
      		</button>
				}
			</div>

			<div className='mmodal'>
				<Modal
					show={modalIsOpen}
					onHide={handleClose}
					className="course-modal"
				>
					<Modal.Body>
						<span className='modalspan'>Make your own <br></br>travel course.</span>
							<form 
								className='courseForm'
							>
								<input
								type="text"
								value={courseName}
								placeholder="Enter Course name"
								onChange={e => setCourseName(e.target.value)}
								/>
								<button
									onClick={e => handleOnSubmit(e, reduxCourseData, course, setCourse, courseName, memberHash, setModalIsOpen, dispatch)}
								>
									SUBMIT
								</button>
								<button>
									EXIT
								</button>
							</form>
						</Modal.Body>
					</Modal>
					</div>
				</div>
	);
}

export default CourseBox;