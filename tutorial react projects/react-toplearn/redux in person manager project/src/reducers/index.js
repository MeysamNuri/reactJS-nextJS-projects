import { Form } from "react-bootstrap";
import {combineReducers} from 'redux'
import { PersonReducer } from "./Person";
import {PersonsReducer} from './Persons'
import {ShowPersonReducer} from './ShowPerson'

export const reducers=combineReducers({
    persons:PersonsReducer,
    person:PersonReducer,
    showPerson:ShowPersonReducer
})