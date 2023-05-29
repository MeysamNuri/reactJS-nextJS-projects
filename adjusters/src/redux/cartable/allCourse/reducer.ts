import {
  ALL_COURSE,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAILD,
  ALL_COURSE_ADJUSTER_TYPE,
  ALL_COURSE_ADJUSTER_TYPE_SUCCESS,
  ALL_COURSE_ADJUSTER_TYPE_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  allCourse: null,
  allCourseByAdjusterType: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ALL_COURSE:
      return { ...state, loading: true };
    case ALL_COURSE_SUCCESS:
      return { ...state, loading: false, allCourse: action.payload };
    case ALL_COURSE_FAILD:
      return { ...state, loading: false, error: action.payload };
      case ALL_COURSE_ADJUSTER_TYPE:
      return { ...state, loading: true };
    case ALL_COURSE_ADJUSTER_TYPE_SUCCESS:
      return { ...state, loading: false, allCourseByAdjusterType: action.payload };
    case ALL_COURSE_ADJUSTER_TYPE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
