import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "store-js";
import { useDispatch } from "react-redux";
import base_url from "../../../constants/base_url";
import { getLoading } from "../../pages/loading/action";
import {
  getNotiNumber,
  setHasAddCard,
} from "../../actions/MainActions";
import { setCardList } from '../../components/card/action';
import { useHistory } from "react-router-dom";

function FetchAllData(loading) {
  const store_token = store.get("token");
  const isSignIn = store.get("isSignIn");
  const showMainLogin = store.get("showMainLogin");
  const [refreshToken, setRefreshToken] = useState(false);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const allUrl = [
    "categories/tree",
    "categories/tree/businesses/discounted",
    "profile",
    "cards",
    "favorite/businesses",
    "transaction/list",
    "bank/all",
    "wallet/credit",
    "notification/unread/count",
    'notification/latest',
    'businesses/regions'
  ];
  let promises = null;
  if (loading) {
    promises = allUrl.map((url) =>
      axios
        .get(`${base_url}${url}`, {
          headers: {
            Authorization: `Bearer ${store_token}`,
          },
        })
        .then(function (response) {
          // dispatch(setErrAnimation(false));
          return {
            success: true,
            data: response.data,
          };
        })
        .catch(function (error) {
          if (error.response) {
            console.log("error", error.response);
            if (error.response.data.status === 401) {
              setRefreshToken(true);
              if (!showMainLogin) {
                history.push("sign-in");
              }
            }
          }
          // else if (!error.response) {
          //   console.log("network");
          //   dispatch(setErrAnimation(true))
          //   history.push('net-err')
          // }
          return { success: false };
        })
    );
  }

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

          store.set("token", result.data.data.access_token);
          setToken(result.data.data.access_token);
        } catch (error) {
          if (error.response) {
            console.error("err", error.response);
          }
        }
      };
      fetchData2();
    }
  }, [refreshToken]);

  useEffect(() => {
    if (loading) {
      let app_start = store.get("appStartResult");
      const fetchData = async () => {
        try {
          let [
            categoriesResult,
            discoountResult,
            profileResult,
            cardListResult,
            favoritesResult,
            transactionsResult,
            banksInfoResult,
            creditResult,
            notificationResult,
            latestNotificationsResult,
            regionsResult
          ] = await Promise.all(promises);

          if (categoriesResult.success) {
            store.set("categories_data", categoriesResult.data.data);
          }
          if (discoountResult.success)
            store.set("discount_data", discoountResult.data.data);
          if (profileResult.success)
            store.set("profile_data", profileResult.data.data);
          if (cardListResult.success) {
            store.set("cards_data", cardListResult.data.data);
            dispatch(setCardList(cardListResult.data.data))
            if (cardListResult.data.data.customer_cards.length <= 1 && cardListResult.data.data.customer_cards[0].card_number === '1111111111111111') {
              dispatch(setHasAddCard(false));
            } else {
              dispatch(setHasAddCard(true));
            }
          }

          if (favoritesResult.success) {
            let favorite = favoritesResult.data.data;
            if (favoritesResult.data.data.last_page > 1) {
              let index = 2;

              while (index <= favoritesResult.data.data.last_page) {
                await axios
                  .get(`${base_url}favorite/businesses?page=${index}`, {
                    headers: {
                      Authorization: `Bearer ${store_token}`,
                    },
                  })
                  .then(function (response) {
                    favorite.data = favorite.data.concat(
                      response.data.data.data
                    );
                    index = index + 1;
                  })
                  .catch(function (error) {
                    if (error.response) {
                      console.log("error", error);
                      if (error.response.data.status === 401) {
                        setRefreshToken(true);
                      }
                    }
                    return { success: false };
                  });
              }
            }
            store.set("favorites_data", favorite);
          }

          if (transactionsResult.success)
            store.set("transactions_data", transactionsResult.data.data);
          if (banksInfoResult.success)
            store.set("banksInfo_data", banksInfoResult.data.data);
          if (creditResult.success)
            store.set("credit_data", creditResult.data.data);
          if (notificationResult.success)
            dispatch(
              getNotiNumber(notificationResult.data.data.notification_num)
            );
          if (latestNotificationsResult.success)
            store.set('latest-notifications', latestNotificationsResult.data.data.notification)
          if(regionsResult.success){
            store.set('regions', regionsResult.data.data)
          }
          if (typeof app_start === undefined) {
            app_start = await axios.get(`${base_url}app_start`);
            store.set("appStartResult", app_start);
          }
          dispatch(getLoading(false));
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }
  });
}


export default FetchAllData;
