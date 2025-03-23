import {
  BASKET_NATURAL_JUDICAL_LIST,
  BASKET_NATURAL_JUDICAL_LIST_SUCCESS,
  BASKET_NATURAL_JUDICAL_LIST_FAILED,
  BASKET_LEGAL_LIST,
  BASKET_LEGAL_LIST_SUCCESS,
  BASKET_LEGAL_LIST_FAILED,
  ADMISSTON_LIST,
  ADMISSTON_LIST_SUCCESS,
  ADMISSTON_LIST_FAILED,
  BASKET_ASSIGN_ADMISSTION,
  BASKET_ASSIGN_ADMISSTION_SUCCESS,
  BASKET_ASSIGN_ADMISSTION_FAILED,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  listNaturalJudical: null,
  listLegal: null,
  admissitionList: null,
  admissitionListLoading: false,
  legalLoading: false,
  legalAdmissitionList: false,
  asignerLoading:false,
  asignRegister:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case BASKET_NATURAL_JUDICAL_LIST:
      return { ...state, loading: true };
    case BASKET_NATURAL_JUDICAL_LIST_SUCCESS:
      return { ...state, loading: false, listNaturalJudical: action.payload };
    case BASKET_NATURAL_JUDICAL_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case BASKET_LEGAL_LIST:
      return { ...state, legalLoading: true };
    case BASKET_LEGAL_LIST_SUCCESS:
      return { ...state, legalLoading: false, listLegal: action.payload };
    case BASKET_LEGAL_LIST_FAILED:
      return { ...state, legalLoading: false, error: action.payload };
    case ADMISSTON_LIST:
      return { ...state, admissitionListLoading: true };
    case ADMISSTON_LIST_SUCCESS:
      return {
        ...state,
        admissitionListLoading: false,
        admissitionList: action.payload,
      };
    case ADMISSTON_LIST_FAILED:
      return { ...state, admissitionListLoading: false, error: action.payload };
    case BASKET_ASSIGN_ADMISSTION:
      return { ...state, asignerLoading: true };
    case BASKET_ASSIGN_ADMISSTION_SUCCESS:
      return {
        ...state,
        asignerLoading: false,
        asignRegister: action.payload,
      };
    case BASKET_ASSIGN_ADMISSTION_FAILED:
      return { ...state, asignerLoading: false, error: action.payload };

    default:
      return { ...state };
  }
};
