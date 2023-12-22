import {
  POST_IS_EXAM_NOT_NEEDED_DRAFT,
  POST_IS_EXAM_NOT_NEEDED_DRAFT_SUCCESS,
  POST_IS_EXAM_NOT_NEEDED_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const postIsExamNotNeededDraft = (
  adjType: number,
  draftId: number,
  isExam: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: POST_IS_EXAM_NOT_NEEDED_DRAFT,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/adjusterType/${adjType}/sub-field-check-exam-not-needed`,
      isExam
    );
    dispatch({
      type: POST_IS_EXAM_NOT_NEEDED_DRAFT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success(data?.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    }
  } catch (error: any) {
    dispatch({
      type: POST_IS_EXAM_NOT_NEEDED_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
