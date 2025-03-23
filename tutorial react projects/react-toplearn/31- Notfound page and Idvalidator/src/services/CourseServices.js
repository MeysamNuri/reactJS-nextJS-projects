import http from './httpservices'
import config from './config.json'

export const getAllCourses=()=>{
    return http.get(`/api/courses`)
} 
export const getCourse = courseId => {
    return http.get(`/api/course/${courseId}`);
};
