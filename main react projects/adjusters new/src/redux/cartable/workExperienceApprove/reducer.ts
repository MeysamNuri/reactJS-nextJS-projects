import {
  WORKEXPERIENCE_APPROVE,
  WORKEXPERIENCE_APPROVEE_SUCCESS,
  WORKEXPERIENCE_APPROVE_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  workExperienceApprove: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case WORKEXPERIENCE_APPROVE:
      return { ...state, loading: true };
    case WORKEXPERIENCE_APPROVEE_SUCCESS:
      return {
        ...state,
        loading: false,
        workExperienceApprove: action.payload,
      };
    case WORKEXPERIENCE_APPROVE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
