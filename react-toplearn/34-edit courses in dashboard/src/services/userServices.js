import config from './config.json'
import http from './httpservices'

export const registerUsers=(user)=>{
    return http.post(`${config.toplearnapi}/api/register`,JSON.stringify(user))
} 
export const LoginUser=(user)=>{
    return http.post(`${config.toplearnapi}/api/login`,JSON.stringify(user))
} 