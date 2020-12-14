import {Api} from '../../../../configs/url';
export async function loadAllToppingApi(token) {
    const response = await fetch(Api+ "Application/GetAllTopping", {
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
        console.log("Lỗi khi gọi hàm Get All Topping: "+error);
    })
    return response;
  }
  