import { combineReducers } from "redux";
import ProfileReducer from "../containers/Profile/reducer";
import MainReducer from "../containers/Main/reducer";
import walletReducer from "../containers/Wallet/reducer";
import snackbarReducer from "../mainReducer/snackbarReducers";
import signInReducer from "../containers/SignIn/reducer";
import TabReducer from "../components/Tabs/reducer";
import pointReducer from "../containers/Points/reducer";
import logoutReducer from "../mainReducer/logoutReducer";
import tripReducer from "../containers/trip/reducer";
import notificationReducer from "../containers/AllNotification/reducer";
import personDataReducer from "../containers/PersonalData/reducer";
import ExpandReducer from "../components/LoanList/reducer";
import TabTripReducer from "../components/TripTabs/reducer";
import customerListReducer from '../containers/customerList/reducer';
import RegionReducer from '../components/GetRegions/reducer'

export default combineReducers({
  MainReducer,
  ProfileReducer,
  walletReducer,
  snackbarReducer,
  signInReducer,
  pointReducer,
  logoutReducer,
  tripReducer,
  notificationReducer,
  personDataReducer,
  TabReducer,
  ExpandReducer,
  TabTripReducer,
  customerListReducer,
  RegionReducer
});
