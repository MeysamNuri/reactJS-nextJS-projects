import React, { useState, useEffect } from "react";
import "./contact-form.less";
import useDataApi from "../fetchData/useDataApi";
import store from "store-js";
import Snackbar from "@material-ui/core/Snackbar";

const initialState = {
  name: "",
  cellphone: "",
  msg: "",
};

function ContactForm() {
  const [{ name, cellphone, msg }, setState] = useState(initialState);
  const [params, setParams] = useState(true);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [method, setMethod] = useState("post");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [url, setUrl] = useState("support/create");
  const [{ data, isLoading, isError }] = useDataApi(url, params, method);

  const profileData = store.get("profile_data");

  useEffect(() => {
    if (profileData !== undefined) {
      if (profileData.f_name !== "" && profileData.f_name !== null) {
        setState((prevState) => ({
          ...prevState,
          name: profileData.f_name + " " + profileData.l_name,
        }));
      }
      if (profileData.cellphone !== "" && profileData.cellphone !== null) {
        setState((prevState) => ({
          ...prevState,
          cellphone: profileData.cellphone,
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (data !== null && !isLoading && !isError) {
      setOpenSnack(true);
      setSnackMsg('با موفقیت ثبت شد')
      // setState((prevState) => ({ ...prevState, msg: "" }));
    } else if (isError) {
      setFlag((flag) => !flag);
      setError((error) => !error);
    }
  }, [data, isLoading]);

  const handleChangeInput = (e) => {
    e.persist();
    const name = e.target.name;

    switch (name) {
      case "name":
        setState((prevState) => ({ ...prevState, name: e.target.value }));
        break;
      // case "cellphone":
      //   setState((prevState) => ({ ...prevState, cellphone: e.target.value }));
      //   break;
      case "msg":
        setState((prevState) => ({ ...prevState, msg: e.target.value }));
        break;
      default:
        break;
    }
  };

  const handleSendForm = (e) => {
    e.preventDefault();
    if (name !== "" && msg !== "" && cellphone !== "") {
      setParams({
        title: name,
        cellphone: cellphone,
        description: msg,
        email: "",
      });
    } else {
      setOpenSnack(true);
      setSnackMsg('لطفا فیلدها را پرکنید')
    }
  };

  const handleCloseErrMessage = () => {
    setOpenSnack(false);
  };

  return (
    <div style={{ height: "72vh", overflow: "hidden" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={snackMsg}
        style={{ width: "200px", left: "50%", bottom: "5%", right: "24%" }}
      />
      <form action="" className="contact-form">
        <div>
          <p>نام</p>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => handleChangeInput(e)}
            autoComplete="on"
          />
        </div>
        <div>
          <p>شماره تلفن</p>
          <input
            style={{ textAlign: "left" }}
            type="number"
            // pattern="\d*"
            name="cellphone"
            id="phone"
            value={cellphone}
            // onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div>
          <p>پیام</p>
          <textarea
            type="text"
            name="msg"
            id="msg"
            value={msg}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div>
          <button
            onClick={(e) => handleSendForm(e)}
            style={{ marginLeft: "12px" }}
          >
            ارسال
          </button>
          <a href="tel:+982188893217">تماس تلفنی</a>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
