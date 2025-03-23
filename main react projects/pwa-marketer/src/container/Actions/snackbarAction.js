const openSnackbar = () => (
   {
     type: 'OPEN_SNACKBAR'
   }
 )
 
 const closeSnackbar = () => (
   {
     type: 'CLOSE_SNACKBAR'
   }
 )
 export function setSnackbarMsg(msg) {
   return {
     type: "SET_SNACKBAR_MSG",
     msg
   };
 }
 
 export { openSnackbar, closeSnackbar };