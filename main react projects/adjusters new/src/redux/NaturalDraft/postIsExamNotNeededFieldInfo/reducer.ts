import {
  POST_IS_EXAM_NOT_NEEDED_EDIT,
  POST_IS_EXAM_NOT_NEEDED_EDIT_SUCCESS,
  POST_IS_EXAM_NOT_NEEDED_EDIT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case POST_IS_EXAM_NOT_NEEDED_EDIT:
      return { ...state, loading: true };
    case POST_IS_EXAM_NOT_NEEDED_EDIT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case POST_IS_EXAM_NOT_NEEDED_EDIT_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
