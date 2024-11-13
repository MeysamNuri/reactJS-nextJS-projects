import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col, Card, Image } from "antd";
import classes from "./FinalApproval.module.css";
import { IFieldInfo } from "../../../../shared/ulitities/Model/fieldInfo";
import {ReactComponent as Camera} from '../../../../assets/images/camera.svg'
interface IFieldInfoFeedbackProps {
  fieldInfo: IFieldInfo;
}
const { Meta } = Card;

const FieldInfoFeedback: FC<IFieldInfoFeedbackProps> = ({ fieldInfo }) => {
  return (
    <div className={classes.step}>
      <ConfigProvider direction="rtl">
        <div className={classes.title}>
          <p>:اطلاعات رشته</p>
        </div>
        <Form style={{ textAlign: "right" }}>
          <Row justify="space-around" style={{ textAlign: "right" }}>
            <Col span={8}>
              <Card
                hoverable
                style={{ width: 255 }}
                cover={
                  fieldInfo.Course80HourCertificate?
                  <Image
                    // width={100}
                    src={
                      `data:image/jpeg;base64,` +
                      fieldInfo.Course80HourCertificate
                    }
                    style={{maxWidth:"174px",marginRight:"40px"}}
                  />:<Camera />
                }
              >
                <Meta
                  title="گواهینامه آزمون آداب"
                  description={fieldInfo?.Title}
                  className="metaCard"
                />
              </Card>
            </Col>
            
            {fieldInfo.SubFields?.map((i: any,index:any) => {
              return (
                <Col span={8} key={index}  >
                  <Card
                    hoverable
                    style={{ width: 255 }}
                    cover={
                      i.Certificate?
                      <Image
                       style={{maxWidth:"174px",marginRight:"40px"}}
                        // width={100}
                        src={`data:image/jpeg;base64,` + i.Certificate}
                      />:<Camera />
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
            })}
             
            {/* </Col> */}
          </Row>
          <Form.Item
                name="isExamNotNeeded"
                label=" معاف از آزمون:"
                style={{ textAlign: "right" }}
              >
                <span>{fieldInfo?.IsExamNotNeeded ? "بلی" : "خیر"}</span>
              </Form.Item>
          {/* <Col span={12} offset={1}> */}
          {/* <Form.Item
                name="adjustmentField"
                label="زمینه تخصصی"
                style={{ textAlign: "right" }}
              >
                <span>{fieldInfo?.Title}</span>
              </Form.Item> */}
          {/* <Form.Item
                name="subFields"
                label="زیر رشته زمینه تخصصی"
                style={{ textAlign: "right" ,display:"flex !important"}}
              > */}
          {/* <Row gutter={16} style={{marginTop:"20px"}}   >
            {fieldInfo.SubFields?.map((i: any) => {
              return (
                <Col span={8}>
                  <Card
                    hoverable
                    style={{ width: 300 }}
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
            })}
          </Row> */}
          {/* <span>
                  {fieldInfo.SubFields?.map((i: any) => {
                    return (
                      <Card
                        hoverable
                        style={{ width: 300 }}
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
                        />
                      </Card>
                    );
                  })}
                </span> */}
          {/* </Form.Item> */}
          {/* </Col> */}
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default FieldInfoFeedback;
