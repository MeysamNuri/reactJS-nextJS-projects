import {
  DRAFT_NATURAL_FAMILY_MEMBER,
  DRAFT_FAMILY_MEMBER__FAILD,
  DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { messageError,messageSuccess } from "../../../utils/utils";
import { IFamilyMember } from "../../../shared/ulitities/Model/draftNatural";

export const postFamilyMember = (
  draftId: number,
  familyMember: IFamilyMember,
  closeModal: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DRAFT_NATURAL_FAMILY_MEMBER,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/family-member`,
      familyMember
    );

    if (data.IsSucceed === true) {
      messageSuccess("اعضای خانواده به درستی اضافه گردید");
      successFunction();
      closeModal();
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: DRAFT_FAMILY_MEMBER__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postFamilyMemberEdit = (
  draftId: number,
  familyMember: IFamilyMember,
  successFunction: () => void,
  closeModal: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DRAFT_NATURAL_FAMILY_MEMBER,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration/${draftId}/natural/family-member`,
      familyMember
    );

    dispatch({
      type: DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
     messageSuccess("اعضای خانواده به درستی اضافه گردید");
      successFunction();
      closeModal();
    }  else {
     messageError(data.Message);
    }
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: DRAFT_FAMILY_MEMBER__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
