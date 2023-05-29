import {
  INFORMATION_FILE,
  INFORMATION_FILE_SUCCESS,
  INFORMATION_FILE_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: null,
  informationFile: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case INFORMATION_FILE:
      return { ...state, loading: action.payload };
    case INFORMATION_FILE_SUCCESS:
      return { ...state, loading: null, informationFile: action.payload };
    case INFORMATION_FILE_FAILD:
      return { ...state, loading: null, error: action.payload };

    default:
      return { ...state };
  }
};
