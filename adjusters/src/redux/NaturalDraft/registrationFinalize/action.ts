//libraries
import { toast } from "react-toastify";

import {
  REGISTRATION_FINALIZE,
  REGISTRATION_FINALIZE_SUCCESS,
  REGISTRATION_FINALIZE_FAILED,
} from "../../../constant/commonTypes";
import {
  apiWithoutToken,
  apiRegistrationToken,
} from "../../../httpServices/service";

export const registerationFinalize = (
  draftId: number,
  loadingFunction: () => void,
  successFunction: () => void,
  failedFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTRATION_FINALIZE,
    });
    loadingFunction();

    const { data } = await apiWithoutToken.get(
      `/registration/draft/${draftId}/finalize`
    );
    if (data.IsSucceed === true) {
      successFunction();
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
      failedFunction();
    }
    dispatch({
      type: REGISTRATION_FINALIZE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REGISTRATION_FINALIZE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    failedFunction();
  }
};
