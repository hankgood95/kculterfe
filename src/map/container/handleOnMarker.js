import {
	CLICK_PLACE
} from "../../redux/reducer";
import axios from 'axios';

import noImage from '../../src_asset/no_img.png';

function useFocusOn(place, setCenter, setZoom, dispatch) {
	setCenter(() => ({
		lat: place.lat,
		lng: place.lng
	}));
	setZoom(() => 17);
	dispatch({
		type: CLICK_PLACE,
		data: place
	});
}

export function handleCard(data, head, setCenter, setZoom, dispatch, pin) {
	console.log(pin);
	const photos = [{image: data.firstimage}, {image: data.firstimage2}];
	const place = {
		head: head,
		imageUrl: pin,
		address: data.addr1,
		culture: "",
		explain: "",
		fileUrl: data.firstimage ? data.firstimage : noImage,
		kpop: "",
		name: data.title,
		lat: Number(data.mapy),
		lng: Number(data.mapx),
		phone_num: data.tel,
		photos: null,
		stayPhotos: photos,
		reviews: null,
		keyHash: "0",
		placeType: 0,
		status: 0,
	}
	useFocusOn(place, setCenter, setZoom, dispatch);
}

export function handleOnLoadKculter(kculter, data, head, pin, setCenter, setZoom, dispatch) {
	const place = {
		...kculter,
		head: head,
		imageUrl: pin,
		phone_num: data.international_phone_number ? data.international_phone_number : null,
		photos: data.photos ? data.photos : null,
	}
	useFocusOn(place, setCenter, setZoom, dispatch);
}

export function handleCustomMarker(data, head, setCenter, setZoom, dispatch, pin, map, google) {
	axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + data.lat + "," + data.lng + "&radius=10&key=" + process.env.REACT_APP_GOOGLE_MAP_KEY)
	.then(res => {
		const placeId = res.data.results[0].place_id;
		const service = new window.google.maps.places.PlacesService(map);
		const request = {
			placeId: placeId,
			fields: [
				"formatted_address",
				"international_phone_number",
				"name",
				"photos",
				"geometry"
			],
		};
		service.getDetails(request, (placeData, status) => {
			if (
				status === google.maps.places.PlacesServiceStatus.OK &&
				placeData &&
				placeData.geometry &&
				placeData.geometry.location
				) {
					const place = {
						head: head,
						imageUrl: pin ? pin : null,
						address: data.address,
						culture: data.culture,
						explain: data.explain,
						fileUrl: data.fileUrl ? data.fileUrl : placeData.photos.length ? placeData.photos[0].getUrl() : null,
						kpop: data.kpop,
						name: data.name,
						lat: data.lat,
						lng: data.lng,
						photos: placeData.photos,
						stayPhotos: null,
						reviews: null,
						keyHash: data.keyHash,
						placeType: data.placeType,
						status: data.status,
					}
					useFocusOn(place, setCenter, setZoom, dispatch);
				}
		})
	})
	.catch(error => {
		const place = {
			head: head,
			imageUrl: pin,
			address: data.address,
			culture: data.culture,
			explain: data.explain,
			fileUrl: data.fileUrl  ? data.fileUrl : noImage,
			kpop: data.kpop,
			name: data.name,
			lat: data.lat,
			lng: data.lng,
			photos: null,
			stayPhotos: null,
			reviews: null,
			keyHash: data.keyHash,
			placeType: data.placeType,
			status: data.status,
		}
		useFocusOn(place, setCenter, setZoom, dispatch);
		console.log(error);
	})
}

export function handleGoogleMarkerAndSearch(data, head, setCenter, setZoom, dispatch) {
	const place = {
		head: head,
		imageUrl: data.imageUrl,
		address: data.formatted_address,
		culture: "",
		explain: "",
		fileUrl: noImage,
		kpop: "",
		name: data.name,
		lat: 0,
		lng: 0,
		phone_num: data.international_phone_number,
		photos: data.photos,
		stayPhotos: null,
		reviews: data.reviews,
		keyHash: "0",
		placeType: 0,
		status: 0,
	}
	if (data.photos) {
		place.fileUrl = data.photos[0].getUrl();
	}
	if (
		data.geometry &&
		data.geometry.location) {
			place.lat = data.geometry.location.lat();
			place.lng = data.geometry.location.lng();
	}
	useFocusOn(place, setCenter, setZoom, dispatch);
}