import {
  NATURAL_DRAFT_WORK_EXPERIENCE,
  NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  NATURAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { IWorkExperience } from "../../../shared/ulitities/Model/draftNatural";
import {messageSuccess,messageError} from '../../../utils/utils'


export const sendWorkExperienceDraft = (
  draftId: number,
  workExperience: IWorkExperience,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/natural/work-experience`,
      workExperience
    );
   
    dispatch({
      type: NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("اطلاعات سوابق کاری به درستی اضافه گردید")
      successFunction();
     ;
    } else {
      messageError(data.Message)
    }
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendWorkExperienceEdit = (
  gotIdForMainEdit: number,
  workExperience: IWorkExperience,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant/work-experience?id=${gotIdForMainEdit}`,
      workExperience
    );
    dispatch({
      type: NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("اطلاعات سوابق کاری به درستی اضافه گردید")
      successFunction();
     ;
    } else {
      messageError(data.Message)
    }
    
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
