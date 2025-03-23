import {
  CARTABLE_REFER,
  CARTABLE_REFER_SUCCESS,
  CARTABLE_REFER_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { IReffer } from "../../../shared/ulitities/Model/reffer";
import {messageError,messageSuccess} from "../../../utils/utils"


export const sendReasonReffer = (
  refer: IReffer,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: CARTABLE_REFER,
    });
    const { data } = await api.post(`/admission/cartable/Refer`, refer);
    dispatch({
      type: CARTABLE_REFER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess(
        refer.answer === "Reject"
          ? "عملیات بایگانی با موفقیت انجام شد"
          : refer.answer === "Accept"
          ? "عملیات ارجاع با موفقیت انجام شد"
          : "عملیات مرجوع با موفقیت انجام شد",
      );
      successFunction();
    } else {
      messageError(data.Message)
    }
  } catch (error: any) {
    dispatch({
      type: CARTABLE_REFER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
