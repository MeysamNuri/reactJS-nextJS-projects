import {
  NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
  NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  disableButton: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE:
      return { ...state, disableButton: true };
    case NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE:
      return { ...state, disableButton: false };
    default:
      return { ...state };
  }
};
