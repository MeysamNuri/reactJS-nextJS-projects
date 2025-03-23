import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../reducers";
import thunk from "redux-thunk";
import { getCourses } from "../actions/courses";
import { loadingBarMiddleware } from "react-redux-loading-bar";

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk,loadingBarMiddleware()),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


store.dispatch(getCourses())