import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "store-js";
import Card from "../../components/card";
import Header from "../../components/header/Header";
import { removeStack } from "../../actions/MainActions";
import { useHistory } from "react-router-dom";
import "./cards.less";
import axios from "axios";
import base_url from "../../../constants/base_url";
import { setCardList } from "../../components/card/action";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";

function CardsList() {
  const [openSnack, setOpenSnack] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const cards = useSelector((state) => state.cardReducer.cardList);
  const history = useHistory();
  const Dispatch = useDispatch();
  const token = store.get("token");
  const [loading, setLoading] = useState(false);
  const stack = useSelector((state) => state.MainReducer.stack);
  const showTimer = useSelector((state) => state.cardReducer.showTimer);
  const min = useSelector((state) => state.cardReducer.min);
  const sec = useSelector((state) => state.cardReducer.sec);
  const localCardList = store.get("cards_data");

  const getCardData = () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${base_url}cards`, { headers: headers })
      .then((res) => {
        setLoading(false);
        store.set("cards_data", res.data.data);
        Dispatch(setCardList(res.data.data));
      })
      .catch((err) => {
        console.log("get profile err", err);
      });
  };

  useEffect(() => {
    getCardData()
  }, [])

  useEffect(() => {
    setErrorTitle(
      `${min}:${
        sec < 10 ? `0${sec}` : sec
      } دیگر، مجاز به اضافه کردن کارت خواهید شد`
    );
    if (sec === 0 && min === 0) {
      setOpenSnack(false);
    }
  }, [min, sec]);

  const handleGoToAddCard = () => {
    if (showTimer) {
      setOpenSnack(true);
    } else {
      history.push("add-card");
    }
  };

  // useEffect(() => {
  //   if (cards !== undefined) {
  //     const data = [];
  //     data.push(cards.customer_cards);
  //     data[0].forEach((item) => {
  //       if (item.status === "verified") {
  //         setShowWarningTxt(false);
  //       }
  //     });
  //   }
  // }, []);
  const handleCloseErrMessage = () => {
    setOpenSnack(false);
  };

  const handleLeftClick = () => {
    if (stack.length === 0) {
      history.push("main");
    } else {
      Dispatch(removeStack());
    }
  };
  
  return (
    <>
      <Header
        title="کارت‌های بانکی"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={null}
        handleLeftClick={handleLeftClick}
      />

      {loading && (
        <div className="loading" style={{ backgroundColor: "unset" }}>
          <CircularProgress className="circular_loading" />
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ bottom: "45px" }}
        open={openSnack}
        autoHideDuration={5000}
        message={errorTitle}
        onClose={handleCloseErrMessage}
      />
      <div className="card-content-div">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/*cards !== undefined &&
            localCardList !== undefined &&
            cards.customer_cards?.length === 0 &&(
              <div className="card_content_title">
                <span>
                  کارتهای بانکی خود را جهت خرید از اصناف عضو داپ‌اَپ در این قسمت
                  ثبت نمایید.
                </span>
              </div>
            )*/}
          {cards?.customer_cards?.length > 0 ? (
            cards.customer_cards.map((card) => (
              <Card
                cardImg={card.bank_logo}
                backImg={card.bank_background_path}
                cardName={card.bank_name}
                cardNumber={card.card_number}
                cardId={card.id}
                key={card.id}
                verified={card.status}
                flag={true}
                state={card.state}
                enableTimer={card.enableTimer}
                createdAt={card.created_at}
              />
            ))
          ) : localCardList?.customer_cards?.length > 0 ? (
            localCardList.customer_cards.map((card) => (
              <Card
                cardImg={card.bank_logo}
                backImg={card.bank_background_path}
                cardName={card.bank_name}
                cardNumber={card.card_number}
                cardId={card.id}
                key={card.id}
                verified={card.status}
                flag={true}
                state={card.state}
                enableTimer={card.enableTimer}
              />
            ))
          ) : (
            <div className="card_content_title">
              <span>
                کارتهای بانکی خود را جهت خرید از اصناف عضو داپ‌اَپ در این قسمت
                ثبت نمایید.
              </span>
            </div>
          )}
          <div className="add_card" onClick={() => handleGoToAddCard()}>
            <img src="assets/images/plus.svg" alt="" />
            <span className="add_card_title">اضافه کردن کارت جدید</span>
          </div>
          {/*showWarningTxt && (
          <div className='warning-txt'>
          <img src="assets/images/close-black.svg" className='close-btn' alt="" onClick={()=>setShowWarningTxt(false)}/>
            <span>
              برای اطمینان از این که پاداش نقدی خرید شما فقط به حساب خودتان
              واریز می‏‏شود، پس از ثبت کارت بانکی فقط یکبار برای همیشه بر روی
              دکمه تایید مالکیت کلیک نمایید تا صحت سنجی کارت بانکی شما محرز
              گردد. شما می توانید قبل از تایید مالکیت کارت های بانکی ثبت شده
              خود، از اصناف عضو داپ‌اَپ خرید کرده و پاداش نقدی در کیف پول خود
              دریافت نمایید. اما لازم است در زمان اولین درخواست برای برداشت
              پاداش های نقدی کیف پول خود تایید مالکیت را برای کارت های بانکی
              ثبت شده انجام دهید.
            </span>
          </div>
        )*/}
        </div>
      </div>
    </>
  );
}

export default CardsList;
