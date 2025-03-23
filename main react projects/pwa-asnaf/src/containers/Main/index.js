import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "store-js";
import "./main.less";
import APIs from "./APIs";
import { img_url } from "../../constants/base_url";
import base_url from "./../../constants/base_url"
import { Redirect, useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetchCatch from "../../utils/fetchCatch";
// ------------ components -----------------
import MainItem from "../../components/MainItem";
import ChangeCategoryDialog from "../../components/Dialogs/ChangeCategoryDialog";
// import CategoryChangeMsg from "../../components/Dialogs/CategoryChangeMsgDialog";
import NotificationsIcon from "../../components/NotificationsIcon";
import ProfilePic from "../../components/ProfilePic";
import LatestNotification from "../../components/LatestNotification";
import Icon from '@material-ui/core/Icon';

// ------------------ actions -------------------
import { getDialog, setCategoryTitle } from "./actions";

export function Main(props) {
  const appInit = store.get("appInit");
  const catTitle = useSelector((state) => state.MainReducer.catTitle);
  const businesses = store.get("businesses");
  const dispatch = useDispatch();
  const history = useHistory();
  const [reputation, setReputation] = useState("");
  const [loader, setLoader] = useState(false);

  const priceDigitSeperator = (price) => {
    if (price && parseFloat(price) > 0) {
      return Math.round(parseFloat(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
  };

  const handleDialog = () => {
    dispatch(getDialog(true));
    document.getElementsByClassName("main-div")[0].style.filter = "blur(2.5px)";
  };

  async function reputationSum() {
    setLoader(true);
    try {
      const data = await APIs.reputationSum();
      setReputation(parseFloat(data.data.reputation_sum));
      store.set("reputationSum", parseFloat(data.data.reputation_sum));
      setLoader(false);
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
    }
  }

  useEffect(() => {
    console.log(props);
   dispatch(setCategoryTitle(catTitle))
    reputationSum();
  }, []);

  return (
    <div className="main-div">
      <div className="main-header">
        <img
          src="assets/images/shape-right2.svg"
          className="right-shape"
          alt=""
        />
        <img
          src="assets/images/left-shape2.svg"
          className="left-shape"
          alt=""
        />
        <p>داپ اَپ اصناف</p>
      </div>
      <NotificationsIcon />
      <LatestNotification />
      <ProfilePic
        avatar={
          appInit !== undefined && appInit.avatar !== null
            ? `${img_url}${appInit.avatar}`
            : null
        }
      />
      <div className="main-content">
        <ChangeCategoryDialog />
        {/*<CategoryChangeMsg />*/}
        <div className="user-name">
          <h3>{appInit.f_name + " " + appInit.l_name}</h3>
          <p>
            {catTitle}
            {businesses.length > 1 && (
              <span onClick={handleDialog}>(تغییر)</span>
            )}
          </p>
        </div>
        <div className="items-div">
         <a style={{width:"85%"}}>
         <MainItem
            img="assets/images/edit.svg"
            txt="حساب کاربری"
            link="profile"
          />
         </a>
         <a style={{width:"85%"}}>
         <MainItem
            img="assets/images/qr-code.svg"
            txt="صدور لینک پرداخت"
            link="QRCode"
          />
         </a>
          <div className="main-box-div">
            <div className="main-box" onClick={() => history.push("wallet")}>
              <img src="assets/images/wallet.svg" alt="" />
              <p>کیف پول</p>
              <span>
                {appInit.wallet_credit === "0.00"
                  ? "0"
                  : priceDigitSeperator(appInit.wallet_credit)}
                تومان
              </span>
            </div>
            <div className="main-box" onClick={() => history.push("points")}>
              <img src="assets/images/bahai.svg" alt="" />
              <p>امتیازها</p>
              {loader ? (
                <CircularProgress size="15px" color="inherit" />
              ) : (
                <span>{reputation === "0.00" ? "0" : reputation} امتیاز</span>
              )}
            </div>
          </div>
         <a style={{width:"85%",cursor:"pointer"}}>
         <MainItem
            img="assets/images/payment.svg"
            txt="لیست تسهیلات"
            link="benefits"
          />
         </a>
          <a style={{width:"85%",cursor:"pointer"}}>
          <MainItem
            img="assets/images/text.svg"
            txt="باشگاه مشتریان"
            link="customer-list"
          />
          </a>
          <a style={{width:"85%"}} >
            <MainItem
            img="assets/images/headset.svg"
            txt="راهنما و پشتیبانی"
            link="/form"
            
          />
          </a>
         <a target="_blank" style={{width:"85%"}} href="https://api.daapapp.com/api/v1/about/business">
         <MainItem 
          txt="درباره داپ اَپ "
          img="assets/images/warning.svg"
          
          />
         </a>
       
        </div>
      </div>
    </div>
  );
}

export default Main;
