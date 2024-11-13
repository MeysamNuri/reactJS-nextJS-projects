import {
  DOWNLOAD_LICENCE_ADJUSTER,
  DOWNLOAD_LICENCE_ADJUSTER_SUCCESS,
  DOWNLOAD_LICENCE_ADJUSTER_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  license: null,
  loadingAdjusterLicense: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DOWNLOAD_LICENCE_ADJUSTER:
      return { ...state, loadingAdjusterLicense: action.payload };
    case DOWNLOAD_LICENCE_ADJUSTER_SUCCESS:
      return {
        ...state,
        loadingAdjusterLicense: null,
        license: action.payload,
      };
    case DOWNLOAD_LICENCE_ADJUSTER_FAILD:
      return { ...state, loadingAdjusterLicense: null, error: action.payload };
    default:
      return { ...state };
  }
};
