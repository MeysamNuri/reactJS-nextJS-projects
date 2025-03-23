import { getSingleCourse } from "../services/courseService"

export const singleCourse=courseId=>{
    return async dispatch =>{
        const {data}=await getSingleCourse(courseId)
        await dispatch({type:"GET-COURSE",payload:data.course})
    }
}