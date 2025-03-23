//libraries
import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col } from "antd";
import { useSelector } from "react-redux";

//styles
import classes from "./FinalApproval.module.css";

interface IWorkLocationFeedbackProps {
  WorkLocation: any;
}

const WorkLocationFeedback: FC<IWorkLocationFeedbackProps> = ({
  WorkLocation,
}) => {
  const base = useSelector((state: any) => state?.baseData);

  let findProvince = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      WorkLocation.ProvinceId === Id
  );

  let findCityObject = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title, Cities }: { Id: number; Title: string; Cities: [] }) =>
      Cities.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          WorkLocation?.CityId === Id
      )
  );
  let findCity = findCityObject?.Cities?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      WorkLocation?.CityId === Id
  );

  let findPlaceUsage = base?.baseInfo?.Result?.PlaceUsages?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      WorkLocation?.PlaceUsage === Id
  );

  return (
    <ConfigProvider direction="rtl">
      <div className={classes.step}>
        <p className={classes.title}>:محل فعالیت</p>

        <Row justify="space-around">
          <Col md={11} offset={1}>
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
              <span>{WorkLocation?.Address}</span>
            </Form.Item>

            <Form.Item
              name="postalCode"
              label="کدپستی"
              style={{ textAlign: "right" }}
            >
              <span>{WorkLocation?.PostalCode}</span>
            </Form.Item>

            <Form.Item name="fax" label="فکس" style={{ textAlign: "right" }}>
              <span>{WorkLocation?.Fax} </span>
            </Form.Item>
          </Col>
          <Col md={11} offset={1}>
            <Form.Item name="cityId" label="شهر" style={{ textAlign: "right" }}>
              <span>{findCity?.Title} </span>
            </Form.Item>

            <Form.Item
              name="telephone"
              label="تلفن"
              style={{ textAlign: "right" }}
            >
              <span>{WorkLocation?.Telephone}</span>
            </Form.Item>

            <Form.Item
              name="placeUsage"
              label="کاربری محل"
              style={{ textAlign: "right" }}
            >
              <span>{findPlaceUsage?.Title}</span>
            </Form.Item>

            <Form.Item
              name="email"
              label="ایمیل"
              style={{ textAlign: "right" }}
            >
              <span>{WorkLocation?.Email} </span>
            </Form.Item>

            <Form.Item
              name="website"
              label="وبسایت"
              style={{ textAlign: "right" }}
            >
              <span>{WorkLocation?.Website}</span>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default WorkLocationFeedback;
