import {
  JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO,
  JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_SUCCESS,
  JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  workLocationInfoDraftJudical: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO:
      return { ...state, loading: true };
    case JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        workLocationInfoDraftJudical: action.payload,
      };
    case JUDICIAL_DRAFT_GET_WORK_LOCATION_INFO_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
