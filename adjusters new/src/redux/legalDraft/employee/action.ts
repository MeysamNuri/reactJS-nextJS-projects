//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_EMPLOYEE,
  LEGAL_DRAFT_EMPLOYEE_SUCCESS,
  LEGAL_DRAFT_EMPLOYEE_FAILD,
} from "../../../constant/legalActionTypes";

import { IEmployee } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendEmployeeLegal = (
  draftId: number,
  employee: IEmployee,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_EMPLOYEE });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/employee`,
      employee
    );

    dispatch({
      type: LEGAL_DRAFT_EMPLOYEE_SUCCESS,
      payload: data,
    });
  
    if (!data.IsSucceed) {
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("اطلاعات کارکنان اضافه گردید", {
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
    toast.error(error.Message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    dispatch({
      type: LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendEmployeeLegalEdit = (
  gotIdForMainEdit: number,
  employee: IEmployee,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_EMPLOYEE });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/employee`,
      employee
    );

    dispatch({
      type: LEGAL_DRAFT_EMPLOYEE_SUCCESS,
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
    } 
    else  if (!data.IsSucceed) {
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
    
    else {
      toast.success("اطلاعات کارکنان اضافه گردید", {
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
      type: LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
