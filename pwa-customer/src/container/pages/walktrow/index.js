import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import "./style.less";
import { Link, useHistory } from "react-router-dom";
import store from "store-js";

const data = [
  {
    img: "assets/images/walk1.png",
    title: "داپ‌اَپ",
    txt: "خرید فردا با پاداش نقدی امروز",
  },
  {
    img: "assets/images/walk2.png",
    title: "کارت خود را وارد کنید",
    txt: "با ثبت کارت بانکی و خرید از فروشگاه های داپ اَپی از همین امروز پاداش نقدی بگیر",
  },
  {
    img: "assets/images/walk3.png",
    title: "دریافت جایزه نقدی خرید",
    txt:
      "روزانه تا 14 درصد از مبلغ هر خرید را به صورت نقدی دریافت کنید",
  },
  {
    img: "assets/images/walk4.png",
    title: "برداشت از کیف پول",
    txt: "پاداش نقدی روزانه را از کیف پول اپلیکیشن به حساب بانکی انتقال دهید",
  },
];

const Pagination = () => {
  const [swiper, setSwiper] = useState(null);
  const [currentIndex, updateCurrentIndex] = useState(0);
  const history = useHistory();
  const params = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: true,
  };
  // useEffect(() => {
  //   window.scrollTo(0, '10vh');
  // }, []);
  useEffect(() => {
    if (swiper !== null) {
      swiper.on("slideChange", () => updateCurrentIndex(swiper.realIndex));
    }

    return () => {
      if (swiper !== null) {
        swiper.off("slideChange", () => updateCurrentIndex(swiper.realIndex));
      }
    };
  }, [swiper]);

  const handleBtnClick = () => {
    store.set("user_step", { WalktrowPass: true });
    history.push("walktrow-video");
  };

  return (
    <div className="swiper-div">
      <Link
        style={{
          zIndex: "1000",
          display: currentIndex === 3 ? "none" : "block",
        }}
        onClick={handleBtnClick}
      >
        رد کردن
      </Link>
      <Swiper {...params} getSwiper={setSwiper}>
        {data.map((item, index) => (
          <div key={index}>
            <img src={item.img} alt="" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.txt}</p>
            </div>
          </div>
        ))}
      </Swiper>
      <button
        className="big-btn"
        style={{ width: "40%", display: currentIndex === 3 ? "block" : "none" }}
        onClick={handleBtnClick}
      >
        شروع
      </button>
    </div>
  );
};

function Walktrow() {
  return <Pagination />;
}

export default Walktrow;
