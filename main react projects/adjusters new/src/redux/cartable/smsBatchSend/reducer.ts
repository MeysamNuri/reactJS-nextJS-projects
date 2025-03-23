import {
  SMS_BATCH_SEND,
  SMS_BATCH_SEND_SUCCESS,
  SMS_BATCH_SEND_FAILD,
  SMS_BATCH_SEND_REPORT_CARTABLE,
  SMS_BATCH_SEND_REPORT_CARTABLE_SUCCESS,
  SMS_BATCH_SEND_REPORT_CARTABLE_FAILD,
  SUPERVISION_SMS_BATCH_SEND,
  SUPERVISION_SMS_BATCH_SEND_SUCCESS,
  SUPERVISION_SMS_BATCH_SEND_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loadingSmsBatchSend: false,
  loadingSmsBatchSendReport: false,
  smsBatchSend: null,
  loadingSupervisionSmsBatch: false,
  supervisionSmsBatchSend: null,
  sendBatchSpecificTypeinfo:null,
  sendBatchSpecificTypeLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SMS_BATCH_SEND:
      return { ...state, loadingSmsBatchSend: true };
    case SMS_BATCH_SEND_SUCCESS:
      return {
        ...state,
        loadingSmsBatchSend: false,
        smsBatchSend: action.payload,
      };
    case SMS_BATCH_SEND_FAILD:
      return { ...state, loadingSmsBatchSend: false, error: action.payload };
    case SMS_BATCH_SEND_REPORT_CARTABLE:
      return { ...state, loadingSmsBatchSendReport: true };
    case SMS_BATCH_SEND_REPORT_CARTABLE_SUCCESS:
      return {
        ...state,
        loadingSmsBatchSendReport: false,
        smsBatchSend: action.payload,
      };
    case SMS_BATCH_SEND_REPORT_CARTABLE_FAILD:
      return {
        ...state,
        loadingSmsBatchSendReport: false,
        error: action.payload,
      };

    case "SEND_BATCH_SPECIFIC_TYPE":
      return { ...state, sendBatchSpecificTypeLoading: true };
    case "SEND_BATCH_SPECIFIC_TYPE":
      return { ...state, sendBatchSpecificTypeLoading: false,sendBatchSpecificTypeinfo:action.payload };
    case "SEND_BATCH_SPECIFIC_TYPE":
      return { ...state, sendBatchSpecificTypeLoading: false,sendBatchSpecificTypeinfo:null,error: action.payload, };

      
    case SMS_BATCH_SEND:
      return { ...state, loadingSmsBatchSend: true };
    case SMS_BATCH_SEND_SUCCESS:
      return {
        ...state,
        loadingSmsBatchSend: false,
        smsBatchSend: action.payload,
      };
    case SMS_BATCH_SEND_FAILD:
      return { ...state, loadingSmsBatchSend: false, error: action.payload };

    case SUPERVISION_SMS_BATCH_SEND:
      return { ...state, loadingSupervisionSmsBatch: true };
    case SUPERVISION_SMS_BATCH_SEND_SUCCESS:
      return {
        ...state,
        loadingSupervisionSmsBatch: false,
        supervisionSmsBatchSend: action.payload,
      };
    case SUPERVISION_SMS_BATCH_SEND_FAILD:
      return { ...state, loadingSupervisionSmsBatch: false, error: action.payload };

    default:
      return { ...state };
  }
};
