import React, { useState, FC } from "react";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { forgetRegistrationCode } from "../../../redux/actions";

interface IForgetTrackingCodeProps {
  closeModal: () => void;
}

const ForgetTrackingCode: FC<IForgetTrackingCodeProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [valMobile, setValMobile] = useState("");
  // const forgetingPassWord = useSelector(
  //   (state: any) => state.checkPhoneNumber.forgetPassWord
  // );
  const forgetingPassWordLoading = useSelector(
    (state: any) => state.checkPhoneNumber.loadingForget
  );

  let mobilePhone = {
    mobile: valMobile,
  };
  const confirmMobileHandler = () => {
    setVisible(true);
    dispatch(forgetRegistrationCode(mobilePhone, () => closeModal()));
  };
  return (
    <div>
      <p>جهت دریافت کد رهگیری مجدد شماره همراه خود را وارد نمایید </p>
      <Input
        value={valMobile}
        onChange={(e) => setValMobile(e.target.value)}
        maxLength={11}
        placeholder="09"
      />
      <div className="buttonRight">
        <Button
          type="primary"
          onClick={confirmMobileHandler}
          loading={forgetingPassWordLoading}
        >
          ارسال
        </Button>
      </div>
    </div>
  );
};

export default ForgetTrackingCode;
