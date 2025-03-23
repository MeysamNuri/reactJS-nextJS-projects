import http from './httpServices'
import config from './config.json'

export const registerUser=user =>{
   return http.post(`${config.toplearnAPI}/api/register`,JSON.stringify(user))
}

export const LoginUser =user=>{
   return http.post(`${config.toplearnAPI}/api/login`,JSON.stringify(user))
}
