import {
  LOAD_FLOOR,
  LOAD_FLOOR_ERROR,
  LOAD_FLOOR_SUCCESS,
} from '../../../actions/actionTypes';

import {call, takeEvery, put} from 'redux-saga/effects';

import {loadFloorApi} from '../../api/Home/loadFloorApi';

function* loadFloor(action) {
  const {token} = action.data;

  try {
    const response = yield loadFloorApi(token);

    if (response != undefined) {
      yield put({type: LOAD_FLOOR_SUCCESS, response});
    } else yield put({type: LOAD_FLOOR_ERROR, response});
  } catch (error) {
    yield put({type: LOAD_FLOOR_ERROR, error});
  }
}

export function* watchloadFloor() {
  yield takeEvery(LOAD_FLOOR, loadFloor);
}
