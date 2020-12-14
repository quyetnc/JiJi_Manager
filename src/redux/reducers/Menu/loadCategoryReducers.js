import {
    LOAD_CATEGORY,
    LOAD_CATEGORY_SUCCESS,
    LOAD_CATEGORY_ERROR,
  } from '../../actions/actionTypes';
  
  const initialState = [];
  
  const loadCategoryReducers = (category = initialState, action) => {
    switch (action.type) {
      
      case LOAD_CATEGORY_SUCCESS:
    
        return action.response;
      case LOAD_CATEGORY_ERROR:
        return null;
      default:
        return category;
    }
  };
  
  export default loadCategoryReducers;
  