import { IJudicalDraftPersonalInfo } from "../../../shared/ulitities/Model/draftJudical";
import {
  JUDICAL_DRAFT_PERSONAL_INFO,
  JUDICAL_DRAFT_PERSONAL_INFO_SUCCESS,
  JUDICAL_DRAFT_PERSONAL_INFO_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const sendPersonalInfoDraft = (
  judicalDraftId: number,
  personalInfo: IJudicalDraftPersonalInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_PERSONAL_INFO,
      payload: { judicalDraftId, personalInfo },
    });

    var { data } = await apiRegistrationToken.post(
      `/registration/draft/${judicalDraftId}/judicial/personal-info`,
      personalInfo
    );

    successFunction();
    dispatch({
      type: JUDICAL_DRAFT_PERSONAL_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات شخصی با موفقیت اضافه گردید", {
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
      type: JUDICAL_DRAFT_PERSONAL_INFO_FAILD,
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

export const sendPersonalInfoEdit = (
  gotIdForMainEdit: number,
  personalInfo: IJudicalDraftPersonalInfo,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_PERSONAL_INFO,
      payload: { gotIdForMainEdit, personalInfo },
    });
    var { data } = await apiRegistrationToken.post(
      `/registration/${gotIdForMainEdit}/judicial/personal-info/update`,
      personalInfo
    );
    successFunction();
    dispatch({
      type: JUDICAL_DRAFT_PERSONAL_INFO_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات شخصی با موفقیت ویرایش گردید", {
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
      type: JUDICAL_DRAFT_PERSONAL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
