import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
// import logger from "redux-logger";
import rootReducer from "./reducers";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from './sagas'
// const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(compose(applyMiddleware(ReduxThunk)))
);
// sagaMiddleware.run(rootSaga);
export default store;
