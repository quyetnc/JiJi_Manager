import {Api} from '../../../../configs/url';
export async function loadInformationUserApi(token) {
    const response = await fetch(Api+ "Users/GetUserInformation", {
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
        console.log("Lỗi khi gọi hàm loadInformationUserApi: "+error);
    })
    return response;
  }
  