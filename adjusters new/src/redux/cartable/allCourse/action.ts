import {
  ALL_COURSE,
  ALL_COURSE_SUCCESS,
  ALL_COURSE_FAILD,
  ALL_COURSE_ADJUSTER_TYPE,
  ALL_COURSE_ADJUSTER_TYPE_SUCCESS,
  ALL_COURSE_ADJUSTER_TYPE_FAILD
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";


//لیست کل دوره ها
export const fetchAllCourse = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ALL_COURSE,
    });
    const { data } = await api.get(`/course/all`);
    dispatch({
      type: ALL_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_COURSE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//لیست کامل دوره ها براساس نوع ارزیاب
export const fetchAllCourseByAdjusterType = (adjusterTypeId:number|string) => async (dispatch: any) => {
  try {
    dispatch({
      type: ALL_COURSE_ADJUSTER_TYPE,
    });
    const { data } = await api.get(`/course/GetByApplicantType/${adjusterTypeId}`);
    dispatch({
      type: ALL_COURSE_ADJUSTER_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ALL_COURSE_ADJUSTER_TYPE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

