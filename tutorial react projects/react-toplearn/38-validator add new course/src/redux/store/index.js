import { loadingBarMiddleware } from "react-redux-loading-bar";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getCourses } from "../actions/courses";
import { reducers } from "../reducers";


export const store=createStore(
    reducers,
    compose(
        applyMiddleware(thunk,loadingBarMiddleware()),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
store.dispatch(getCourses())

store.subscribe(()=>console.log(store.getState()))