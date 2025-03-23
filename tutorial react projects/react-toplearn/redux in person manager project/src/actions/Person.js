export const setPerson=(e)=>{
    return async dipatch=>{
        await dipatch({type:"SET_PERSON",payload:e.target.value})
    }
}

export const clearPerson=()=>{
    return async dispatch=>{
        await dispatch({type:"CLEARE_PERSON",payload:""})
    }
}