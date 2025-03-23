//redux
import {
  NATURAL_IS_EXAM_NOT_NEEDED_TRUE,
  NATURAL_IS_EXAM_NOT_NEEDED_FALSE,
} from "../../../constant/actionTypes";

export const isExamNotNeededNatural = (isExamNotNeeded: boolean) => (
  dispatch: any
) => {
  if (isExamNotNeeded) {
    dispatch({
      type: NATURAL_IS_EXAM_NOT_NEEDED_TRUE,
    });
  } else {
    dispatch({
      type: NATURAL_IS_EXAM_NOT_NEEDED_FALSE,
    });
  }
};
