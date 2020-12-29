import logout from "./logOut";
import store from "../boot/redux";

export default function fetchCatch(res) {
  if (res) {
    switch (res.status) {
      case 401:
        logout();
        break;
      case 500:
        store.dispatch({ type: "OPEN_SNACKBAR" });
        store.dispatch({
          type: "SET_SNACKBAR_MSG",
          msg: "خطای سرور! دقایقی بعد مجددا تلاش کنید.",
        });
        break;
      case 404:
        store.dispatch({
          type: "SET_SNACKBAR_MSG",
          msg: "محتوی مورد نظر در دسترس نیست",
        });
        store.dispatch({ type: "OPEN_SNACKBAR" });
        break;
      case 400:
        store.dispatch({
          type: "SET_SNACKBAR_MSG",
          msg: res.data.message,
        });
        store.dispatch({ type: "OPEN_SNACKBAR" });
        break;
      default:
        break;
    }
  } else {
    store.dispatch({
      type: "SET_SNACKBAR_MSG",
      msg: "ارتباط با سرور قطع است!",
    });
    store.dispatch({ type: "OPEN_SNACKBAR" });
  }
}
