import {
  CHARGON_LETTER,
  CHARGON_LETTER_SUCCESS,
  CHARGON_LETTER_FAILD,
  SUBMIT_CHARGON,
  SUBMIT_CHARGON_SUCCESS,
  SUBMIT_CHARGON_FAILD,
  LICENCE_ISSU,
  LICENCE_ISSU_SUCCESS,
  LICENCE_ISSU_FAILD,
  EXTEND_CHARGON_LETTER,
  EXTEND_CHARGON_LETTER_SUCCESS,
  EXTEND_CHARGON_LETTER_FAILD,
  CONFIRM_CHARGON_LETTER,
  CONFIRM_CHARGON_LETTER_SUCCESS,
  CONFIRM_CHARGON_LETTER_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  chargonLetter: null,
  submitLetter: null,
  loadingLicenseIssu: null,
  licenseIssu: null,
  loadingChargonLetter: null,
  extendChargonLetter: null,
  loadingExtendChargonLetter: null,
  confirmChargonLetterInfo: null,
  confirmChargonLetterLoading: false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CHARGON_LETTER:
      return { ...state, loadingChargonLetter: action.payload };
    case CHARGON_LETTER_SUCCESS:
      return {
        ...state,
        loadingChargonLetter: null,
        chargonLetter: action.payload,
      };
    case CHARGON_LETTER_FAILD:
      return { ...state, loadingChargonLetter: null, error: action.payload };

    case CONFIRM_CHARGON_LETTER:
      return { ...state, confirmChargonLetterLoading: true };
    case CONFIRM_CHARGON_LETTER_SUCCESS:
      return { ...state, confirmChargonLetterLoading: false, confirmChargonLetterInfo: action.payload };
    case CONFIRM_CHARGON_LETTER_FAILD:
      return { ...state, confirmChargonLetterLoading: false, confirmChargonLetterInfo: null, error: action.payload };


    case SUBMIT_CHARGON:
      return { ...state, loading: true };
    case SUBMIT_CHARGON_SUCCESS:
      return { ...state, loading: false, submitLetter: action.payload };
    case SUBMIT_CHARGON_FAILD:
      return { ...state, loading: false, error: action.payload };
    case LICENCE_ISSU:
      return { ...state, loadingLicenseIssu: action.payload };
    case LICENCE_ISSU_SUCCESS:
      return {
        ...state,
        loadingLicenseIssu: null,
        licenseIssu: action.payload,
      };
    case LICENCE_ISSU_FAILD:
      return { ...state, loadingExtendChargonLetter: null, error: action.payload };
    case EXTEND_CHARGON_LETTER:
      return { ...state, loadingExtendChargonLetter: action.payload };
    case EXTEND_CHARGON_LETTER_SUCCESS:
      return {
        ...state,
        loadingExtendChargonLetter: null,
        extendChargonLetter: action.payload,
      };
    case EXTEND_CHARGON_LETTER_FAILD:
      return { ...state, loadingExtendChargonLetter: null, error: action.payload };
    default:
      return { ...state };
  }
};
