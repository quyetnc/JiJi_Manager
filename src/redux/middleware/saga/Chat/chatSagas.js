import {
    ADD_CHAT,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_ERROR,
    LOAD_CHAT,
    LOAD_CHAT_SUCCESS,
    LOAD_CHAT_ERROR
  } from '../../../actions/actionTypes';
  
  import {call, takeEvery, put} from 'redux-saga/effects';
  
  import {addChatApi,loadChatApi} from '../../api/Chat/chatApi';
  
  function* addChat(action) {
    const {token} = action.data;
  
    try {
      const response = yield addChatApi(token);
  
      if (response != undefined) {
        yield put({type: ADD_CHAT_SUCCESS, response});
      } else yield put({type: ADD_CHAT_ERROR, response});
    } catch (error) {
      yield put({type: ADD_CHAT_ERROR, error});
    }
  }
  
  export function* watchAddChat() {
    yield takeEvery(ADD_CHAT, addChat);
  }
  //Load Chat
  function* loadChat(action) {
    const {token} = action.data;
  
    try {
      const response = yield loadChatApi(token);
      if (response != undefined) {
        yield put({type: LOAD_CHAT_SUCCESS, response});
      } else yield put({type: LOAD_CHAT_ERROR, response});
    } catch (error) {
      yield put({type: LOAD_CHAT_ERROR, error});
    }
  }
  
  export function* watchLoadChat() {
    yield takeEvery(LOAD_CHAT, loadChat);
  }
  