import {
  JUDICAL_DRAFT_WORK_PLACE,
  JUDICAL_DRAFT_WORK_PLACE_SUCCESS,
  JUDICAL_DRAFT_WORK_PLACE_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
import { IJudicalWorkLocation } from "../../../shared/ulitities/Model/draftJudical";

export const sendJudicalWorkPlacesDraft = (
  draftId: number,
  workPlaces: IJudicalWorkLocation,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_WORK_PLACE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/judicial/work-location`,
      workPlaces
    );
    successFunction();
    dispatch({
      type: JUDICAL_DRAFT_WORK_PLACE_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات محل فعالیت به درستی اضافه گردید", {
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
      type: JUDICAL_DRAFT_WORK_PLACE_FAILD,
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

export const sendJudicalWorkPlacesEdit = (
  gotIdForMainEdit: number,
  workPlaces: IJudicalWorkLocation,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_WORK_PLACE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/judicial/work-location/update`,
      workPlaces
    );
    successFunction();
    dispatch({
      type: JUDICAL_DRAFT_WORK_PLACE_SUCCESS,
      payload: data,
    });
    toast.success("اطلاعات محل فعالیت به درستی ویرایش گردید", {
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
      type: JUDICAL_DRAFT_WORK_PLACE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
