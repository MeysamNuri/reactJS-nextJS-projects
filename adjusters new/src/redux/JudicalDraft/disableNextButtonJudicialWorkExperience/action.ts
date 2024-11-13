//redux
import {
  JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
  JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
} from "../../../constant/judicalActionTypes";

export const disableNextButtonJudicialWorkExperience = (
  buttonState: boolean
) => (dispatch: any) => {
  if (buttonState) {
    dispatch({
      type: JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
    });
  } else {
    dispatch({
      type: JUDICIAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
    });
  }
};
