import {
  INQUIRE_FIELD_INFO_DRAFT,
  INQUIRE_FIELD_INFO_DRAFT_SUCCESS,
  INQUIRE_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const inquireFieldInfoDraft = (
  adjType: number,
  draftId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INQUIRE_FIELD_INFO_DRAFT,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/adjusterType/${adjType}/inquire-80hour-certificate?certificateNo=${certificateNo}`
    );
    dispatch({
      type: INQUIRE_FIELD_INFO_DRAFT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("استعلام موفقیت آمیز گواهینامه", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else  {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    toast.error("خطای سمت سرور در استعلام", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    dispatch({
      type: INQUIRE_FIELD_INFO_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
