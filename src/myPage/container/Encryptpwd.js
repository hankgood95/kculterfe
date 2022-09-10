import cryptoJS from 'crypto-js'

export function hashPwd(info) {
  axios.defaults.baseURL = 'http://3.37.88.220:8080';
  
  const secretKey = process.env.REACT_APP_AES_SECRET_KEY;
  const iv = 'abcdefghijklmnop';

  const autho = cryptoJS.AES.encrypt(info, cryptoJS.enc.Utf8.parse(secretKey), {
    iv: cryptoJS.enc.Utf8.parse(iv),
    padding: cryptoJS.pad.Pkcs7,
    mode: cryptoJS.mode.CBC,
  });

  return autho.toString();
}
export default hashPwd;