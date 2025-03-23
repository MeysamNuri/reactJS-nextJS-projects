
import {
  CURRENT_BOARD_MEMBER_LIST,
  CURRENT_BOARD_MEMBER_LIST_SUCCESS,
  CURRENT_BOARD_MEMBER_LIST_FAILD,
  NEW_BOARD_MEMBER_LIST,
  NEW_BOARD_MEMBER_LIST_SUCCESS,
  NEW_BOARD_MEMBER_LIST_FAILD,
  BOARD_MEMBER_END_DATE,
  BOARD_MEMBER_END_DATE_SUCCESS,
  BOARD_MEMBER_END_DATE_FAILD,
  ADJUSTER_LIST,
  ADJUSTER_LIST_SUCCESS,
  ADJUSTER_LIST_FAILD,
  BOARD_MEMBER_REVIEWED,
  BOARD_MEMBER_REVIEWED_SUCCESS,
  BOARD_MEMBER_REVIEWED_FAILD,
  BOARD_MEMBER_NOT_REVIEWED,
  BOARD_MEMBER_NOT_REVIEWED_SUCCESS,
  BOARD_MEMBER_NOT_REVIEWED_FAILD,
  DETAIL_BOARED_MEMBER,
  DETAIL_BOARED_MEMBER_SUCCESS,
  DETAIL_BOARED_MEMBER_FAILD
} from "../../../constant/desktop";

const INIT_STATE = {
  listCurrrentBoardMember: null,
  loading: false,
  adjusterList: null,
  loadingAdjuster: false,
  listBoardMemberIsviewed: null,
  listBoardMemberNotviewed: null,
  detailBoardMember:null,
  loadingIsviewed:false,
  loadingNotViewed:false,
  loadingDetailBoardMember:false,
  boardMemeberCaratableEndDate:null,
  boardMemberCartableEndDateLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CURRENT_BOARD_MEMBER_LIST:
      return {
        ...state,
        loading: false,
        listCurrrentBoardMember: action.payload,
      };
    case CURRENT_BOARD_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        listCurrrentBoardMember: action.payload,
      };
    case CURRENT_BOARD_MEMBER_LIST_FAILD:
      return {
        ...state,
        loading: false,
        listCurrrentBoardMember: action.payload,
      };

    case ADJUSTER_LIST:
      return {
        ...state,
        loadingAdjuster: false,
        adjusterList: action.payload,
      };
    case ADJUSTER_LIST_SUCCESS:
      return {
        ...state,
        loadingAdjuster: false,
        adjusterList: action.payload,
      };
    case ADJUSTER_LIST_FAILD:
      return {
        ...state,
        loadingAdjuster: false,
        adjusterList: action.payload,
      };

    case BOARD_MEMBER_REVIEWED:
      return {
        ...state,
        loadingIsviewed: false,
        listBoardMemberIsviewed: action.payload,
      };
    case BOARD_MEMBER_REVIEWED_SUCCESS:
      return {
        ...state,
        loadingIsviewed: false,
        listBoardMemberIsviewed: action.payload,
      };
    case BOARD_MEMBER_REVIEWED_FAILD:
      return {
        ...state,
        loadingIsviewed: false,
        listBoardMemberIsviewed: action.payload,
      };
      
    case BOARD_MEMBER_NOT_REVIEWED:
      return {
        ...state,
        loadingNotViewed: false,
        listBoardMemberNotviewed: action.payload,
      };
    case BOARD_MEMBER_NOT_REVIEWED_SUCCESS:
      return {
        ...state,
        loadingNotViewed: false,
        listBoardMemberNotviewed: action.payload,
      };
    case BOARD_MEMBER_NOT_REVIEWED_FAILD:
      return {
        ...state,
        loadingNotViewed: false,
        listBoardMemberNotviewed: action.payload,
      };
      case DETAIL_BOARED_MEMBER:
        return {
          ...state,
          loadingDetailBoardMember: false,
          detailBoardMember: action.payload,
        };
      case DETAIL_BOARED_MEMBER_SUCCESS:
        return {
          ...state,
          loadingDetailBoardMember: false,
          detailBoardMember: action.payload,
        };
      case DETAIL_BOARED_MEMBER_FAILD:
        return {
          ...state,
          loadingDetailBoardMember: false,
          detailBoardMember: action.payload,
        };
        case "BOARED_MEMBER_END_DATE":
          return { ...state, boardMemberCartableEndDateLoading: true };
        case "BOARED_MEMBER_END_DATE_SUCCESS":
          return { ...state, boardMemberCartableEndDateLoading: false ,boardMemeberCaratableEndDate:action.payload};
        case "BOARED_MEMBER_END_DATE_FAILD":
          return { ...state, boardMemberCartableEndDateLoading: false ,employeeEndDate:null,error: action.payload,};
    default:
      return { ...state };
  }
};
