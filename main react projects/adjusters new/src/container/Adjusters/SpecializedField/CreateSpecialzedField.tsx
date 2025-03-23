import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Input,
  Checkbox,
  Switch,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  useGetSpecializedFeild,
  useCreateSpecializedFeild,
  useUpdateSpecialzedFeild,
} from "../AdjustersHook";

const { Option } = Select;

interface specializedField {
  specializedFieldId?: any;
  addForm?: boolean;
  closeModal?: any;
}

const CreateSpecialzedField: React.FC<specializedField> = ({
  specializedFieldId,
  addForm,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const { data: specializedField } = useGetSpecializedFeild();

  const [insertSpecializedFeild, { status }] = useCreateSpecializedFeild();
  const [
    updateSpeciazedFeild,
    { status: statusFeild },
  ] = useUpdateSpecialzedFeild();
  const [isParent, setIsParent] = useState(false);

  let Encid = specializedFieldId?.Result?.Id;

  //submit Form
  const onFinish = (values: any) => {
    let newSpecialzesField = {
      title: values.title,
      parentId: values.parent,
      adjusterType: values.adjusterType,
      code: Number(values.code),
      isActive: values.isActive == undefined ? false : values.isActive,
      // isEnabled: values.switch,
    };
    let updateSpecialzesField = {
      id: Encid,
      title: values.title,
      //parentId: values.parent,
      isEnabled: values.switch,
      adjusterType: values.adjusterType,
      code: Number(values.code),
      isActive: values.isActive,
    };
    if (addForm) {
      insertSpecializedFeild(newSpecialzesField);
      form.resetFields();
    } else {
      updateSpeciazedFeild({ Encid, ...updateSpecialzesField });
    }
  };

  const onCheckboxChange = (e: any) => {
    setIsParent(e.target.checked);
  };

  //handle Close Modal
  useEffect(() => {
    if (status === "success" || statusFeild === "success") {
      form.resetFields();
      closeModal();
      setIsParent(false);
    }
  }, [status, statusFeild]);


  //get value by Id
  useEffect(() => {
    if (addForm) {
      form.resetFields();
      setIsParent(false);
    } else if (!addForm) {
      form.setFieldsValue({
        title: specializedFieldId?.Result?.Title,
        switch: specializedFieldId?.Result?.IsEnable,
        parent: specializedFieldId?.Result?.Parent?.Title,
        adjusterType: specializedFieldId?.Result?.AdjusterType,
        code: specializedFieldId?.Result?.Code,
        isActive: specializedFieldId?.Result?.IsActive,
        isParent:
          specializedFieldId?.Result?.Parent === null
            ? setIsParent(false)
            : setIsParent(true),
      });
    }
  }, [specializedFieldId, addForm]);

  return (
    <div className="CreateSpecialzedField">
      <Form name="createSpecialzedField" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="نام رشته تخصصی">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="کدرشته تخصصی">
          <Input  maxLength={2} />
        </Form.Item>
        <Form.Item label="فعال" valuePropName="checked" name="isActive">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>

        <Row>
          <Col span={10}>
            <Form.Item name="isParent">
              <Checkbox
                checked={isParent}
                onChange={onCheckboxChange}
                style={{ lineHeight: "32px" }}
                disabled={addForm === false ? true : false}
              >
                زیرمجموعه
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name="parent" label="رشته اصلی">
              <Select
                placeholder="رشته اصلی"
                disabled={!isParent || addForm === false ? true : false}
              >
                {specializedField?.Result?.map(
                  ({ Title, Id }: { Title: string; Id: number }) => {
                    return (
                      <Option key={Id} value={Id}>
                        {Title}
                      </Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
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

export default CreateSpecialzedField;
