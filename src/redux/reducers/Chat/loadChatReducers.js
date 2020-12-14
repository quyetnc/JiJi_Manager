import {
    LOAD_CHAT,
    LOAD_CHAT_SUCCESS,
    LOAD_CHAT_ERROR
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadChatReducers = (chat = initialState, action) => {
    switch (action.type) {
      case LOAD_CHAT_SUCCESS:
        return JSON.parse(action.response);
      case LOAD_CHAT_ERROR:
        return action.response;
      default:
        return chat;
    }
  };
  
  export default loadChatReducers;
  