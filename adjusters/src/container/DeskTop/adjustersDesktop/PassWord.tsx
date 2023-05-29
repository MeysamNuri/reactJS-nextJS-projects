import React, { useState } from "react";
import { Form, Input, Button, Row } from "antd";
import { apiLogin } from "../../../httpServices/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 13 },
};

//const encUserId: string = localStorage.getItem('userId') ?? '';

const onFinishFailed = (errorInfo: any) => {
 // console.log("Failed:", errorInfo);
};

const ChangePassword = (props: any) => {
  const [Repeatpassword, setRepeatpassword] = useState("");
  const [oldPassword] = useState("");
  const [newPassword] = useState("");

  const repeatPasswordHandler = (e: any) => {
    setRepeatpassword(e.target.value);
  };

  const onFinish = (values: any) => {
   // console.log("SuccessPass:", values);
    const encUserId = localStorage.getItem("userId");
    let passwordObject = {
      encUserId: encUserId,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    apiLogin
      .put("/User/ChangePassword", passwordObject)
      .then((response: any) => {
        if (response.data.IsSucceed) {
          toast.success("رمز عبور با موفقیت تغییر داده شد.");
          setTimeout(() => {
            props.onCloseModal();
          }, 3000);
        } else {
          switch (response.data.Message) {
            case "24": {
              toast.error("شما به این بخش دسترسی ندارید");
              break;
            }
            case "25": {
              toast.error("رمز عبور فعلی اشتباه است");
            }
          }
        }
      });
  };

  return (
    <React.Fragment>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="oldPassword"
          label="رمز عبور قبلی"
          rules={[
            {
              required: true,
              message: "لطفا رمز عبور را وارد نمایید",
            },
          ]}
        >
          <Input.Password name="password" value={oldPassword} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="رمز عبور جدید"
          rules={[
            {
              required: true,
              message: "لطفا رمز عبور جدید را وارد نمایید",
            },
            {
              min: 3,
              message: "رمز عبور باید حداقل 3 کاراکتر باشد",
            },
          ]}
        >
          <Input.Password name="password" value={newPassword} />
        </Form.Item>

        <Form.Item
          name="repeatPassword"
          label="تکرار رمز عبور جدید"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "لطفا رمز عبور را تایید کنید!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "رمز عبور جدید با تکرار رمز عبور جدید باید یکسان باشند"
                );
              },
            }),
          ]}
        >
          <Input.Password
            value={Repeatpassword}
            onChange={repeatPasswordHandler}
          />
        </Form.Item>
        <Row style={{ flexFlow: "row-reverse" }}>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Row>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default ChangePassword;
