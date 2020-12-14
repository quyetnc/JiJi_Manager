import {
    LOAD_MENU,
    LOAD_MENU_SUCCESS,
    LOAD_MENU_ERROR,
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadMenuReducers = (menu = initialState, action) => {
    switch (action.type) {
      
      case LOAD_MENU_SUCCESS:
    
        return action.response;
      case LOAD_MENU_ERROR:
        return null;
      default:
        return menu;
    }
  };
  
  export default loadMenuReducers;
  