import {
    LOAD_PROFILE,
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadProfileApi} from '../../api/Profile/loadProfileApi';
  
  function* loadProfile(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadProfileApi(token);
  
      if (response != undefined) {
       
        yield put({type: LOAD_PROFILE_SUCCESS, response});
      } else yield put({type: LOAD_PROFILE_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_PROFILE_ERROR, error});
    }
  }
  
  export function* watchloadProfile() {
    yield takeEvery(LOAD_PROFILE, loadProfile);
  }
  