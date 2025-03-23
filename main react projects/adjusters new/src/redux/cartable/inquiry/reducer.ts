import {
  INQUIRY_PAJOOHESHKADEH,
  INQUIRY_PAJOOHESHKADEH_SUCCESS,
  INQUIRY_PAJOOHESHKADEH_FAILD,
  INQUIRY_CERTIFICATIN_TRAINING,
  INQUIRY_CERTIFICATIN_TRAINING_SUCCESS,
  INQUIRY_CERTIFICATIN_TRAINING_FAILD,
  INQUIRY_LEAGACY,
  INQUIRY_LEAGACY_SUCCESS,
  INQUIRY_LEAGACY_FAILD,
  INQUIRU_LIST,
  INQUIRU_LIST_SUCCESS,
  INQUIRU_LIST_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  inquiryPajooheshkadeh: null,
  loadingCertificate: false,
  inquiryCertificate: null,
  loadingLegacy: false,
  inquiryLegacy: null,
  inquiryList:null,
  loadingInquiryList:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case INQUIRY_PAJOOHESHKADEH:
      return { ...state, loading: true };
    case INQUIRY_PAJOOHESHKADEH_SUCCESS:
      return {
        ...state,
        loading: false,
        inquiryPajooheshkadeh: action.payload,
      };
    case INQUIRY_PAJOOHESHKADEH_FAILD:
      return { ...state, loading: false, error: action.payload };

    case INQUIRY_CERTIFICATIN_TRAINING:
      return { ...state, loadingCertificate: true };
    case INQUIRY_CERTIFICATIN_TRAINING_SUCCESS:
      return {
        ...state,
        loadingCertificate: false,
        inquiryCertificate: action.payload,
      };
    case INQUIRY_CERTIFICATIN_TRAINING_FAILD:
      return { ...state, loadingCertificate: false, error: action.payload };

      
    case INQUIRY_LEAGACY:
      return { ...state, loadingLegacy: true };
    case INQUIRY_LEAGACY_SUCCESS:
      return {
        ...state,
        loadingLegacy: false,
        inquiryLegacy: action.payload,
      };
    case INQUIRY_LEAGACY_FAILD:
      return { ...state, loadingLegacy: false, error: action.payload };

      case INQUIRU_LIST:
        return { ...state, loadingInquiryList: true };
      case INQUIRU_LIST_SUCCESS:
        return {
          ...state,
          loadingInquiryList: false,
          inquiryList: action.payload,
        };
      case INQUIRU_LIST_FAILD:
        return { ...state, loadingInquiryList: false, error: action.payload };

    default:
      return { ...state };
  }
};
