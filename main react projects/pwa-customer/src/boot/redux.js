import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; 
import ReduxThunk from "redux-thunk";

import rootReducer from "./reducers";


// const persistConfig = {
  //   key: "root",
  //   storage,
  // };
  
  // const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  
  // let store = createStore(persistedReducer, composeEnhancers(compose(applyMiddleware(ReduxThunk))));
  // let persistor = persistStore(store);
  
  // export { store, persistor }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(compose(applyMiddleware(ReduxThunk)))
  );
  // sagaMiddleware.run(rootSaga);
  export default store;