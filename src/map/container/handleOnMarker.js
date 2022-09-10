import {
	CLICK_PLACE
} from "../../redux/reducer";
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
	console.log("Card", data);
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
		reviews: null,
		placeHash: "0",
		placeType: 0,
		status: 0,
	}
	useFocusOn(place, setCenter, setZoom, dispatch);
}

export function handleCustomMarker(data, head, setCenter, setZoom, dispatch, pin) {
	console.log("CM", data);
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
		phone_num: "",
		photos: [],
		reviews: [],
		placeHash: data.placeHash,
		placeType: data.placeType,
		status: data.status,
	}
	useFocusOn(place, setCenter, setZoom, dispatch);
}

export function handleGoogleMarkerAndSearch(data, head, setCenter, setZoom, dispatch) {
	console.log("GM n Search", data);
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
		reviews: data.reviews,
		placeHash: "0",
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