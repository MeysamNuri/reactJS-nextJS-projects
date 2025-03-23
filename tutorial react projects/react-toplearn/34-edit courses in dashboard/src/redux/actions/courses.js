import { ErrorMessage, SuccessMessage } from "./../../utilz/messages"
import { getAllCourses, newCourse, uppdateCours } from "../../services/CourseServices"

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

export const handleUppdateCourse=(courseId,EditedNewCourse)=>{
    return async (dispatch,getState)=>{
        const courses=[...getState().courses]
        const uppdatedCourses=[...courses]
        const courseIndex=uppdatedCourses.findIndex(course=>course._id===courseId)
        let EditCourse=uppdatedCourses[courseIndex]
      EditCourse={...Object.fromEntries(EditedNewCourse)}
      uppdatedCourses[courseIndex]=EditCourse
      try{

        const {data,status}=await uppdateCours(courseId,EditedNewCourse)
        if(status===200){
            SuccessMessage("دوره با موفقیت ویرایش شد")
            await dispatch({type:"UPPDATE_COURSE",payload:[...uppdatedCourses]})

        }
    }
    catch(ex){
        await dispatch({type:"UPPDATE_COURSE",payload:[...courses]})
    }
    }
   
}
