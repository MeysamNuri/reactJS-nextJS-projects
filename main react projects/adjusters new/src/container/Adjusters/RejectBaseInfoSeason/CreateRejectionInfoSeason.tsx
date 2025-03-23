import React, { useEffect, FC } from "react";
import { Form, Button, Input } from "antd";
import {
  useCreateRejectionSeason,
  useUpdateRejectionInfoSeason,
} from "../AdjustersHook";

interface selectedSeasonProps {
  id: number;
  title: string;
}

interface IRejectionseasonProps {
  closeModal: () => void;
  addForm: boolean;
  selectedSeason: selectedSeasonProps | null;
}
const { TextArea } = Input;
const CreateRejectionInfoSeason: FC<IRejectionseasonProps> = ({
  closeModal,
  addForm,
  selectedSeason,
}) => {
  const [form] = Form.useForm();
  const [
    insertRejection,
    { status},
  ] = useCreateRejectionSeason();

  

  const [
    updateRejection,
    { status: statusReject },
  ] = useUpdateRejectionInfoSeason();

  let seasonId = selectedSeason?.id;

  //submitForm
  const onFinish = (values: any) => {
    let insertRejectionSeason = {
      title: values.title,
    };
    if (addForm) {
      insertRejection(insertRejectionSeason);
    } else {
      updateRejection({ seasonId, ...insertRejectionSeason });
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
          title: selectedSeason?.title,
        });
  }, [selectedSeason, addForm]);

  return (
    <div >
      <Form name="createSpecialzedField" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="دلیل رد متقاضی" labelCol={{ span: 6 }}>
          <TextArea
            rows={4}
            placeholder="توضیحات خود را اینجا میتوانید بنویسید"
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

export default CreateRejectionInfoSeason;
