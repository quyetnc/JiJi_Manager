import {
    LOAD_TOPPING,
    LOAD_TOPPING_SUCCESS,
    LOAD_TOPPING_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadAllToppingApi} from '../../api/Menu/loadAllToppingApi';
  
  function* loadAllTopping(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadAllToppingApi(token);
  
      if (response != undefined) {
       
        yield put({type: LOAD_TOPPING_SUCCESS, response});
      } else yield put({type: LOAD_TOPPING_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_TOPPING_ERROR, error});
    }
  }
  
  export function* watchloadAllTopping() {
    yield takeEvery(LOAD_TOPPING, loadAllTopping);
  }
  