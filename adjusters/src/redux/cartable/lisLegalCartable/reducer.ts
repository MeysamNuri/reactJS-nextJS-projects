import {
  LIST_LEGAL_CARTABLE,
  LIST_LEGAL_CARTABLE_SUCCESS,
  LIST_LEGAL_CARTABLE_FAILD,
  DATA_LEGAL_CARTABLE,
  DATA_FILTER_LEGAL_CARTABLE,
  PERSONAL_INFO_LEGAL_DETAIL,
  PERSONAL_INFO_LEGAL_DETAIL_SUCCESS,
  PERSONAL_INFO_LEGAL_DETAIL_FAILD
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  listLegalCartable: null,
  modelFilterLegalCartable: null,
  loadingPersonalInfoLegal:false,
  personalInfoLegalDetail:null,
  ModelLegalCartable:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_LEGAL_CARTABLE:
      return { ...state, loading: true };
    case LIST_LEGAL_CARTABLE_SUCCESS:
      return { ...state, loading: false, listLegalCartable: action.payload };
    case LIST_LEGAL_CARTABLE_FAILD:
      return {listLegalCartable:null, loading: false, error: action.payload };
    case DATA_LEGAL_CARTABLE:
      return { ...state, loading: false, ModelLegalCartable: action.payload };
    case DATA_FILTER_LEGAL_CARTABLE:
      return {
        ...state,
        loading: false,
        modelFilterLegalCartable: action.payload,
      };
      case PERSONAL_INFO_LEGAL_DETAIL:
        return { ...state, loadingPersonalInfoLegal: true };
      case PERSONAL_INFO_LEGAL_DETAIL_SUCCESS:
        return { ...state, loadingPersonalInfoLegal: false, personalInfoLegalDetail: action.payload };
      case PERSONAL_INFO_LEGAL_DETAIL_FAILD:
        return { ...state, loadingPersonalInfoLegal: false, error: action.payload };

    default:
      return { ...state };
  }
};
