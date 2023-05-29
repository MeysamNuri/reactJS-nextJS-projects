import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import reducers from "./redux/store"



 
const initialState = {}

const middleware = [thunk]

const store = createStore(reducers,initialState,applyMiddleware(...middleware))

export default store