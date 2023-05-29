import React, { FC } from "react";
import { Button, Form, Input, Row, Col, PageHeader, Descriptions } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchPajooheshkadeInquiry } from "../../../redux/actions";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";

interface IInquiryPajooheshkadehProps {
  oneAdjusterList?: IAneAdjusterList;
}

const InquiryPajooheshkadeh: FC<IInquiryPajooheshkadehProps> = ({
  oneAdjusterList,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { inquiryPajooheshkadeh, loading } = useSelector(
    (state: any) => state.inquiry
  );

  const onFinish = (values: any) => {
    dispatch(
      fetchPajooheshkadeInquiry(
        oneAdjusterList?.ApplicantId,
        oneAdjusterList?.NationalCode,
        values.certificateNo
      )
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
          {/* <Col span={7}>
            <Form.Item label="کدملی" name="nationalCode">
              <Input />
            </Form.Item>
          </Col> */}
          <Col span={8} offset={1}>
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
          <Col span={7} offset={1}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                استعلام
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {inquiryPajooheshkadeh !== null && (
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            title={inquiryPajooheshkadeh?.Result?.CertificateTitle}
            className="site-page-header"
            //subTitle="This is a subtitle"
            // tags={<Tag color="blue">Running</Tag>}
            extra={[
              <a
                download={`${inquiryPajooheshkadeh?.Result?.CertificateTitle}.${inquiryPajooheshkadeh?.Result?.FileExtension}`}
                href={`data:${inquiryPajooheshkadeh?.Result?.ContentType};base64,${inquiryPajooheshkadeh?.Result?.Certificate}`}
                className="download"
              >
                مشاهده گواهینامه آموزشی
              </a>,
            ]}
          >
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="نام پدر">
                {inquiryPajooheshkadeh?.Result.FatherName}
              </Descriptions.Item>
              <Descriptions.Item label="نام آموزشگاه">
                {inquiryPajooheshkadeh?.Result?.EducationalInstitutions}
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ شروع">
                {" "}
                {inquiryPajooheshkadeh?.Result?.StartDate}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ پایان">
                {" "}
                {inquiryPajooheshkadeh?.Result?.EndDate}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ صدور گواهینامه">
                {inquiryPajooheshkadeh?.Result?.CertificateIssueDate}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      )}
    </>
  );
};

export default InquiryPajooheshkadeh;
