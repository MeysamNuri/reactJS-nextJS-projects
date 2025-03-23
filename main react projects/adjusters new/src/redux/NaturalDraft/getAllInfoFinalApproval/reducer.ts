import {
  GET_ALL_INFO_FINAL_APPROVAL,
  GET_ALL_INFO_FINAL_APPROVAL_SUCCESS,
  GET_ALL_INFO_FINAL_APPROVAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  getAllInfoForFinalApprovalDraft: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_ALL_INFO_FINAL_APPROVAL:
      return { ...state, loading: true };
    case GET_ALL_INFO_FINAL_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getAllInfoForFinalApprovalDraft: action.payload,
      };
    case GET_ALL_INFO_FINAL_APPROVAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
