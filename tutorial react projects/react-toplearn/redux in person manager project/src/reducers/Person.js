export const PersonReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_PERSON":
            return action.payload
        case 'CLEARE_PERSON':
            return action.payload
     

        default:
            return state;
    }
}