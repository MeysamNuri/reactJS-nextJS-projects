import jwt from 'jsonwebtoken'

export const docodeToken=token=>{
    return jwt.decode(token,{complete:true})
}