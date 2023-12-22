import {
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FAILD,
} from "../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  dlDocument: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DOWNLOAD_DOCUMENT:
      return { ...state, loading: true };
    case DOWNLOAD_DOCUMENT_SUCCESS:
      return { ...state, loading: false, dlDocument: action.payload };
    case DOWNLOAD_DOCUMENT_FAILD:
      return { ...state, loading: false, error: action.payload };
      case "REMOVE_SHOW_PIC":
        return{...state,dlDocument:null}
    default:
      return { ...state };
  }
};
