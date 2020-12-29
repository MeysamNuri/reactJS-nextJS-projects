import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "store-js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getCardId } from "../../pages/transactions/actions";
import { setHasAddCard } from "../../actions/MainActions";
import useDataApi from "../../components/fetchData/useDataApi";
import { img_url } from "../../../constants/base_url";
import "./card.less";
import Snackbar from "@material-ui/core/Snackbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getLoading } from "../../pages/loading/action";
import StatusDialog from "../dialog/statusDialog";
import {
  getDeleteDialog,
  setCardId,
  setCardList,
  setMin,
  setSec,
  setShowTimer,
  setActiveCardDialog,
} from "./action";
import DialogDeleteCard from "../dialog/dialogDeleteCard";
import DialogPopUp from "../dialog/dialogPopUp";
import LinearProgress from "@material-ui/core/LinearProgress";
import ActiveCardDialog from "../dialog/activeCardDialog";

const CardMenuItem = ({ src, txt, color, handleClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "transparent",
        outline: "none",
      }}
      onClick={handleClick}
    >
      <img src={src} alt="" style={{ marginLeft: "8px" }} />
      <p style={{ color: color }}>{txt}</p>
    </div>
  );
};

// const dialogStyle = {
//   height: "9vh",
//   marginTop: 0,
//   background: "#FFFFFF",
//   marginBottom: "16px",
//   borderRadius: "8px",
// };
const verify_title =
  "جهت صحت سنجی کارت بانکی شما، ناگزیر به انجام یک تراکنش 5 هزار تومانی در اپلیکیشن هستیم که فقط یکبار برای همیشه انجام می‏شود. این تراکنش با اتصال به درگاه امن بانک ملت انجام شده و مبلغ فوق بلافاصله به کیف پول شما در اپلیکیشن بازگردانده می‏شود که به همراه سایر پاداش‏های دریافتی از داپ‌اَپ بلافاصله از کیف پول قابل برداشت است.";

function Card({
  cardImg,
  backImg,
  cardName,
  cardNumber,
  cardId,
  verified,
  flag,
  state,
  enableTimer,
}) {
  const [cardMenuDisplay, setCardMenuDisplay] = useState("none");
  const [openDialog, setOpenDialog] = useState(false);
  const [params, setParams] = useState(null);
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState("post");
  // const [minute, setMinute] = useState(5);
  // const [second, setSecond] = useState(0);

  const cid = useSelector((state) => state.cardReducer.cardId);
  // const enableTimer = useSelector((state) => state.cardReducer.showTimer);
  const cardList = useSelector((state) => state.cardReducer.cardList);
  const minute = useSelector((state) => state.cardReducer.min);
  const second = useSelector((state) => state.cardReducer.sec);
  const activeCardEnable = useSelector(
    (state) => state.cardReducer.activeCardEnable
  );

  const [{ data, isLoading, isError, errMessage }] = useDataApi(
    url,
    params,
    method
  );
  const Dispatch = useDispatch();
  const history = useHistory();

  const handleCloseErrMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseCopied = () => {
    setCopied(false);
  };
  const handleClickedCardMenu = () => {
    setCardMenuDisplay("block");
  };

  const handleActiveCard = (id) => {
    Dispatch(setActiveCardDialog(true));
    Dispatch(setCardId(id));
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(2.5px)";
  };

  useEffect(() => {
    if (activeCardEnable) {
      setUrl("profile/card/active/mobile");
      setParams({ card_id: cardId });
    }
  }, [activeCardEnable]);

  /* ---------------------- Timer -------------------------*/
  useEffect(() => {
    let sec;
    let min;
    let timer;
    if (enableTimer) {
      timer = setInterval(() => {
        sec = second - 1;
        if (second > 0) {
          Dispatch(setSec(sec));
        }
        if (second === 0) {
          if (minute === 0) {
            clearInterval(timer);
            Dispatch(setShowTimer(false));
            if (cardList !== [] && cardList.customer_cards !== undefined) {
              cardList.customer_cards.forEach((item) => {
                if (item.enableTimer) {
                  item.enableTimer = false;
                }
              });
            }
            let cards = store.get("cards_data");
            if (cards) {
              cards.customer_cards.forEach((item) => {
                if (item.enableTimer) {
                  item.enableTimer = false;
                }
              });
            }
            store.set("cards_data", cards);
          } else {
            min = minute - 1;
            Dispatch(setMin(min));
            Dispatch(setSec(59));
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (
      data &&
      data.status === 200 &&
      url === "profile/del/card" &&
      data.message === "با موفقیت حذف شد"
    ) {
      setCardMenuDisplay("none");
      document.getElementById(cid.toString()).style.display = "none";
      let cards = store.get("cards_data");
      Dispatch(getDeleteDialog(false));
      if (cards) {
        for (let index = 0; index < cards.customer_cards.length; index++) {
          const element = cards.customer_cards[index];
          if (element.id === cid) cards.customer_cards.splice(index, 1);
        }
      }
      store.set("cards_data", cards);
      Dispatch(setCardList(cards));
      if (cards.customer_cards.length === 0) {
        Dispatch(getLoading(true));
      }
      if (
        cards.customer_cards.length <= 1 &&
        cards.customer_cards[0].card_number === "1111111111111111"
      ) {
        Dispatch(setHasAddCard(false));
      }
    }
    // else if (data && data.status === 200 && url === "profile/verify/card") {
    //   setCardMenuDisplay("none");
    //   Dispatch(getVerifyCardDialog(false));
    //   var popUpWin = window.open(data.data.redirect_url);

    //   if (
    //     !popUpWin ||
    //     popUpWin.closed ||
    //     typeof popUpWin.closed == "undefined"
    //   ) {
    //     Dispatch(setPopUpDialogShow(true));
    //     document.getElementsByClassName("card-content-div")[0].style.filter =
    //       "blur(2.5px)";
    //   }
    // }
    else if (url === "profile/card/active/mobile") {
      setUrl("cards");
      setMethod("get");
    } else if (url === "cards") {
      store.set("cards_data", data.data);
      Dispatch(setCardList(data.data));
    } else if (errMessage !== "") {
      setOpenDialog(true);
      setOpen(true);
    }
  }, [data, errMessage]);

  const handleClick = (e, id, verified) => {
    Dispatch(getCardId(id));
    store.set("selectedCardId", id);
    const states = {
      verified: verified,
    };
    history.push({ pathname: "transactions", state: states });
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    Dispatch(getDeleteDialog(true));
    document.getElementsByClassName("card-content-div")[0].style.filter =
      "blur(2.5px)";
    Dispatch(setCardId(id));
  };
  const handleDeleteCard = () => {
    setParams({ card_id: cid });
    setMethod("post");
    setUrl("profile/del/card");
    Dispatch(getDeleteDialog(false));
  };

  // const handleVerify = (id, e) => {
  //   e.preventDefault();
  //   Dispatch(getVerifyCardDialog(true));
  //   document.getElementsByClassName("card-content-div")[0].style.filter =
  //     "blur(2.5px)";
  //   Dispatch(setCardId(id));
  // };

  // const handleVerifyCard = () => {
  //   setParams({ card_id: cid });
  //   setUrl("profile/verify/card");
  //   Dispatch(getVerifyCardDialog(false));
  // };
  return (
    <div className="card-div" id={cardId}>
      <DialogDeleteCard handleDelete={handleDeleteCard} />
      {/*<DialogVerifyCard handleVerifyCard={handleVerifyCard} />*/}
      <DialogPopUp />
      <ActiveCardDialog />

      {isLoading && (
        <div className="loading">
          <CircularProgress className="circular_loading" />
        </div>
      )}

      {openDialog && <StatusDialog title={verify_title} title_close="موافقم" />}

      <div className="card-body">
        <div
          className="inactive-card"
          style={{ display: state === "inactive" ? "block" : "none" }}
        >
          <div className="active-card" onClick={()=> handleActiveCard(cardId)}>
            <span>فعال کردن کارت</span>
            <img src="assets/images/back-copy.svg" alt="" />
          </div>
        </div>
        {enableTimer ? (
          minute === 0 && second === 0 ? null : (
            <div
              className="timer-div"
              style={{ display: enableTimer ? "flex" : "none" }}
            >
              <CircularProgress
                style={{ color: "#fff", marginBottom: "15px" }}
              />
              {
                <p>
                  {minute}:{second < 10 ? `0${second}` : second} دیگر کارت بانکی
                  فعال میگردد
                </p>
              }
            </div>
          )
        ) : null}
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          style={{ bottom: "50px" }}
          open={copied}
          onClose={handleCloseCopied}
          autoHideDuration={1000}
          message={"شماره کارت کپی شد"}
        />
        <img src={`${img_url}${backImg}`} className="card-big-img" alt="" />
        <div className="card-content">
          <div className="card_blur" style={{ display: cardMenuDisplay }}></div>
          <div className="card-menu" style={{ display: cardMenuDisplay }}>
            <div className="card-menu-content">
              <span
                className="exit_button"
                onClick={() => setCardMenuDisplay("none")}
              />
              <CopyToClipboard text={cardNumber} onCopy={() => setCopied(true)}>
                <button
                  style={{
                    background: "transparent",
                    outline: "none",
                    marginRight: "14px",
                  }}
                >
                  <CardMenuItem
                    src="assets/images/copy.svg"
                    color="#000"
                    txt="کپی شماره کارت"
                  />
                </button>
              </CopyToClipboard>
              {/*verified === "not_verified" && (
                <CardMenuItem
                  src="assets/images/menu-verified.svg"
                  color="#6498E6"
                  txt="تایید مالکیت"
                  handleClick={(e) => handleVerify(cardId, e)}
                />
              )*/}
              <CardMenuItem
                src="assets/images/trash.svg"
                color="#D0332C"
                txt="حذف کارت"
                handleClick={(e) => handleDelete(cardId, e)}
              />
            </div>
          </div>
          <div className="card-top-detail">
            <img
              src={`${img_url}${cardImg}`}
              className="card-small-img"
              alt=""
            />
            <h2 className="card-name">{cardName}</h2>
            <div
              style={{
                display: "flex",
                alignItems: "centr",
                marginRight: "8px",
              }}
            >
              {verified === "not_verified" ? (
                <div style={{ display: "flex" }}>
                  <img
                    style={{ marginLeft: "10px" }}
                    src="assets/images/unverified.svg"
                    alt=""
                  />
                  {/*<p onClick={(e) => handleVerify(cardId, e)}>تایید مالکیت</p*/}
                  <p>تایید مالکیت</p>
                </div>
              ) : (
                <img src="assets/images/verified.svg" alt="" />
              )}
            </div>
          </div>
          <p className="card-number">
            {cardNumber ? (
              <>
                <span>{cardNumber.substr(0, 4)}</span>
                <span>{cardNumber.substr(4, 4)}</span>
                <span>{cardNumber.substr(8, 4)}</span>
                <span>{cardNumber.substr(12, 4)}</span>
              </>
            ) : (
              ""
            )}
          </p>
          <div className="card-bottom-detail">
            <h2 className="card-user-name">
              {" " ? (
                " "
              ) : (
                <p style={{ color: "#C2CDD9", fontWeight: "lighter" }}>
                  نام صاحب کارت
                </p>
              )}
            </h2>
            <div
              className="card-transaction"
              style={{ color: "#6498E6", display: flag ? "flex" : "none" }}
            >
              <span onClick={(e) => handleClick(e, cardId, verified)}>
                تراکنش ها
              </span>
              <img src="assets/images/back.svg" alt="" />
            </div>
          </div>

          <img
            src="assets/images/menu.svg"
            className="card-menu-icon"
            alt=""
            style={{ display: flag ? "flex" : "none" }}
            onClick={handleClickedCardMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
