import http from './APIs'
import config from '../../utils/config.json'
export const SupportForm=user =>{
    return http.post(`${config.asnafUrl}/support/create`,JSON.stringify(user))
 }