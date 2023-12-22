import {
  DRAFT_NEWID,
  DRAFT_NEWID_SUCCESS,
  DRAFT_NEWID_FAILD,
} from "../../constant/actionTypes";
import { apiRegistrationToken } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";

export const sendDraftId = (
  nationalCodeAndBirthdate: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try { 
    dispatch({
      type: DRAFT_NEWID,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/new-id`,
      nationalCodeAndBirthdate
    );
    if (data.IsSucceed) {
      messageSuccess("استعلام موفقیت آمیز بود");
      successFunction();
      localStorage.setItem(
        "IsApplicantSecondLicense",
        JSON.stringify(data?.Result?.IsApplicantSecondLicense)
      );
      dispatch({
        type: DRAFT_NEWID_SUCCESS,
        payload: data,
        mobileNumber: nationalCodeAndBirthdate?.mobile,
      });

      if (data?.Result?.DraftId !== undefined) {
        localStorage.setItem(
          "naturalDraftId",
          JSON.stringify(data?.Result?.DraftId)
        );
      }
    } else {
      messageError(data.Message);
      dispatch({
        type: DRAFT_NEWID_FAILD,
      });
    }
  } catch (error: any) {
    messageError(error);
    dispatch({
      type: DRAFT_NEWID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
