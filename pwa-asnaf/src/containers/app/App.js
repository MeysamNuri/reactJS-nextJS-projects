import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../boot/redux";
// -------------------------pages------------------------------
import Loading from "../loading";
import SignIn from "../SignIn";
import Otp from "../Otp";
import PersonalData from "../PersonalData";
import StoreData from "../StoreData";
import Done from "../Done";
import ChooseAccount from "../ChooseAccount";
import Main from "../Main";
import Benefits from "../Benefits";
import Loans from "../Loans";
import TripPage from "../trip";
import Profile from "../Profile";
import Wallet from "../Wallet";
import Points from "../Points";
import Insurance from "../Insurance";
import DoctorVisit from "../DoctorVisit";
import MySnackbar from "../../components/Snackbar";
import NotificationContent from "../../components/NotificationContent";
import AllNotification from "../AllNotification";
import setAuthorization from "../../utils/authorization";
import LogoutDialog from "../../components/Dialogs/LogoutDialog";
import CustomerList from '../customerList';
import CustomerDetail from '../../components/customerDetail';
import SupportForm from "../support-form";
import QrRequest from "../qrCodeRequest"
import ShowQRcode from "../qrCodeRequest/showQRCode";
import  StoreDataWeb  from "../StoreData/store_data_web";
import DoneWeb from "../Done/DoneWeb";
var token = localStorage.getItem("token");

(async function () {
  if (token !== null) {
    const editedText = token.substr(1);
    const editedText2 = editedText.slice(0, -1);
    await setAuthorization(editedText2);
  }
})();

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/" component={Loading} exact />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/otp" component={Otp} />
          {/* صفحه مربوط به ثبت نام صنف */}
          <Route exact path="/personal-data" component={PersonalData} />
          {/* صفحه اطلاعات صنف موقع ثبت نام*/}
          <Route exact path="/store-data" component={StoreData} />

          {/* صفحه اطلاعات صنف موقع  برای وب*/}
          <Route exact path="/store-data-web" component={StoreDataWeb} />
          {/* صفحه پیام تبریک بعد از ثبت صنف*/}
          <Route exact path="/done" component={Done} />
          <Route exact path="/doneWeb" component={DoneWeb} />
          {/* صفحه انتخاب صنف در صورت داشتن بیشتر از یکی*/}
          <Route exact path="/choose-account" component={ChooseAccount} />
          {/* صفحه اصلی*/}
          <Route exact path="/main" component={Main} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/wallet" component={Wallet} />
          {/* صفحه امتیاز ها*/}
          <Route exact path="/points" component={Points} />
          {/* صفحه لیست مشتریان*/}
          <Route exact path="/customer-list" component={CustomerList} />
          {/* صفحه اطلاعات مشتری*/}
          <Route exact path="/customer-detail" component={CustomerDetail} />
          {/* صفحه بیمه*/}
          <Route exact path="/insurance" component={Insurance} />
          {/* صفحه ویزیت دکتر*/}
          <Route exact path="/visit" component={DoctorVisit} />
          {/* صفحه محتوای نوتیفیکیشن*/}
          <Route exact path="/notif-content" component={NotificationContent} />
          <Route path="/notif-list" component={AllNotification} exact />
            {/* صفحه لیست تسهیلات*/}
          <Route path="/benefits" component={Benefits} />
          {/* صفحه وام*/}
          <Route path="/loans" component={Loans} />
          {/* صفحه سفر*/}
          <Route path="/trips" component={TripPage} />
          <Route path="/form" component={SupportForm} />
          <Route path="/QRCode" component={QrRequest} />
          <Route path="/show-QRCode" component={ShowQRcode} />
        </Switch>
        <LogoutDialog />
      </div>
      <MySnackbar msg="" />
    </Provider>
  );
}

export default App;
