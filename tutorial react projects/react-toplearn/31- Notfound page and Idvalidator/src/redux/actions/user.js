export const adduser=user=>{
    return async dispatch=>{
       await dispatch({type:"SET_USER",payload:user})
    }
}

export const ClearUser=()=>{
    return async dispatch=>{
        await dispatch({type:"CLEAR_USER",payload:{}})
    }
}