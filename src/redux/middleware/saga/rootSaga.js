import {all} from 'redux-saga/effects';

import {watchLogin,watchLoadInformationUser} from './Login/loginSagas';
import {watchloadFloor} from './Home/loadFloorSagas';
import {watchloadOrder} from './Home/loadOrderSagas';
import {watchLoadTotalMoneyByTable} from './Home/loadTotalMoneyByTableSagas';
import {watchloadMenu} from './Menu/loadMenuSagas';
import {watchloadAllTopping} from './Menu/loadAllToppingSaga';
import {watchloadCart} from './Cart/loadCartSagas';
import {watchloadCategory} from './Menu/loadCategorySaga';
import {watchAddChat,watchLoadChat} from './Chat/chatSagas';
import {watchloadProfile} from './Profile/loadProfileSaga';
// import {watchFecthCourses} from './courseSagas';
// import {watchRoomBuilding} from './roomBuildinSagas';
// import {watchCreateCourse} from './createCourseSagas';
// import {watchGetCoursesDay} from './courseDaySagas';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchloadFloor(),
    watchloadMenu(),
    watchloadAllTopping(),
    watchloadCart(),
    watchloadCategory(),
    watchAddChat(),
    watchLoadChat(),
    watchLoadInformationUser(),
    watchloadProfile(),
    watchloadOrder(),
    watchLoadTotalMoneyByTable(),
    //, watchFecthCourses(),
    // watchRoomBuilding(),
    // watchCreateCourse(),
    // watchGetCoursesDay(),
  ]);
}
