import {
  TYPE_REQUSET,
  SET_DESCRIPTION,
  SET_CEO,
  SET_BOARD_MEMBER,
  SET_ESTABLISH_BRANCH,
  CHANGE_WORK_LOCATION ,
  SET_LIST_REQUEST,
  // SET_EMPLOYEE,
  /*   SET_CONTRACTEVALUATION, */
  LIST_REQUSET_TYPE,
  LIST_REQUSET_TYPE_SUCCESS,
  LIST_REQUSET_TYPE_FAILD,
  SET_STOCK_HOLDER,
  SET_COOPERATION_END_DATE,
  SET_CAPITAL_INCREASE,
  SET_BRANCH_MANAGER,
  ADD_REQUSET_TYPE,
  ADD_REQUSET_TYPE_SUCCESS,
  ADD_REQUSET_TYPE_FAILD,
  LIST_REQUEST_GRID,
  LIST_REQUEST_GRID_SUCCESS,
  LIST_REQUEST_GRID_FAILD,
  APPLICANT_REQUSET_ID,
  APPLICANT_REQUSET_ID_SUCCESS,
  APPLICANT_REQUSET_ID_FAILD,
  APPLICANTREQUEST_DETERMINE,
  APPLICANTREQUEST_DETERMINE_SUCCESS,
  APPLICANTREQUEST_DETERMINE_FAILD,
  LIST_REQUEST_EXPORT_AWAIT_GRID,
  LIST_REQUEST_EXPORT_AWAIT_GRID_SUCCESS,
  LIST_REQUEST_EXPORT_AWAIT_GRID_FAILD,
  LIST_REQUEST_BOSS_AWAIT_GRID,
  LIST_REQUEST_BOSS_AWAIT_GRID_SUCCESS,
  LIST_REQUEST_BOSS_AWAIT_GRID_FAILD,
  BOSS_DETERMIN,
  BOSS_DETERMIN_SUCCESS,
  BOSS_DETERMIN_FAILD,
  EXPERT_DETERMIN,
  EXPERT_DETERMIN_SUCCESS,
  EXPERT_DETERMIN_FAILD,
  LIST_MY_REQUEST_GRID,
  LIST_MY_REQUEST_GRID_SUCCESS,
  LIST_MY_REQUEST_GRID_FAILD,
  GET_APPLICANT_REQUEST_STATUS,
  GET_APPLICANT_REQUEST_STATUS_SUCCESS,
  GET_APPLICANT_REQUEST_STATUS_FAILD,
  APPLICANT_CURRENT_CEO_INFO,
  APPLICANT_CURRENT_CEO_INFO_SUCCESS,
  APPLICANT_CURRENT_CEO_INFO_FAILD,
  APPLICANT_SEARCH_ADJUSTER,
  APPLICANT_SEARCH_ADJUSTER_SUCCESS,
  APPLICANT_SEARCH_ADJUSTER_FAILD,
  LIST_REQUSET_TYPE_FOR_FILTER,
  LIST_REQUSET_TYPE_FOR_FILTER_SUCCESS,
  LIST_REQUSET_TYPE_FOR_FILTER_FAILD,
  APPLICANT_WORKING_LOCATION_LIST,
  APPLICANT_WORKING_LOCATION_LIST_SUCCESS,
  APPLICANT_WORKING_LOCATION_LIST_FAILD,
  APPLICANT_POSITON_LIST,
  APPLICANT_POSITON_LIST_SUCCESS,
  APPLICANT_POSITON_LIST_FAILD,
  APPLICANT_CURRENT_BOARD_BOSS,
  APPLICANT_CURRENT_BOARD_BOSS_SUCCESS,
  APPLICANT_CURRENT_BOARD_BOSS_FAILD,
  SET_BOARD_MEMEBER_BOSS,
  APPLICANT_BOARD_MEMBER_DEPUTY,
  APPLICANT_BOARD_MEMBER_DEPUTY_SUCCESS,
  APPLICANT_BOARD_MEMBER_DEPUTY_FAILD,
  SET_BOARD_MEMBER_DEPUTY,
  BOARD_MEMBER_END_COOPERATION,
  BOARD_MEMBER_END_COOPERATION_SUCCESS,
  BOARD_MEMBER_END_COOPERATION_FAILD,
  ADJUSTER_PORTFOILO,
  ADJUSTER_PORTFOILO_SUCCESS,
  ADJUSTER_PORTFOILO_FAILD,
  APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST,
  APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_SUCCESS,
  APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_FAILD,
  EMPLOYEE_END_COOPERATION,
  EMPLOYEE_END_COOPERATION_SUCCESS,
  EMPLOYEE_END_COOPERATION_FAILD
} from "../../../constant/desktop";

const INIT_STATE = {
  valueRequests: null,
  error: null,
  valueDescription: "",
  ceo: null,
  branchManger:null,
  stockHolder:null,
  cooperationEndDate:null,
  boardMemberBoss: null,
  boardMember: null,
  stablishBranch: null,
  workLocation: null,
  employe: null,
  contractEvaluation: null,
  listRequestType: null,
  listRequestes: null,
  resRequestType: null,
  listRequestGrid: [],
  listNotReviewedRequest: [],
  resultId: null,
  loading: false,
  LoadingDescription: false,
  loadingAddRequest: false,
  loadinglistRequestGrid: false,
  loadingNotReviewedRequest: false,
  loadingResultId: false,
  listExpertAwaitRequestGrid: [],
  loadingExpertAwaitRequestGrid: false,
  listBossAwaitRequestGrid: [],
  loadingBossAwaitRequestGrid: false,
  expertDetermin: null,
  loadingExpertDetermin: false,
  bossDetermin: null,
  loadingBossDetermin: false,
  listMyRequestGrid: [],
  loadingMylistRequestGrid: false,
  applicantRequestStatus: null,
  applicantCurrentCEOInfo: null,
  applicantCurrentCEOInfoLoading: false,
  adjusterSearchLoading: false,
  adjusterSearchResult: null,
  ApplicantRequestFilters: null,
  loadingApplicanyRequestFilters: false,
  applicantWorkingLocation: null,
  loadingApplicantWorkingLocation: false,
  loadingApplicantPosition: false,
  applicantposition: null,
  applicantBoardMemberBoss: null,
  loadingBoardMemberBoss: false,
  applicantBoardMemberDeputy: null,
  loadingBoardMemberDeputy: false,
  boardMemberDeputyDetails: null,
  boardMemberEndCooperation: null,
  boardMemberEndCooperationLoading: false,
  adjusterPortfoilo: null,
  capitalIncrease:null,
  adjusterPortfoiloLoading: false,
  requestTypeDocumentsList:null,
  requestTypeDocumentsListLaoding:false,
  employeeEndDate:null,
  employeeEndDateLoading:false,
  stockHolderEndDate:null,
  stockHolderEndDateLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST:
      return { ...state, requestTypeDocumentsListLaoding: true };
    case APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_SUCCESS:
      return { ...state, requestTypeDocumentsListLaoding: false,requestTypeDocumentsList:action.payload  };
    case APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_FAILD:
      return { ...state, requestTypeDocumentsListLaoding: false,requestTypeDocumentsList:null ,error: action.payload };
    case TYPE_REQUSET:
      return { ...state, loading: false, valueRequests: action.payload };
    case SET_DESCRIPTION:
      return { ...state, loading: false, valueDescription: action.payload };
    case SET_CEO:
      return { ...state, ceo: action.payload };
    case SET_CAPITAL_INCREASE:
      return { ...state, capitalIncrease: action.payload };
    case SET_STOCK_HOLDER:
      return { ...state, stockHolder: action.payload };
    case SET_COOPERATION_END_DATE:
      return { ...state, cooperationEndDate: action.payload };
    case SET_BRANCH_MANAGER:
      return { ...state, branchManger: action.payload };
    case SET_BOARD_MEMBER_DEPUTY:
      return { ...state, boardMemberDeputyDetails: action.payload };
    case SET_BOARD_MEMEBER_BOSS:
      return { ...state, boardMemberBoss: action.payload };
    case SET_BOARD_MEMBER:
      return { ...state, boardMember: action.payload };
    case SET_ESTABLISH_BRANCH:
      return { ...state, stablishBranch: action.payload };
    case CHANGE_WORK_LOCATION :
      return { ...state, workLocation: action.payload };
    case EMPLOYEE_END_COOPERATION:
      return { ...state, employeeEndDateLoading: true }
    case EMPLOYEE_END_COOPERATION_SUCCESS:
      return { ...state, employeeEndDateLoading: false,employeeEndDate:action.payload }
      case EMPLOYEE_END_COOPERATION_FAILD:
        return { ...state, employeeEndDateLoading: false,employeeEndDate:null ,error: action.payload }
    case BOARD_MEMBER_END_COOPERATION:
      return { ...state, boardMemberEndCooperationLoading: true }
    case BOARD_MEMBER_END_COOPERATION_SUCCESS:
      return { ...state, boardMemberEndCooperationLoading: false, boardMemberEndCooperation: action.payload }
    case BOARD_MEMBER_END_COOPERATION_FAILD:
      return { ...state, boardMemberEndCooperationLoading: false, boardMemberEndCooperation: null, error: action.payload }
    case SET_LIST_REQUEST:
      return { ...state, listRequestes: action.payload };
    case LIST_REQUSET_TYPE:
      return { ...state, loading: true };
    case LIST_REQUSET_TYPE_SUCCESS:
      return { ...state, loading: false, listRequestType: action.payload };
    case LIST_REQUSET_TYPE_FAILD:
      return { ...state, loading: false, error: action.payload };
    case APPLICANT_BOARD_MEMBER_DEPUTY:
      return { ...state, loadingBoardMemberDeputy: true }

    case APPLICANT_BOARD_MEMBER_DEPUTY_SUCCESS:
      return { ...state, loadingBoardMemberDeputy: false, applicantBoardMemberDeputy: action.payload }

    case APPLICANT_BOARD_MEMBER_DEPUTY_FAILD:
      return { ...state, loadingBoardMemberDeputy: false, applicantBoardMemberDeputy: null, error: action.payload }

    case GET_APPLICANT_REQUEST_STATUS:
      return { ...state, loading: true };
    case GET_APPLICANT_REQUEST_STATUS_SUCCESS:
      return { ...state, loading: false, applicantRequestStatus: action.payload };
    case GET_APPLICANT_REQUEST_STATUS_FAILD:
      return { ...state, loading: false, error: action.payload };
    case ADD_REQUSET_TYPE:
      return { ...state, loadingAddRequest: true };
    case ADD_REQUSET_TYPE_SUCCESS:
      return {
        ...state,
        loadingAddRequest: false,
        resRequestType: action.payload,
      };
    case ADD_REQUSET_TYPE_FAILD:
      return { ...state, loadingAddRequest: false, error: action.payload };
    case ADJUSTER_PORTFOILO:
      return { ...state, adjusterPortfoiloLoading: true };
    case ADJUSTER_PORTFOILO_SUCCESS:
      return { ...state, adjusterPortfoiloLoading: false, adjusterPortfoilo: action.payload };
    case ADJUSTER_PORTFOILO_FAILD:
      return { ...state, adjusterPortfoiloLoading: false, error: action.payload };
    case APPLICANT_CURRENT_BOARD_BOSS:
      return { ...state, loadingBoardMemberBoss: true };
    case APPLICANT_CURRENT_BOARD_BOSS_SUCCESS:
      return { ...state, loadingBoardMemberBoss: false, applicantBoardMemberBoss: action.payload };
    case APPLICANT_CURRENT_BOARD_BOSS_FAILD:
      return { ...state, loadingBoardMemberBoss: false, applicantBoardMemberBoss: null, error: action.payload };
    case APPLICANT_WORKING_LOCATION_LIST:
      return { ...state, loadingApplicantWorkingLocation: true };
    case APPLICANT_WORKING_LOCATION_LIST_SUCCESS:
      return { ...state, loadingApplicantWorkingLocation: false, applicantWorkingLocation: action.payload };
    case APPLICANT_WORKING_LOCATION_LIST_FAILD:
      return { ...state, loadingApplicantWorkingLocation: false, error: action.payload, applicantWorkingLocation: null };

    case APPLICANT_POSITON_LIST:
      return { ...state, loadingApplicantPosition: true };
    case APPLICANT_POSITON_LIST_SUCCESS:
      return { ...state, loadingApplicantPosition: false, applicantposition: action.payload };
    case APPLICANT_POSITON_LIST_FAILD:
      return { ...state, loadingApplicantPosition: false, error: action.payload, applicantposition: null };

    case LIST_REQUEST_GRID:
      return { ...state, loadinglistRequestGrid: true };
    case LIST_REQUEST_GRID_SUCCESS:
      return {
        ...state,
        loadinglistRequestGrid: false,
        listRequestGrid: action.payload,
      };
    case LIST_REQUEST_GRID_FAILD:
      return {
        ...state,
        loadinglistRequestGrid: false,
        error: action.payload,
        listRequestGrid: null,
      };
    case LIST_REQUSET_TYPE_FOR_FILTER:
      return { ...state, loadingApplicanyRequestFilters: true };
    case LIST_REQUSET_TYPE_FOR_FILTER_SUCCESS:
      return {
        ...state,
        loadinglistRequestGrid: false,
        ApplicantRequestFilters: action.payload,
      };
    case LIST_REQUSET_TYPE_FOR_FILTER_FAILD:
      return {
        ...state,
        loadinglistRequestGrid: false,
        error: action.payload,
        ApplicantRequestFilters: null,
      };
    case APPLICANT_CURRENT_CEO_INFO:
      return {
        ...state, applicantCurrentCEOInfoLoading: true
      }
    case APPLICANT_CURRENT_CEO_INFO_SUCCESS:
      return {
        ...state, applicantCurrentCEOInfoLoading: false, applicantCurrentCEOInfo: action.payload
      }
    case APPLICANT_CURRENT_CEO_INFO_FAILD:
      return {
        ...state, applicantCurrentCEOInfoLoading: false, applicantCurrentCEOInfo: null, error: action.payload
      }
    case LIST_REQUEST_EXPORT_AWAIT_GRID:
      return { ...state, loadingExpertAwaitRequestGrid: true };
    case LIST_REQUEST_EXPORT_AWAIT_GRID_SUCCESS:
      return {
        ...state,
        loadingExpertAwaitRequestGrid: false,
        listExpertAwaitRequestGrid: action.payload,
      };
    case LIST_REQUEST_EXPORT_AWAIT_GRID_FAILD:
      return {
        ...state,
        loadingExpertAwaitRequestGrid: false,
        error: action.payload,
        listExpertAwaitRequestGrid: null,
      };

    case LIST_MY_REQUEST_GRID:
      return { ...state, loadingMylistRequestGrid: true };
    case LIST_MY_REQUEST_GRID_SUCCESS:
      return {
        ...state,
        loadingMylistRequestGrid: false,
        listMyRequestGrid: action.payload,
      };
    case LIST_MY_REQUEST_GRID_FAILD:
      return {
        ...state,
        loadingMylistRequestGrid: false,
        error: action.payload,
        listMyRequestGrid: null,
      };

    case LIST_REQUEST_BOSS_AWAIT_GRID:
      return { ...state, loadingBossAwaitRequestGrid: true };
    case LIST_REQUEST_BOSS_AWAIT_GRID_SUCCESS:
      return {
        ...state,
        loadingBossAwaitRequestGrid: false,
        listBossAwaitRequestGrid: action.payload,
      };
    case LIST_REQUEST_BOSS_AWAIT_GRID_FAILD:
      return {
        ...state,
        loadingBossAwaitRequestGrid: false,
        error: action.payload,
        listBossAwaitRequestGrid: null,
      };
    case APPLICANT_SEARCH_ADJUSTER:
      return { ...state, adjusterSearchLoading: true }
    case APPLICANT_SEARCH_ADJUSTER_SUCCESS:
      return { ...state, adjusterSearchLoading: false, adjusterSearchResult: action.payload }
    case APPLICANT_SEARCH_ADJUSTER_FAILD:
      return {
        ...state, adjusterSearchLoading: false, error: action.payload,
        adjusterSearchResult: null,
      }

    case APPLICANT_REQUSET_ID:
      return { ...state, loadingResultId: true };
    case APPLICANT_REQUSET_ID_SUCCESS:
      return {
        ...state,
        loadingResultId: false,
        resultId: action.payload,
      };
    case APPLICANT_REQUSET_ID_FAILD:
      return {
        ...state,
        loadingResultId: false,
        error: action.payload,
      };

    case BOSS_DETERMIN:
      return { ...state, loadingBossDetermin: true };
    case BOSS_DETERMIN_SUCCESS:
      return {
        ...state,
        loadingBossDetermin: false,
        bossDetermin: action.payload,
      };
    case BOSS_DETERMIN_FAILD:
      return {
        ...state,
        loadingBossDetermin: false,
        error: action.payload,
      };

    case EXPERT_DETERMIN:
      return { ...state, loadingExpertDetermin: true };
    case EXPERT_DETERMIN_SUCCESS:
      return {
        ...state,
        loadingExpertDetermin: false,
        expertDetermin: action.payload,
      };
    case EXPERT_DETERMIN_FAILD:
      return {
        ...state,
        loadingExpertDetermin: false,
        error: action.payload,
      };
    
      case "STOCK_HOLDER_END_DATE":
        return {
          ...state,
          stockHolderEndDateLoading:true
        }
        case "STOCK_HOLDER_END_DATE_SUCCESS":
          return {
            ...state,
            stockHolderEndDateLoading:false,
            stockHolderEndDate:action.payload
          }
        case "STOCK_HOLDER_END_DATE_FAILD":
          return {
            ...state,
            stockHolderEndDateLoading:false,
            stockHolderEndDate:null,
            error: action.payload,
          }
    default:
      return { ...state };
  }
};
