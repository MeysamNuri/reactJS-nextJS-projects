/**
 *
 * ChooseAccount
 *
 */

import React, { useState } from "react";
import "./choose-account.less";
import store from "store-js";
import APIs from "./APIs";
import fetchCatch from "../../utils/fetchCatch";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { setCategoryTitle } from "../Main/actions";
import { useDispatch } from "react-redux";

export function ChooseAccount({ location }) {
  const dispatch = useDispatch();
  const businesses = store.get("businesses");
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  async function appInit(e,id) {
    e.preventDefault();
    setLoader(true);
    try {
      const data = await APIs.appInit(id);
      setLoader(false);
      dispatch(setCategoryTitle(data.data[0].businesses[0].shop_name));
      store.set("appInit", data.data[0]);
      history.push("main");
    } catch ({ response }) {
      if (response) {
        fetchCatch(response);
      }
      setLoader(false);
    }
  }

  return (
    <div className="choose-acc">
      {loader ? (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      ) : (
        <>
          <img
            className="big-circle"
            src="assets/images/big-circle-w.svg"
            alt=""
          />
          <img
            className="small-circle"
            src="assets/images/small-circle-w.svg"
            alt=""
          />
          <p
            style={{ width: "65%", marginBottom: "35px", fontSize: "1.1rem" }}
          >{` ${location.state.name} عزیز، به داپ‌اَپ خوش آمدید`}</p>
          <p style={{ width: "80%", fontSize: "1.2rem", lineHeight: "30px" }}>
            برای ادامه لطفا یکی از کسب و کارهای خود را انتخاب کنید
          </p>
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {businesses.map((item) => (
              <button
                key={item.business_id}
                onClick={(e) => appInit(e,item.business_id)}
                className="choose-acc-btn"
              >
                <span>{item.business_name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ChooseAccount;
