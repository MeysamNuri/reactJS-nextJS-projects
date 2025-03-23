import {
  JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
  JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
  JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const inquireSubFeildJudicial = (
  draftId: number,
  fieldId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/judicial/inquire-field-certificate?fieldId=${fieldId}&certificateNo=${certificateNo}`
    );
    dispatch({
      type: JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("استعلام گواهینامه زیر رشته تخصصی", {
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
      type: JUDICIAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
