import {
  BOARD_MEMBER_NATURAL_SUB_FIELD,
  BOARD_MEMBER_NATURAL_SUB_FIELD_SUCCESS,
  BOARD_MEMBER_NATURAL_SUB_FIELD_FAILD,
} from "../../../constant/legalActionTypes";
import { api } from "../../../httpServices/service";

//لیست زیر رشته ها
export const fetchNaturalSubField = (applicantId?:number) => async (dispatch: any) => {
  try {
    dispatch({
      type: BOARD_MEMBER_NATURAL_SUB_FIELD,
    });
    const { data } = await api.get(`/board-member/applicant/${applicantId}/natural-sub-field`);
    dispatch({
      type: BOARD_MEMBER_NATURAL_SUB_FIELD_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_MEMBER_NATURAL_SUB_FIELD_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
