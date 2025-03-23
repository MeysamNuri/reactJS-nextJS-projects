import React, { useEffect, FC } from "react";
import { Form, Button, Input } from "antd";
import {
  useChangeStatusReason,
  useUpdateChangeStatusReason,
} from "../AdjustersHook";

interface selectedReasonProps {
  id: number;
  Title: string;
}

interface IRejectionseasonProps {
  closeModal: () => void;
  addForm: boolean;
  selectedReason: selectedReasonProps | null;
}
const { TextArea } = Input;
const CreateChangeStatusReason: FC<IRejectionseasonProps> = ({
  closeModal,
  addForm,
  selectedReason,
}) => {
  const [form] = Form.useForm();
  const [
    changeStatusReason,
    { status},
  ] = useChangeStatusReason();


  const [
    updateRejection,
    { status: statusReject },
  ] = useUpdateChangeStatusReason();

  let seasonId = selectedReason?.id;

  //submit Form
  const onFinish = (values: any) => {
    let insertChangeStatusReason = {
      title: values.title,
    };
    let updateChangeStatusReason = {
      title: values.title,
      id:selectedReason?.id
    };
    if (addForm) {
      changeStatusReason(insertChangeStatusReason);
    } else {
      updateRejection({ seasonId, ...updateChangeStatusReason });
    }
  };

  //handle Close Modal
  useEffect(() => {
    if (status === "success" || statusReject === "success") {
      form.resetFields();
      closeModal();
    }
  }, [status, statusReject]);

  //initial Value Item Season
  useEffect(() => {
    addForm
      ? form.resetFields()
      : form.setFieldsValue({
          title: selectedReason?.Title,
        });
  }, [selectedReason, addForm]);

  return (
    <div className="CreateRejectionInfoSeason">
      <Form name="createChangeStausReason" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="دلیل تغییر وضعیت" labelCol={{ span: 7 }}>
          <TextArea
            rows={4}
            placeholder="دلیل تغییر وضعیت خود را اینجا می توانید بنویسید"
          />
        </Form.Item>
        <div className="submit">
          <Button
            type="primary"
            htmlType="submit"
            loading={status === "loading" ? true : false}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateChangeStatusReason;
