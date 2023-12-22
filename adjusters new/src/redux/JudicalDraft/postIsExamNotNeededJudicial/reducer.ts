import {
  POST_IS_EXAM_NOT_NEEDED_EDIT_JUDICIAL,
  POST_IS_EXAM_NOT_NEEDED_EDIT_JUDICIAL_SUCCESS,
  POST_IS_EXAM_NOT_NEEDED_EDIT_JUDICIAL_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case POST_IS_EXAM_NOT_NEEDED_EDIT_JUDICIAL:
      return { ...state, loading: true };
    case POST_IS_EXAM_NOT_NEEDED_EDIT_JUDICIAL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case POST_IS_EXAM_NOT_NEEDED_EDIT_JUDICIAL_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
