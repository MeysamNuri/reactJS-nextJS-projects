import {
  ADD_MONTHLY_PERFORMANCE,
  ADD_MONTHLY_PERFORMANCE_SUCCESS,
  ADD_MONTHLY_PERFORMANCE_FAILD,
  VIEW_MONTHLY_PERFORMANCE,
  VIEW_MONTHLY_PERFORMANCE_SUCCESS,
  VIEW_MONTHLY_PERFORMANCE_FAILD,
  MONTHLY_PERFORMANCE_ID,
  MONTHLY_PERFORMANCE_ID_SUCCESS,
  MONTHLY_PERFORMANCE_ID_FAILD,
  EDIT_MONTHLY_PERFORMANCE,
  EDIT_MONTHLY_PERFORMANCE_SUCCESS,
  EDIT_MONTHLY_PERFORMANCE_FAILD,
  VIEW_MY_MONTHLY_PERFORMANCE,
  VIEW_MY_MONTHLY_PERFORMANCE_SUCCESS,
  VIEW_MY_MONTHLY_PERFORMANCE_FAILD,
  Remove_MONTHLY_PERFORMANCE,
  Remove_MONTHLY_PERFORMANCE_SUCCESS,
  Remove_MONTHLY_PERFORMANCE_FAILD,
} from "../../../constant/desktop";

const INIT_STATE = {
  loadingAddMonthlyPerformance: false,
  addMonthlyPerformance: null,
  loadingViewMonthlyPerformance: false,
  viewMonthlyPerformance: null,
  monthlyPerformanceId: null,
  loadingMonthlyPerformanceId: false,
  editMonthlyPerformance: null,
  loadingEditMonthlyPerformance: false,
  loadingViewMyMonthlyPerformance: false,
  viewMyMonthlyPerformance: null,
  removeMonthlyPerformanceLoading: false,
  removePerformanceState:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case Remove_MONTHLY_PERFORMANCE:
      return { ...state, removeMonthlyPerformanceLoading: true };
    case Remove_MONTHLY_PERFORMANCE_SUCCESS:
      return { ...state, removeMonthlyPerformanceLoading: false,removePerformanceState:action.payload};
    case Remove_MONTHLY_PERFORMANCE_FAILD:
      return { ...state, removeMonthlyPerformanceLoading: false,removePerformanceState:action.payload,error: action.payload, };
    case ADD_MONTHLY_PERFORMANCE:
      return { ...state, loadingAddMonthlyPerformance: true };
    case ADD_MONTHLY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loadingAddMonthlyPerformance: false,
        addMonthlyPerformance: action.payload,
      };
    case ADD_MONTHLY_PERFORMANCE_FAILD:
      return {
        ...state,
        loadingAddMonthlyPerformance: false,
        error: action.payload,
      };

    case VIEW_MONTHLY_PERFORMANCE:
      return { ...state, loadingViewMonthlyPerformance: true };
    case VIEW_MONTHLY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loadingViewMonthlyPerformance: false,
        viewMonthlyPerformance: action.payload,
      };
    case VIEW_MONTHLY_PERFORMANCE_FAILD:
      return {
        ...state,
        loadingViewMonthlyPerformance: false,
        error: action.payload,
      };

    case VIEW_MY_MONTHLY_PERFORMANCE:
      return { ...state, loadingViewMyMonthlyPerformance: true };
    case VIEW_MY_MONTHLY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loadingViewMyMonthlyPerformance: false,
        viewMyMonthlyPerformance: action.payload,
      };
    case VIEW_MY_MONTHLY_PERFORMANCE_FAILD:
      return {
        ...state,
        loadingViewMyMonthlyPerformance: false,
        error: action.payload,
      };

    case MONTHLY_PERFORMANCE_ID:
      return { ...state, loadingMonthlyPerformanceId: action.payload };
    case MONTHLY_PERFORMANCE_ID_SUCCESS:
      return {
        ...state,
        loadingMonthlyPerformanceId: null,
        monthlyPerformanceId: action.payload,
      };
    case MONTHLY_PERFORMANCE_ID_FAILD:
      return {
        ...state,
        loadingMonthlyPerformanceId: null,
        error: action.payload,
      };

    case EDIT_MONTHLY_PERFORMANCE:
      return { ...state, loadingEditMonthlyPerformance: true };
    case EDIT_MONTHLY_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loadingEditMonthlyPerformance: false,
        editMonthlyPerformance: action.payload,
      };
    case EDIT_MONTHLY_PERFORMANCE_FAILD:
      return {
        ...state,
        loadingEditMonthlyPerformance: true,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
