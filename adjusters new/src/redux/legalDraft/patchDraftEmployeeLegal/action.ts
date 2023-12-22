//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_PATCH_EMPLOYEE,
  LEGAL_DRAFT_PATCH_EMPLOYEE_SUCCESS,
  LEGAL_DRAFT_PATCH_EMPLOYEE_FAILD,
} from "../../../constant/legalActionTypes";

import { IEmployee } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const patchDraftEmployeeLegal = (
  draftId: number,
  employee: IEmployee,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_EMPLOYEE });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/employee/${tempId}/update`,
      employee
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === false && data.ErrorType === -2) {
      toast.error("کد ملی با تاریخ تولد همخوانی ندارد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("اطلاعات به درستی ویرایش گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_PATCH_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const patchDraftEmployeeLegalEdit = (
  gotIdForMainEdit: number,
  employee: IEmployee,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_EMPLOYEE });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/employee/${tempId}/update`,
      employee
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === false && data.ErrorType === -2) {
      toast.error("کد ملی با تاریخ تولد همخوانی ندارد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("اطلاعات به درستی ویرایش گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    successFunction();
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_PATCH_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
