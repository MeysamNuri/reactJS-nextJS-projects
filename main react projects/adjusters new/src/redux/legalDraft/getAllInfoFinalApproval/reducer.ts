import {
  GET_ALL_INFO_FINAL_APPROVAL_LEGAL,
  GET_ALL_INFO_FINAL_APPROVAL_LEGAL_SUCCESS,
  GET_ALL_INFO_FINAL_APPROVAL_LEGAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  getAllInfoForFinalApproval: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_ALL_INFO_FINAL_APPROVAL_LEGAL:
      return { ...state, loading: true };
    case GET_ALL_INFO_FINAL_APPROVAL_LEGAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllInfoForFinalApproval: action.payload,
      };
    case GET_ALL_INFO_FINAL_APPROVAL_LEGAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
