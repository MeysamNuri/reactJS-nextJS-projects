import {
  POST_FIELD_INFO_DRAFT,
  POST_FIELD_INFO_DRAFT_SUCCESS,
  POST_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const postFieldInfoDraft = (
  adjType: number,
  draftId: number,
  fieldInfo: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: POST_FIELD_INFO_DRAFT,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/adjusterType/${adjType}/adjustment-field-info`,
      fieldInfo
    );
    dispatch({
      type: POST_FIELD_INFO_DRAFT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      // toast.success("اطلاعات رشته ارسال شد", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      successFunction();
    }
  } catch (error: any) {
    dispatch({
      type: POST_FIELD_INFO_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
