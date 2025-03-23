import {
  DENOMINATION_RELIGION_ID,
  DENOMINATION_RELIGION_ID_SUCCESS,
  DENOMINATION_RELIGION_ID_FAILD,
} from "../../constant/actionTypes";


const INIT_STATE = {
    loading: false,
    listDenonationReligion:[],
   
}

export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DENOMINATION_RELIGION_ID:
        return { ...state, loading: true}
      case DENOMINATION_RELIGION_ID_SUCCESS:
        return { ...state, loading: false, listDenonationReligion: action.payload}
      case DENOMINATION_RELIGION_ID_FAILD:
        return { ...state, loading: false, error: action.payload }
  
      default:
        return { ...state }
    }
  }
  