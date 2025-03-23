import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnlineStatus } from "./container/actions/MainActions";
export default function OnlineWatcher() {
  const Dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("online", () => {
      Dispatch(setOnlineStatus(true));
    });
  }, []);
  useEffect(() => {
    window.addEventListener("offline", () => {
      Dispatch(setOnlineStatus(false));
    });
  }, []);
  return <div></div>;
}
