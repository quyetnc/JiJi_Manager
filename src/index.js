import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers';
import rootSaga from './redux/middleware/saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
import AppContainer from './screens/app';
export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);
