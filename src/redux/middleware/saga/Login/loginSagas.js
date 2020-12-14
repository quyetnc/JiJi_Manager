import {
    POST_LOGIN,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {postLogin} from '../../api/Login/loginApi';
  import {loadInformationUserApi} from '../../api/Login/loadInformationUserApi';
  
  function* signInFlow(action) {
    const {username, password} = action.data;
    
    try {
      const response = yield postLogin(username, password);
      if (response != undefined) {
        yield put({type: SIGNIN_SUCCESS, response});
      } else {
        yield put({type: SIGNIN_ERROR, response});
      }
    } catch (error) {
      yield put({type: SIGNIN_ERROR, error});
    }
  }
  
  export function* watchLogin() {
    yield takeEvery(POST_LOGIN, signInFlow);
  }
  
  //Load User


    
  function* loadInformationUser(action) {
    const {token} = action.data;
    
    try {
      const response = yield loadInformationUserApi(token);
      if (response != undefined) {
        yield put({type: LOAD_USER_SUCCESS, response});
      } else {
        yield put({type: LOAD_USER_ERROR, response});
      }
    } catch (error) {
      yield put({type: LOAD_USER_ERROR, error});
    }
  }
  
  export function* watchLoadInformationUser() {
    yield takeEvery(LOAD_USER, loadInformationUser);
  }
  