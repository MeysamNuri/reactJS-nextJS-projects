import {
  IS_LOGGED_IN_OR_INQUIRED_TRUE,
  IS_LOGGED_IN_OR_INQUIRED_FALSE,
} from "../../../constant/commonTypes";

export const isLoggedInOrInquired = (is: boolean) => (dispatch: any) => {
  if (is) {
    dispatch({
      type: IS_LOGGED_IN_OR_INQUIRED_TRUE,
    });
  } else {
    dispatch({
      type: IS_LOGGED_IN_OR_INQUIRED_FALSE,
    });
  }
};
