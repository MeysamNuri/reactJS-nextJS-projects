import React, { useEffect } from "react";
import { TimelineMax } from "gsap/all";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "store-js";
import "./loading.less";
import Lottie from "react-lottie";
import animationData from "./loadingAnimation.json";
import { getLoading } from "./action";
import { askForPermissionToReceiveNotifications } from "../../../push-notification";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

function Loading() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loadingReducer.loading);
  const history = useHistory();
  let token = store.get("token");
  let user_step = store.get("user_step");

  useEffect(() => {
    window.scrollTo(0, '10vh');
    askForPermissionToReceiveNotifications();
    if (user_step === undefined) {
      history.push("walktrow");
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      document.getElementsByClassName("loading-loader")[0].style.display =
        "none";
      document.getElementsByClassName("start-btn")[0].style.display = "flex";
    }
  }, [loading]);

  const handleEnterBtn = (e) => {
    e.preventDefault();
    history.push("/enter");
  };

  useEffect(() => {
    const tl = new TimelineMax();
    tl.duration(".main-txt", 0.4, { y: "15vw",}, { y: 0 });
  }, []);

  const handleClick = (e) => {
    if (token !== undefined && token !== '') {
      store.set("showMainLogin", false);
    } else {
      store.set("showMainLogin", true);
    }
    dispatch(getLoading(true));
    history.push(token ? "main" : "sign-in");
  };

  // const handleGoToMain = () => {
  //   if (token !== undefined && token !== '') {
  //     store.set("showMainLogin", false);
  //   } else {
  //     store.set("showMainLogin", true);
  //   }
  //   dispatch(getLoading(true));
  //   history.push("main");
  // };

  return (
    <div className="main">
      <img className="big-circle" src="assets/images/big-circle.svg" alt="" />
      <img
        className="small-circle"
        src="assets/images/small-circle.svg"
        alt=""
      />
      <div className="logo">
        <img src="assets/images/logo.svg" alt="" />
        <img src="assets/images/logo-txt.svg" alt="" />
      </div>
      <p className="main-txt">بازگشت به فردا</p>
      <div className="loading-loader">
        <Lottie options={defaultOptions} height={50} width={"100%"} />
      </div>
      <div className="start-btn">
        {/*<button className="sec-btn" onClick={handleGoToMain}>
          صفحه اصلی
  </button>*/}
        <button className="big-btn" onClick={(e) => handleEnterBtn(e)}>
          شروع
        </button>
        <span style={{ marginTop: "20px" }}>
          قبلا عضو شده اید؟
          <span onClick={(e) => handleClick(e)} style={{ color: "#6498E6" }}>
            {" "}
            وارد شوید
          </span>
        </span>
      </div>
    </div>
  );
}

export default Loading;
