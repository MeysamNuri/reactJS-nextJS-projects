import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import FAQExpandPanel from "../../components/FAQ-expand-panel";
import "./question.less";

export default function Question() {
  const history = useHistory();

  const handleLeftClick = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: "#f6f9fc",
      }}
    >
      <Header
        title="پرسشهای پر تکرار"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={null}
        handleLeftClick={(e) => handleLeftClick(e)}
      />
      <div className="panels">
        <div className="title_question">
          <span>پرسشهای پر تکرار</span>
        </div>
        <FAQExpandPanel />
      </div>
      <div className="goto-form" onClick={() => history.push("form")}>
        <p>آیا نمی توانید آنچه را که نیاز دارید پیدا کنید؟</p>
        <button className="goto-form-btn">برای ما پیام بفرستید</button>
      </div>
    </div>
  );
}
