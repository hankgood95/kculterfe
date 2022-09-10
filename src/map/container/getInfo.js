import axios from 'axios';

export async function getPlaceApi(url, type, keyHash) {
	axios.defaults.baseURL = 'http://3.37.88.220:8080';
	return await axios.get(url + "?keyhash=" + keyHash + "&type=" + type)
	.then(function(res) {
		return res;
  })
  .catch(function(error) {
		console.log(error);
		return null;
  })
}

export async function getPinApi(url, type, keyHash) {
	axios.defaults.baseURL = 'http://3.37.88.220:8080';
	return await axios.get(url + type + "?keyHash=" + keyHash)
	.then(function(res) {
		return res;
	})
	.catch(function(error) {
		console.log(error);
		return null;
	})
}