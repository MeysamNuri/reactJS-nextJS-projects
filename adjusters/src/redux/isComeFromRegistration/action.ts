import {
  IS_COME_FROM_REGISTRATION_TRUE,
  IS_COME_FROM_REGISTRATION_FALSE,
} from "../../constant/commonTypes";

export const isComeFromRegistration = (is: boolean) => (dispatch: any) => {
  if (is) {
    dispatch({
      type: IS_COME_FROM_REGISTRATION_TRUE,
    });
  } else {
    dispatch({
      type: IS_COME_FROM_REGISTRATION_FALSE,
    });
  }
};
