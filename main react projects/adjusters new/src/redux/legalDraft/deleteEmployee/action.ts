import {
  DELETE_LEGAL_DRAFT_EMPLOYEE,
  DELETE_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
  DELETE_LEGAL_DRAFT_EMPLOYEE_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteLegalDraftEmployeerAction = (
  legalDraftId: number,
  employeeTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_EMPLOYEE,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${legalDraftId}/legal/employee/${employeeTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("اطلاعات کارکن مورد نظر به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      success();
    }
  } catch (error: any) {
    dispatch({
      type: DELETE_LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLegalDraftEmployeerActionEdit = (
  gotIdForMainEdit: number,
  employeeTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_EMPLOYEE,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/${gotIdForMainEdit}/legal/employee/${employeeTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("اطلاعات کارکن مورد نظر به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      success();
    }
  } catch (error: any) {
    dispatch({
      type: DELETE_LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
