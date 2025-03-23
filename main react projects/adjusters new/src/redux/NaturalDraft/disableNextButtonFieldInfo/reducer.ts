import {
  NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_TRUE,
  NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_FALSE,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  disableNextButtonFieldInfo: true,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_TRUE:
      return { ...state, disableNextButtonFieldInfo: true };
    case NATURAL_DISABLE_NEXT_BUTTON_FIELDINFO_FALSE:
      return { ...state, disableNextButtonFieldInfo: false };
    default:
      return { ...state };
  }
};
