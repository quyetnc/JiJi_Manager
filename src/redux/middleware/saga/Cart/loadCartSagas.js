import {
    LOAD_CART,
    LOAD_CART_SUCCESS,
    LOAD_CART_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadCartApi} from '../../api/Cart/loadCartApi';
  
  function* loadCart(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadCartApi(token);
  
      if (response != undefined) {
        yield put({type: LOAD_CART_SUCCESS, response});
      } else yield put({type: LOAD_CART_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_CART_ERROR, error});
    }
  }
  
  export function* watchloadCart() {
    yield takeEvery(LOAD_CART, loadCart);
  }
  