import {
  LEGAL_DRAFT_PATCH_STOCKHOLDER,
  LEGAL_DRAFT_PATCH_STOCKHOLDER_SUCCESS,
  LEGAL_DRAFT_PATCH_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  relatedStockholderInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LEGAL_DRAFT_PATCH_STOCKHOLDER:
      return { ...state, loading: true };
    case LEGAL_DRAFT_PATCH_STOCKHOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        relatedStockholderInfo: action.payload,
      };
    case LEGAL_DRAFT_PATCH_STOCKHOLDER_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
