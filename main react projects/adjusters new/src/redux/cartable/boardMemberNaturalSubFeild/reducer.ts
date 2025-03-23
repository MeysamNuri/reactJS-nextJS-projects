import {
  BOARD_MEMBER_NATURAL_SUB_FIELD,
  BOARD_MEMBER_NATURAL_SUB_FIELD_SUCCESS,
  BOARD_MEMBER_NATURAL_SUB_FIELD_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  subFieldList: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case BOARD_MEMBER_NATURAL_SUB_FIELD:
      return { ...state, loading: true };
    case BOARD_MEMBER_NATURAL_SUB_FIELD_SUCCESS:
      return { ...state, loading: false, subFieldList: action.payload };
    case BOARD_MEMBER_NATURAL_SUB_FIELD_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
