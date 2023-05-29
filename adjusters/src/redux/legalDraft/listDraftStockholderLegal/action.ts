import {
  LIST_LEGAL_DRAFT_STOCKHOLDER,
  LIST_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
  LIST_LEGAL_DRAFT_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";
import { apiRegistrationToken ,api} from "../../../httpServices/service";

export const fetchStockholderLegal = (legalDraftId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/stockholder-list`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchStockholderLegalEdit = (gotIdForMainEdit?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/legal/stockholder-list`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchStockholderLegalEditToken = (gotIdForMainEdit?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER,
    });
    const { data } = await api.get(
      `registration/${gotIdForMainEdit}/legal/stockholder-list/token`
    );
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
