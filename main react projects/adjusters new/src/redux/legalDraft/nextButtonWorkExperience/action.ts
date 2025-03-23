//redux
import {
  LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
  LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
} from "../../../constant/legalActionTypes";

export const disableNextButtonLegalWorkExperience = (buttonState: boolean) => (
  dispatch: any
) => {
  if (buttonState) {
    dispatch({
      type: LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_TRUE,
    });
  } else {
    dispatch({
      type: LEGAL_DRAFT_DISABLE_NEXT_BUTTON_WORK_EXPERIENCE_FALSE,
    });
  }
};
