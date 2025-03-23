export const courseReducer=(state={},action)=>{
    switch (action.type) {
        case "GET-COURSE":
            return {...action.payload}
        default:
            return state;
    }
}