//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_WORK_LOCATION_INFO,
  LEGAL_DRAFT_WORK_LOCATION_INFO_SUCCESS,
  LEGAL_DRAFT_WORK_LOCATION_INFO_FAILD,
} from "../../../constant/legalActionTypes";

import { IWorkLocationInfo } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendWorkLocationInfoDraft = (
  legalDraftId: number,
  workLocation: IWorkLocationInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_WORK_LOCATION_INFO });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${legalDraftId}/legal/work-location`,
      workLocation
    );
    successFunction();
    dispatch({
      type: LEGAL_DRAFT_WORK_LOCATION_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات محل فعالیت اضافه گردید", {
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
      type: LEGAL_DRAFT_WORK_LOCATION_INFO_FAILD,
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

export const sendWorkLocationInfoEdit = (
  gotIdForMainEdit: number,
  workLocation: IWorkLocationInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_WORK_LOCATION_INFO });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/work-location/update`,
      workLocation
    );
    successFunction();
    dispatch({
      type: LEGAL_DRAFT_WORK_LOCATION_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات محل فعالیت اضافه گردید", {
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
      type: LEGAL_DRAFT_WORK_LOCATION_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
