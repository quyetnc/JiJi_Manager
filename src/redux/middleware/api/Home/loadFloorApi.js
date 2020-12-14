import {Api} from '../../../../configs/url';
export async function loadFloorApi(token) {
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
        console.log("Lỗi khi gọi hàm loadFloorApi: "+error);
    })
    return response;
  }
  