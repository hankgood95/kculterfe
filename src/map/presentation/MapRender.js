import React, {
	useEffect,
	useState,
} from 'react';
import {
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
} from 'react-redux';
import Search from './Search';
import MapMarker from './MapMarker';
import MapCard from './MapCard';
import MapFilter from './MapFilter'

import stayPin from '../../src_asset/stay_pin.png';
import tourPin from '../../src_asset/tour_pin.png';

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

	return (
		<div className='map-container'>
			{/* 구글맵 인스턴스 */}
			<GoogleMap
				mapContainerClassName='map-container'
				options={options}
				center={center}
				zoom={zoom}
				onLoad={map => handleOnLoad(map, setMap, props.kculter.data, props.kculter.concertProps, google, setCenter, setZoom, dispatch, near.url, setNear)}
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
					map={map}
					google={google}
					kculter={props.kculter}
					setKculter={props.setKculter}
					setCenter={setCenter}
					setZoom={setZoom}
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
			</GoogleMap>
		</div>
	)
}

export default MapRender;