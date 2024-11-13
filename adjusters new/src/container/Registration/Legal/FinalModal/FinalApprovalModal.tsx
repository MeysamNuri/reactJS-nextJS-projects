//libraries
import React, { FC, useEffect, useState } from "react";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//styles
import classes from "./FinalApproval.module.css";

interface IFinalApprovalModal {
  regCode: string;
}

const FinalApprovalModal: FC<IFinalApprovalModal> = ({ regCode }) => {
  let history = useHistory();

  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const referStatus = useSelector(
    (state: any) => state?.sendReferLegal?.refer?.IsSucceed
  );

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
