import {
    ADD_CHAT,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_ERROR
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const chatReducers = (chat = initialState, action) => {
    switch (action.type) {
      case ADD_CHAT_SUCCESS:
        return JSON.parse(action.response);
      case ADD_CHAT_ERROR:
        return action.response;
      default:
        return chat;
    }
  };
  
  export default chatReducers;
  