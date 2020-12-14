import NetInfo from '@react-native-community/netinfo';
import {Alert, Platform} from 'react-native';
export default CheckConnectivity = async () => {
  var connection = false;
  var a = await NetInfo.fetch().then((state) => {
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
    connection = state.isConnected;
  });
  return connection;
};
export const ToVND = (num = 0) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+"đ";
};
export const removeUnicode = (str = '') => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-',
  );
  str = str.replace(/-+-/g, '-'); //thay thế 2- thành 1-
  str = str.replace(/^\-+|\-+$/g, '');
  return str;
};
export const getCurrentDateTime = () => {
  var today = new Date();
  var day =
    today.getDate() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getFullYear() +
    ' ' +
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds();
  return day;
};
