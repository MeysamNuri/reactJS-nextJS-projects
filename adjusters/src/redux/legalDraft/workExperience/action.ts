
//redux
import {
  LEGAL_DRAFT_WORK_EXPERIENCE,
  LEGAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  LEGAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/legalActionTypes";
import { IWorkExperience } from "../../../shared/ulitities/Model/draftLegal";
import {messageSuccess,messageError} from '../../../utils/utils'

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendWorkExperienceLegal = (
  draftId: number,
  workExperience: IWorkExperience,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_WORK_EXPERIENCE });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/work-experience`,
      workExperience
    );
    if (data.IsSucceed === true) {
      messageSuccess("سابقه کاری به درستی اضافه گردید ")
     ;
    } else {
      messageError(data.Message)
    }
    dispatch({
      type: LEGAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });

    successFunction();
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    messageError(`خطای ${error?.response?.status} در اضافه کردن اطلاعات`)
  }
};

export const sendWorkExperienceLegalEdit = (
  gotIdForMainEdit: number,
  workExperience: IWorkExperience,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_WORK_EXPERIENCE });
    const { data } = await apiRegistrationToken.post(
      `applicant/work-experience?id=${gotIdForMainEdit}`,
      workExperience
    );
    dispatch({
      type: LEGAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("سابقه کاری به درستی اضافه گردید ")
      successFunction();
     ;
    } else {
      messageError(data.Message)
    }
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    messageError(`خطای ${error?.response?.status} در اضافه کردن اطلاعات`)
  }
};
