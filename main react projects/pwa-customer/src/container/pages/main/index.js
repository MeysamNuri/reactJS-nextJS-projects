import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  setShowSlideMenu,
  getNotiNumber,
  setShowAnnDialogShow,
} from "../../actions/MainActions";
import fetchAllData from "../../components/fetchData/fetchAllData";
import Search from "../../components/search/Search";
import NotificationIcon from "../../components/notifications-icon";
import SlideBar from "../../components/side-menu";
import "./main.less";
import SimpleMap from "./GoogleMaps";
import LatestNotifications from "../../components/latest-notification";
import { setMainDialog } from "../../actions/MainActions";
import DialogMainSignIn from "../../components/dialog/dialogMainPageLogin";
import AnnDialog from "../../components/dialog/annDialog";
import store from "store-js";
import "./main.less";
import useDataApi from "../../components/fetchData/useDataApi";
import { useHistory } from "react-router-dom";
import BottomNavBar from "../BottomNavBar";
import Wallet from "../wallet";
import Profile from "../profile";
import CardList from "../cards";
import axios from "axios";
import base_url from "../../../constants/base_url";
import ProfileNotSigned from "../profile-not-signed";
import { setMin, setSec } from "../../components/card/action";

const sideBarBtnStyle = {
  backgroundColor: "#6498e6",
  borderRadius: "8px",
  boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "46px",
  height: "45px",
  position: "absolute",
  top: "1vh",
  right: "15px",
};

function Main({ location }) {
  const Dispatch = useDispatch();
  const history = useHistory();
  const [params, setParams] = useState(true);
  const [url, setUrl] = useState("announcement");
  const method = "get";
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  const showSideBar = useSelector((state) => state.MainReducer.showSideBar);
  const hasAddCard = useSelector((state) => state.MainReducer.hasAddCard);
  const selectedPage = useSelector((state) => state.MainReducer.selectedPage);
  const navValue = useSelector((state) => state.MainReducer.navValue);
  const status = useSelector((state) => state.MainReducer.status);
  const minute = useSelector((state) => state.cardReducer.min);
  const second = useSelector((state) => state.cardReducer.sec);
  const cardList = useSelector((state) => state.cardReducer.cardList);
  const showTimer = useSelector((state) => state.cardReducer.showTimer);
  const selected_items = useSelector(
    (state) => state.MainReducer.selectedItems
  );

  const token = store.get("token");
  const isSignIn = store.get("isSignIn");
  const ann_id = store.get("ann_id");
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const getNotificationUnread = () => {
    axios
      .get(`${base_url}notification/unread/count`, { headers: headers })
      .then((res) => {
        Dispatch(getNotiNumber(res.data.data.notification_num));
      })
      .catch((err) => {
        console.log("unread notification err", err);
      });
  };
  const getLatestNotification = () => {
    axios
      .get(`${base_url}notification/latest`, { headers: headers })
      .then((res) => {
        store.set("latest-notifications", res.data.data.notification);
      })
      .catch((err) => {
        console.log("latest notification err", err);
      });
  };

  useEffect(() => {
    getNotificationUnread();
  });

  useEffect(() => {
    if (data !== null && !isError && !isLoading) {
      if (data.data !== null) {
        if (ann_id === data.data.id) {
          return;
        } else {
          store.set("ann_id", data.data.id);
          Dispatch(setShowAnnDialogShow(true));
          document.getElementsByClassName("main-page")[0].style.filter =
            "blur(2.5px)";
        }
      }
    } else if (flag && isError) {
      setFlag((flag) => !flag);
      setError((error) => !error);
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    let interval;
    if (isSignIn) {
      interval = setInterval(() => {
        getNotificationUnread();
        getLatestNotification();
      }, 20000);
    }
    return () => {
      clearInterval(interval);
    };
  }, []);
  // const fav = useSelector((state) => state.MainReducer.fav);
  const showMainLogin = store.get("showMainLogin");

  const loading = useSelector((state) => state.loadingReducer.loading);
  fetchAllData(loading);

  const handleDialog = () => {
    Dispatch(setMainDialog(true));
    document.getElementsByClassName("main-page")[0].style.filter =
      "blur(2.5px)";
  };

  const handleAddCardBtn = () => {
    history.push("add-card");
  };

  useEffect(() => {
      document.getElementsByClassName("main_container")[0].style.width = "100%";
    document.getElementsByClassName("main_container")[0].style.height = "100vh";
  });

  const fetchData = async () => {
    await axios.get(`${base_url}app_start`).then((res) => {
      store.set("appStartResult", res);
    });
  };

  function noscroll() {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    // document.body.classList.add("no-sroll");
    // window.addEventListener("scroll", noscroll);
    const timeOut = setTimeout(() => {
      fetchData();
    }, 20000);
    return () => {
      clearTimeout(timeOut);
    };
  });

  /* ---------------------- Timer -------------------------*/
  useEffect(() => {
    let sec;
    let min;
    let timer;
    if (showTimer) {
      timer = setInterval(() => {
        sec = second - 1;
        if (second > 0) {
          Dispatch(setSec(sec));
        }
        if (second === 0) {
          if (minute === 0) {
            clearInterval(timer);
            cardList.customer_cards.forEach((item) => {
              if (item.enableTimer) {
                item.enableTimer = false;
              }
            });
          } else {
            min = minute - 1;
            Dispatch(setMin(min));
            Dispatch(setSec(59));
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="main_container">
  
      {/*!status && (
        <statusDialog title="خطا در اتصال به اینترنت" title_close="بستن" />
      )*/}
      {loading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}
      <div className="main-page">
        <BottomNavBar />

        {selectedPage === "map" && navValue === 0 ? (
          <>
            <SlideBar />
            <LatestNotifications />
            <SimpleMap
              id={
                location.state && selected_items !== 0
                  ? location.state.id
                  : null
              }
            ></SimpleMap>
            <Search />
            <NotificationIcon />
            <div
              className="main-msg"
              style={{ display: showMainLogin ? "block" : "none" }}
            >
              <p>
                <span>توجه: </span>برای استفاده از مزایای منحصر به ‏فرد
                داپ‏‌اَپ، ابتدا شمارۀ تلفن همراه خود را وارد کنید
              </p>
              <button
                className="big-btn"
                style={{ boxShadow: "unset", fontSize: "1.1rem" }}
                onClick={handleDialog}
              >
                وارد کردن شماره موبایل
              </button>
            </div>
            <DialogMainSignIn />
            <div
              className="main-addcard-msg"
              style={{ display: hasAddCard ? "none" : "block" }}
            >
              <h4>تبریک! شما داپ‌اَپی شدید.</h4>
              <p>
                کارت‌های بانکی خود را ثبت و از اصناف عضو داپ‏‌اَپ خرید کنید . از
                این پس هر روز تا 14% از کل مبلغ خرید‌های خود را نقداً دریافت
                کنید.
              </p>
              <button className="addcard-dialog-btn" onClick={handleAddCardBtn}>
                اضافه کردن کارت بانکی
              </button>
            </div>
            <div
              className="sidebar-btn"
              style={sideBarBtnStyle}
              onClick={() => Dispatch(setShowSlideMenu(!showSideBar))}
            >
              <img src="assets/images/segmentation.svg" alt="" />
            </div>
            <LatestNotifications />
            {data !== null && data.data !== null && <AnnDialog data={data} />}
          </>
        ) : selectedPage === "wallet" && navValue === 2 ? (
          <Wallet />
        ) : selectedPage === "profile" && navValue === 3 ? (
          isSignIn ? (
            <Profile />
          ) : (
            <ProfileNotSigned />
          )
        ) : (
          <CardList />
        )}
      </div>
    </div>
  );
}

export default Main;
