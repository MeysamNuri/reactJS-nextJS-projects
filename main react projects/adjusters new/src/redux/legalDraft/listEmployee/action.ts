import {
  LIST_LEGAL_DRAFT_EMPLOYEE,
  LIST_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
  LIST_LEGAL_DRAFT_EMPLOYEE_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken ,api} from "../../../httpServices/service";

export const fetchEmployeeLegal = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/employee-list`
    );
    
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchEmployeeLegalEdit = (gotIdForMainEdit?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/employee-list`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchEmployeeLegalEditToken = (gotIdForMainEdit?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE,
    });
    const { data } = await api.get(
      `registration/${gotIdForMainEdit}/legal/employee-list/token`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_LEGAL_DRAFT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

