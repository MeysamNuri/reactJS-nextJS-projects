import {
  USER_DESKTOP,
  USER_DESKTOP_SUCCESS,
  USER_DESKTOP_FAILD,

} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import {messageError,messageSuccess} from '../../../utils/utils'




export const sendDesktopUser = (desktopUser:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_DESKTOP,
    });
    const { data } = await api.post(`/user`,desktopUser);

    dispatch({
      type: USER_DESKTOP_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("میزکار با موفقیت ایجاد گردید.")
     
    } else{
      messageError(data.Message)
    }
  } catch (error: any) {
    messageError("خطایی در سرور رخ داده است")
    dispatch({
      type: USER_DESKTOP_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
