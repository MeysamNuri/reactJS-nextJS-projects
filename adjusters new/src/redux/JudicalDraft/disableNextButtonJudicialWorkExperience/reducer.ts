import {
  JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
  JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  disableButton: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE:
      return { ...state, disableButton: true };
    case JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE:
      return { ...state, disableButton: false };
    default:
      return { ...state };
  }
};
