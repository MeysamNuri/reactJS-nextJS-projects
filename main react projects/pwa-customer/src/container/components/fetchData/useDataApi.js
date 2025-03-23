import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import base_url from "../../../constants/base_url";
import store from "store-js";
import { useHistory } from "react-router-dom";
import {
  getNotiNumber,
  setHasAddCard,
  setLogoutPopUpDialogShow,
} from "../../actions/MainActions";

const useDataApi = (url, params, method) => {
  const store_token = store.get("token");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [errData, setErrData] = useState(null);
  const [refreshToken, setRefreshToken] = useState(false);
  const [token, setToken] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios({
          method: method,
          data: method === "get" ? null : params,
          url: `${base_url}${url}`,
          headers: {
            Authorization: `Bearer ${store_token}`,
          },
        });
        setData(result.data);
        console.log("result", result);
      } catch (error) {
        if (error.response) {
          setErrMessage(error.response.data.message);
          setErrData(error.response.data);
          if (error.response.status === 401) {
            setRefreshToken(true);
            setIsError(false);
            setIsLoading(true);
            store.set('isSignIn', false)
          }
        }
        setIsError(true);
      }
      setIsLoading(false);
    };
    if (params) {
      fetchData();
    }
  }, [url, params, method, token]);

  useEffect(() => {
    if (refreshToken) {
      const fetchData2 = async () => {
        try {
          const result = await axios({
            method: "post",
            url: `${base_url}token/refresh`,
            headers: {
              Authorization: `Bearer ${store_token}`,
            },
          });
          store.set("token", result.data.access_token);
          setToken(result.data.access_token);
        } catch (error) {
          if (error.response) {
            console.error("err", error.response);
          }
          localStorage.removeItem("profile_data");
          localStorage.removeItem("cards_data");
          localStorage.removeItem("token");
          localStorage.removeItem("favorites_data");
          localStorage.removeItem("credit_data");
          localStorage.removeItem("transactions_data");
          localStorage.removeItem("card_transactions");

          store.set("showMainLogin", true);
          store.set("isSignIn", false);

          dispatch(setHasAddCard(true));
          dispatch(getNotiNumber(0));

          dispatch(setLogoutPopUpDialogShow(true));
          document.getElementsByClassName("App")[0].style.filter =
            "blur(2.5px)";
          
          setTimeout(()=>{
            dispatch(setLogoutPopUpDialogShow(false));
          document.getElementsByClassName("App")[0].style.filter = "blur(0px)";
          },3000)
          
        }
      };
      fetchData2();
    }
  }, [refreshToken]);

  return [{ data, isLoading, isError, errMessage, errData }];
};
export default useDataApi;
