import {
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadInformationUserReducers = (user = initialState, action) => {
    switch (action.type) {
      
      case LOAD_USER_SUCCESS:
        return JSON.parse(action.response);
      case LOAD_USER_ERROR:
        return null;
      default:
        return user;
    }
  };
  
  export default loadInformationUserReducers;
  