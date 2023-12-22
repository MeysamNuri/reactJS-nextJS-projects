import {
  LEGAL_DRAFT_BOARD_MEMBER,
  LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
  LEGAL_DRAFT_BOARD_MEMBER_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  workPlaces: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_DRAFT_BOARD_MEMBER:
      return { ...state, loading: true };
    case LEGAL_DRAFT_BOARD_MEMBER_SUCCESS:
      return { ...state, loading: false, workPlaces: action.payload };
    case LEGAL_DRAFT_BOARD_MEMBER_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
