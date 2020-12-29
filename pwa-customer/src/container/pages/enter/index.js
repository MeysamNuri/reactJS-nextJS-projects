import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import A from "../../components/button/A";
import { Link, useHistory } from "react-router-dom";
import { setName, setFName } from "../../actions/MainActions";
import "./enter.less";
import Snackbar from "@material-ui/core/Snackbar";

function Enter() {
  const [acountName, setAcountName] = useState("");
  const [acountFamilyName, setAcountFamilyName] = useState("");
  const [open, setOpen] = useState(true);
  const [err, setErr] = useState(false);
  const [errF, setErrF] = useState(false);
  // const name = useSelector((state) => state.MainReducer.name);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();
  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  function handleContinue(e) {
    e.preventDefault();
    if (acountName.length > 2) {
      dispatch(setName(acountName));
    } else if (acountName === "") {
      setErr(true);
    }
    if (acountFamilyName.length > 2) {
      dispatch(setFName(acountFamilyName));
      if (acountName === "") {
        setErr(true);
      }else{
        history.push("sign-in");
      }
    } else if (acountFamilyName === "") {
      setErrF(true);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleContinue(e);
    }
  };
  const handleCloseErrMessage = () => {
    setOpen(false);
  };

  return (
    <div className="enter-div">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={err ? open : false}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={"نام خود را وارد کنید"}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={errF ? open : false}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={"نام خانوادگی خود را وارد کنید"}
      />
      <img className="big-circle" src="assets/images/big-circle-w.svg" alt="" />
      <img
        className="small-circle"
        src="assets/images/small-circle-w.svg"
        alt=""
      />

      <form action="" className="enter-form">
        <p className="enter-txt">نام شما چیست؟</p>
        <input
          type="text"
          value={acountName}
          id=""
          placeholder="مثال: سجاد"
          onChange={(e) => setAcountName(e.target.value)}
          style={{ marginBottom: "10px" }}
          onKeyPress={e=> {if(e.key === 'Enter'){
            inputRef.current.focus()
          }}}
        />
        <p className="enter-txt">نام خانوادگی شما چیست؟</p>
        <input
          ref={inputRef}
          type="text"
          value={acountFamilyName}
          id=""
          placeholder="مثال: شفی زاده"
          onChange={(e) => setAcountFamilyName(e.target.value)}
          style={{ marginBottom: "45px" }}
          onKeyPress={(e) => handleKeyDown(e)}
        />
        <div>
          <A
            title="ادامه"
            style={{ margin: "15px 0", height: "40px" }}
            handleClick={(e) => handleContinue(e)}
          />
          <Link to="sign-in">بعدا</Link>
        </div>
      </form>
    </div>
  );
}

export default Enter;
