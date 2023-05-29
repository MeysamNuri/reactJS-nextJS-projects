import {
  POST_IS_EXAM_NOT_NEEDED_DRAFT,
  POST_IS_EXAM_NOT_NEEDED_DRAFT_SUCCESS,
  POST_IS_EXAM_NOT_NEEDED_DRAFT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case POST_IS_EXAM_NOT_NEEDED_DRAFT:
      return { ...state, loading: true };
    case POST_IS_EXAM_NOT_NEEDED_DRAFT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case POST_IS_EXAM_NOT_NEEDED_DRAFT_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
