import {
    LOAD_TOPPING,
    LOAD_TOPPING_SUCCESS,
    LOAD_TOPPING_ERROR,
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadAllToppingReducers = (topping = initialState, action) => {
    switch (action.type) {
      
      case LOAD_TOPPING_SUCCESS:
    
        return action.response;
      case LOAD_TOPPING_ERROR:
        return null;
      default:
        return topping;
    }
  };
  
  export default loadAllToppingReducers;
  