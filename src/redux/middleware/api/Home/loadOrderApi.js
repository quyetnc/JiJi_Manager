import {Api} from '../../../../configs/url';
export async function loadOrderApi(token) {
    const response = await fetch(Api+ "Order/GetOrders", {
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
        console.log("Lỗi khi gọi hàm loadOrderApi: "+error);
    })
    return response;
  }
  