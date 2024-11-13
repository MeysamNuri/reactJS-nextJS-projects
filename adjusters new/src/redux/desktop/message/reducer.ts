import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILD,
  MESSAGE_GET_GRID,
  MESSAGE_GET_GRID_SUCCESS,
  MESSAGE_GET_GRID_FAILD,
  MY_MESSAGE_GET_GRID,
  MY_MESSAGE_GET_GRID_SUCCESS,
  MY_MESSAGE_GET_GRID_FAILD
} from "../../../constant/desktop";
const INIT_STATE = {
  loading: false,
  createMessage: "",
  loadingGrid: false,
  listGridMessage: [],
  loadingMyMessageGrid: false,
  listMyGridMessage: [],
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return { ...state, loading: true };
    case CREATE_MESSAGE_SUCCESS:
      return { ...state, loading: false, createMessage: action.payload };
    case CREATE_MESSAGE_FAILD:
      return { ...state, loading: false, error: action.payload };
    case MESSAGE_GET_GRID:
      return { ...state, loadingGrid: true };
    case MESSAGE_GET_GRID_SUCCESS:
      return { ...state, loadingGrid: false, listGridMessage: action.payload };
    case MESSAGE_GET_GRID_FAILD:
      return { ...state, loadingGrid: false, error: action.payload };
      case MY_MESSAGE_GET_GRID:
        return { ...state, loadingMyMessageGrid: true };
      case MY_MESSAGE_GET_GRID_SUCCESS:
        return { ...state, loadingMyMessageGrid: false, listMyGridMessage: action.payload };
      case MY_MESSAGE_GET_GRID_FAILD:
        return { ...state, loadingMyMessageGrid: false, error: action.payload };

    default:
      return { ...state };
  }
};
