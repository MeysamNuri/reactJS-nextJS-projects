import {
  DELET_DRAFT_NATURAL_FAMILY_MEMBER,
  DELET_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
  DELET_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const deletFamilyMember = (
  draftId: number,
  nationalCode: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_DRAFT_NATURAL_FAMILY_MEMBER,
      payload: { nationalCode, draftId },
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${draftId}/natural/family-member/${nationalCode}`
    );

    dispatch({
      type: DELET_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("حذف اعضای خانواده با موفقیت انجام شد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else {
      toast.error("حذف اعضای خانواده با خطا مواجه گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: DELET_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletFamilyMemberEdit = (
  gotIdForMainEdit: number,
  nationalCode: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_DRAFT_NATURAL_FAMILY_MEMBER,
      payload: { nationalCode, gotIdForMainEdit },
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/${gotIdForMainEdit}/natural/family-member/${nationalCode}`
    );

    dispatch({
      type: DELET_DRAFT_NATURAL_FAMILY_MEMBER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("حذف اعضای خانواده با موفقیت انجام شد", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else {
      toast.error("حذف اعضای خانواده با خطا مواجه گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: DELET_DRAFT_NATURAL_FAMILY_MEMBER__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
