import {
  WORK_EXPERIENCE_REJECT_REASON,
  WORK_EXPERIENCE_REJECT_REASON_SUCCESS,
  WORK_EXPERIENCE_REJECT_REASON_FAILED,
} from "../../../../constant/actionTypes";

const INIT_STATE = {
  loadingWorkExperienceRejectReason: false,
  workExperienceRejectReason: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case WORK_EXPERIENCE_REJECT_REASON:
      return { ...state, loadingWorkExperienceRejectReason: true };
    case WORK_EXPERIENCE_REJECT_REASON_SUCCESS:
      return {
        ...state,
        loadingWorkExperienceRejectReason: false,
        workExperienceRejectReason: action.payload,
      };
    case WORK_EXPERIENCE_REJECT_REASON_FAILED:
      return { ...state, loadingWorkExperienceRejectReason: false, error: action.payload };
    default:
      return { ...state };
  }
};
