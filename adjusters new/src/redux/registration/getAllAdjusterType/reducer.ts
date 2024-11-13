import {
  GET_ALL_ADJUSTER_TYPE,
  GET_ALL_ADJUSTER_TYPE_SUCCESS,
  GET_ALL_ADJUSTER_TYPE_FAILED,
} from "../../../constant/actionTypes";
const INIT_STATE = {
  loading: false,
  allAdjusterType: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_ALL_ADJUSTER_TYPE:
      return { ...state, loading: true };
    case GET_ALL_ADJUSTER_TYPE_SUCCESS:
      return { ...state, loading: false, allAdjusterType: action.payload };
    case GET_ALL_ADJUSTER_TYPE_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
