import {
  IS_COME_FROM_REGISTRATION_TRUE,
  IS_COME_FROM_REGISTRATION_FALSE,
} from "../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  isComeFromRegistration: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case IS_COME_FROM_REGISTRATION_TRUE:
      return { ...state, isComeFromRegistration: true };
    case IS_COME_FROM_REGISTRATION_FALSE:
      return { ...state, isComeFromRegistration: false };

    default:
      return { ...state };
  }
};
