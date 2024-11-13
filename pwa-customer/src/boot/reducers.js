import { combineReducers } from "redux";
import MainReducer from "../container/reducers/MainReducer";
import categoriesReducer from "../container/pages/categories/reducer";
import transactionsReducer from "../container/pages/transactions/reducer";
import signInReducer from "../container/pages/sign-in/reducer";
import walletReducer from "../container/pages/wallet/reducer";
import loadingReducer from "../container/pages/loading/reducer";
import profileReducer from "../container/pages/profile/reducer";
import cardReducer from "../container/components/card/reducer";

export default combineReducers({
  MainReducer,
  categoriesReducer,
  transactionsReducer,
  signInReducer,
  walletReducer,
  loadingReducer,
  profileReducer,
  cardReducer
});
