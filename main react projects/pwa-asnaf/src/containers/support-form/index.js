import React from "react"
import ContactForm from "../../components/Contact-form"
import Header from "../../components/Header"
import './support.less'
const SupportForm=(props)=>{

    return(
        <>
  <div className="gray-bg" style={{ height: "100vh", position: "relative" }}>
  <Header
        title="پشتیبانی"
        leftIcon="assets/images/arrow-w-rotate.svg"
        back="main"
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
        </>
    )
}
export default SupportForm