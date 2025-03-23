//redux
import {
  GET_APPLICANT_LAST_STATUS,
  GET_APPLICANT_LAST_STATUS_SUCCESS,
  GET_APPLICANT_LAST_STATUS_FAILED,
} from "../../../constant/actionTypes";
import { toast } from "react-toastify";

//apis
import { apiWithoutToken } from "../../../httpServices/service";

export const getApplicantLastStatusInAllStates = (
  dataToPost: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_APPLICANT_LAST_STATUS });
    const { data } = await apiWithoutToken.post(
      `registration/applicant/status-list`,
      dataToPost
    );
    if (data.IsSucceed) {
      successFunction();
      dispatch({
        type: GET_APPLICANT_LAST_STATUS_SUCCESS,
        payload: data,
      });
    } else if (!data.IsSucceed) {
      toast.error(`${data.Message} `, {
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
      type: GET_APPLICANT_LAST_STATUS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
