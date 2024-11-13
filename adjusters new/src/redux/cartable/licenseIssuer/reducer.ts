import {
  LICENSE_ISSUER,
  LICENSE_ISSUER_SUCCESS,
  LICENSE_ISSUER_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loadingLicenseIssuer: false,
  licenseIssuer: null,
  licenseIssuerError: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LICENSE_ISSUER:
      return { licenseIssuer: null, loadingLicenseIssuer: true, licenseIssuerError: null };
    case LICENSE_ISSUER_SUCCESS:
      return {
        ...state,
        loadingLicenseIssuer: false,
        licenseIssuer: action.payload,
      };
    case LICENSE_ISSUER_FAILD:
      return { ...state, loadingLicenseIssuer: false, licenseIssuerError: action.payload };

    default:
      return { ...state };
  }
};
