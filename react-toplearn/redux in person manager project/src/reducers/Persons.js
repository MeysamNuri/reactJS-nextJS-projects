export const PersonsReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_PERSONS":
            return [...action.payload]
        case "DELETE_PERSONS":
            return [...action.payload]
        case "UPDATE_PERSONS":
            return [...action.payload]

        default:
            return state;
    }
}