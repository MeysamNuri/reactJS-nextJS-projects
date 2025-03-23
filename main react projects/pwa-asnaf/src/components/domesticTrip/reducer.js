export const initialstate = {
  expand: null,
};
const TripReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "TRIP-EXPAND":
      return {
        ...state,
        expand: action.expand,
        
      };

    default:
      return state;
     
  }
};
export default TripReducer;
