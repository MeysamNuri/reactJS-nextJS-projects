import {
  DRAFT_NATIONAL_IDENTIFY,
  DRAFT_NATIONAL_IDENTIFY_SUCCESS,
  DRAFT_PERSONAL_INFO__FAILD,
} from "../../../constant/actionTypes";
import { toast } from "react-toastify";
import { apiRegistrationToken } from "../../../httpServices/service";
import { INationalIdentity } from "../../../shared/ulitities/Model/draftNatural";

export const postNationaltyIdenttify = (
  draftId: number,
  nationalIdentity: INationalIdentity
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DRAFT_NATIONAL_IDENTIFY,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/national-identity`,
      nationalIdentity
    );
    dispatch({
      type: DRAFT_NATIONAL_IDENTIFY_SUCCESS,
      payload: data,
    });

    if (data.IsSucceed === true) {
      toast.success("استعلام کد ملی", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (data.IsSucceed === false && data.ErrorType === -2) {
      toast.error("کد ملی و یا تاریخ تولد نامعتبر است", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("استعلام با خطا روبه رو گردید", {
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
      type: DRAFT_PERSONAL_INFO__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
