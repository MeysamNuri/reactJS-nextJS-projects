import {
  SEND_REFER_NATURAL,
  SEND_REFER_NATURAL_SUCCESS,
  SEND_REFER_NATURAL__FAILD,
} from "../../../constant/actionTypes";
import {
  apiRegistrationToken,
  apiWithoutToken,
} from "../../../httpServices/service";

export const sendReferLegal = (
  gotIdForMainEdit: number,
  adjusterTypeId: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SEND_REFER_NATURAL,
    });
    const { data } = await apiWithoutToken.post(
      `/registration/${gotIdForMainEdit}/natural/Refer/${adjusterTypeId}`
    );

    if (data.IsSucceed === true) {
      // toast.success("پرونده مربوطه به کارشناس ارجاع داده شد", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    } else {
      // toast.error(`${data.Message}`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }

    dispatch({
      type: SEND_REFER_NATURAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: SEND_REFER_NATURAL__FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
