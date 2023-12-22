import {BASE_INFO ,BASE_INFO_SUCCESS ,BASE_INFO_FAILD} from "../../constant/actionTypes"


const INIT_STATE = {
    loading: false,
    baseInfo:[],
    filterListDetails:[]
   
}

export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case BASE_INFO:
        return { ...state, loading: true}
      case BASE_INFO_SUCCESS:
        return { ...state, loading: false, baseInfo: action.payload}
      case BASE_INFO_FAILD:
        return { ...state, loading: false, error: action.payload }
  
      case "SAVE_FILTER_INFO":
        return { ...state, filterListDetails: action.payload }
  
      default:
        return { ...state }
    }
  }
  