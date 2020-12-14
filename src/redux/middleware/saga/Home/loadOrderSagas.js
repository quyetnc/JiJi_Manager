import {
    LOAD_ORDER,
    LOAD_ORDER_SUCCESS,
    LOAD_ORDER_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadOrderApi} from '../../api/Home/loadOrderApi';
  
  function* loadOrder(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadOrderApi(token);
  
      if (response != undefined) {
        yield put({type: LOAD_ORDER_SUCCESS, response});
      } else yield put({type: LOAD_ORDER_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_ORDER_ERROR, error});
    }
  }
  
  export function* watchloadOrder() {
    yield takeEvery(LOAD_ORDER, loadOrder);
  }
  