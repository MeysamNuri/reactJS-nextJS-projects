import {
  JUDICAL_NEW_ID,
  JUDICAL_NEW_ID_SUCCESS,
  JUDICAL_NEW_ID_FAILD,
} from "../../../constant/judicalActionTypes";
import { toast } from "react-toastify";
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendJudicalId = (
  nationalCodeAndBirthdate: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_NEW_ID,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/new-id`,
      nationalCodeAndBirthdate
    );
    //console.log(data, "dataDradtJudicalId");
    if (data.IsSucceed) {
      toast.success("استعلام موفقیت آمیز بود", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: JUDICAL_NEW_ID_SUCCESS,
        payload: data,
        mobileNumber: nationalCodeAndBirthdate?.mobile,
      });
      if (data.Result?.DraftId !== undefined) {
        successFunction();
        localStorage.setItem(
          "judicalDraftId",
          JSON.stringify(data?.Result?.DraftId)
        );
      }
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
      dispatch({
        type: JUDICAL_NEW_ID_FAILD,
      });
    }
  } catch (error: any) {
    dispatch({
      type: JUDICAL_NEW_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
