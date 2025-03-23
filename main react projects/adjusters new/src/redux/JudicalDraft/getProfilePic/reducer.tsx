import {
  GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
  GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  showjudicalProfilePic: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC:
      return { ...state, loading: true };
    case GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS:
      return {
        ...state,
        loading: false,
        showjudicalProfilePic: action.payload,
      };
    case GET_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
