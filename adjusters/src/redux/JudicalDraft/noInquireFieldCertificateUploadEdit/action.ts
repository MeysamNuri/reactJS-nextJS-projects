import {
  JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE,
  JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
  JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const postInquireFeildCertificateJudicialEdit = (
  gotIdForMainEdit: number,
  fieldId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE,
      payload: fieldId,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant-inquire?id=${gotIdForMainEdit}&fieldId=${fieldId}&certificateNo=${certificateNo}`
    );
    dispatch({
      type: JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success(`${data?.Message}`, {
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
      type: JUDICIAL_EDIT_INQUIRE_FIELD_CERTIFICATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
