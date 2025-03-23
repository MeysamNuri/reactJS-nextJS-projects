import {
  GET_BOARD_MEMBER_LIST_REQUEST,
  GET_BOARD_MEMBER_LIST_REQUEST_SUCCESS,
  GET_BOARD_MEMBER_LIST_REQUEST_FAILED,
} from "../../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  getBoardMemberListRequest:
    // null,
    {},
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_BOARD_MEMBER_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_BOARD_MEMBER_LIST_REQUEST_SUCCESS:
      // for (let i = 0; i < action.payload.Result.length; i++) {
      //   const element = action.payload.Result[i];
      //   element.key = action.applicantId;
      // }
      return {
        ...state,
        loading: false,
        getBoardMemberListRequest:
          //action.payload,

          {
            ...state.getBoardMemberListRequest,
            [action.applicantId]: action.payload.Result,
          },
      };
    case GET_BOARD_MEMBER_LIST_REQUEST_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
