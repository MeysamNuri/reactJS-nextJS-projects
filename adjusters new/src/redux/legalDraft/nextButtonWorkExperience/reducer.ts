import {
  LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
  LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  disableButton: false,
};

const disableNextButtonStateDraftLegal = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE:
      return { ...state, disableButton: true };
    case LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE:
      return { ...state, disableButton: false };
    default:
      return { ...state };
  }
};

export default disableNextButtonStateDraftLegal;
