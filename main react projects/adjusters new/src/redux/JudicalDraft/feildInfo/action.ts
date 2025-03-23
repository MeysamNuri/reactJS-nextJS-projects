import {
  GET_JUDICAL_EDIT_FEILD_INFO,
  GET_JUDICAL_EDIT_FEILD_INFO_SUCCESS,
  GET_JUDICAL_EDIT_FEILD_INFO_FAILED,
} from "../../../constant/judicalActionTypes";

import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const getJudicialAdjustmentFieldInfoEdit = (
  gotIdForMainEdit: number,
  successFunction: (e: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_JUDICAL_EDIT_FEILD_INFO,
    });
    const { data } = await apiRegistrationToken.get(
      `/applicant-field-info-specialized?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: GET_JUDICAL_EDIT_FEILD_INFO_SUCCESS,
      payload: data,
    });

    if (data.IsSucceed === true) {
      // toast.success("اطلاعات رشته با موفقیت دریافت شد", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      successFunction(data?.Result?.AdjustmentFieldId);
    } else {
      // toast.error("ارسال اطلاعات رشته با خطا مواجه گردید", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }
  } catch (error: any) {
    dispatch({
      type: GET_JUDICAL_EDIT_FEILD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
