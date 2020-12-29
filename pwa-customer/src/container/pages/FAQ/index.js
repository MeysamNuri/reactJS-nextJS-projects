import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./FAQ.less";
import Header from "../../components/header/Header";

const containerStyle = {
  height: "100vh",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
}

function FAQ() {

  // useEffect(() => {
  //   window.scrollTo(0, '10vh');
  // }, []);

  return (
    <div className="gray-bg" style={containerStyle} >
      <Header
        title="پرسش ‏های پر تکرار "
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={"main"}
      />
      <div className="faq-content">
        <div>
          <p>دنبال چه چیزی میگردید میتوانید از موارد زیر پیدا کنید</p>
        </div>
        <div className="linktoform">
          <p>چیزی پیدا نکردید؟</p>
          <Link to="/form">
            پیام بفرستید
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
