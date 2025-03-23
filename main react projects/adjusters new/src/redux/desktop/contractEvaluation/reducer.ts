import {
  ADD_CONTRACTEVALUATION,
  ADD_CONTRACTEVALUATION_SUCCESS,
  ADD_CONTRACTEVALUATION_FAILD,
  VIEW_CONTRACTEVALUATION,
  VIEW_CONTRACTEVALUATION_SUCCESS,
  VIEW_CONTRACTEVALUATION_FAILD,
  CONTRACTEVALUATION_ID,
  CONTRACTEVALUATION_ID_SUCCESS,
  CONTRACTEVALUATION_ID_FAILD,
  EDIT_CONTRACTEVALUATION,
  EDIT_CONTRACTEVALUATION_SUCCESS,
  EDIT_CONTRACTEVALUATION_FAILD,
  VIEW_MY_CONTRACTEVALUATION,
  VIEW_MY_CONTRACTEVALUATION_SUCCESS,
  VIEW_MY_CONTRACTEVALUATION_FAILD,
  REMOVE_CONTRACTEVALUATION,
  REMOVE_CONTRACTEVALUATION_SUCCESS,
  REMOVE_CONTRACTEVALUATION_FAILD
} from "../../../constant/desktop";

const INIT_STATE = {
  loadingAddContractEvaluation: false,
  addContractEvaluation: null,
  loadingViewContractEvaluation: false,
  viewContractEvaluation: null,
  contractEvaluationId: null,
  loadingContractEvaluationId: false,
  editContractEvaluation: null,
  loadingEditContractEvaluation: false,
  loadingViewMyContractEvaluation: false,
  viewMyContractEvaluation: null,
  contractEvaluationRemoveLoading:false,
  contractEvaluationRmove:null
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case REMOVE_CONTRACTEVALUATION:
      return {
        ...state,
        contractEvaluationRemoveLoading: true,
      };
    case REMOVE_CONTRACTEVALUATION_SUCCESS:
      return {
        ...state,
        contractEvaluationRemoveLoading: false,
        contractEvaluationRmove:action.payload

      };
      case REMOVE_CONTRACTEVALUATION_FAILD:
        return {
          ...state,
          contractEvaluationRemoveLoading: false,
          contractEvaluationRmove:action.payload,
          error: action.payload,
  
        };
    case ADD_CONTRACTEVALUATION:
      return {
        ...state,
        loadingAddContractEvaluation: true,
      };
    case ADD_CONTRACTEVALUATION_SUCCESS:
      return {
        ...state,
        loadingAddContractEvaluation: false,
        addContractEvaluation: action.payload,
      };
    case ADD_CONTRACTEVALUATION_FAILD:
      return {
        ...state,
        loadingAddContractEvaluation: false,
        error: action.payload,
      };

    case VIEW_CONTRACTEVALUATION:
      return { ...state, loadingViewContractEvaluation: true };
    case VIEW_CONTRACTEVALUATION_SUCCESS:
      return {
        ...state,
        loadingViewContractEvaluation: false,
        viewContractEvaluation: action.payload,
      };
    case VIEW_CONTRACTEVALUATION_FAILD:
      return {
        ...state,
        loadingViewContractEvaluation: false,
        error: action.payload,
      };

    case VIEW_MY_CONTRACTEVALUATION:
      return { ...state, loadingViewMyContractEvaluation: true };
    case VIEW_MY_CONTRACTEVALUATION_SUCCESS:
      return {
        ...state,
        loadingViewMyContractEvaluation: false,
        viewMyContractEvaluation: action.payload,
      };
    case VIEW_MY_CONTRACTEVALUATION_FAILD:
      return {
        ...state,
        loadingViewMyContractEvaluation: false,
        error: action.payload,
      };

    case CONTRACTEVALUATION_ID:
      return { ...state, loadingContractEvaluationId: action.payload };
    case CONTRACTEVALUATION_ID_SUCCESS:
      return {
        ...state,
        loadingContractEvaluationId: false,
        contractEvaluationId: action.payload,
      };
    case CONTRACTEVALUATION_ID_FAILD:
      return {
        ...state,
        loadingContractEvaluationId: false,
        error: action.payload,
      };

    case EDIT_CONTRACTEVALUATION:
      return { ...state, loadingEditContractEvaluation: true };
    case EDIT_CONTRACTEVALUATION_SUCCESS:
      return {
        ...state,
        loadingEditContractEvaluation: false,
        editContractEvaluation: action.payload,
      };
    case EDIT_CONTRACTEVALUATION_FAILD:
      return {
        ...state,
        loadingEditContractEvaluation: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
