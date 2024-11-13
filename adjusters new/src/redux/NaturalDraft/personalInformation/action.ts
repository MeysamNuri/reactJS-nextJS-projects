import {
  NATURAL_DRAFT_PERSONAL_INFO,
  NATURAL_DRAFT_PERSONAL_INFO_SUCCESS,
  NATURAL_DRAFT_PERSONAL_INFO_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
import { INaturalDraftPersonalInfo } from "../../../shared/ulitities/Model/draftNatural";

export const postPersonalInfo = (
  draftId: number,
  personalInfo: INaturalDraftPersonalInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/personal-info`,
      personalInfo
    );
    successFunction();
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات  کاربر اضافه گردید", {
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
      type: NATURAL_DRAFT_PERSONAL_INFO_FAILD,
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

export const patchPersonalInfoEdit = (
  gotIdForMainEdit: number,
  personalInfo: INaturalDraftPersonalInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/${gotIdForMainEdit}/natural/personal-info/update`,
      personalInfo
    );
    successFunction();
    dispatch({
      type: NATURAL_DRAFT_PERSONAL_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات  کاربر اضافه گردید", {
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
      type: NATURAL_DRAFT_PERSONAL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
