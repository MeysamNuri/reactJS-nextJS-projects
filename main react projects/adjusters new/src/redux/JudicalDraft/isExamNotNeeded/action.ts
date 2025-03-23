//redux
import {
  LEGAL_IS_EXAM_NOT_NEEDED_TRUE,
  LEGAL_IS_EXAM_NOT_NEEDED_FALSE,
} from "../../../constant/judicalActionTypes";

export const isExamNotNeededLegal = (isExamNotNeeded: boolean) => (
  dispatch: any
) => {
  if (isExamNotNeeded) {
    dispatch({
      type: LEGAL_IS_EXAM_NOT_NEEDED_TRUE,
    });
  } else {
    dispatch({
      type: LEGAL_IS_EXAM_NOT_NEEDED_FALSE,
    });
  }
};
