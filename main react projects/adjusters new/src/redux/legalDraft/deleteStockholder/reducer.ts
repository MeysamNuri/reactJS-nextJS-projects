import {
  DELETE_LEGAL_DRAFT_STOCKHOLDER,
  DELETE_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
  DELETE_LEGAL_DRAFT_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  deleteLegalDraftCardBoardMember: "",
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DELETE_LEGAL_DRAFT_STOCKHOLDER:
      return { ...state, loading: true };
    case DELETE_LEGAL_DRAFT_STOCKHOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteLegalDraftCardBoardMember: action.payload,
      };
    case DELETE_LEGAL_DRAFT_STOCKHOLDER_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
