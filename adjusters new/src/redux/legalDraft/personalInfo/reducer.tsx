import {
  PERSONAL_INFO,
  PERSONAL_INFO_FAILD,
  PERSONAL_INFO_SUCCESS,
} from "../../../constant/legalActionTypes";


const INIT_STATE = {
    loading: false,
    personalInfo:[],
   
}

export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case PERSONAL_INFO:
        return { ...state, loading: true}
      case PERSONAL_INFO_SUCCESS:
        return { ...state, loading: false, personalInfo: action.payload}
      case PERSONAL_INFO_FAILD:
        return { ...state, loading: false, error: action.payload }
  
      default:
        return { ...state }
    }
  }
  