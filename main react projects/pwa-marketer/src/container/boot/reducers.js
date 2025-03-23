import {combineReducers} from 'redux';
import FormReducer from '../Reducers/FormReducer'
import Token from '../Reducers/Token'
import snackbarReducer from '../Reducers/snackbarReducer';
import insuranceReducer from '../components/insuranceModal/reducer'

export default combineReducers({ FormReducer, Token, snackbarReducer, insuranceReducer });
