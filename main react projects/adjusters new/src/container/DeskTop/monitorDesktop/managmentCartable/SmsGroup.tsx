import React, { useState, FC } from "react";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { supervisionSmsBatchSendAction, smsBatchsendReportAction } from "../../../../redux/actions";
import { toast } from 'react-toastify'
const { TextArea } = Input;

interface ISmsProps {
  activeTabManagment: string;
  dataManagment: any;
  closeModal: any;
  dataSeletManagment: any;
  isFromNaturalDocuments?: boolean
}
const SmsGroup: FC<ISmsProps> = ({
  activeTabManagment,
  closeModal,
  dataSeletManagment,
  isFromNaturalDocuments
}) => {
  const dispach = useDispatch();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState(""); 
  const { loadingSupervisionSmsBatch } = useSelector(
    (state: any) => state.smsBatchSend
  );

  let findUndefind = dataSeletManagment?.some(
    (item: any) => item.value === undefined
  );

  let smsBatch = {
    sbject: subject,
    body: body,
    adjusterTypeId: activeTabManagment==='4'?'13':activeTabManagment,
    filters: findUndefind ? [] : dataSeletManagment,
  };

  const submitSmsHandler = () => {
    if (findUndefind) return toast.warning("لطفا مخاطب را انتخاب کنید")
    if (body === "") return toast.warning(" لطفا متن پیام را بنویسید")
    if (isFromNaturalDocuments) {
      dispach(
        smsBatchsendReportAction(
          smsBatch,
          () => closeModal(),
          () => setSubject(""),
          () => setBody("")
        )
      );
    } else {
      dispach(
        supervisionSmsBatchSendAction(
          smsBatch,
          () => closeModal(),
          () => setSubject(""),
          () => setBody("")
        )
      );
    }



  };

  return (
    <div>
      <TextArea
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        autoSize
        placeholder="عنوان پیام"
      />
      <TextArea
        placeholder="متن پیام خود را اینجا بنویسید"
        autoSize
        style={{ marginTop: "20px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      //allowClear
      />
      <div className="rightButton">
        <Button
          type="primary"
          onClick={submitSmsHandler}
          loading={loadingSupervisionSmsBatch}
        >
          ارسال
        </Button>
      </div>
    </div>
  );
};

export default SmsGroup;
