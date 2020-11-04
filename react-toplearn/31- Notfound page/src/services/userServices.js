import config from './config.json'
import http from './httpservices'

export const registerUsers=(user)=>{
    return http.post(`/api/register`,JSON.stringify(user))
} 
export const LoginUser=(user)=>{
    return http.post(`/api/login`,JSON.stringify(user))
} 