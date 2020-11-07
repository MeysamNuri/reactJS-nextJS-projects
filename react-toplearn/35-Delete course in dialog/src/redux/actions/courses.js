import { ErrorMessage, SuccessMessage } from "./../../utilz/messages"
import { deleteCourse, getAllCourses, newCourse, uppdateCours } from "../../services/CourseServices"

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
        else {
            ErrorMessage("مشکلی پیش آمده")
        }
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses, data.course],
        });
    };
};

export const handleUppdateCourse = (courseId, EditedNewCourse) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses]
        const uppdatedCourse = [...courses]
        const courseIndex = uppdatedCourse.findIndex(course => course._id === courseId)
        let EditedCourse = uppdatedCourse[courseIndex]
        EditedCourse = { ...Object.fromEntries(EditedNewCourse) }
        uppdatedCourse[courseIndex] = EditedCourse
        try {
            const { data, status } = await uppdateCours(courseId, EditedNewCourse)
            if (status === 200) {
                SuccessMessage("دوره با موفقیت ویرایش شد")
                await dispatch({ type: "UPPDATE_COURSE", payload: [...uppdatedCourse] })
            }
        }
        catch (ex) {
            await dispatch({ type: "UPPDATE_COURSE", payload: [...courses] })

        }
    }

}
export const deleteNewCourse=(courseId)=>{
    return async (dispatch,getState)=>{
        const courses=[...getState().courses]
        const filteredCourse=courses.filter(course=>course._id !== courseId)

        try{
            const {data,status}=await deleteCourse(courseId)
            if(status===200){
                SuccessMessage("دوره با موفقیت حذف شد")
                await dispatch({type:"DELETE_COURSE",payload:[...filteredCourse]})

            }
        }
        catch(ex){
            await dispatch({type:"DELETE_COURSE",payload:[...courses]})
        }
    }
}
