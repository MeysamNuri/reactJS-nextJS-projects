import React from "react";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import animationData from "./connection.json";

function NetworkErrAnimation() {
  const errAnimation = useSelector((state) => state.MainReducer.errAnimation);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {errAnimation && (
        <Lottie options={defaultOptions} height={300} width={"80%"} />
      )}
    </div>
  );
}

export default NetworkErrAnimation;
