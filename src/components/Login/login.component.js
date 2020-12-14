import React, {useState, useEffect, Component} from 'react';
import {userData} from '../../configs/setting';
import {
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  ActivityIndicator,
  View,
  Image,
  StyleSheet,
  Platform,
  ViewPropTypes,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import TextIcon from '../core/texticon.core';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Sizes} from '@dungdang/react-native-basic';
import CheckConnectivity from '../../extensions/extensions';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      count: 0,
      //Thông tin đăng nhập
      username: 'hoanglongit96',
      password: 'admin',
      //Mật khẩu
      isModal: false,
      text: '',
      isLogin: false,
      textStyle: {fontSize: 14, width: 250, marginHorizontal: 5},
      checked: false,
      iconName: 'eye-slash',
      hidePassword: true,
      check: 'check-circle',
      pressLogin: false,
      errorMessageLegacy: undefined,
      biometricLegacy: undefined,
      isSigninInProgress: false,
    };

    async function requestUserPermission() {}
    this.description = null;
  }
  checkEmpty(value) {
    if (value === '' || value === undefined || value === null) return false;
    return true;
  }
  componentDidMount = async () => {
    let username = await AsyncStorage.getItem('username');
    let password = await AsyncStorage.getItem('password');
    if (username !== null && password !== null) {
      this.setState({
        username: username,
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    //Load Token In loginReducers
    if (prevProps.loginReducers !== this.props.loginReducers) {
      var error = this.props.loginReducers.error_description;
      if (error !== undefined) {
        alert(error);
      } else {
        if (this.props.loginReducers.access_token !== undefined) {
          if (this.state.check === 'check-circle') {
            let username = await AsyncStorage.getItem('username');
            let password = await AsyncStorage.getItem('password');
            if (username === null || password === null) {
              AsyncStorage.setItem('username', this.state.username);
              AsyncStorage.setItem('password', this.state.password);
            }
          }
          userData.TOKEN =
            this.props.loginReducers.token_type +
            ' ' +
            this.props.loginReducers.access_token;
          console.log(
            this.props.loginReducers.token_type +
              ' ' +
              this.props.loginReducers.access_token,
          );
          await this._onLoadInformationUser();
        }
      }
      this.setState({isLogin: false});
    }
    //Load Information User By Token In loadInformationUserReducers
    if (
      prevProps.loadInformationUserReducers !==
      this.props.loadInformationUserReducers
    ) {
      userData.InformationUser = this.props.loadInformationUserReducers;
      this.props.navigation.navigate('Home');
    }
  };

  _onLoadInformationUser = async () => {
    if (userData.TOKEN.length > 0) {
      this.setState({isLogin: true});
      await this.props.onLoadInformationUser(userData.TOKEN);
    }
  };

  _onPressLogin = async () => {
    if (this.state.username === '' || this.state.password === '') {
      alert('Trong kia`');
    } else {
      if (CheckConnectivity()) {
        this.setState({isLogin: true});
        await this.props.onLoginAction(
          this.state.username,
          this.state.password,
        );
      } else alert('Vui lòng kiểm tra kết nối Internet');
    }
  };
  _onRemoveAccount = () => {
    AsyncStorage.removeItem('username');
    AsyncStorage.removeItem('password');
    this.setState({username: ''});
  };
  render() {
    const {username, password} = this.state;
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{marginHorizontal: 17, alignItems: 'center'}}>
          <View>
            {/* <Image source={{uri:'https://www.kindpng.com/picc/m/642-6428979_freetoedit-goku-kaioken-ssgssgoku-freetoedit-goku-ssj-blue.png'}}/> */}
          </View>
          <Text style={styles.textstyle2}>ĐĂNG NHẬP HỆ THỐNG</Text>

          <View style={styles.textInput}>
            <Icon
              name="user-alt"
              size={Sizes.s35}
              color="#b2b2b2"
              style={{marginLeft: Sizes.s20, alignSelf: 'center'}}
            />
            <View style={{flex: 1, alignItems: 'center'}}>
              <TextInput
                style={{
                  fontSize: Sizes.s35,
                  width: '70%',
                  height: Sizes.s100,
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
                placeholder="Tên đăng nhập"
                onChangeText={(text) => this.setState({username: text})}
                editable={!this.state.isFingerprint}
                value={username}
              />
            </View>

            <Icon
              style={{marginRight: 10, width: Sizes.s50, alignSelf: 'center'}}
            />
          </View>

          <View style={[styles.textInput, {justifyContent: 'space-between'}]}>
            <Icon
              name="lock"
              size={Sizes.s35}
              color="#b2b2b2"
              style={{marginLeft: Sizes.s20, alignSelf: 'center'}}
            />
            {this.state.password == '' ? (
              <TextInput
                style={{
                  fontSize: Sizes.s35,
                  width: '70%',
                  height: Sizes.s100,
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
                secureTextEntry={this.state.hidePassword}
                placeholder="Mật khẩu"
                onChangeText={(text) => this.setState({password: text})}
              />
            ) : (
              <TextInput
                style={{
                  fontSize: Sizes.s35,
                  width: '70%',
                  height: Sizes.s100,
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
                secureTextEntry={this.state.hidePassword}
                placeholder="Mật khẩu"
                onChangeText={(text) => this.setState({password: text})}
                value={password}
              />
            )}

            <Icon
              name={this.state.hidePassword === true ? 'eye-slash' : 'eye'}
              size={Sizes.s35}
              color="#b2b2b2"
              style={{marginRight: 10, width: Sizes.s50, alignSelf: 'center'}}
              onPress={() => {
                this.setState({hidePassword: !this.state.hidePassword});
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.remember}
            activeOpacity={0.5}
            onPress={() => {
              if (this.state.check === 'circle') {
                this.setState({check: 'check-circle'});
              } else {
                this.setState({check: 'circle'});
              }
            }}>
            <View style={styles.checkContainer}>
              <Icon
                name={this.state.check}
                size={20}
                color="#fb9334"
                style={{marginTop: 2}}
              />
              <Text style={styles.textstyle3}>Ghi nhớ đăng nhập</Text>
            </View>
          </TouchableOpacity>
          {/**btn login */}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={() => {
              this._onPressLogin();
            }}>
            <Text style={styles.textlogin}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={{display: 'none'}}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  remember: {
    marginRight: 130,
  },
  image: {
    marginBottom: Sizes.s50,
    alignSelf: 'center',
  },
  image2: {
    alignSelf: 'center',
    height: Sizes.s260,
    resizeMode: 'contain',
    marginTop: Sizes.s60,
  },
  textstyle1: {
    fontSize: Sizes.s50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#335272',
  },
  textstyle2: {
    fontSize: Sizes.s45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fb9334',
  },
  textstyle3: {
    fontSize: Sizes.s35,
    marginLeft: Sizes.s20,
    fontStyle: 'italic',
    color: '#fb9334',
    // textAlign : 'center'
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d7dde3',
    // height: Sizes.s80,
    width: '80%',
    alignSelf: 'center',
    borderRadius: Sizes.s7,
    marginTop: Sizes.s35,
  },
  button: {
    height: Sizes.s80,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fb9334',
    justifyContent: 'center',
    borderRadius: Sizes.s7,
  },
  buttonFB: {
    height: Sizes.s80,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#0084ff',
    justifyContent: 'center',
    borderRadius: Sizes.s7,
  },
  removeAccount: {
    height: Sizes.s80,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#f55538',
    justifyContent: 'center',
    borderRadius: Sizes.s7,
    marginTop: Sizes.s5,
  },
  checkContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginBottom: Sizes.s25,
    marginTop: Sizes.s25,
  },
  textlogin: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: Sizes.s30,
  },
  textloginFaceBook: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: Sizes.s30,
  },
  footer: {
    color: '#797979',
    alignSelf: 'center',
    marginBottom: Sizes.s15,
  },
});
export default Login;
