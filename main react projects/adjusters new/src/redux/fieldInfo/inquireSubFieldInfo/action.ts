import {
  INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT,
  INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_SUCCESS,
  INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const inquireSubFieldInfoDraft = (
  adjType: number,
  draftId: number,
  fieldId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT,
      payload: fieldId,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/adjusterType/${adjType}/inquire-field-certificate?fieldId=${fieldId}&certificateNo=${certificateNo}`
    );
    dispatch({
      type: INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_SUCCESS,
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
    } else {
      toast.error(`${data?.Message}`, {
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
    dispatch({
      type: INQUIRE_SUB_FIELD_CERTIFICATE_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
