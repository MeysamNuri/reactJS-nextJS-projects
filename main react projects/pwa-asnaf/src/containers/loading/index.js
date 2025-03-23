/**
 *
 * Loading
 *
 */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import store from "store-js";
import Lottie from "react-lottie";
import animationData from "./loadingAnimation.json";
import { askForPermissionToReceiveNotifications } from "../../push-notification";
import "./loading.less";

export function Loading() {
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    askForPermissionToReceiveNotifications()
  },[]);

  const token = store.get("token");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setShowLottie(false);
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const history = useHistory();
  const handleGoToLogin = (e) => {
    e.preventDefault();
    if (token !== undefined) {
      history.push("main");
    } else {
      history.push("sign-in");
    }
  };
  
  return (
    <div className="main">
      <img className="big-circle" src='assets/images/big-circle.svg' alt="" />
      <img className="small-circle" src='assets/images/small-circle.svg' alt="" />
      <div className="logo">
        <img src='assets/images/logo.svg' alt="" />
        <img src='assets/images/logo-txt.svg' alt="" />
      </div>
      <p className="main-txt">بازگشت به فردا</p>
      {showLottie ? (
        <div className="loader">
          <Lottie options={defaultOptions} height={50} width={"100%"} />
        </div>
      ) : (
        <>
          <div className="start-btn">
            <button className="big-btn" onClick={(e) => handleGoToLogin(e)}>
              شروع
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Loading;
