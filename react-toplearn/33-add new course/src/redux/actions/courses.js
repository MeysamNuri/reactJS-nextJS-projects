import { ErrorMessage, SuccessMessage } from "./../../utilz/messages"
import { getAllCourses, newCourse } from "../../services/CourseServices"

export const getCourses = () => {
    return async dispatch => {
        const { data } = await getAllCourses()

        await dispatch({ type: "INIT", payload: data.courses })
    }
}

export const createNewCourse = (course) => {
    return async (dispatch, getState) => {
        const { data, status } = await newCourse(course);
        if (status === 201) SuccessMessage("دوره با موفقیت ساخته شد");
        else{
            ErrorMessage("مشکلی پیش آمده")
        }
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses, data.course],
        });
    };
};
