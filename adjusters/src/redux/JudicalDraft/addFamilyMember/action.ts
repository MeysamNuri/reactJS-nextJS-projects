import {
  JUDICAL_DRAFT_ADD_FAMILY_MEMBER,
  JUDICAL_DRAFT_ADD_FAMILY_MEMBER_SUCCESS,
  JUDICAL_DRAFT_ADD_FAMILY_MEMBER_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { IJudicalDraftFamilyMember } from "../../../shared/ulitities/Model/draftJudical";
import { messageError, messageSuccess } from "../../../utils/utils";

export const sendFamilyMember = (
  judicalDraftId: number,
  familyMember: IJudicalDraftFamilyMember,
  closeModal: any,
  successFunction: () => void,
  isUserEdit: any,
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    //console.log("mj post family member isUserEdit: ", isUserEdit);
    dispatch({
      type: JUDICAL_DRAFT_ADD_FAMILY_MEMBER,
    });

    const { data } = await apiRegistrationToken.post(
      `/registration${!isUserEdit ? "/draft" : ""}/${
        isUserEdit ? gotIdForMainEdit : judicalDraftId
      }/judicial/family-member`,
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
      type: JUDICAL_DRAFT_ADD_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: JUDICAL_DRAFT_ADD_FAMILY_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
