import {
  NATURAL_DRAFT_FEILD_INFO,
  NATURAL_DRAFT_FEILD_INFO_SUCCESS,
  NATURAL_DRAFT_FEILD_INFO_FAILD,
  NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO,
  NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_SUCCESS,
  NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_FAILED,
  NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO,
  NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS,
  NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const sendFeildInfoEdit = (
  gotIdForMainEdit: number,
  feildInfo: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_FEILD_INFO,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/natural/adjustment-field-info`,
      feildInfo
    );
    successFunction();
    dispatch({
      type: NATURAL_DRAFT_FEILD_INFO_SUCCESS,
      payload: data,
    });
    // toast.success("اطلاعات رشته ارسال شد", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_FEILD_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSpecializedFieldInfoEdit = (
  gotIdForMainEdit?: number,
  successFunction?: (e: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO });
    const { data } = await apiRegistrationToken.get(
      `/applicant-field-info-specialized?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_SUCCESS,
      payload: data,
    });

    if (data?.IsSucceed === false) {
      toast.error(`${data?.Message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction && successFunction(data?.Result?.AdjustmentFieldId);
  } catch (error: any) {
    dispatch({
      type: NATURAL_EDIT_FIELD_INFO_GET_SPECIALIZED_FIELD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSubFieldInfoEdit = (
  gotIdForMainEdit: number,
  successFunction: (e: any) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO });
    const { data } = await apiRegistrationToken.get(
      `/applicant-sub-field-info?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      const subFieldsArray = data?.Result?.map(
        (subField: { SubFieldId: number; SubFieldTitle: string }) =>
          subField.SubFieldId
      );

      successFunction(subFieldsArray);
    } else {
      // toast.error(`${data?.Message}`, {
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
      type: NATURAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
