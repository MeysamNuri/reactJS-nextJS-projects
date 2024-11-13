import { getAllcourses } from "../services/courseService"

export const getCourses =()=>{
    return async dispatch=>{
        const {data}=await getAllcourses()
        await dispatch({type:"INIT",payload:data.courses})
    }
}