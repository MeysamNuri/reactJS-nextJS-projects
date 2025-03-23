//redux
import {
  NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
  NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
} from "../../../constant/actionTypes";

export const disableNextButtonNaturalWorkExperience = (
  buttonState: boolean
) => (dispatch: any) => {
  if (buttonState) {
    dispatch({
      type: NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
    });
  } else {
    dispatch({
      type: NATURAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
    });
  }
};
