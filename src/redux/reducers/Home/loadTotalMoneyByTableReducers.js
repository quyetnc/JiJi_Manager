
import {
    LOAD_TOTAL_MONEY_BY_TABLE_SUCCESS,
    LOAD_TOTAL_MONEY_BY_TABLE_ERROR,
    LOAD_TOTAL_MONEY_BY_TABLE,
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadTotalMoneyByTableReducers = (order = initialState, action) => {
    switch (action.type) {
      
      case LOAD_TOTAL_MONEY_BY_TABLE_SUCCESS:
        return action.response;
      case LOAD_TOTAL_MONEY_BY_TABLE_ERROR:
        return null;
      default:
        return order;
    }
  };
  
  export default loadTotalMoneyByTableReducers;
  