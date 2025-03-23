import {
  LIST_LEGAL_DRAFT_STOCKHOLDER,
  LIST_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
  LIST_LEGAL_DRAFT_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  listStockholderLegal: [],
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_LEGAL_DRAFT_STOCKHOLDER:
      return { ...state, loading: true };
    case LIST_LEGAL_DRAFT_STOCKHOLDER_SUCCESS:
      return { ...state, loading: false, listStockholderLegal: action.payload };
    case LIST_LEGAL_DRAFT_STOCKHOLDER_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
