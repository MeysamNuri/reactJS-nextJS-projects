import React, { useEffect, FC } from "react";
import {
  Form,
  Input,
  Switch,
  Button,
  Checkbox,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import { useAllAdjusterType, useCreateDocument } from "../AdjustersHook";

interface createDocument {
  closeModal: () => void;
  filterList:any
}

const CreateDocument: FC<createDocument> = ({ closeModal,filterList }) => {

  
  const [insertDocument, { status }] = useCreateDocument();
  const { data: allAdjusterType } = useAllAdjusterType();
  const [form] = Form.useForm();
  const dispatch = useDispatch();




  const onFinish = (values: any) => {
    const data = {
      relatedAdjusterTypes: [] as any,
      title: values.documentName,
    };

    allAdjusterType?.Result.forEach((el: any) => {
      if (values[el.CourseTypeId].check) {
        const type = {
          isRequired: values[el.CourseTypeId].isRequired ? true : false,
          isVisible: values[el.CourseTypeId].isVisible ? true : false,
          adjusterType: el.CourseTypeId,
          documentSituationId: values[el.CourseTypeId].DocumentSituationId ? true :  false,
        };
        data.relatedAdjusterTypes.push(type);
      }
    });

    insertDocument(data);
    form.resetFields();
  };

  //handle Close Modal
  useEffect(() => {
    if (status === "success") {
      closeModal();
      form.resetFields();
    }
  }, [status]);

  return (
    <div>
      <Form name="createDocument" onFinish={onFinish} form={form}>
        <Form.Item
          name="documentName"
          label="نام"
          rules={[
            {
              required: true,
              message: "نام مدرک خود را بنویسید",
            },
          ]}
        >
          <Input placeholder="نام مدرک خود را بنویسید" />
        </Form.Item>
        {/* <Form.Item
          name="documentSituationId"
          label="انتخاب نوع سند"
          className="formLable"
          rules={[
            {
              required: true,
              message: "نوع سند را انتخاب نمایید",
            },
          ]}
        >
          {loading === true ? (
            <Spin indicator={antIcon} />
          ) : (
            <Radio.Group>
              {baseInfo?.Result?.DocumentSituations?.map(
                (documentStatus: { Id: number; Title: string }) => (
                  <Radio.Button
                    key={documentStatus.Id}
                    value={documentStatus.Id}
                  >
                    {documentStatus.Title}
                  </Radio.Button>
                )
              )}
            </Radio.Group>
          )}
        </Form.Item> */}
        {/* <Form.Item name="isVisible" label="قابل رویت" className="formLable">
            <Switch checkedChildren="رویت شده" unCheckedChildren="رویت نشده" />
         
        </Form.Item> */}

        {allAdjusterType?.Result?.map(
          (adjuster: { CourseTypeId: number; Title: string }) => {
            return (
              <Row key={adjuster.CourseTypeId}>
                <Col span={24} className="adjustersCheck">
                  <Form.Item
                    valuePropName="checked"
                    name={[adjuster.CourseTypeId, "check"]}
                  >
                    <Checkbox
                      value={adjuster.CourseTypeId}
                      style={{ lineHeight: "32px" }}
                    >
                      {adjuster.Title}
                    </Checkbox>
                  </Form.Item>
                  <Form.Item name={[adjuster.CourseTypeId, "isRequired"]}>
                    <Switch
                      checkedChildren="اجباری"
                      unCheckedChildren="غیر اجباری"
                    />
                  </Form.Item>
                  <Form.Item name={[adjuster.CourseTypeId, "isVisible"]}>
                    <Switch
                      checkedChildren="قابل رویت"
                      unCheckedChildren="غیر قابل رویت"
                    />
                  </Form.Item>
                  <Form.Item name={[adjuster.CourseTypeId, "DocumentSituationId"]}>
                    <Switch
                      checkedChildren="تکمیل پرونده"
                      unCheckedChildren="ثبت ارزیاب"
                    />
                  </Form.Item>
                </Col>
              </Row>
            );
          }
        )}

        <div className="submit">
          <Button
            type="primary"
            htmlType="submit"
            loading={status === "loading"}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateDocument;
