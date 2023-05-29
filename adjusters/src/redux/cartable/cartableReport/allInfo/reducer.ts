import {
  CARTABLE_REPORT_ALL_INFO,
  CARTABLE_REPORT_ALL_INFO_SUCCESS,
  CARTABLE_REPORT_ALL_INFO_FAILED,
  CARTABLE_REPORT_ALL_INFO_EXCEL,
  CARTABLE_REPORT_ALL_INFO_EXCEL_SUCCESS,
  CARTABLE_REPORT_ALL_INFO_EXCEL_FAILED,
  REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR,
  REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_SUCCESS,
  REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_FAILED,
  REPORT_LEGAL_EXISTING_EVALUATOR,
  REPORT_LEGAL_EXISTING_EVALUATOR_SUCCESS,
  REPORT_LEGAL_EXISTING_EVALUATOR_FAILED,
} from "../../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  cartableReportAllnfo: null,
  loadingExcel: false,
  resDlExcel: null,
  reportNaturalJudicalEvalutor: null,
  loadingReportNaturalJudicalEvalutor: null,
  reportLegalEvalutor: null,
  loadingReportLegalEvalutor: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CARTABLE_REPORT_ALL_INFO:
      return { ...state, loading: true };
    case CARTABLE_REPORT_ALL_INFO_SUCCESS:
      return { ...state, loading: false, cartableReportAllnfo: action.payload };
    case CARTABLE_REPORT_ALL_INFO_FAILED:
      return {
        ...state,
        cartableReportAllnfo: null,
        loading: false,
        error: action.payload,
      };
    case CARTABLE_REPORT_ALL_INFO_EXCEL:
      return { ...state, loadingExcel: true };
    case CARTABLE_REPORT_ALL_INFO_EXCEL_SUCCESS:
      return { ...state, loadingExcel: false, resDlExcel: action.payload };
    case CARTABLE_REPORT_ALL_INFO_EXCEL_FAILED:
      return { ...state, loadingExcel: false, error: action.payload };
    case REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR:
      return { ...state, loadingReportNaturalJudicalEvalutor: true };
    case REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_SUCCESS:
      return {
        ...state,
        loadingReportNaturalJudicalEvalutor: false,
        reportNaturalJudicalEvalutor: action.payload,
      };
    case REPORT_NATURAL_JUDICAL_EXISTING_EVALUATOR_FAILED:
      return {
        reportNaturalJudicalEvalutor: null,
        loadingReportNaturalJudicalEvalutor: false,
        error: action.payload,
      };

    case REPORT_LEGAL_EXISTING_EVALUATOR:
      return { ...state, loadingReportLegalEvalutor: true };
    case REPORT_LEGAL_EXISTING_EVALUATOR_SUCCESS:
      return {
        ...state,
        loadingReportLegalEvalutor: false,
        reportLegalEvalutor: action.payload,
      };
    case REPORT_LEGAL_EXISTING_EVALUATOR_FAILED:
      return {
        reportLegalEvalutor: null,
        loadingReportLegalEvalutor: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
