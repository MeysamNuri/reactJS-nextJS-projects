import setAuthorization from '../utils/authorization';
import store from '../boot/redux';

export default function logout() {
   setAuthorization()
   localStorage.removeItem('token');
   localStorage.removeItem('appInit');
   localStorage.removeItem('businesses');
   localStorage.removeItem('reputationSum');
   localStorage.removeItem('daapappTransactionSum');
   localStorage.removeItem('phoneNumber');
   localStorage.removeItem('notifications');
   localStorage.removeItem('showChangeCatMsg');

   store.dispatch({
      type: "SHOW_LOGOUT_DIALOG",
      open: true,
    });
}