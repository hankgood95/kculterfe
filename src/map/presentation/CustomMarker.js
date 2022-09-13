import React, {
	useState,
	useEffect
} from 'react'
import {
	Marker
} from '@react-google-maps/api'

export function isCourse(item, course) {
	let result = false;
	course &&
	course.place &&
	course.place.map(course => {
		if (course.lat === item.lat && course.lng === item.lng) {
			result = true;
		}
	})
	return result;
}

function CustomMarker(props) {
	const [place, setPlace] = useState(null);
	const [icon, setIcon] = useState(null);
	let imgUrl = null;
	
	useEffect(() => {
		if (props.place) {
			setPlace(() => props.place);
		}
		if (props.pin && props.pin.imageUrl) {
			imgUrl = props.pin.imageUrl;
			const icon = new window.google.maps.MarkerImage(
				imgUrl,
				null,
				null,
				null,
				new window.google.maps.Size(40, 40),
			);
			setIcon(() => icon);
		} else {
			imgUrl = null;
			setIcon(() => null);
		}
	}, [props.place]);

	return (
		place &&
		place.map((item, index) => {
			if ((props.title === "STAY" || props.title === "TOUR") && isCourse(item, props.course)) {
				return;
			}
			return (
				<Marker
					key={index}
					icon={icon}
					position={{
						lat: item.lat,
						lng: item.lng
					}}
					onClick={() => {
						props.markerHandler(item, props.title, props.setCenter, props.setZoom, props.dispatch, icon.url, props.map, props.google);
					}}
				/>
			);
		})
	);
}

export default CustomMarker;