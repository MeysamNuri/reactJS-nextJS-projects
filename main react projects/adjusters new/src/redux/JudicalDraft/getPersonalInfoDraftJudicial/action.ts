//libraries
import { toast } from "react-toastify";

//redux
import {
  JUDICIAL_DRAFT_GET_PERSONAL_INFO,
  JUDICIAL_DRAFT_GET_PERSONAL_INFO_SUCCESS,
  JUDICIAL_DRAFT_GET_PERSONAL_INFO_FAILD,
} from "../../../constant/judicalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getPersonalInfoJudicialDraft = (
  judicialDraftId: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: JUDICIAL_DRAFT_GET_PERSONAL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicialDraftId}/judicial/personal-info`
    );

    dispatch({
      type: JUDICIAL_DRAFT_GET_PERSONAL_INFO_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      successFunction();
    } 

    // toast.success(
    //   "اطلاعات وارد شده به ترتیب زیر میباشند - میتوانید ویرایش کنید",
    //   {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   }
    // );
    
  } catch (error: any) {
    dispatch({
      type: JUDICIAL_DRAFT_GET_PERSONAL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPersonalInfoJudicialEdit = (gotIdForMainEdit: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: JUDICIAL_DRAFT_GET_PERSONAL_INFO });
    const { data } = await apiRegistrationToken.get(
      `registration/${gotIdForMainEdit}/judicial/personal-info`
    );

    dispatch({
      type: JUDICIAL_DRAFT_GET_PERSONAL_INFO_SUCCESS,
      payload: data,
    });

    // toast.success(
    //   "اطلاعات وارد شده به ترتیب زیر میباشند - میتوانید ویرایش کنید",
    //   {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   }
    // );
  } catch (error: any) {
    dispatch({
      type: JUDICIAL_DRAFT_GET_PERSONAL_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
