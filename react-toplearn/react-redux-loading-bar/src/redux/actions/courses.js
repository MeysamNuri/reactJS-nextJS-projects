import { getAllCourses } from "../../services/CourseServices"

export const getCourses = () => {
    return async dispatch => {
        const { data } = await getAllCourses()

        await dispatch({ type: "INIT", payload: data.courses })
    }
}