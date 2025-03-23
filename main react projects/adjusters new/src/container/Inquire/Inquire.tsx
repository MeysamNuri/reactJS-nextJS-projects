import React from "react";
import { Form, Button, Input, ConfigProvider, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import DatePicker2 from "../../components/UI/DatePicker/DatePicker";
import { postInquire } from "../../redux/actions";

const Inquire = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.inquire);
 
  const onFinish = (values: any) => {
    let identityInfo = {
      nationalCode: Number(values.nationalCode),
      birthDate: moment(values.birthDate.toDate()).format("YYYY-MM-DD"),
    };

    dispatch(postInquire(identityInfo, form.resetFields));
  };

  return (
    <div className="inquire">
      <ConfigProvider direction="rtl">
        <Form name="inquiry" form={form} onFinish={onFinish}>
          <Row gutter={[16, 8]}>
            <Col span={8}>
              <Form.Item
                label="کدملی"
                name="nationalCode"
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
                labelCol={{ span: 8 }}
              >
                <Input name="nationalCode" maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="تاریخ تولد"
                name="birthDate"
                labelCol={{ span: 5 }}
              >
                <DatePicker2 placeholder="انتخاب تاریخ" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item wrapperCol={{ offset: 20 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                 استعلام
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Inquire;
