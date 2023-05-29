import {
  LIST_BOARD_MEMBER,
  LIST_BOARD_MEMBER_SUCCESS,
  LIST_BOARD_MEMBER_FAILD,
  RESET_LIST_BOARD_MEMBER,
  APPLICANT_WORK_LOCATION_INFO,
  APPLICANT_WORK_LOCATION_INFO_SUCCESS,
  APPLICANT_WORK_LOCATION_INFO_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  listBoardMember: null,
  appicantWorkLocationInfo:null,
  applicantWorkLocationLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_BOARD_MEMBER:
      return { ...state, loading: true };
    case LIST_BOARD_MEMBER_SUCCESS:
      return { ...state, loading: false, listBoardMember: action.payload };
    case LIST_BOARD_MEMBER_FAILD:
      return { ...state, loading: false, error: action.payload };
    case RESET_LIST_BOARD_MEMBER:
      return { ...state, loading: false, listBoardMember: null };
      case APPLICANT_WORK_LOCATION_INFO:
        return { ...state, applicantWorkLocationLoading: true };
      case APPLICANT_WORK_LOCATION_INFO_SUCCESS:
        return { ...state, applicantWorkLocationLoading: false,appicantWorkLocationInfo:action.payload  };
      case APPLICANT_WORK_LOCATION_INFO_FAILD:
        return { ...state, applicantWorkLocationLoading: false,appicantWorkLocationInfo:null,error: action.payload };
  
        default:
      return { ...state };
  }
};
