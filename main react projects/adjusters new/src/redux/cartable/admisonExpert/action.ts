import {
  ALL_ADMISION_EXPERT,
  ALL_ADMISION_EXPERT_SUCCESS,
  ALL_ADMISION_EXPERT_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";

//لیست اعضای کارشناشان
export const fetchListAdmisionExpert = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ALL_ADMISION_EXPERT,
    });
    const { data } = await api.get(`/user/AllUsers`);
    dispatch({
      type: ALL_ADMISION_EXPERT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_ADMISION_EXPERT_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
