import {
  LIST_JUDICAL_CARTABLE,
  LIST_JUDICAL_CARTABLE_SUCCESS,
  LIST_JUDICAL_CARTABLE_FAILD,
  DATA_JUDICAL_CARTABLE,
  DATA_FILTER_JUDICAL_CARTABLE,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  listJudicalCartable: null,
  ModelJudicalCartable: null,
  modelFilterJudicalCartable: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case LIST_JUDICAL_CARTABLE:
      return { ...state, loading: true };
    case LIST_JUDICAL_CARTABLE_SUCCESS:
      return { ...state, loading: false, listJudicalCartable: action.payload };
    case LIST_JUDICAL_CARTABLE_FAILD:
      return { listJudicalCartable:null, loading: false, error: action.payload };
    case DATA_JUDICAL_CARTABLE:
      return { ...state, loading: false, ModelJudicalCartable: action.payload };
    case DATA_FILTER_JUDICAL_CARTABLE:
      return {
        ...state,
        loading: false,
        modelFilterJudicalCartable: action.payload,
      };

    default:
      return { ...state };
  }
};
