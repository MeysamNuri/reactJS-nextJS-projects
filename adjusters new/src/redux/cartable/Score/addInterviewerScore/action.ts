import {
  ADD_INTERVIEWER_SCORE,
  ADD_INTERVIEWER_SCORE_SUCCESS,
  ADD_INTERVIEWER_SCORE_FAILD,
} from "../../../../constant/cartableActionTypes";
import { api } from "../../../../httpServices/service";
import { IIntervewersScore } from "../../../../shared/ulitities/Model/score";
import { messageSuccess, messageError } from "../../../../utils/utils";

// ذخیره نمره
export const addInterviewerScore = (
  saveScore: IIntervewersScore,
  successFunction: () => void,
  successFunction2: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_INTERVIEWER_SCORE,
    });
    const { data } = await api.post(
      `/admission/cartable/interviewer-score`,
      saveScore
    );

    if (data.IsSucceed === true) {
      messageSuccess("نمرات با موفقیت ذخیره گردیدند");
      successFunction();
      successFunction2()
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: ADD_INTERVIEWER_SCORE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطای در سرور رخ داده است");
    dispatch({
      type: ADD_INTERVIEWER_SCORE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export default addInterviewerScore;
