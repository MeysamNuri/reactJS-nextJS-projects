import {
  REGISTRATION_FINALIZE_LEGAL,
  REGISTRATION_FINALIZE_LEGAL_SUCCESS,
  REGISTRATION_FINALIZE_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  registrationFinalizeLegal: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REGISTRATION_FINALIZE_LEGAL:
      return { ...state, loading: true };
    case REGISTRATION_FINALIZE_LEGAL_SUCCESS:
      return {
        ...state,
        loading: false,
        registrationFinalizeLegal: action.payload,
      };
    case REGISTRATION_FINALIZE_LEGAL_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
