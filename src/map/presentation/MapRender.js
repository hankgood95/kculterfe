import React, {
	useEffect,
	useState,
} from 'react';
import {
	DirectionsRenderer,
	DirectionsService,
	DistanceMatrixService,
	GoogleMap,
} from '@react-google-maps/api';
import {
	handleOnLoad,
	handleOnDragEndGM,
	handleOnClickGM,
	handleOnUnmount,
} from '../container/handleGM';
import {
	useDispatch,
	useSelector,
} from 'react-redux';
import Search from './Search';
import MapMarker from './MapMarker';
import MapCard from './MapCard';
import MapFilter from './MapFilter'

import stayPin from '../../src_asset/stay_pin.png';
import tourPin from '../../src_asset/tour_pin.png';

export function directionsCallback(res, setDirection) {
	if (res !== null) {
		if (res.status === 'OK') {
			setDirection(() => res);
		} else {
			console.log('res: ', res);
		}
	}
}

export function distanceCallback(res, status, setCourseList) {
	// if (res !== null) {
	// 	if (status === 'OK') {
	// 		console.log('거리: ' + res.rows[0].elements[0].distance.text);
	// 		console.log('소요 시간: ' + res.rows[0].elements[0].duration.text);
	// 	} else {
	// 		console.log('res: ', res);
	// 	}
	// }
	// setCourseList(() => null);
}

function MapRender(props) {
	const dispatch = useDispatch();
	const google = window.google;
	const [map, setMap] = useState(null);
	const [center, setCenter] = useState(props.kculter.center);
	const [zoom, setZoom] = useState(12);
	const options = {
		mapTypeControl: false,
		streetViewControl: false,
		zoomControl: false,
		fullscreenControl: false,
		minZoom: 10,
		restriction: {
			latLngBounds: {
				north: 80,
        south: -80,
				east: 180,
        west: -180
			},
		},
	};

	const [near, setNear] = useState({
		place: null,
		stayPin: { imageUrl: stayPin },
		tourPin: { imageUrl: tourPin },
		isStay: true,
		url: "/near/stay?lat=",
	});
	useEffect(() => {
		if (near.isStay === true) {
			setNear(prev => ({
				...prev,
				url: "/near/stay?lat=",
			}));
			handleOnDragEndGM(map, "/near/stay?lat=", setNear);
		} else if (near.isStay === false) {
			setNear(prev => ({
				...prev,
				url: "/near/tour?lat=",
			}));
			handleOnDragEndGM(map, "/near/tour?lat=", setNear);
		}
	}, [near.isStay]);
	
	useEffect(() => {
		setCenter(() => ({
			lat: props.kculter.center.lat,
			lng: props.kculter.center.lng,
		}));
	}, [props.kculter.center]);

	const courseListRedux = useSelector(state => state.courseList);
	const [courseList, setCourseList] = useState(courseListRedux);
	const [direction, setDirection] = useState(null);
	useEffect(() => {
		setCourseList(() => courseListRedux);
	}, [courseListRedux]);

	return (
		<div className='map-container'>
			{/* 구글맵 인스턴스 */}
			<GoogleMap
				mapContainerClassName='map-container'
				options={options}
				center={center}
				zoom={zoom}
				onLoad={map => handleOnLoad(map, setMap, props.kculter.concertProps, google, setCenter, setZoom, dispatch, near.url, setNear)}
				onUnmount={() => handleOnUnmount(map, setMap, dispatch)}
				onClick={e => handleOnClickGM(map, e, google, setCenter, setZoom, dispatch)}
				onDragEnd={() => handleOnDragEndGM(map, near.url, setNear)}
			>

				{/* 검색창 */}
				<Search
					setCenter={setCenter}
					setZoom={setZoom}
					dispatch={dispatch}
				/>

				{/* 필터 */}
				<MapFilter
					kculter={props.kculter}
					setKculter={props.setKculter}
				/>

				{/* 마커 */}
				<MapMarker
					map={map}
					google={google}
					kculter={props.kculter.data}
					near={near}
					course={props.kculter.course}
					concert={props.kculter.concertProps}
					setCenter={setCenter}
					setZoom={setZoom}
					dispatch={dispatch}
				/>

				{/* 카드 */}
				<MapCard
					near={near}
					setNear={setNear}
					setCenter={setCenter}
					setZoom={setZoom}
					dispatch={dispatch}
				/>

				{/* 길찾기 */}
				{
					courseList &&
					<DirectionsService
        	  // required
        	  options={{
        	    origin: {
								lat: courseList[0].lat,
								lng: courseList[0].lng,
							},
							destination: {
								lat: courseList[courseList.length - 1].lat,
								lng: courseList[courseList.length - 1].lng,
							},
        	    travelMode: 'TRANSIT',
        	  }}
        	  // required
        	  callback={(res) => directionsCallback(res, setDirection)}
        	  // optional
        	  onLoad={directionsService => {
        	    console.log('DirectionsService onLoad directionsService: ', directionsService)
        	  }}
        	  // optional
        	  onUnmount={directionsService => {
        	    console.log('DirectionsService onUnmount directionsService: ', directionsService)
        	  }}
        	/>
				}
				{/* 길찾기 소요 시간 */}
				{
					courseList &&
					<DistanceMatrixService
						options={{
							origins: [{
								lat: courseList[0].lat,
								lng: courseList[0].lng,
							}],
							destinations: [{
								lat: courseList[courseList.length - 1].lat,
								lng: courseList[courseList.length - 1].lng,
							}],
							travelMode: 'TRANSIT',
						}}
						callback={(res, status) => distanceCallback(res, status, setCourseList)}
					/>
				}
				{/* 길찾기 렌더링 */}
				{
					direction &&
					<DirectionsRenderer
						options={{
							directions: direction,
						}}
						// onLoad={() => {setDirection(null)}}
					/>
				}
			</GoogleMap>
		</div>
	)
}

export default MapRender;