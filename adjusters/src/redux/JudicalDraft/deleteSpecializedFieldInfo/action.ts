import {
  DELETE_JUDICIAL_SPECIALIZED_FIELD_INFO,
  DELETE_JUDICIAL_SPECIALIZED_FIELD_INFO_SUCCESS,
  DELETE_JUDICIAL_SPECIALIZED_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteSpecializedFieldInfoJudicialEdit = (
  gotIdForMainEdit: number,
  fieldId: any,
  firstSuccessFunction: () => void,
  secondSuccessFunction: () => void,
  failedFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_JUDICIAL_SPECIALIZED_FIELD_INFO,
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant-field-info?id=${gotIdForMainEdit}&fieldId=${fieldId}`
    );

    dispatch({
      type: DELETE_JUDICIAL_SPECIALIZED_FIELD_INFO_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("زمینه تخصصی به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      firstSuccessFunction();
      secondSuccessFunction();
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
      failedFunction();
    }
  } catch (error: any) {
    failedFunction();
    dispatch({
      type: DELETE_JUDICIAL_SPECIALIZED_FIELD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
