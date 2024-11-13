import http from './httpServices'
import config from './config.json'


export const getAllcourses= ()=>{
    return http.get(`${config.toplearnAPI}/api/courses`)
}