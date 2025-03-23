import {
  LIST_NATURAL_CARTABLE,
  LIST_NATURAL_CARTABLE_SUCCESS,
  LIST_NATURAL_CARTABLE_FAILD,
  DATA_NATURAL_CARTABLE,
  ALL_DOCUMENT_CARTABLE,
  ALL_WORK_EXPERIENCE_CARTABLE,
  DATA_FILTER_NATURAL_CARTABLE,
  DATA_FILTER_NATURAL_CARTABLE_OUTBOX,
  PERSONAL_INFO_DETAIL,
  PERSONAL_INFO_DETAIL_SUCCESS,
  PERSONAL_INFO_DETAIL_FAILD,
  SUBMIT_CHEKED,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  listNaturalCartable: null,
  errorlistNaturalCartable: null,
  modelCartable: null,
  modelAllDocument: null,
  modelAllWorkExperienceCartable: null,
  modelFilterNaturalCartable: null,
  modelFilterNaturalCartableOutBox: null,
  personDetail: null,
  loadingPersonDetail: false,
  submitCheked:false,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_NATURAL_CARTABLE:
      return { ...state, loading: true };
    case LIST_NATURAL_CARTABLE_SUCCESS:
      return { ...state, loading: false, listNaturalCartable: action.payload };
    case LIST_NATURAL_CARTABLE_FAILD:
      return {
        listNaturalCartable:null,
        loading: false,
        errorlistNaturalCartable: action.payload,
      };
    case PERSONAL_INFO_DETAIL:
      return { ...state, loadingPersonDetail: true };
    case PERSONAL_INFO_DETAIL_SUCCESS:
      return {
        ...state,
        loadingPersonDetail: false,
        personDetail: action.payload,
      };
    case PERSONAL_INFO_DETAIL_FAILD:
      return { ...state, loadingPersonDetail: false, error: action.payload };
    case DATA_NATURAL_CARTABLE:
      return { ...state, loading: false, modelCartable: action.payload };
    case DATA_FILTER_NATURAL_CARTABLE_OUTBOX:
      return {
        ...state,
        loading: false,
        modelFilterNaturalCartableOutBox: action.payload,
      };
    case ALL_DOCUMENT_CARTABLE:
      return { ...state, modelAllDocument: action.payload };
    case ALL_WORK_EXPERIENCE_CARTABLE:
      return { ...state, modelAllWorkExperienceCartable: action.payload };
    case DATA_FILTER_NATURAL_CARTABLE:
      return {
        ...state,
        loading: false,
        modelFilterNaturalCartable: action.payload,
      };
    // case ALL_DOCUMENT_CARTABLE:
    //   return { ...state, modelAllDocument: action.payload };
    // case ALL_WORK_EXPERIENCE_CARTABLE:
    //   return { ...state, modelAllWorkExperienceCartable: action.payload };
      case SUBMIT_CHEKED:
      return {...state, submitCheked: action.payload };
    default:
      return { ...state };
  }
};
