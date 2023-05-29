import {
  DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT,
  DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_SUCCESS,
  DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_FAILED,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteJudicialSubFieldInfoEdit = (
  editId: number,
  subFieldId: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT });

    const { data } = await apiRegistrationToken.delete(
      `applicant-sub-field-info?id=${editId}&subFieldId=${subFieldId}`
    );

    dispatch({
      type: DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("زیر رشته تخصصی به درستی حذف گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    }
  } catch (error: any) {
    dispatch({
      type: DELETE_JUDICIAL_SUB_FIELD_INFO_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
