import {
    LOAD_CATEGORY,
    LOAD_CATEGORY_SUCCESS,
    LOAD_CATEGORY_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadCategoryApi} from '../../api/Menu/loadCategoryApi';
  
  function* loadCategory(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadCategoryApi(token);
  
      if (response != undefined) {
       
        yield put({type: LOAD_CATEGORY_SUCCESS, response});
      } else yield put({type: LOAD_CATEGORY_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_CATEGORY_ERROR, error});
    }
  }
  
  export function* watchloadCategory() {
    yield takeEvery(LOAD_CATEGORY, loadCategory);
  }
  