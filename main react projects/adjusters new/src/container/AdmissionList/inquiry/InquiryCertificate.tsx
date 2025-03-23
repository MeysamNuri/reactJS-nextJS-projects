import React, { FC } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchCertificateInquiry } from "../../../redux/actions";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";

interface IInquiryPajooheshkadehProps {
  oneAdjusterList?: IAneAdjusterList;
}

const InquiryCertificate: FC<IInquiryPajooheshkadehProps> = ({
  oneAdjusterList,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loadingCertificate} = useSelector(
    (state: any) => state.inquiry
  );



  const onFinish = (values: any) => {
    dispatch(
        fetchCertificateInquiry(oneAdjusterList?.ApplicantId,values.certificateNo)
    );
  };

  const onFinishFailed = (errorInfo: any) => {
  
  };

  return (
    <>
      <Form
        name="basic"
        //labelCol={{ span: 8 }}
        //wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        //autoComplete="off"
      >
        <Row>
          <Col span={8} offset={1}  >
            <Form.Item
              label="شماره گواهینامه"
              name="certificateNo"
              rules={[
                { required: true, message: "شماره گواهینامه الزامی است!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1} >
            <Form.Item>
              <Button type="primary" htmlType="submit"  loading={loadingCertificate}>
                استعلام
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      
      
    </>
  );
};

export default InquiryCertificate;
