import {
  REGISTRATION_FINALIZE,
  REGISTRATION_FINALIZE_SUCCESS,
  REGISTRATION_FINALIZE_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  registrationFinalize: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REGISTRATION_FINALIZE:
      return { ...state, loading: true };
    case REGISTRATION_FINALIZE_SUCCESS:
      return { ...state, loading: false, registrationFinalize: action.payload };
    case REGISTRATION_FINALIZE_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
