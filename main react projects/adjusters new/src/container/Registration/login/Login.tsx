import React, { useState, useEffect } from "react";
import { Form, Input, Button, ConfigProvider, Modal } from "antd";
import enUS from "antd/lib/locale/en_US";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ForgetTrackingCode from "./ForgetTrackingCode";
import Registration from "./Registration";
import LastStatus from "./LastStatus";
import {Redirect } from "react-router-dom";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import {
  userEdit,
  postNatAndRegCodesForApplicantEdit,
  isLoggedInOrInquired,
  getCaptcha,
  getApplicantLastStatusInAllStates,
} from "../../../redux/actions";
import styles from "./Registration.module.css";
import IconLogo from "../../../assets/images/mainLogo.png";
import { SyncOutlined } from "@ant-design/icons";
import {toast} from 'react-toastify'

const AdjusterLogin = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let history = useHistory();
  const [visibleForget, setVisibleForget] = useState(false);
  const [visibleRegisteration, setVisibleRegisteration] = useState(false);
  const loginLoading = useSelector(
    (state: any) => state?.getCourseType.loading
  );
  const [nationalCode, setNationalCode] = useState();
  const [registrationCode, setRegistrationCode] = useState();
  const [captchaCode, setCaptchaCode] = useState("");
  const [visibleStatus, setVisibleStatus] = useState(false);

  const sendNatAndRegCodesLoading = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.loading
  );

  const onFinish = (values: any) => {
    let natAndRegCodes = {
      nationalCode: values?.nationalCode,
      registrationCode: values?.registrationCode,
      signature: captchaImageData?.Signature,
      captchaCode: values?.captchaCode?.toUpperCase(),
    };

    dispatch(userEdit(true));
    localStorage.setItem("userEdit", "1");

    dispatch(isLoggedInOrInquired(true));

    dispatch( 
      postNatAndRegCodesForApplicantEdit(
        natAndRegCodes,
        (CourseTypeId: number) => {
          dispatch(isLoggedInOrInquired(true));
          switch (CourseTypeId) {
            case adjusterType.natural:
              history.push("/natural");
              break;

            case adjusterType.legal:
              history.push("/legal");
              break;

            case adjusterType.judical:
              history.push("/judical");
              break;
          }
        }
      )
    );
  };

  const onFinishFailed = (errorInfo: any) => {

  };
  const forgetPassword = () => {
    setVisibleForget(true);
  };

  const registrationHandler = () => {
    dispatch(isLoggedInOrInquired(true));
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

  const onCaptchaChangeHandler = (e: any) => {
    setCaptchaCode(e.target.value);
  };
  const onRegistrationCodeChangeHandler = (e: any) => {
    setRegistrationCode(e.target.value);
  };
  const onNationalCodeChangeHandler = (e: any) => {
    setNationalCode(e.target.value);
  };

  const checkLastStatusHandler = () => {
    let dataToPost = {
      nationalCode: nationalCode,
      registrationCode: registrationCode,
      signature: captchaImageData?.Signature,
      captchaCode: captchaCode?.toUpperCase(),
    };
    if (
      registrationCode === undefined ||
      nationalCode === undefined ||
      captchaCode === undefined
    ) {
      if (registrationCode === undefined) {
        window.alert("کد رهگیری نمیتواند خالی باشد");
      } else if (nationalCode === undefined) {
        window.alert("کد ملی نمیتواند خالی باشد");
      } else if (captchaCode === undefined) {
        window.alert("کد امنیتی نمیتواند خالی باشد");
      }
    } else if (
      registrationCode !== undefined &&
      nationalCode !== undefined &&
      captchaCode !== undefined
    ) {
      dispatch(
        getApplicantLastStatusInAllStates(dataToPost, () => {
          setVisibleStatus(true);
        })
      );
    }
  };

  // const downloadAdjusterGuideFileHandler = () => {};

  useEffect(() => {
    dispatch(isLoggedInOrInquired(false));
    dispatch(getCaptcha());
    let getCaptchaTimer = setInterval(() => dispatch(getCaptcha()), 90000);
    return () => {
      clearTimeout(getCaptchaTimer);
    };
  }, []);

  return (
    <div>
    <div className={styles.wrapperLogin}>
   
      <ConfigProvider direction="rtl">
        <div className={styles.wrapperForm}>
          <Form
            name="adjuesterLogin"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles.login}
          >
            <div className={styles.wrapperLogo}>
              <img
                src={IconLogo}
                alt="لوگو بیمه مرکزی جمهوری اسلامی ایران"
                className={styles.logo}
              />
            </div>

            <Form.Item
              label="کدملی"
              name="nationalCode"
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: "وارد کردن کد ملی الزامی است",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "کدملی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input onChange={onNationalCodeChangeHandler} />
            </Form.Item>

            <Form.Item
              label="کد رهگیری"
              name="registrationCode"
              labelCol={{ span: 4 }}
              rules={[
                
                { required: true, message: "وارد کردن کد رهگیری ضروری است"},
              ]}
            >
              <Input onChange={onRegistrationCodeChangeHandler} />
            </Form.Item>

            <Form.Item
              label="کد امنیتی"
              name="captchaCode"
              labelCol={{ span: 4 }}
              rules={[
                { required: true, message: "وارد کردن کد امنیتی ضروری است" },
              ]}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <ConfigProvider locale={enUS}>
                  <Input
                    placeholder="کد امنیتی را وارد کنید"
                    onChange={onCaptchaChangeHandler}
                  />
                </ConfigProvider>
                <img
                  width={120}
                  height={40}
                  src={"data:image/png;base64," + captchaImageData?.Base64Image}
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

            <br />
            <Form.Item
              labelCol={{ span: 4 }}
              // wrapperCol={{ offset: 8, span: 16 }}
            >
              <Button
                type="text"
                onClick={forgetPassword}
                danger
                style={{ cursor: "pointer" }}
              >
                فراموشی کد رهگیری
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" block onClick={checkLastStatusHandler}>
                آخرین وضعیت
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loginLoading || sendNatAndRegCodesLoading}
              >
                ورود
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/registration">
                <Button type="primary" block onClick={registrationHandler}>
                  ثبت نام
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <Link to="/">
                <Button type="primary" block>
               ورود به میز کار ارزیابان موجود
                </Button>
              </Link>
              
            </Form.Item>
            {/* <Form.Item>
            <a  href="https://sanhabssoi.centinsur.ir/account/login">
                <Button type="primary" block>
               ورود به میز کار ارزیابان حقوقی 
                </Button>
              </a>
              </Form.Item> */}
            {/* <Button onClick={downloadAdjusterGuideFileHandler}>
              دانلود فایل راهنما
            </Button> */}
          </Form>
        </div>
        
        <Modal
          title="آخرین وضعیت شما :"
          visible={visibleStatus}
          footer={null}
          onOk={() => setVisibleStatus(false)}
          onCancel={() => setVisibleStatus(false)}
          width={500}
          destroyOnClose={true}
        >
          <LastStatus />
        </Modal>

        <Modal
          title="فراموشی کد رهگیری"
          visible={visibleForget}
          footer={null}
          onOk={() => setVisibleForget(false)}
          onCancel={() => setVisibleForget(false)}
          width={500}
          destroyOnClose={true}
        >
          <ForgetTrackingCode closeModal={() => setVisibleForget(false)} />
        </Modal>
        <Modal
          title="ثبت نام"
          visible={visibleRegisteration}
          footer={null}
          onOk={() => setVisibleRegisteration(false)}
          onCancel={() => setVisibleRegisteration(false)}
          width={500}
          destroyOnClose={true}
        >
          {visibleRegisteration && (
            <Registration closeModal={() => setVisibleRegisteration(false)} />
          )}
        </Modal>
      </ConfigProvider>
    </div>
    </div>
  );
};

export default AdjusterLogin;
