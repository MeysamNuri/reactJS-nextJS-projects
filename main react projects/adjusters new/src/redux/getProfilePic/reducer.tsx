import {
  GET_DRAFT_PERSONAL_INFO_PIC,
  GET_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  GET_DRAFT_PERSONAL_INFO_PIC_FAILD,
} from "../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  showProfilePic: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_DRAFT_PERSONAL_INFO_PIC:
      return { ...state, loading: true };
    case GET_DRAFT_PERSONAL_INFO_PIC_SUCCESS:
      return {
        ...state,
        loading: false,
        showProfilePic: action.payload,
      };
    case GET_DRAFT_PERSONAL_INFO_PIC_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
