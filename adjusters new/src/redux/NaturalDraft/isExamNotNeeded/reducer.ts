import {
  NATURAL_IS_EXAM_NOT_NEEDED_TRUE,
  NATURAL_IS_EXAM_NOT_NEEDED_FALSE,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  isExamNotNeeded: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_IS_EXAM_NOT_NEEDED_TRUE:
      return { ...state, isExamNotNeeded: true };
    case NATURAL_IS_EXAM_NOT_NEEDED_FALSE:
      return { ...state, isExamNotNeeded: false };
    default:
      return { ...state };
  }
};
