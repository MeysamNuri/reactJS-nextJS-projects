//libraries
import { toast } from "react-toastify";

//redux
import {
  GET_COURSE_TYPE,
  GET_COURSE_TYPE_SUCCESS,
  GET_COURSE_TYPE_FAILED,
} from "../../constant/commonTypes";

//apis
import { api } from "../../httpServices/service";

export const getCourseType = (
  regCode: any,
  successFunction: (i: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_COURSE_TYPE });
    const { data } = await api.post(
      `registration/course-type?registrationCode=${regCode}`
    );
    if (data.IsSucceed !== true) {
      toast.error(`${data.Message}`, {
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
      type: GET_COURSE_TYPE_SUCCESS,
      payload: data,
    });
    successFunction(data?.Result);
  } catch (error: any) {
    dispatch({
      type: GET_COURSE_TYPE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
