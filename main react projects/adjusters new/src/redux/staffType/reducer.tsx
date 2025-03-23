import {
  STAFF_TYPE,
  STAFF_TYPE_SUCCESS,
  STAFF_TYPE_FAILD,
  CREATE_STAFF,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILD,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILD,
  USER_GET_FOR_GRID,
  USER_GET_FOR_GRID_SUCCESS,
  USER_GET_FOR_GRID_FAILD,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILD
} from "../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  staffTypes: [],
  searchUserLists: [],
  loadingSearch: false,
  userGrid:[],
  loadingUserGrid:false,
  loadingRemoveId:null,
  remove:null,
  createStaffLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CREATE_STAFF:
      return {createStaffLoading:true}
    case CREATE_STAFF_SUCCESS:
      return {createStaffLoading:false}
    case CREATE_STAFF_FAILD:
      return {createStaffLoading:false}
    case STAFF_TYPE:
      return { ...state, loading: true };
    case STAFF_TYPE_SUCCESS:
      return { ...state, loading: false, staffTypes: action.payload };
    case STAFF_TYPE_FAILD:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_USER:
      return { ...state, loadingSearch: true };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loadingSearch: false,
        searchUserLists: action.payload,
      };
      case "REMOVE_SEARCH_USER_LIST":
        return {searchUserLists:[]}
    case SEARCH_USER_FAILD:
      return { ...state, loadingSearch: false, error: action.payload };
      case USER_GET_FOR_GRID:
        return { ...state, loadingUserGrid: true };
      case USER_GET_FOR_GRID_SUCCESS:
        return {
          ...state,
          loadingUserGrid: false,
          userGrid: action.payload,
        };
      case USER_GET_FOR_GRID_FAILD:
        return { ...state, loadingUserGrid: false, error: action.payload };
        case REMOVE_USER:
          return { ...state, loadingRemoveId: action.payload };
        case REMOVE_USER_SUCCESS:
          return {
            ...state,
            loadingRemoveId: null,
            remove: action.payload,
          };
        case REMOVE_USER_FAILD:
          return { ...state, loadingRemoveId: null, error: action.payload };

    default:
      return { ...state };
  }
};
