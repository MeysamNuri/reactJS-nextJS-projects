import {
  UPLOAD_FILES,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_FAILD,
  REMOVE_FILE,
  REMOVE_FILE_SUCCESS,
  REMOVE_FILE_FAILD,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILD,
  REMOVE_FILES,
  NOTIFICATION_AVATAR_FILE,
  NOTIFICATION_AVATAR_FILE_SUCCESS,
  NOTIFICATION_AVATAR_FILE_FAILD
} from "../../../constant/desktop";

const INIT_STATE = {
  loading: false,
  uploadFile: null,
  files:[],
  loadingDownload:null,
  DownloadDocumentFileInterview:null,
  noticeAvatarFile:null,
  noticeAvatarLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case "UPDATE_FILE_LIST":
      return {...state,files:action.payload}
    case REMOVE_FILES:
      return {...state,files:[],uploadFile:null,noticeAvatarFile:null}
    case REMOVE_FILE_SUCCESS:
      return {...state,files:action.payload}
    case NOTIFICATION_AVATAR_FILE:
      return { ...state, noticeAvatarLoading: true };
    case NOTIFICATION_AVATAR_FILE_SUCCESS:
      return { ...state, noticeAvatarLoading: false,noticeAvatarFile:action.payload };
    case  NOTIFICATION_AVATAR_FILE_FAILD:
      return { ...state, noticeAvatarLoading: false,noticeAvatarFile:null,error: action.payload  };
    case UPLOAD_FILES:
      return { ...state, loading: true };
    case UPLOAD_FILES_SUCCESS:
      return { ...state, loading: false, uploadFile:action.payload,files:[...state.files,action.payload.Result] };
    case UPLOAD_FILES_FAILD:
      return { ...state, loading: false, error: action.payload };
      case DOWNLOAD_FILE:
        return { ...state, loadingDownload: action.payload };
      case DOWNLOAD_FILE_SUCCESS:
        return { ...state, loadingDownload: null,DownloadDocumentFileInterview:action.payload };
      case DOWNLOAD_FILE_FAILD:
        return { ...state, loadingDownload: null, error: action.payload };

    default:
      return { ...state };
  }
};
