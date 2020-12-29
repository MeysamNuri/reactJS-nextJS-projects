import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../boot/redux";
// import { store, persistor } from "../../boot/redux";
// import { PersistGate } from "redux-persist/integration/react";
// -------------------------pages------------------------------
import Loading from "../pages/loading/Loading";
import Enter from "../pages/enter";
import SignIn from "../pages/sign-in";
import OTP from "../pages/otp";
import FirstAddCard from "../pages/first-add-card";
import Main from "../pages/main";
// import Test from "../pages/main/test";
import AllNotification from "../pages/all-notification";
import NotifContent from "../components/notif-content";
import LatestNotification from "../components/latest-notification";
import CardList from "../pages/cards";
import AddCard from "../pages/add-card";
import Favorites from "../pages/favorites/Favorites";
import StoreHistory from "../pages/storeHistory";
import TransactionHistory from "../pages/transactionHistory";
import Transactions from "../pages/transactions";
import SimilarTransactions from "../pages/similarTransactions";
import Profile from "../pages/profile";
import Wallet from "../pages/wallet";
import Categories from "../pages/categories/";
import Store from "../pages/store";
import FAQ from "../pages/FAQ";
import Discount from "../pages/discount";
import Form from "../pages/form";
import DepositPushPage from "../pages/deposit-push-page";
import ReferalCode from "../pages/referal-code";
import ProfileNotSigned from "../pages/profile-not-signed/index";
import NetworkErrAnimation from "../pages/network-err-animation";
import Question from "../pages/question";
import About from "../pages/about";
import Walktrow from "../pages/walktrow";
import OnlineWatcher from "../../OnlineWatcher";
import Policy from "../pages/policy";
import userManual from "../pages/user-manual";
import NotFound from "../pages/notFound";
import LogoutDialog from "../components/dialog/dialogLogOut";
import WalktrowVideo from "../pages/walktrow-video";
import Introduction from "../pages/introduction";

function App() {
  let location = useLocation();
  const history = useHistory();
  // useEffect(() => {
  //   window.scrollTo(0, 100);
  // }, []);

  useEffect(() => {
    if (location.pathname === "/main") {
      window.onpopstate = function (event) {
        history.push("/main");
      };
    }
  }, []);

  return (
    <Provider store={store}>
  {/*<PersistGate loading={null} persistor={persistor}>*/}
        <div className="App">
          <Switch>
            <Route path="/" component={Loading} exact />
            <Route path="/net-err" component={NetworkErrAnimation} exact />
            {/* <Route path="/test" component={Test} exact /> */}
            <Route path="/enter" component={Enter} exact />
            <Route path="/sign-in" component={SignIn} exact />
            <Route path="/otp" component={OTP} exact />
            <Route path="/first-add-card" component={FirstAddCard} exact />
            <Route path="/main" component={Main} exact />
            <Route path="/notif-list" component={AllNotification} exact />
            <Route path="/notif-content" component={NotifContent} exact />
            <Route path="/notif" component={LatestNotification} exact />
            <Route path="/card-list" component={CardList} exact />
            <Route path="/add-card" component={AddCard} exact />
            <Route path="/favorites" component={Favorites} exact />
            <Route path="/store-history" component={StoreHistory} exact />
            <Route
              path="/transaction-history"
              component={TransactionHistory}
              exact
            />
            <Route path="/transactions" component={Transactions} exact />
            <Route
              path="/similar-transactions"
              component={SimilarTransactions}
              exact
            />
            <Route path="/profile" component={Profile} exact />
            <Route path="/wallet" component={Wallet} exact />
            <Route path="/categories" component={Categories} exact />
            <Route path="/store" component={Store} exact />
            <Route path="/faq" component={FAQ} exact />
            <Route path="/discount" component={Discount} exact />
            <Route path="/form" component={Form} exact />
            <Route
              path="/deposit-push-page"
              component={DepositPushPage}
              exact
            />
            <Route path="/referal" component={ReferalCode} exact />
            <Route path="/walktrow" component={Walktrow} exact />
            <Route path="/questions" component={Question} exact />
            <Route path="/about" component={About} exact />
            <Route path="/policy" component={Policy} exact />
            <Route path="/user-manual" component={userManual} exact />
            <Route path="/walktrow-video" component={WalktrowVideo} exact />
            <Route path="/introduction" component={Introduction} exact />
            <Route
              path="/profile-not-signed"
              component={ProfileNotSigned}
              exact
            />
            <Route component={NotFound} />
          </Switch>
        </div>
        <LogoutDialog />
      {/*</PersistGate>*/}
    </Provider>
  );
}

export default App;
