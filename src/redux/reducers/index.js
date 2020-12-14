import {combineReducers} from 'redux';
import allToppingReducers from './Menu/loadAllToppingReducers';
import loadFloorReducers from './Home/loadFloorReducers';
import loadOrderReducers from './Home/loadOrderReducers';
import loadTotalMoneyByTableReducers from './Home/loadTotalMoneyByTableReducers';
import loadMenuReducers from './Menu/loadMenuReducers';
import loginReducers from './Login/loginReducers';
import loadInformationUserReducers from './Login/loadInformationUserReducers';
import loadCategoryReducers from './Menu/loadCategoryReducers';
import chatReducers from './Chat/chatReducers';
import loadChatReducers from './Chat/loadChatReducers';
import loadProfileReducers from './Profile/loadProfileReducers';
const rootReducer = combineReducers({
  allToppingReducers,
  loadFloorReducers,
  loadMenuReducers,
  loginReducers,
  loadCategoryReducers,
  chatReducers,
  loadChatReducers,
  loadInformationUserReducers,
  loadProfileReducers,
  loadOrderReducers,
  loadTotalMoneyByTableReducers,
});
// const rootReducer = (state, action) => {
//   if (action.type === SIGNIN_SUCCESS) {
//     var error = JSON.parse(action.response).error_description;
//     //Reset State Login when Login Failed
//     if (error !== undefined) {
//       state = undefined;
//     }
//   }
//   return appReducer(state, action);
// };
export default rootReducer;
