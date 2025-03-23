import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import ContactForm from "../../components/contact-form";
import "./form.less";

function Form() {

  // useEffect(() => {
  //   window.scrollTo(0, "10vh");
  // }, []);

  return (
    <div className="gray-bg" style={{ height: "100vh", position: "relative" }}>
      <Header
        title="راهنما و پشتیبانی"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back={"faq"}
      />
      <div className="form-content">
        <div style={{ width: "87%", margin: "0 auto" }}>
          <span style={{ marginRight: "10px" }}>فرم تماس با ما</span>
          <p>
            پیام خود را برای ما ارسال فرمایید. تیم پشتیبانی ما با شما تماس
            خواهند گرفت.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default Form;
