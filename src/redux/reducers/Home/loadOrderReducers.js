
import {
    LOAD_ORDER,
    LOAD_ORDER_SUCCESS,
    LOAD_ORDER_ERROR,
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadOrderReducers = (order = initialState, action) => {
    switch (action.type) {
      
      case LOAD_ORDER_SUCCESS:
        return action.response;
      case LOAD_ORDER_ERROR:
        return null;
      default:
        return order;
    }
  };
  
  export default loadOrderReducers;
  