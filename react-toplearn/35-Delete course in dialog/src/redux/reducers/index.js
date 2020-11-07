import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import { AllCoursesReducer } from "./AllCourses";
import { courseReducer } from "./course";
import {SetUserRducers} from './users'

export const reducers=combineReducers({
    courses:AllCoursesReducer,
    course:courseReducer,
    user:SetUserRducers,
    loadingBar:loadingBarReducer
})