import {
  LOAD_FLOOR,
  LOAD_FLOOR_SUCCESS,
  LOAD_FLOOR_ERROR,
} from '../../actions/actionTypes';

const initialState = [];

const loadFloorReducers = (home = initialState, action) => {
  switch (action.type) {
    
    case LOAD_FLOOR_SUCCESS:
      return action.response;
    case LOAD_FLOOR_ERROR:
      return null;
    default:
      return home;
  }
};

export default loadFloorReducers;
