import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILD,
} from "../../constant/cartableActionTypes";


const INIT_STATE = {
    loading: false,
    userLogin:3,
    error:null
   
}

export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case USER_LOGIN:
        return { ...state, loading: true}
      case USER_LOGIN_SUCCESS:
        return { ...state, loading: false, userLogin: action.payload}
      case USER_LOGIN_FAILD:
        return { ...state, loading: false, error: action.payload }
  
      default:
        return { ...state }
    }
  }
  