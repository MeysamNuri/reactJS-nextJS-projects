import {
  UPDATE_INTERVIEWER_SCORE,
  UPDATE_INTERVIEWER_SCORE_SUCCESS,
  UPDATE_INTERVIEWER_SCORE_FAILD,
} from "../../../../constant/cartableActionTypes";
import { api } from "../../../../httpServices/service";
import { IIntervewersScore } from "../../../../shared/ulitities/Model/score";
import { messageSuccess, messageError } from "../../../../utils/utils";



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

//آپدیت نمره
export const updateScoreInterviewer = (
  updateScore: IIntervewersScore,
  successFunction: () => void,
) => async (dispatch: any) => {
  try {
    dispatch({
      type: UPDATE_INTERVIEWER_SCORE,
    });
    const { data } = await api.post(
      `/admission/cartable/interviewer-score/update`,
      updateScore
    );
    if (data.IsSucceed === true) {
      messageSuccess("نمرات با موفقیت آپدیت گردیدند");
      successFunction()
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: UPDATE_INTERVIEWER_SCORE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطای در سرور رخ داده است");
    dispatch({
      type: UPDATE_INTERVIEWER_SCORE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
