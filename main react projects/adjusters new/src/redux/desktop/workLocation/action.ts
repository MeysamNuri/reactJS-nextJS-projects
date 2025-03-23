import {
  LIST_WORK_LOCATION_REQUEST,
  LIST_WORK_LOCATION_REQUEST_SUCCESS,
  LIST_WORK_LOCATION_REQUEST_FAILD,
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { IAddBoardMember } from "../../../shared/ulitities/Model/boardMember";
import { toast } from "react-toastify";

// لیست محل فعالیت
export const fetchWorkLocation = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_WORK_LOCATION_REQUEST,
    });
    const { data } = await api.get(`/work-location-request/${applicantId}`);
    dispatch({
      type: LIST_WORK_LOCATION_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_WORK_LOCATION_REQUEST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
