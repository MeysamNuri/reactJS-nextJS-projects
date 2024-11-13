import {
  NATURAL_DRAFT_WORK_PLACE,
  NATURAL_DRAFT_WORK_PLACE_SUCCESS,
  NATURAL_DRAFT_WORK_PLACE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
import { IWorkLocations } from "../../../shared/ulitities/Model/draftNatural";

export const sendWorkPlacesDraft = (
  draftId: number,
  workPlaces: IWorkLocations,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_WORK_PLACE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/natural/work-location`,
      workPlaces
    );
    successFunction();
    dispatch({
      type: NATURAL_DRAFT_WORK_PLACE_SUCCESS,
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
      type: NATURAL_DRAFT_WORK_PLACE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



/**
 * 
 * @param {todo: method post for update is change} param0 
 */

export const sendWorkPlacesEdit = (
  gotIdForMainEdit: number,
  workPlaces: IWorkLocations,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_WORK_PLACE,
    });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/natural/work-location/update`,
      workPlaces
    );
    successFunction();
    dispatch({
      type: NATURAL_DRAFT_WORK_PLACE_SUCCESS,
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
      type: NATURAL_DRAFT_WORK_PLACE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
