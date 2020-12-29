import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { getVerifyCardDialog } from "../../components/card/action";
import "./profile-dialog.less";
import { makeStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "./card-verify.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles({
  paper: {
    width: "80%",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    textAlign: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperWidthSm: {
    height: "410px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    alignItems: "center",
  },
});

function DialogProfileChange(props) {
  const Dispatch = useDispatch();
  const open = useSelector((state) => state.cardReducer.verifyCardDialog);

  const handleClose = () => {
    Dispatch(getVerifyCardDialog(false));
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(0px)";
  };

  const handleYesBtn = () => {
    props.handleVerifyCard();
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(0px)";
    Dispatch(getVerifyCardDialog(false));
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
          paperWidthSm: classes.paperWidthSm,
          container: classes.container,
        }}
        aria-labelledby="profile-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="profile-div-dialog">
          <Lottie options={defaultOptions} height={120} width={"38%"} />
          <img
            style={{ position: "absolute", right: "13px", top: "13px" }}
            src="assets/images/close-black.svg"
            alt=""
            onClick={handleClose}
          />
          <p>
            جهت صحت سنجی کارت بانکی شما، ناگزیر به انجام یک تراکنش 5 هزار تومانی
            در اپلیکیشن هستیم که فقط یکبار برای همیشه انجام می‏شود. این تراکنش
            با اتصال به درگاه امن بانک ملت انجام شده و مبلغ فوق بلافاصله به کیف
            پول شما در اپلیکیشن بازگردانده می‏شود که به همراه سایر پاداش‏های
            دریافتی از داپ‌اَپ از کیف پول قابل برداشت است.
          </p>
          <div className="dialog-btn-div" style={{ justifyContent: "center" }}>
            <button className="yesBtn" onClick={handleYesBtn}>
              موافقم
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogProfileChange;
