import React from "react";
import { Alert } from "antd";
import Error from "../assets/images/500InternalServerError.jpg";

const Error500 = () => {
  return (
    <>
    
      <Alert
        message={<img src={Error}  alt="Error" style={{width:"770px"}}   />}
        className="custom500Error"
        description={
          <>
            <p>
              خطایی در سمت سرور رخ داده است. لطفا با پشتیبانی تماس حاصل نمایید
            </p>
            <p>از صبر و شکیبای شما سپاسگزاریم</p>
            <p>صفحه را مجدد بارگذاری نمایید</p>
          </>
        }
        type="error"
        showIcon
      />
    </>
  );
};

export default Error500;
