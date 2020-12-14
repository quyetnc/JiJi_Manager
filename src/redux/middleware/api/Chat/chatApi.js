import {Api} from '../../../../configs/url';
export async function addChatApi(token) {
    const response = await fetch(Api+ "Application/GetFloors", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':token,
        },
        body: null
    })
    .then((response) => response.json())
    .then((result) => {
        return result;
    })
    .catch((error) => {
        console.log("Lỗi khi gọi hàm addChat API: "+error);
    })
    return response;
  }
  //Load chat API
  export async function loadChatApi(token) {
    const response = await fetch(Api+ "Chat/Get10RowLastChat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':token,
        },
        body: null
    })
    .then((response) => response.text())
    .then((result) => {
        return result;
    })
    .catch((error) => {
        console.log("Lỗi khi gọi hàm addChat API: "+error);
    })
    return response;
  }
  