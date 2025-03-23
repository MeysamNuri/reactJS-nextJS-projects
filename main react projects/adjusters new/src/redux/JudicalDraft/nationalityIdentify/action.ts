import {
  JUDICAL_DRAFT_NATIONAL_IDENTIFY,
  JUDICAL_DRAFT_NATIONAL_IDENTIFY_SUCCESS,
  JUDICAL_DRAFT_NATIONAL_IDENTIFY_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { IJudicalDraftJudicialIdentity } from "../../../shared/ulitities/Model/draftJudical";

export const sendNationaltyIdenttity = (
  judicalDraftId: number,
  nationalIdentity: IJudicalDraftJudicialIdentity,
  isUserEdit: boolean,
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_NATIONAL_IDENTIFY,
    });
    const { data } = await apiRegistrationToken.post(
      `/registration${!isUserEdit ? "/draft" : ""}/${
        isUserEdit ? gotIdForMainEdit : judicalDraftId
      }/judicial/judicial-identity`,
      nationalIdentity
    );
    dispatch({
      type: JUDICAL_DRAFT_NATIONAL_IDENTIFY_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: JUDICAL_DRAFT_NATIONAL_IDENTIFY_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
