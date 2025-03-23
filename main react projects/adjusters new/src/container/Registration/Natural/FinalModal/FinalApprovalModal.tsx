//libraries
import React, { FC } from "react";
import { CheckCircleTwoTone, } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//styles
import classes from "./FinalApprovalModal.module.css";

interface IFinalApprovalModal {
  regCode: string;
}

const FinalApprovalModal: FC<IFinalApprovalModal> = ({ regCode }) => {
  let history = useHistory();

  const isUserEdit = localStorage.getItem("userEdit");
  // const referStatus = useSelector(
  //   (state: any) => state?.sendReferNatural?.refer?.IsSucceed
  // );

  const goHome = () => {
    history.push("/adjuster-registration");
  };

  return (
    <div className={classes.modalContainer}>
      <div>
        {isUserEdit && (
          <p>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            پرونده شما با موفقیت به کارشناس مرجوع شد
          </p>
        )}
        {!isUserEdit && "ثبت نام موفق با شماره پیگیری:"} {regCode}
      </div>
      <div>
        <Button type="primary" onClick={goHome} block>
          بازگشت به خانه
        </Button>
      </div>
    </div>
  );
};

export default FinalApprovalModal;
