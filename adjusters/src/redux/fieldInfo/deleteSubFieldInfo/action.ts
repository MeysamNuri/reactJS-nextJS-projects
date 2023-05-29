import {
  DELETE_SUB_FIELD_INFO_DRAFT,
  DELETE_SUB_FIELD_INFO_DRAFT_SUCCESS,
  DELETE_SUB_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteSubFieldInfoDraft = (
  adjType: number,
  draftId: number,
  subFieldId: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_SUB_FIELD_INFO_DRAFT,
    });
    const { data } = await apiRegistrationToken.delete(
      `registration/draft/${draftId}/adjusterType/${adjType}/sub-field-info?subField=${subFieldId}`
    );
    dispatch({
      type: DELETE_SUB_FIELD_INFO_DRAFT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      toast.success("حذف زیر رشته با موفقیت انجام شد ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else if (!data.IsSucceed) {
      toast.success(data.Message, {
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
      type: DELETE_SUB_FIELD_INFO_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
