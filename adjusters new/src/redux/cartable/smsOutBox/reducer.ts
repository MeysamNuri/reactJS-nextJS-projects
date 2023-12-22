import {
  SMS_OUT_BOX_LIST,
  SMS_OUT_BOX_LIST_SUCCESS,
  SMS_OUT_BOX_LIST_FAILD,
  SMS_OUT_BOX_LIST_APPLICANT_ID,
  SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS,
  SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD,
  SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID,
  SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS,
  SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD,
  SUPERVISION_SMS_OUT_BOX_LIST,
  SUPERVISION_SMS_OUT_BOX_LIST_SUCCESS,
  SUPERVISION_SMS_OUT_BOX_LIST_FAILD,
  SMS_SEND_SPECIFIC_TYPE,
  SMS_SEND_SPECIFIC_TYPE_SUCCESS,
  SMS_SEND_SPECIFIC_TYPE_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  smsOutBoxList: null,
  loadingSmsOutBoxListApplicantId: false,
  smsOutBoxListApplicantId: null,
  loadingSupervisionSmsOutBoxListApplicantId: false,
  supervisionsmsOutBoxListApplicantId: null,
  loadingSupervisionSmsOutBoxList: false,
  supervisionSmsOutBoxList: null,
  smsSpecificTypeInfo:null,
  smsSpecificTypeLoading:false
  
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SMS_OUT_BOX_LIST:
      return { ...state, loading: true };
    case SMS_OUT_BOX_LIST_SUCCESS:
      return { ...state, loading: false, smsOutBoxList: action.payload };
    case SMS_OUT_BOX_LIST_FAILD:
      return { ...state, loading: false, error: action.payload };

    case SMS_SEND_SPECIFIC_TYPE:
      return { ...state, smsSpecificTypeLoading: true };
    case SMS_SEND_SPECIFIC_TYPE_SUCCESS:
      return { ...state, smsSpecificTypeLoading: false,smsSpecificTypeInfo:action.payload };
    case SMS_SEND_SPECIFIC_TYPE_FAILD:
      return { ...state, smsSpecificTypeLoading: false,smsSpecificTypeInfo:null,error: action.payload  };


    case SMS_OUT_BOX_LIST_APPLICANT_ID:
      return { ...state, loadingSmsOutBoxListApplicantId: true };
    case SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS:
      return {
        ...state,
        loadingSmsOutBoxListApplicantId: false,
        smsOutBoxListApplicantId: action.payload,
      };
    case SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD:
      return {
        ...state,
        loadingSmsOutBoxListApplicantId: false,
        error: action.payload,
      };

    case SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID:
      return { ...state, loadingSupervisionSmsOutBoxListApplicantId: true };
    case SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_SUCCESS:
      return {
        ...state,
        loadingSupervisionSmsOutBoxListApplicantId: false,
        supervisionsmsOutBoxListApplicantId: action.payload,
      };
    case SUPERVISION_SMS_OUT_BOX_LIST_APPLICANT_ID_FAILD:
      return {
        ...state,
        loadingSupervisionSmsOutBoxListApplicantId: false,
        error: action.payload,
      };


      case SUPERVISION_SMS_OUT_BOX_LIST:
        return { ...state, loadingSupervisionSmsOutBoxList: true };
      case SUPERVISION_SMS_OUT_BOX_LIST_SUCCESS:
        return {
          ...state,
          loadingSupervisionSmsOutBoxList: false,
          supervisionSmsOutBoxList: action.payload,
        };
      case SUPERVISION_SMS_OUT_BOX_LIST_FAILD:
        return {
          ...state,
          loadingSupervisionSmsOutBoxList: false,
          error: action.payload,
        };



    default:
      return { ...state };
  }
};
