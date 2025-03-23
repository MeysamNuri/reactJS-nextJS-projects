import {
  LEGAL_IS_EXAM_NOT_NEEDED_TRUE,
  LEGAL_IS_EXAM_NOT_NEEDED_FALSE,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  isExamNotNeeded: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_IS_EXAM_NOT_NEEDED_TRUE:
      return { ...state, isExamNotNeeded: true };
    case LEGAL_IS_EXAM_NOT_NEEDED_FALSE:
      return { ...state, isExamNotNeeded: false };
    default:
      return { ...state };
  }
};
