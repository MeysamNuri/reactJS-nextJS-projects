import React, { useState } from "react";
import Loan from "./loan";
import './Loan.css'
function LoanComponents(props) {
  const [items, setItems] = useState({
    description: ` یک سال گذشت و در این مدت مترسک فیلسوف شد. هنگامی که از کنار او
    گذاشتم دیدم دو کلاغ در کلاهش لانه می سازند`,
    description2: "طبق قرارداد ",
    descriptionTitle: "توضیحات",
    buttonText: "درخواست وام",
    BtnStyle: "btn-style",
    waitingTitle: "در انتظار تایید",
    waitingStyle: "waiting-style",
    watingImage: (
      <span>
        <img src={"assets/images/clock.svg"} />
        &nbsp; &nbsp;
      </span>
    ),
    PointImage: (
      <span>
        <img src={"assets/images/trend-down.svg"} /> &nbsp;
      </span>
    ),
    PointText: "برای این سفر ۴۰ امتیاز کم دارید",
    pointStyle: "point-style",
    cancelImage: (
      <span>
        <img src={"assets/images/e-remove.svg"} /> &nbsp;
      </span>
    ),
    cancelText: "درخواست شما لغو شده",
    cancelStyle: "cancel-text",
    resone: "دلیل لغو درخواست",
    resonStyle: "cancel-resone",
  });
  return (
    <>
      <Loan
        description={items.description}
        decriptionTitle={items.descriptionTitle}
        buttonText={items.buttonText}
        buttonStyle={items.BtnStyle}
      />

      <Loan
        description={items.description}
        decriptionTitle={items.descriptionTitle}
        waitingStyle={items.waitingStyle}
        waitinTitle={items.waitingTitle}
        waitingImage={items.watingImage}
      />
      <Loan
        description={items.description}
        decriptionTitle={items.descriptionTitle}
        cancelStyle={items.cancelStyle}
        resoneStyle={items.resonStyle}
        cancelText={items.cancelText}
        resoneText={items.resone}
        cancelImage={items.cancelImage}
      />
      <Loan
        description={items.description2}
        decriptionTitle={items.descriptionTitle}
        pointText={items.PointText}
        pointImage={items.PointImage}
        pointStyle={items.pointStyle}
      />
    </>
  );
}
export default LoanComponents;
