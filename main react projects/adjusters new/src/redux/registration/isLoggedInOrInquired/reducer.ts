import {
  IS_LOGGED_IN_OR_INQUIRED_TRUE,
  IS_LOGGED_IN_OR_INQUIRED_FALSE,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  result: false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case IS_LOGGED_IN_OR_INQUIRED_TRUE:
      return { ...state, result: true };
    case IS_LOGGED_IN_OR_INQUIRED_FALSE:
      return { ...state, result: false };

    default:
      return { ...state };
  }
};
