import {
  GET_BOARD_MEMBER_LIST_REQUEST,
  GET_BOARD_MEMBER_LIST_REQUEST_SUCCESS,
  GET_BOARD_MEMBER_LIST_REQUEST_FAILED,
} from "../../../../constant/cartableActionTypes";
import { api } from "../../../../httpServices/service";
import { toast } from "react-toastify";

export const getBoardMemberListRequest = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: GET_BOARD_MEMBER_LIST_REQUEST,
    });
    const { data } = await api.get(
      `/report/board-member-list-request/${applicantId}`
    );
    dispatch({
      type: GET_BOARD_MEMBER_LIST_REQUEST_SUCCESS,
      payload: data,
      applicantId: applicantId,
    });
  } catch (error: any) {
    dispatch({
      type: GET_BOARD_MEMBER_LIST_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
