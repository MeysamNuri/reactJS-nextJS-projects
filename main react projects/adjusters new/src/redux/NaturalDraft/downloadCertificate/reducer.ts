import {
  DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO,
  DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_SUCCESS,
  DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  downloadCertificate: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO:
      return { ...state, loading: true };
    case DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_SUCCESS:
      return { ...state, loading: false, downloadCertificate: action.payload };
    case DOWNLOAD_NATURAL_80_HOUR_CERTIFICATE_FIELD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
