import React from 'react';
import FBSDK from 'react-native-fbsdk';

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager()
  }
  // handleFacebookLogin () {
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled')
  //       } else {
  //         console.log('Login success with permissions: ' + result.grantedPermissions.toString())
  //       }
  //     },
  //     function (error) {
  //       console.log('Login fail with error: ' + error)
  //     }
  //   )
  // }
  makeLoginButton(callback) {
    return (
      <LoginButton
        readPermissions={["public_profile,email"]}
        onLoginFinished={(error, result) => {
          if (error) {

          } else if (result.isCancelled) {

          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                callback(data.accessToken)
              })
              .catch(error => {
                console.log(error)
              })
          }
        }} />
    )
  }

  makeLogoutButton(callback) {
    return (
      <LoginButton onLogoutFinished={() => {
        callback()
      }} />
    )
  }

  async fetchProfile(callback) {
    return new Promise((resolve, reject) => {
      const request = new GraphRequest(
        '/me',
        null,
        (error, result) => {
          if (result) {
            const profile = result
            profile.avatar = `https://graph.facebook.com/${result.id}/picture`
            resolve(profile)
          } else {
            reject(error)
          }
        }
      )

      this.requestManager.addRequest(request).start()
    })
  }
}

export const facebookService = new FacebookService()