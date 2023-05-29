import {
  GET_VALID_COURSES,
  GET_VALID_COURSES_SUCCESS,
  GET_VALID_COURSES_FAILD,
} from "../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  validCourses: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_VALID_COURSES:
      return { ...state, loading: true };
    case GET_VALID_COURSES_SUCCESS:
      return { ...state, loading: false, validCourses: action.payload };
    case GET_VALID_COURSES_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
