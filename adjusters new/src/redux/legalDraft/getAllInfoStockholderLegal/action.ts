//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO,
  LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO_SUCCESS,
  LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO_FAILD,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getAllInfoStockholderLegal = (
  legalDraftId: number,
  id: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/stockholder/${id}`
    );

    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در بازخوانی اطلاعات", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllInfoStockholderLegalEdit = (
  gotIdForMainEdit: number,
  id: any
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/stockholder/${id}`
    );

    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      toast.error("خطا در بازخوانی اطلاعات", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDET_GET_ALL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
