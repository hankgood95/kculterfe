import axios from 'axios';

export async function getPlaceApi(url, type, keyHash) {
	axios.defaults.baseURL = 'https://kculter-be-lb-830632987.ap-northeast-2.elb.amazonaws.com';
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
	axios.defaults.baseURL = 'https://kculter-be-lb-830632987.ap-northeast-2.elb.amazonaws.com';
	return await axios.get(url + type + "?keyHash=" + keyHash)
	.then(function(res) {
		return res;
	})
	.catch(function(error) {
		console.log(error);
		return null;
	})
}