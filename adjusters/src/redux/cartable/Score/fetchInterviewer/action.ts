import {
  LIST_QUESTION,
  LIST_QUESTION_SUCCESS,
  LIST_QUESTION_FAILD,
} from "../../../../constant/cartableActionTypes";
import { api } from "../../../../httpServices/service";

//لیست مصاحبه کنندگان
export const fetchListInterviewerScore = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_QUESTION,
    });
    const { data } = await api.get(
      `/admission/cartable/interviewer-score-list/${applicantId}`
    );
    dispatch({
      type: LIST_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_QUESTION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
