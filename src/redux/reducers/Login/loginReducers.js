import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  DID_LOGIN_ACTION,
  RESET_LOGIN,
} from '../../actions/actionTypes';

const initialState = [];

const loginReducers = (login = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return JSON.parse(action.response);
    case SIGNIN_ERROR:
      return action.response;
    case DID_LOGIN_ACTION:
      return 0;
    case RESET_LOGIN:
      return (resultCode = -1);
    default:
      return login;
  }
};

export default loginReducers;
