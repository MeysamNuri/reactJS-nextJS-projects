import {
  FETCH_INTERVIEWER_SCORE,
  FETCH_INTERVIEWER_SCORE_FAILD,
  FETCH_INTERVIEWER_SCORE_SUCCESS,
} from "../../../../constant/cartableActionTypes";
import { api } from "../../../../httpServices/service";
import {messageError } from "../../../../utils/utils";

// لیست نمرات مصاحبه کنندگان
export const fetchInterviewerScore = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: FETCH_INTERVIEWER_SCORE,
    });

    const { data } = await api.get(
      `/admission/cartable/interviewer-score/${applicantId}`
    );

    if (data.IsSucceed === true) {
      
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: FETCH_INTERVIEWER_SCORE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_INTERVIEWER_SCORE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
