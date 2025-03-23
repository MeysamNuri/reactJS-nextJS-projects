import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col, Image, Card } from "antd";
import { IFieldInfo } from "../../../../shared/ulitities/Model/fieldInfo";
import classes from "./FinalApproval.module.css";
const { Meta } = Card;

interface IFieldInfoFeedbackProps {
  fieldlInfo: IFieldInfo;
}

const FieldInfoFeedback: FC<IFieldInfoFeedbackProps> = ({ fieldlInfo }) => {
  return (
    <div className={classes.step}>
      <ConfigProvider direction="rtl">
        <div className={classes.title}>
          <p>:اطلاعات رشته</p>
        </div>
        <Form>
          <Row>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image
                    // width={100}
                    src={
                      `data:image/jpeg;base64,` +
                      fieldlInfo.Course80HourCertificate
                    }
                  />
                }
              >
                <Meta
                  title="گواهینامه آزمون آداب"
                  description={fieldlInfo?.Title}
                />
              </Card>
            </Col>
            {/* {fieldlInfo.SubFields?.map((i: any,index:number) => {
              return (
                <Col span={8} key={index}  >
                  <Card
                    hoverable
                    style={{ width: 255 }}
                    cover={
                      <Image
                        // width={100}
                        src={`data:image/jpeg;base64,` + i.Certificate}
                      />
                    }
                  >
                    <Meta
                      title="گواهینامه زیر رشته های تخصصی"
                      description={i?.Title}
                      className="metaCard"
                    />
                  </Card>
                </Col>
              );
            })} */}
          </Row>
          <Col span={7} offset={1}>
            <Form.Item
              name="isExamNotNeeded"
              label=" معاف از آزمون:"
              style={{ textAlign: "right" }}
            >
              <span>{fieldlInfo?.IsExamNotNeeded ? "بلی" : "خیر"}</span>
            </Form.Item>
            {/* <Form.Item
                name="permitRequestDate"
                label="تاریخ درخواستی صدور پروانه"
                style={{ textAlign: "right" }}
              >
                <span>
                  {fieldlInfo?.PermitRequestDate?.split("T")[0] !==
                    "0001-01-01" &&
                    moment(fieldlInfo?.PermitRequestDate?.split("T")[0]).format(
                      "jYYYY-jM-jD"
                    )}
                </span>
              </Form.Item> */}
          </Col>

          {/* <Col span={8}>
            <Form.Item
              name="subFields"
              label="زیر رشته زمینه تخصصی"
              style={{ textAlign: "right" }}
            >
              <span>
                {fieldlInfo.SubFields?.map((i: any) => {
                  return (
                    <span>
                      {i.Title}
                      {" ,"}
                    </span>
                  );
                })}
              </span>
            </Form.Item>
          </Col> */}
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default FieldInfoFeedback;
