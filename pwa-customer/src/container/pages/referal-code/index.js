import React, { useState, useEffect } from "react";
import "./referal.less";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import useDataApi from "../../components/fetchData/useDataApi";
import Snackbar from "@material-ui/core/Snackbar";

function ReferalCode() {
  const [referalCode, setReferalCode] = useState("");
  const [params, setParams] = useState(null);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const url = "referral/check";
  const method = "post";
  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  const handleCloseErrMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (flag && data !== null && !isLoading && !isError) {
      history.push("main");
    } else if (flag && isError) {
      setOpen(true);
      setFlag((flag) => !flag);
      // setError((error) => !error);
    }
  }, [data, isLoading, isError]);

  function handleCheckReferal(e) {
    e.preventDefault();
    setParams({ referral_code: referalCode });
    setFlag((flag) => !flag);
  }

  return (
    <div className="referral-enter-div">
      
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errMessage ? open : false}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={errMessage}
      />
      <img
        className="big-circle"
        src="assets/images/big-circle-w.svg"
        alt=""
        style={{ zIndex: "1" }}
      />
      <img
        className="small-circle"
        src="assets/images/small-circle-w.svg"
        alt=""
      />
      <form
        action=""
        className="referral-enter-form"
        style={{ zIndex: "1000" }}
      >
        <div>
          <p style={{ margin: "15px 0", textAlign: "center" }}>
            کد معرف (اختیاری)
          </p>
          <input
            className="enter-input"
            type="number"
            pattern="\d*"
            value={referalCode}
            id=""
            placeholder="مثال: 27654"
            onChange={(e) => setReferalCode(e.target.value)}
          />
        </div>
        <p style={{ textAlign: "center", fontSize: ".9rem" }}>
          در صورتی که کد معرف ندارید، روی گزینه "ردکردن" کلیک کنید
        </p>
        {/*error && <span className="error">کد وارد شده صحیح نمی باشد</span>*/}
        <div
          style={{
            width: "100%",
            margin: "15px 0",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button
            className="big-btn"
            style={{ margin: "15px 0" }}
            onClick={(e) => handleCheckReferal(e)}
          >
            {flag && <CircularProgress size="15px" color="inherit" />}
            {!flag && <span>معرفی</span>}
          </button>
          <Link
            className="big-btn"
            to="main"
            style={{
              backgroundColor: "transparent",
              color: "darkgray",
              boxShadow: "none",
              border: "2px solid darkgray",
            }}
          >
            <span>رد کردن</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ReferalCode;
