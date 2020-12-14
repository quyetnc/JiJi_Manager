import {Api} from '../../../../configs/url';
export async function loadTotalMoneyByTableApi(token) {
    const response = await fetch(Api+ "Application/GetTotalMoneyByTable", {
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
        console.log("Lỗi khi gọi hàm loadTotalMoneyByTableApi: "+error);
    })
    return response;
  }
  