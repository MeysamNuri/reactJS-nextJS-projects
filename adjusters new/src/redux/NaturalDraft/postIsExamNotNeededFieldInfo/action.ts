import {
  POST_IS_EXAM_NOT_NEEDED_EDIT,
  POST_IS_EXAM_NOT_NEEDED_EDIT_SUCCESS,
  POST_IS_EXAM_NOT_NEEDED_EDIT_FAILED,
} from "../../../constant/commonTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const postIsExamNotNeededEdit = (
  dataToPost: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: POST_IS_EXAM_NOT_NEEDED_EDIT,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant-field-info/set-is-examNot-needed/update`,
      dataToPost
    );
    dispatch({
      type: POST_IS_EXAM_NOT_NEEDED_EDIT_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success(data?.Message, {
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
      type: POST_IS_EXAM_NOT_NEEDED_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
