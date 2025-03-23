import React, { useState, FC } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addRequestTypes } from "../../../../redux/actions";
import { IAddRequstType } from "../../../../shared/ulitities/Model/desktop/request";

interface IFinalApprovalProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const { TextArea } = Input;

const FinalApproval: FC<IFinalApprovalProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const description = useSelector(
    (state: any) => state.request.valueDescription
  );
  // const [des, setDesk] = useState("")
  const requestTypeId = useSelector(
    (state: any) => state.request.valueRequests
  );
  const userIdLogin = useSelector(
    (state: any) => state.userLogin.userLogin?.Result
  );
  const listFiles = useSelector((state: any) => state.documentList.listFiles);
  // const userLoginId = useSelector(
  //   (state: any) => state.userLogin.userLogin?.Result.ApplicantId
  // );

  let upload = {
    applicantId: userIdLogin.ApplicantId,
    requestTypeId: requestTypeId,
    files: listFiles,
    Description:description
  };

  // let description={
  //   applicantId: userLoginId,
  //   requestTypeId: requestTypeId,
  //   description: des
  // }
  const prevHandler = () => {
    onPrev();
  };
  // const submitHandler = () => {
  //   dispatch(addRequestTypes(description))
  // };
  // const sendHandler = () => {
  //   console.log("send");
  // };
  const finalHandler = () => {
   
   
  };

  return (
    <div>
      finalApproval
      {/* <label>توضیحات</label>
      <TextArea rows={4} onChange={(e)=>setDesk(e.target.value)} />
      <div className="nextButton">
        {requestTypeId === 1 ? null : (
          <Button onClick={prevHandler}>مرحله قبلی</Button>
        )}
        <Button type="primary" onClick={submitHandler}>
          ذخیره
        </Button>
        <Button type="primary" onClick={sendHandler}>
          ارسال
        </Button>
      </div> */}
      <div className="nextButton">
        <Button type="primary" onClick={prevHandler}>
          مرحله قبلی
        </Button>
        <Button type="primary" onClick={finalHandler}>
          تایید نهایی
        </Button>
      </div>
    </div>
  );
};

export default FinalApproval;
