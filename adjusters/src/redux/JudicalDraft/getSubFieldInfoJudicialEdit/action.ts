import {
  JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO,
  JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS,
  JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const getSubFieldInfoJudicialEdit = (
  gotIdForMainEdit: number,
  successFunction: (e: any) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO });
    const { data } = await apiRegistrationToken.get(
      `/applicant-sub-field-info?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_SUCCESS,
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
      type: JUDICIAL_EDIT_FIELD_INFO_GET_SUB_FIELD_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
