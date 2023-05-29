
import {
  ATTACHMENT,
  ATTACHMENT_SUCCESS,
  ATTACHMENT_FAILD,
  ATTACHMENT_LIST,
  ATTACHMENT_LIST_SUCCESS,
  ATTACHMENT_LIST_FAILD,
  ATTACHMENT_REMOVE,
  ATTACHMENT_REMOVE_SUCCESS,
  ATTACHMENT_REMOVE_FAILD,
  ATTACHMENT_DOWNLOAD,
  ATTACHMENT_DOWNLOAD_SUCCESS,
  ATTACHMENT_DOWNLOAD_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  attachment: null,
  listAttachment: { Result: [] },
  dlAttachment:null
  
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ATTACHMENT:
      return { ...state, loading: true };
    case ATTACHMENT_SUCCESS:
      return { ...state, loading: false, attachment: action.payload };
    case ATTACHMENT_FAILD:
      return { ...state, loading: false, error: action.payload };
    case ATTACHMENT_LIST:
      return { ...state, loading: true };
    case ATTACHMENT_LIST_SUCCESS:
      return { ...state, loading: false, listAttachment: action.payload };
    case ATTACHMENT_LIST_FAILD:
      return { ...state, loading: false, error: action.payload };
    case ATTACHMENT_REMOVE_SUCCESS:
      const newList = state.listAttachment.Result.filter(
        (el: any) => el.Id !== action.payload
      );
      return {
        ...state,
        listAttachment: { ...state.listAttachment, Result: newList },
      };
      case ATTACHMENT_DOWNLOAD:
        return { ...state, loading: true };
      case ATTACHMENT_DOWNLOAD_SUCCESS:
        return { ...state, loading: false, attachment: action.payload };
      case ATTACHMENT_DOWNLOAD_FAILD:
        return { ...state, loading: false, error: action.payload };
     
    default:
      return { ...state };
  }
};
