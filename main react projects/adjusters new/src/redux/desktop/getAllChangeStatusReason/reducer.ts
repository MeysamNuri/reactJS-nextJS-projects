import {
  CHANGE_STATUS_REASON,
  CHANGE_STATUS_REASON_SUCCESS,
  CHANGE_STATUS_REASON_FAILD,
  GET_NEXT_STATUSES,
  GET_NEXT_STATUSES_SUCCESS,
  GET_NEXT_STATUSES_FAILD,
  SAVE_CHANGE_STATUSES,
  SAVE_CHANGE_STATUSES_SUCCESS,
  SAVE_CHANGE_STATUSES_FAILD,
  STATUSES_HISTORY,
  STATUSES_HISTORY_SUCCESS,
  STATUSES_HISTORY_FAILD,
  GET_APPLICANT_STATUS,
  GET_APPLICANT_STATUS_SUCCESS,
  GET_APPLICANT_STATUS_FAILD
} from "../../../constant/desktop";
const INIT_STATE = {
  loading: false,
  allChangeStatusReason: "",
  allNextStatus:"",
  loadingAllNextStatus:false,
  loadingSaveChangeStatus:false,
  saveChangeStatus:null,
  statusesHistory:null,
  loadingStatusesHistory:false,
  statusList:null,
  loadingStatusList:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CHANGE_STATUS_REASON:
      return { ...state, loading: true };
    case CHANGE_STATUS_REASON_SUCCESS:
      return {
        ...state,
        loading: false,
        allChangeStatusReason: action.payload,
      };
    case CHANGE_STATUS_REASON_FAILD:
      return { ...state, loading: false, error: action.payload };

      case GET_NEXT_STATUSES:
        return { ...state, loadingAllNextStatus: true };
      case GET_NEXT_STATUSES_SUCCESS:
        return {
          ...state,
          loadingAllNextStatus: false,
          allNextStatus: action.payload,
        };
      case GET_NEXT_STATUSES_FAILD:
        return { ...state, loadingAllNextStatus: false, error: action.payload };

        case SAVE_CHANGE_STATUSES:
          return { ...state, loadingSaveChangeStatus: true };
        case SAVE_CHANGE_STATUSES_SUCCESS:
          return {
            ...state,
            loadingSaveChangeStatus: false,
            saveChangeStatus: action.payload,
          };
        case SAVE_CHANGE_STATUSES_FAILD:
          return { ...state, loadingSaveChangeStatus: false, error: action.payload };

          case STATUSES_HISTORY:
            return { ...state, loadingStatusesHistory: true };
          case STATUSES_HISTORY_SUCCESS:
            return {
              ...state,
              loadingStatusesHistory: false,
              statusesHistory: action.payload,
            };
          case STATUSES_HISTORY_FAILD:
            return { ...state, loadingStatusesHistory: false, error: action.payload };

            case GET_APPLICANT_STATUS:
              return { ...state, loadingStatusList: true };
            case GET_APPLICANT_STATUS_SUCCESS:
              return {
                ...state,
                loadingStatusList: false,
                statusList: action.payload,
              };
            case GET_APPLICANT_STATUS_FAILD:
              return { ...state, loadingStatusList: false, error: action.payload };

    default:
      return { ...state };
  }
};
