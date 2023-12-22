import {
  GET_COURSE_TYPE,
  GET_COURSE_TYPE_SUCCESS,
  GET_COURSE_TYPE_FAILED,
} from "../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  courseType: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_COURSE_TYPE:
      return { ...state, loading: true };
    case GET_COURSE_TYPE_SUCCESS:
      return { ...state, loading: false, courseType: action.payload };
    case GET_COURSE_TYPE_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
