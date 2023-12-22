import {
  DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL,
  DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_SUCCESS,
  DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_FAILED,
  DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL,
  DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_SUCCESS,
  DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loadingCriminalRawForm: false,
  loadingNonAddiction: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL:
      return { ...state, loadingCriminalRawForm: true };
    case DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_SUCCESS:
      return { ...state, loadingCriminalRawForm: false, data: action.payload };
    case DOWNLOAD_RAW_FORM_CRIMINAL_NATURAL_FAILED:
      return { ...state, loadingCriminalRawForm: false, error: action.payload };
    case DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL:
      return { ...state, loadingNonAddiction: true };
    case DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_SUCCESS:
      return { ...state, loadingNonAddiction: false, data: action.payload };
    case DOWNLOAD_RAW_FORM_NON_ADDICTION_NATURAL_FAILED:
      return { ...state, loadingNonAddiction: false, error: action.payload };
    default:
      return { ...state };
  }
};
