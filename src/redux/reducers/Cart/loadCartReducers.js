import {
    LOAD_CART,
    LOAD_CART_SUCCESS,
    LOAD_CART_ERROR,
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadCartReducers = (cart = initialState, action) => {
    switch (action.type) {
      
      case LOAD_CART_SUCCESS:
        return action.response;
      case LOAD_CART_ERROR:
        return null;
      default:
        return cart;
    }
  };
  
  export default loadCartReducers;
  