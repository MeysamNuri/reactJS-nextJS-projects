import {
  DELETE_LEGAL_DRAFT_STOCKHOLDER,
  DELETE_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
  DELETE_LEGAL_DRAFT_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deleteLegalDraftStockholderAction = (
  legalDraftId: number,
  stockholderTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_STOCKHOLDER,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${legalDraftId}/legal/stockholder/${stockholderTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("اطلاعات سهامدار به درستی حذف گردید ", {
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
      type: DELETE_LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLegalDraftStockholderActionEdit = (
  gotIdForMainEdit: number,
  stockholderTempId: string,
  success: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_LEGAL_DRAFT_STOCKHOLDER,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/${gotIdForMainEdit}/legal/stockholder/${stockholderTempId}`
    );

    dispatch({
      type: DELETE_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("اطلاعات سهامدار به درستی حذف گردید ", {
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
      type: DELETE_LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
