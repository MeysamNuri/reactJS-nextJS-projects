import {
  UPLOAD_SUB_FIELD_INFO_CERTIFICATE_DRAFT,
  UPLOAD_SUB_FIELD_INFO_CERTIFICATE_DRAFT_SUCCESS,
  UPLOAD_SUB_FIELD_INFO_CERTIFICATE_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const uploadCertificateSubFieldInfoDraft = (
  adjType: number,
  draftId: number,
  subFieldId: number,
  file: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("80hour-certificate", file);
  try {
    dispatch({
      type: UPLOAD_SUB_FIELD_INFO_CERTIFICATE_DRAFT,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/adjusterType/${adjType}/sub-field/${subFieldId}/certificate`,
      formData
    );

    if (data.IsSucceed === true) {
      toast.success("گواهینامه زیر رشته تخصصی به درستی آپلود گردید", {
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

    dispatch({
      type: UPLOAD_SUB_FIELD_INFO_CERTIFICATE_DRAFT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_SUB_FIELD_INFO_CERTIFICATE_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
