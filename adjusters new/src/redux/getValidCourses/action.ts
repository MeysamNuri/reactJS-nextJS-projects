import {
  GET_VALID_COURSES,
  GET_VALID_COURSES_SUCCESS,
  GET_VALID_COURSES_FAILD,
} from "../../constant/commonTypes";
import { apiRegistrationToken } from "../../httpServices/service";

export const getValidCourses = (courseId: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_VALID_COURSES,
    });
    const { data } = await apiRegistrationToken.get(
      `/course/between/${courseId}`
    );

    dispatch({
      type: GET_VALID_COURSES_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
    } else {
    }
  } catch (error: any) {
    dispatch({
      type: GET_VALID_COURSES_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
