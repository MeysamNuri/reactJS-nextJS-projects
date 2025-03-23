import http from './httpServices'
import config from './config.json'


export const getAllcourses= ()=>{
    return http.get(`${config.toplearnAPI}/api/courses`)
}

export const getSingleCourse=courseId=>{
    return http.get(`${config.toplearnAPI}/api/course/${courseId}`)
}