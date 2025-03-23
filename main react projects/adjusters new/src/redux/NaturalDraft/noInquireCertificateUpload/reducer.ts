import {
  NO_INQUIRE_CERTIFICATE_UPLOAD,
  NO_INQUIRE_CERTIFICATE_UPLOAD_SUCCESS,
  NO_INQUIRE_CERTIFICATE_UPLOAD_FAILD,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  noInquireCertificatePic: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NO_INQUIRE_CERTIFICATE_UPLOAD:
      return { ...state, loading: true };
    case NO_INQUIRE_CERTIFICATE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        noInquireCertificatePic: action.payload,
      };
    case NO_INQUIRE_CERTIFICATE_UPLOAD_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
