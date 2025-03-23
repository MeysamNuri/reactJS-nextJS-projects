//redux
import {
  NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_TRUE,
  NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_FALSE,
} from "../../../constant/actionTypes";

export const disableNextButtonFieldInfoNatural = (disable: boolean) => (
  dispatch: any
) => {
  if (disable) {
    dispatch({
      type: NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_TRUE,
    });
  } else {
    dispatch({
      type: NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_FALSE,
    });
  }
};
