//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_PATCH_STOCKHOLDER,
  LEGAL_DRAFT_PATCH_STOCKHOLDER_SUCCESS,
  LEGAL_DRAFT_PATCH_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";

import { IStockholder } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";


/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const patchDraftStockholderLegal = (
  draftId: number,
  stockholder: IStockholder,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_STOCKHOLDER });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/stockholder/${tempId}/update`,
      stockholder
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_STOCKHOLDER_SUCCESS,
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
      type: LEGAL_DRAFT_PATCH_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



/**
 * 
 * @param {Todo:  method post for update is change} param0 
 */

export const patchDraftStockholderLegalEdit = (
  gotIdForMainEdit: number,
  stockholder: IStockholder,
  tempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_PATCH_STOCKHOLDER });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${gotIdForMainEdit}/legal/stockholder/${tempId}/update`,
      stockholder
    );

    dispatch({
      type: LEGAL_DRAFT_PATCH_STOCKHOLDER_SUCCESS,
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
      type: LEGAL_DRAFT_PATCH_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
