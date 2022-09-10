import { Marker } from '@react-google-maps/api';
import React, {
	useState,
	useEffect,
} from 'react';
import {
	useSelector
} from 'react-redux';
import {
	handleCustomMarker,
	handleCard,
} from '../container/handleOnMarker';
import {
	getConcertPlaceData,
} from '../container/handleGM'
import CustomMarker from './CustomMarker';

// import concertPin from '../../src_asset/tour_pin.png';

function MapMarker(props) {
	const reduxCourse = useSelector(state => state.course);
	const [course, setCourse] = useState(props.course);

	useEffect(() => {
		setCourse(prev => ({
			...prev,
			place: reduxCourse,
		}));
	}, [reduxCourse]);
	return (
		<div>
			{/* KCULTER 마커 */}
			{
				props.kculter &&
				props.kculter.place &&
				<CustomMarker
					place={props.kculter.place}
					pin={props.kculter.pin}
					title={window.sessionStorage.getItem("title")}
					markerHandler={handleCustomMarker}
					setCenter={props.setCenter}
					setZoom={props.setZoom}
					dispatch={props.dispatch}
				/>
			}
			{/* 코스 마커 */}
			{
				course.place &&
				<CustomMarker
					place={course.place}
					pin={course.pin}
					title={"COURSE"}
					markerHandler={handleCustomMarker}
					setCenter={props.setCenter}
					setZoom={props.setZoom}
					dispatch={props.dispatch}
				/>
			}
			{/* Near 마커 */}
			{
				props.near.place ?
					props.near.isStay ?
					<CustomMarker
						place={props.near.place}
						pin={props.near.stayPin}
						title={"STAY"}
						markerHandler={handleCard}
						setCenter={props.setCenter}
						setZoom={props.setZoom}
						dispatch={props.dispatch}
					/>
					:
					<CustomMarker
						place={props.near.place}
						pin={props.near.tourPin}
						title={"TOUR"}
						markerHandler={handleCard}
						setCenter={props.setCenter}
						setZoom={props.setZoom}
						dispatch={props.dispatch}
					/>
				:
				<></>
			}
			{/* Concert 마커 */}
			{
				props.concert.lat &&
				props.concert.lng &&
				<Marker
					// icon={
					// 	new window.google.maps.MarkerImage(
					// 		concertPin,
					// 		null,
					// 		null,
					// 		null,
					// 		new window.google.maps.Size(40, 40))
					// }
					position={{
						lat: props.concert.lat,
						lng: props.concert.lng
					}}
					onClick={() => {
						getConcertPlaceData(props.concert, props.map, props.google, props.setCenter, props.setZoom, props.dispatch);
					}}
				/>
			}
		</div>
	);
}

export default MapMarker;