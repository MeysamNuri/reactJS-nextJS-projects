import {
  POST_APPLICANT_FIELD_INFO_FIELD_JUDICIAL_INFO,
  POST_APPLICANT_FIELD_INFO_FIELD_JUDICIAL_INFO_SUCCESS,
  POST_APPLICANT_FIELD_INFO_FIELD_JUDICIAL_INFO_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const postApplicantFieldInfoJudicialEdit = (
  gotIdForMainEdit: number,
  fieldId: any,
  isExamNotNeeded: boolean,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: POST_APPLICANT_FIELD_INFO_FIELD_JUDICIAL_INFO,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant-field-info?id=${gotIdForMainEdit}&fieldId=${fieldId}&isExamNotNeeded=${
        isExamNotNeeded ? "1" : "0"
      }`
    );

    dispatch({
      type: POST_APPLICANT_FIELD_INFO_FIELD_JUDICIAL_INFO_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("زمینه تخصصی به درستی ویرایش گردید ", {
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
  } catch (error: any) {
    dispatch({
      type: POST_APPLICANT_FIELD_INFO_FIELD_JUDICIAL_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
