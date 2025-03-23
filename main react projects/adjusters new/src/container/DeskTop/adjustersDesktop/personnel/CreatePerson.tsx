import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Radio, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { getBaseInfo } from "../../../../redux/actions";

const { Option } = Select;
const { TextArea } = Input;

interface ICreatePersonProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CreatrePerson: FC<ICreatePersonProps> = ({ onSubmit, onPrev }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const base = useSelector((state: any) => state?.baseData);
  const baseLoading = useSelector((state: any) => state.baseData.loading);


  const onFinish = (values: any) => {
    //console.log(values, "CreatePerson");
    onSubmit();
  };

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  const prevHandler = () => {
    onPrev();
  };

  return (
    <div>
      <Form name="createPerson" onFinish={onFinish} form={form}>
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              name="nationalcode"
              labelCol={{ span: 6 }}
              label="کدملی"
              rules={[
                {
                  required: true,
                  message: "کدملی الزامی می باشد.",
                },
                {
                  pattern: /^\d{10}$/,
                  message: "کدملی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 7 }}
              label="تاریخ تولد"
              name="birthdate"
            >
              <DatePicker2 placeholder="تاریخ تولد" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="position" label="سمت" labelCol={{ span: 6 }}>
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                loading={baseLoading ? true : false}
              >
                {base?.baseInfo?.Result?.Positions?.filter(
                  (item: any) => item.IsBoardMember === false
                )?.map((Position: { Id: number; Title: string }) => (
                  <Option key={Position.Id} value={Position.Id}>
                    {Position.Title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 7 }}
              name="employmentDate"
              label="تاریخ شروع فعالیت"
            >
              <DatePicker2 placeholder="تاریخ شروع فعالیت" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="academicDegreeId"
              label="مدرک تحصیلی"
              labelCol={{ span: 6 }}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                loading={baseLoading ? true : false}
              >
                {base?.baseInfo?.Result?.AcademicDegrees?.map(
                  (degree: { Id: number; Title: string }) => (
                    <Option key={degree.Id} value={degree.Id}>
                      {degree.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 7 }}
              name="academicFieldId"
              label="رشته تحصیلی"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
              >
                {base?.baseInfo?.Result?.AcademicFields?.map(
                  (major: { Id: number; Title: string }) => (
                    <Option key={major.Id} value={major.Id}>
                      {major.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="description"
              label="توضیحات"
            >
              <TextArea autoSize allowClear />
            </Form.Item>
          </Col>
        </Row>
        <div className="nextButton">
          <Button onClick={prevHandler}>مرحله قبلی</Button>
          <Button type="primary" htmlType="submit">
            مرحله بعدی
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatrePerson;
