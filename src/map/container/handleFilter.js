import {
	getKpopList
} from '../../manager/common/container/GetKpopList';
import {
	getCultureList
} from '../../manager/common/container/GetCultureList';
import {
	modifySessionItem,
} from '../container/handleSessionStorage';
import {
	getPlaceApi,
	getPinApi
} from '../container/getInfo';
import {
	CLICK_PLACE,
} from '../../redux/reducer';
import {
	handleOnLoadKculter
} from '../container/handleOnMarker';
import axios from 'axios';

export async function fetchSelected(map, google, list, e, isKpop, kculter, setKculter, setCenter, setZoom, dispatch) {
	const found = list.find(obj => obj.hash == e.target.value);
	if (isKpop === true) {
		modifySessionItem(e.target.value, 1, found.name);
	} else {
		modifySessionItem(e.target.value, 2, found.name);
	}
	let pramType = "";
	if (Number(window.sessionStorage.getItem("type")) === 1) {
		pramType = "kpop";
	} else if (Number(window.sessionStorage.getItem("type")) === 2) {
		pramType = "culture";
	}
	const place = await getPlaceApi("/place/", pramType, window.sessionStorage.getItem("keyHash"));
	if (!place.data) {
		return;
	}
	const pin = await getPinApi("/pin/", pramType, window.sessionStorage.getItem("keyHash"));
	let placeToRedux;
	if (place && pin && place.data && pin.data) {
		setKculter(prev => ({
			...prev,
			center: {
				lat: place.data[0].lat,
				lng: place.data[0].lng,
			}, 
			data: {
				place: place.data,
				pin: pin.data,
			},
		}));
		placeToRedux = {
			head: window.sessionStorage.getItem("title"),
			imageUrl: pin.data.imageUrl,
			address: place.data[0].address,
			culture: place.data[0].culture,
			explain: place.data[0].explain,
			fileUrl: place.data[0].fileUrl,
			kpop: place.data[0].kpop,
			name: place.data[0].name,
			lat: place.data[0].lat,
			lng: place.data[0].lng,
			placeHash: place.data[0].placeHash,
			placeType: place.data[0].placeType,
			status: place.data[0].status,
		}
		dispatch({
			type: CLICK_PLACE,
			data: placeToRedux,
		});
	}
	axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + placeToRedux.lat + "," + placeToRedux.lng + "&radius=10&key=" + process.env.REACT_APP_GOOGLE_MAP_KEY)
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
					handleOnLoadKculter(placeToRedux, placeData, window.sessionStorage.getItem("title"), pin.data.imageUrl, setCenter, setZoom, dispatch);
				}
		})
	})
	.catch(error => {
		console.log(error);
	})
}

export async function fetchList(isKpop, setList) {
	let kList = [];
	if (isKpop) {
		getKpopList()
		.then(function(res) {
			kList.push({
				hash: 0,
				name: "Select k-pop stars",
			});
			res.map(item => {
				kList.push({
					hash: item.keyHash,
					name: item.name,
				});
			})
			setList(() => kList);
		})
		.catch(function(error) {
			console.log(error);
		})
	} else {
		getCultureList()
		.then(function(res) {
			kList.push({
				hash: 0,
				name: "Select culture place",
			});
			res.map(item => {
				kList.push({
					hash: item.keyHash,
					name: item.name,
				});
			})
			setList(() => kList);
		})
		.catch(function(error) {
			console.log(error);
		})
	}
}