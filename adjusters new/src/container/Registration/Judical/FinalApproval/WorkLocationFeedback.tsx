import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col, Input } from "antd";
import { useSelector } from "react-redux";

//styles
import classes from "./FinalApproval.module.css";

//components
import moment from "jalali-moment";

interface IWorkLocationFeedbackProps {
  workLocation: any;
}

const WorkLocationFeedback: FC<IWorkLocationFeedbackProps> = ({
  workLocation,
}) => {
  const base = useSelector((state: any) => state.baseData);

  let findProvince = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      workLocation?.ProvinceId === Id
  );

  let findCityObject = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title, Cities }: { Id: number; Title: string; Cities: [] }) =>
      Cities.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          workLocation?.CityId === Id
      )
  );
  let findCity = findCityObject?.Cities?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      workLocation?.CityId === Id
  );

  let findPlaceUsage = base?.baseInfo?.Result?.PlaceUsages?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      workLocation?.PlaceUsage === Id
  );
  return (
    <div className={classes.step}>
      <ConfigProvider direction="rtl">
        <div className={classes.title}>
          <p>:محل فعالیت</p>
        </div>
        <Form name="workLocationInfo" className="personalInfo">
          <Row justify="space-around">
            <Col span={11} offset={1}>
              <Form.Item
                name="provinceId"
                label="استان"
                style={{ textAlign: "right" }}
              >
                <span>{findProvince?.Title}</span>
              </Form.Item>

              <Form.Item
                name="address"
                label="آدرس"
                style={{ textAlign: "right" }}
              >
                <span>
                  {workLocation?.Address === null
                    ? "ندارد"
                    : workLocation?.Address}
                </span>
              </Form.Item>

              <Form.Item label="فکس" name="fax" style={{ textAlign: "right" }}>
                <span>
                  {workLocation?.Fax == null ? "ندارد" : workLocation?.Fax}{" "}
                </span>
              </Form.Item>

              <Form.Item
                label="وبسایت یا وبلاگ"
                name="website"
                style={{ textAlign: "right" }}
              >
                <span>
                  {workLocation?.Website === null
                    ? "ندارد"
                    : workLocation?.Website}
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cityId"
                label="شهر"
                style={{ textAlign: "right" }}
              >
                <span>{findCity?.Title}</span>
              </Form.Item>

              <Form.Item
                name="placeUsage"
                label="کاربری محل"
                style={{ textAlign: "right" }}
              >
                <span>
                  {findPlaceUsage?.Title === null
                    ? "ندارد"
                    : findPlaceUsage?.Title}
                </span>
              </Form.Item>

              <Form.Item
                name="postalCode"
                label="کدپستی"
                style={{ textAlign: "right" }}
              >
                <span>
                  {workLocation?.PostalCode === null
                    ? "ندارد"
                    : workLocation?.PostalCode}
                </span>
              </Form.Item>
              <Form.Item
                name="telephone"
                label="تلفن محل فعالیت"
                style={{ textAlign: "right" }}
              >
                <span>{workLocation?.Telephone}</span>
              </Form.Item>
              <Form.Item
                name="email"
                label="ایمیل"
                style={{ textAlign: "right" }}
              >
                <span>
                  {workLocation?.Email === null ? "ندارد" : workLocation?.Email}
                </span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default WorkLocationFeedback;
