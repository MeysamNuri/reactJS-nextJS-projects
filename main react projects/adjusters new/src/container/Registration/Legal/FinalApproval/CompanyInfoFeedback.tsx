//libraries
import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col } from "antd";
import { useSelector } from "react-redux";

//styles
import classes from "./FinalApproval.module.css";

interface ICompanyInfoFeedbackProps {
  AdjustmentCompanyInfo: any;
}

const CompanyInfoFeedback: FC<ICompanyInfoFeedbackProps> = ({
  AdjustmentCompanyInfo,
}) => {
  const base = useSelector((state: any) => state.baseData);

  // let findProvince = base?.baseInfo?.Result?.Provinces?.find(
  //   ({ Id, Title }: { Id: number; Title: string }) =>
  //     AdjustmentCompanyInfo.ProvinceId === Id
  // );

  return (
    <ConfigProvider direction="rtl">
      <div className={classes.step}>
        <p className={classes.title}>:مشخصات شرکت</p>

        <Row justify="space-around">
          <Col md={11} offset={1}>
            <Form.Item
              name="nationalCode"
              label="شناسه ملی شرکت"
              style={{ textAlign: "right" }}
            >
              <span>{AdjustmentCompanyInfo?.NationalCode?.toString()}</span>
            </Form.Item>
            <Form.Item
              name="assets"
              label="میزان سرمایه"
              style={{ textAlign: "right" }}
            >
              <span>{AdjustmentCompanyInfo?.Assets?.toString()}</span>
            </Form.Item>
          
          </Col>
          <Col md={11} offset={1}>
            <Form.Item
              name="sharePercentage"
              label="تعداد سهم"
              style={{ textAlign: "right" }}
            >
              <span>{AdjustmentCompanyInfo?.SharePercentage?.toString()}</span>
            </Form.Item>
            <Form.Item
              name="website"
              label="وبسایت"
              style={{ textAlign: "right" }}
            >
              <span>{ AdjustmentCompanyInfo?.Website}</span>
            </Form.Item>
            {/* <Form.Item
              name="licenseIssueDate"
              label="تاریخ صدور پروانه"
              style={{ textAlign: "right" }}
            >
              <span>
                {moment(
                  AdjustmentCompanyInfo?.LicenseIssueDate?.split("T")[0]
                ).format("jYYYY-jM-jD")}
              </span>
            </Form.Item>

            <Form.Item
              name="provinceId"
              label="استان"
              style={{ textAlign: "right" }}
            >
              <span>{findProvince?.Title}</span>
            </Form.Item> */}
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default CompanyInfoFeedback;
