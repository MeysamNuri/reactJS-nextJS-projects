import {
  REFERER_REGISTERION,
  REFERER_REGISTERION_SUCCESS,
  REFERER_REGISTERION_FAILED,
} from "../../../constant/actionTypes";
import { apiWithoutToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const sendRefer = (
  gotIdForMainEdit: number,
  adjusterTypeId: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: REFERER_REGISTERION,
    });
    const { data } = await apiWithoutToken.get(
      `/referer/${gotIdForMainEdit}/${adjusterTypeId}`
    );

    if (data.IsSucceed === true) {
      toast.success("عملیات ارجاع با موفقیت انجام گردید", {
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
      toast.error(data.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    dispatch({
      type: REFERER_REGISTERION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: REFERER_REGISTERION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
