export const setShowTripAmountDialog = (tripAmountDialog) => {
   return {
     type: "SET_SHOW_TRIP_AMOUNT_DIALOG",
     tripAmountDialog,
   };
 };
export const setSelectedAmount = (selectedAmount) => {
   return {
     type: "SET_SELECTED_AMOUNT",
     selectedAmount,
   };
 };
export const setSelectedPoint = (selectedPoint) => {
   return {
     type: "SET_SELECTED_POINT",
     selectedPoint,
   };
 };