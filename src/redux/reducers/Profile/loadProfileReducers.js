import {
    LOAD_PROFILE_SUCCESS,
    LOAD_PROFILE_ERROR
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadProfileReducers = (profile = initialState, action) => {
    switch (action.type) {
      case LOAD_PROFILE_SUCCESS:
        return JSON.parse(action.response);
      case LOAD_PROFILE_ERROR:
        return action.response;
      default:
        return profile;
    }
  };
  
  export default loadProfileReducers;
  