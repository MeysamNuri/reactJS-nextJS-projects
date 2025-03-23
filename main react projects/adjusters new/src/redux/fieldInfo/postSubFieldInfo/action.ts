import {
  POST_SUB_FIELD_INFO_DRAFT,
  POST_SUB_FIELD_INFO_DRAFT_SUCCESS,
  POST_SUB_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const postSubFieldInfoDraft = (
  adjType: number,
  draftId: number,
  subFieldsArray: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: POST_SUB_FIELD_INFO_DRAFT,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/adjusterType/${adjType}/sub-field-info`,
      subFieldsArray
    );
    dispatch({
      type: POST_SUB_FIELD_INFO_DRAFT_SUCCESS,
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
  } catch (error:any) {
    dispatch({
      type: POST_SUB_FIELD_INFO_DRAFT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
