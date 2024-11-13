import React, { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "antd";
import { registrationHandler } from "../../../redux/actions";
import { ReactComponent as Sms } from "../../../assets/images/sms.svg";
import styles from "./AdjusterRegister.module.css";

export interface IVerificationProps {
  closeModal?: () => void;
  minuts: any;
  seconds: any;
  handleOtp: any;
}

const VerificationCode: FC<IVerificationProps> = ({
  closeModal,
  seconds,
  minuts,
  handleOtp,
}) => {
  const dispatch = useDispatch();
  const [vertificCode, setVertificCode] = useState("");
  const checksMobile = useSelector(
    (state: any) => state.checkPhoneNumber.checkPhoneNumber.Result
  );
  const loadingRegister = useSelector(
    (state: any) => state.checkPhoneNumber.loadingRegister
  );

  let vertiCode = {
    code: vertificCode,
    validateCode: checksMobile?.Item1,
  };

   const vertificateHandler = () => {
    dispatch(registrationHandler(vertiCode, () => handleOtp()));
  }; 

  const HandelInputEnter = (e: any) => {
    if (e.key === "Enter") {
      dispatch(registrationHandler(vertiCode, () => handleOtp()));
    }
  };

  return (
    <>
      <div>
        <div className={styles.wraperSms}>
          <Sms />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
          }}
        >
          <p>
            کد ارسال شده به تلفن همراه {checksMobile?.Item3} خود را وارد نمایید
          </p>
        </div>
        <Input
          value={vertificCode}
          onChange={(e) => setVertificCode(e.target.value)}
          placeholder="کد پیامکی "
          maxLength={6}
          onKeyPress={(e) => HandelInputEnter(e)}
        />
        <h4 style={{ marginTop: "15px", fontSize: "12px", color: "red" }}>
          زمان باقی مانده{" "}
          <span style={{ color: "red" }}>{minuts + ":" + seconds}</span>
        </h4>
        <div className="buttonRight">
          <Button
            type="primary"
            onClick={vertificateHandler}
            loading={loadingRegister}
          >
            ارسال کد
          </Button>
        </div>
      </div>
    </>
  );
};

export default VerificationCode;
