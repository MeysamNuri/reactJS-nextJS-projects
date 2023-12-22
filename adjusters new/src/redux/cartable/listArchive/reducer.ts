import {
  ARCHIVED_LIST,
  ARCHIVED_LIST_SUCCESS,
  ARCHIVED_LIST_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loadingArchive: false,
  listArchive: null,

};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ARCHIVED_LIST:
      return { ...state, loadingArchive: true };
    case ARCHIVED_LIST_SUCCESS:
      return { ...state, loadingArchive: false, listArchive: action.payload };
    case ARCHIVED_LIST_FAILD:
      return { ...state, loadingArchive: false, error: action.payload };
   

    default:
      return { ...state };
  }
};
