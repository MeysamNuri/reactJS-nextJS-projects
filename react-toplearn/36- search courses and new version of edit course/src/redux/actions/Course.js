import { getCourse } from "./../../services/CourseServices";

export const getSingleCourse = courseId => {
    return async dispatch => {
        const { data } = await getCourse(courseId);
        await dispatch({ type: "GET_COURSE", payload: data.course });
    };
};
