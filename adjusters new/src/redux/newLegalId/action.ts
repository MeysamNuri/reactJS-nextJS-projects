import {
  LEGAL_NEWID,
  LEGAL_NEWID_SUCCESS,
  LEGAL_NEWID_FAILD,
} from "../../constant/actionTypes";
import { toast } from "react-toastify";
import { apiRegistrationToken } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";

export const sendLegalId = (
  nationalCodeAndBirthdate: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LEGAL_NEWID,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/new-id`,
      nationalCodeAndBirthdate
    );
    if (data.IsSucceed) {
      messageSuccess("استعلام موفقیت آمیز بود");
      dispatch({
        type: LEGAL_NEWID_SUCCESS,
        payload: data,
      });
      if (data.Result?.DraftId !== undefined) {
        localStorage.setItem(
          "legalDraftId",
          JSON.stringify(data.Result?.DraftId)
        );
      }
      successFunction();
    } else {
      messageError(data.Message);
      dispatch({
        type: LEGAL_NEWID_FAILD,
      });
    }
  } catch (error: any) {
    messageError("خطای در سرور رخ داده است");

    dispatch({
      type: LEGAL_NEWID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
