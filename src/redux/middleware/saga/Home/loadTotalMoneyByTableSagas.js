import {
    LOAD_TOTAL_MONEY_BY_TABLE,
    LOAD_TOTAL_MONEY_BY_TABLE_SUCCESS,
    LOAD_TOTAL_MONEY_BY_TABLE_ERROR,
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {loadTotalMoneyByTableApi} from '../../api/Home/loadTotalMoneyByTableApi';
  
  function* loadTotalMoneyByTable(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadTotalMoneyByTableApi(token);
  
      if (response != undefined) {
        yield put({type: LOAD_TOTAL_MONEY_BY_TABLE_SUCCESS, response});
      } else yield put({type: LOAD_TOTAL_MONEY_BY_TABLE_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_TOTAL_MONEY_BY_TABLE_ERROR, error});
    }
  }
  
  export function* watchLoadTotalMoneyByTable() {
    yield takeEvery(LOAD_TOTAL_MONEY_BY_TABLE, loadTotalMoneyByTable);
  }
  