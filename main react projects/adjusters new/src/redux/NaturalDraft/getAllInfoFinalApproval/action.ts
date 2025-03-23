//redux
import {
  GET_ALL_INFO_FINAL_APPROVAL,
  GET_ALL_INFO_FINAL_APPROVAL_SUCCESS,
  GET_ALL_INFO_FINAL_APPROVAL_FAILED,
} from "../../../constant/actionTypes";

//libraries
import { toast } from "react-toastify";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getAllInfoForFinalApprovalDraft = (draftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_ALL_INFO_FINAL_APPROVAL });
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/natural`
    );
    if (data.IsSucceed === true) {
    } else if (data.IsSucceed === false) {
      toast.error(`${data.Message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: GET_ALL_INFO_FINAL_APPROVAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_ALL_INFO_FINAL_APPROVAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
