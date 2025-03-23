import React, { useState, FC } from "react";
import { Button, Input, Form } from "antd";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { messageSuccess, messageError } from "../../../utils/utils";
import { api } from "../../../httpServices/service";
import { smsType } from "../../../shared/ulitities/Enums/sms";

const { TextArea } = Input;

interface ISMSProps {
  oneAdjusterList: IAneAdjusterList;
  closeModal:()=>void
}

const SendSmsPanel: FC<ISMSProps> = ({ oneAdjusterList ,closeModal}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    let smsBody = {
      mobile: oneAdjusterList.Mobile,
      body: values.body,
      applicantId: oneAdjusterList.ApplicantId,
      senderId: 0,
      reciver: "",
      smsTypeEnum: smsType.Individual,
      subject:values.subject,
    };

    setLoading(true);
    api.post("sms/send", smsBody)
      .then((res: any) => {
        setLoading(false);
        form.resetFields();
        if (res.data.IsSucceed === true) {
          messageSuccess("پیامک به درستی ارسال گردید");
          closeModal()
        }else{
          messageError("خطا در ارسال پیامک ");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        messageError("خطا در ارسال پیامک ");
      });
  };

  return (
    <Form name="smsPanel" onFinish={onFinish}>
      <Form.Item name="mobile" label="شماره تلفن همراه" >
        {oneAdjusterList.Mobile}
      </Form.Item>
      <Form.Item
        name="subject"
        label="عنوان"
        rules={[
          {
            required: true,
            message: "لطفا عنوان مورد نظر را بیان نمایید",
          },
        ]}
      
      >
        <TextArea autoSize />
      </Form.Item>

      <Form.Item
        name="body"
        label="پیام"
        rules={[
          {
            required: true,
            message: "لطفا پیام مورد نظر خود را وارد نمایید",
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <div className="submit">
        <Button type="primary" htmlType="submit" loading={loading}>
          ارسال
        </Button>
      </div>
    </Form>
  );
};

export default SendSmsPanel;
