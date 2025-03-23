import React, { useState, FC, useEffect } from "react";
import { Input, Button, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

//components
import VerificationCode from "./VerificationCode";
import AdjusterRegister from "./AdjusterRegister";
import InitialObligation from "./InitialObligation";
import AdjusterLogin from "./Login";
//redux actions
import { checkPhoneNumber, getCaptcha, smartWindowLogin } from "../../../redux/actions";

//styles
import styles from "./Registration.module.css";
import IconLogo from "../../../assets/images/mainLogo.png";
import { SyncOutlined } from "@ant-design/icons";
import clasess from "./Registration.module.css";

export interface IRegistrationProps {
  closeModal: () => void;
}

const Registration: FC<IRegistrationProps> = ({ closeModal }) => {
  const [otpForm, setOtpForm] = useState(0);
  const loading = useSelector((state: any) => state.checkPhoneNumber.loading);
  const [minuts, setMinuts] = useState<any>(1);
  const [seconds, setSeconds] = useState<any>(59);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  let url_string = window.location.href; //window.location.href
  let url = new URL(url_string);
  let token: any = url.searchParams.get("token")
  let personMoblile: any = url.searchParams.get("mobile")

  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    let postData = {
      mobile: values?.mobile,
      signature: captchaImageData?.Signature,
      captchaCode: values?.captchaCode.toUpperCase(),
    };
    dispatch(checkPhoneNumber(postData, () => setOtpForm(1)));
  };

  const handleOtp = () => {
    setOtpForm(2);
  };

  const handleOtpFromInitialObligaiton = () => {
    if (token && personMoblile) {
      let requestBody = {
        token: token, 
        mobile: personMoblile
      }
      dispatch(smartWindowLogin(requestBody,()=>handleOtp()))
    }
    else{
      setOtpForm(3);
    }
 
  };

  const captchaImageData = useSelector(
    (state: any) => state?.captchaImage?.captchaData?.Result
  );

  const captchaImageDataLoading = useSelector(
    (state: any) => state?.captchaImage?.loading
  );
  const renewCaptchaHandler = () => {
    dispatch(getCaptcha());
  };

  useEffect(() => {
    if (otpForm === 1) {
      let myInterval = setInterval(() => {
        if (seconds >= 0) {
          setSeconds(seconds - 1);
          if (seconds === 0 && minuts !== 0) {
            setMinuts(minuts - 1);
            setSeconds(59);
          } else if (seconds === 0 && minuts === 0) {
            setOtpForm(0);
            setOtpForm(4);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  useEffect(() => {
    dispatch(getCaptcha());
    let getCaptchaTimer = setInterval(() => dispatch(getCaptcha()), 90000);
    return () => {
      clearTimeout(getCaptchaTimer);
    };
  }, []);

  return (
    <div className={clasess.wrapperLogin}>
      {otpForm === 0 ? (
        <div style={{ backgroundColor: "#ffffff" }}>
          <div className={styles.wrapperLogo}>
            <img
              src={IconLogo}
              alt="لوگو بیمه مرکزی جمهوری اسلامی ایران"
              className={styles.logo}
            />
            <InitialObligation
              handleOtpFromInitialObligaiton={handleOtpFromInitialObligaiton}
            />
          </div>
        </div>
      ) : (
          <div className={styles.container}>
            <div className={styles.wrapperLogo}>
              <img
                src={IconLogo}
                alt="لوگو بیمه مرکزی جمهوری اسلامی ایران"
                className={styles.logo}
              />
            </div>
            {otpForm === 1 ? (
              <VerificationCode
                closeModal={closeModal}
                minuts={minuts}
                seconds={seconds}
                handleOtp={handleOtp}
              />
            ) : otpForm === 0 ? (
              <InitialObligation
                handleOtpFromInitialObligaiton={handleOtpFromInitialObligaiton}
              />
            ) : otpForm === 3 ? (
              <div>
                <Form onFinish={onFinish}>
                  <Form.Item
                    name="mobile"
                    label="شماره موبایل"
                    rules={[
                      {
                        required: true,
                        message: "وارد کردن شماره موبایل الزامی است",
                      },
                      {
                        pattern: /^\d{11}$/,
                        message: " شماره موبایل وارد شده صحیح نمی باشد.",
                      },
                    ]}
                    labelCol={{ span: 4 }}
                    className={styles.formItem}
                  >
                    <Input
                      // name="mobileNumber"
                      placeholder="09126668777"
                      maxLength={11}
                    />
                  </Form.Item>

                  <Form.Item
                    label="کد امنیتی"
                    name="captchaCode"
                    labelCol={{ span: 4 }}
                    rules={[
                      {
                        required: true,
                        message: "وارد کردن کد امنیتی ضروری است",
                      },
                    ]}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Input
                        placeholder="کد امنیتی را وارد کنید"
                        className={styles.formInputNatCode}
                      />
                      <img
                        width={120}
                        height={40}
                        src={
                          "data:image/png;base64," + captchaImageData?.Base64Image
                        }
                        style={{
                          border: "1px solid #cccccc",
                        }}
                      />
                      <Button
                        onClick={renewCaptchaHandler}
                        loading={captchaImageDataLoading}
                        style={{ height: "40px" }}
                      >
                        <SyncOutlined style={{ fontSize: "25px" }} />
                      </Button>
                    </div>
                  </Form.Item>

                  <div className="buttonRight">
                    <Button
                      type="primary"
                      htmlType="submit"
                      //block
                      loading={loading}
                    >
                      ارسال
                  </Button>
                  </div>
                </Form>
              </div>
            ) : otpForm === 2 ? (
              <AdjusterRegister
                // isModalVisible={isModalVisible}
                personMoblile={personMoblile}
                closeModal={closeModal}
              />
            ) : otpForm === 4 ? (
              <Redirect to="/adjuster-registration" />
            ) : null}
          </div>
        )}
    </div>
  );
};

export default Registration;
