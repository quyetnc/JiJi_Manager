import {Token} from '../../../../configs/url';

export async function postLogin(username, password) {
  var dataLogin = new URLSearchParams();
  dataLogin.append('username', username);
  dataLogin.append('password', password);
  dataLogin.append('grant_type', 'password');
  const response = await fetch(Token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: dataLogin.toString(),
  })
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
  //   const response = axios.post(Token,dataLogin.toString())
  //     .then(result => {
  //         console.log(result);
  //         return result;
  //     })
  //     .catch(error => console.log(error));
  //     return response;
  //   }
}
