//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_COMPANY_INFO,
  LEGAL_DRAFT_COMPANY_INFO_SUCCESS,
  LEGAL_DRAFT_COMPANY_INFO_FAILD,
  LEGAL_DRAFT_COMPANY_INFO_GET_SUCCESS,
  LEGAL_COMPANY_TYPES,
  LEGAL_COMPANY_TYPES_SUCCESS,
  LEGAL_COMPANY_TYPES_FAILD
} from "../../../constant/legalActionTypes";

import { ICompanyInfo } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { api, apiRegistrationToken } from "../../../httpServices/service";

export const sendCompanyInfoDraft = (
  legalDraftId: number,
  companyInfo: ICompanyInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_COMPANY_INFO });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${legalDraftId}/legal/company-info`,
      companyInfo
    );
    successFunction();
    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات شرکت اضافه گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const companyTypeDetails=(companyDetailsBody:any)=>(dispatch:any)=>{
  dispatch({ type: "COMPANY_TYPE_DETAILS",payload:companyDetailsBody});
}

/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const sendCompanyInfoEdit = (
  gotIdForMainEdit: number,
  companyInfo: ICompanyInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_COMPANY_INFO });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/company-info/update`,
      companyInfo
    );
    successFunction();
    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات شرکت با موفقیت ویرایش گردید", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCompanyInfoDraft = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: LEGAL_DRAFT_COMPANY_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/company-info`
    );

    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCompanyInfoEdit = (legalDraftId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: LEGAL_DRAFT_COMPANY_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${legalDraftId}/legal/company-info`
    );

    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_GET_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_COMPANY_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getCompanyTypes = () => async (
  dispatch: any
) => {
  try {
    dispatch({ type: LEGAL_COMPANY_TYPES });
    const { data } = await apiRegistrationToken.get(
      `/BaseInfo/CompanyTypes`
    );

    dispatch({
      type: LEGAL_COMPANY_TYPES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_COMPANY_TYPES_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
