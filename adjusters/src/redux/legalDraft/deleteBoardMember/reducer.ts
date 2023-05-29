import {
    DELETE_LEGAL_DRAFT_BOARD_MEMBER,
    DELETE_LEGAL_DRAFT_BOARD_MEMBER_SUCCESS,
    DELETE_LEGAL_DRAFT_BOARD_MEMBER_FAILD,
  } from "../../../constant/legalActionTypes";
   
  const INIT_STATE = {
    loading: false,
    deleteLegalDraftCardBoardMember: ""
  };
   
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case DELETE_LEGAL_DRAFT_BOARD_MEMBER:
        return { ...state, loading: true };
      case DELETE_LEGAL_DRAFT_BOARD_MEMBER_SUCCESS:
        return { ...state, loading: false, deleteLegalDraftCardBoardMember: action.payload };
      case DELETE_LEGAL_DRAFT_BOARD_MEMBER_FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  