import {Api} from '../../../../configs/url';
export async function loadProfileApi(token) {
    const response = await fetch(Api+ "Application/GetAllMenu", {
        method: 'GET',
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
        console.log("Lỗi khi gọi hàm loadProfileApi: "+error);
    })
    return response;
  }
  