import {
    LOAD_MENU,
    LOAD_MENU_SUCCESS,
    LOAD_MENU_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadMenuApi} from '../../api/Menu/loadMenuApi';
  
  function* loadMenu(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadMenuApi(token);
  
      if (response != undefined) {
       
        yield put({type: LOAD_MENU_SUCCESS, response});
      } else yield put({type: LOAD_MENU_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_MENU_ERROR, error});
    }
  }
  
  export function* watchloadMenu() {
    yield takeEvery(LOAD_MENU, loadMenu);
  }
  