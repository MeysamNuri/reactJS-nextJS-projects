import {
  Justice_NEWID,
  Justice_NEWID_SUCCESS,
  Justice_NEWID_FAILD,
} from "../../constant/actionTypes";
import { adjusterTypeId } from "../../shared/ulitities/Enums/adjusterTypeId";
import { apiRegistrationToken } from "../../httpServices/service";
import { messageSuccess, messageError } from "../../utils/utils";
export const sendJudicalId = (nationalCodeAndBirthdate) => async (dispatch) => {
  try {
    dispatch({
      type: Justice_NEWID,
    });
    const { data } = await api.apiRegistrationToken(
      `registration/draft/new-id`,
      nationalCodeAndBirthdate
    );
    if (data.IsSucceed) {
      messageSuccess("استعلام موفقیت آمیز بود");
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: Justice_NEWID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    messageError("خطایی در سمت سرور رخ داده است");

    dispatch({
      type: Justice_NEWID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
