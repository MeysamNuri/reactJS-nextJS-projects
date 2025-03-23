import {
  JUDICAL_DRAFT_DELET_FAMILY_MEMBER,
  JUDICAL_DRAFT_DELET_FAMILY_MEMBER_SUCCESS,
  JUDICAL_DRAFT_DELET_FAMILY_MEMBER_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deletJudicalFamilyMemberDraft = (
  judicalDraftId: number,
  nationalCode: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: JUDICAL_DRAFT_DELET_FAMILY_MEMBER });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${judicalDraftId}/judicial/family-member/${nationalCode}`
    );
    successFunction();
    dispatch({
      type: JUDICAL_DRAFT_DELET_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
    toast.success("عضو خانواده به درستی حذف شد", {
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
      type: JUDICAL_DRAFT_DELET_FAMILY_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletJudicalFamilyMemberEdit = (
  gotIdForMainEdit: number,
  nationalCode: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: JUDICAL_DRAFT_DELET_FAMILY_MEMBER });
    const { data } = await apiRegistrationToken.delete(
      `/registration/${gotIdForMainEdit}/judicial/family-member/${nationalCode}`
    );
    successFunction();
    dispatch({
      type: JUDICAL_DRAFT_DELET_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
    toast.success("عضو خانواده به درستی حذف شد", {
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
      type: JUDICAL_DRAFT_DELET_FAMILY_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
