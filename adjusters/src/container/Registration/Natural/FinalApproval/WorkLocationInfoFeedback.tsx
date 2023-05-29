import React, { FC } from "react";
import { ConfigProvider, Form, Row, Col} from "antd";
import { useSelector } from "react-redux";
import classes from "./FinalApproval.module.css";



interface IWorkLocationInfoFeedbackProps {
  workLocationInfo: any;
}

const WorkLocationInfoFeedback: FC<IWorkLocationInfoFeedbackProps> = ({
  workLocationInfo,
}) => {
  const base = useSelector((state: any) => state.baseData);

  let findProvince = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      workLocationInfo?.ProvinceId === Id
  );

  let findCityObject = base?.baseInfo?.Result?.Provinces?.find(
    ({ Id, Title, Cities }: { Id: number; Title: string; Cities: [] }) =>
      Cities.find(
        ({ Id, Title }: { Id: number; Title: string }) =>
          workLocationInfo?.CityId === Id
      )
  );
  let findCity = findCityObject?.Cities?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      workLocationInfo?.CityId === Id
  );

  let findPlaceUsage = base?.baseInfo?.Result?.PlaceUsages?.find(
    ({ Id, Title }: { Id: number; Title: string }) =>
      workLocationInfo?.PlaceUsage === Id
  );

  return (
    <div className={classes.step}>
      <ConfigProvider direction="rtl">
        <div>
          <p className={classes.title}>:محل فعالیت</p>
        </div>
        <Form name="workLocationInfo" className="workLocationInfo">
          <Row style={{ textAlign: "right" }}>
            <Col md={11} offset={1}>
              <Form.Item name="provinceId" label="استان">
                <span>{findProvince?.Title}</span>
              </Form.Item>
              <Form.Item name="address" label="آدرس">
                <span>
                  {workLocationInfo?.Address === null
                    ? "ندارد"
                    : workLocationInfo?.Address}
                </span>
              </Form.Item>
              <Form.Item label="فکس" name="fax">
                <span>
                  {workLocationInfo?.Fax === null
                    ? "ندارد"
                    : workLocationInfo?.Fax}
                </span>
              </Form.Item>
              <Form.Item label="وبسایت" name="website">
                <span>
                  {workLocationInfo?.Website === null
                    ? "ندارد"
                    : workLocationInfo?.Website}
                </span>
              </Form.Item>
            </Col>

            <Col md={11} offset={1}>
              <Form.Item name="cityId" label="شهر">
                <span>{findCity?.Title}</span>
              </Form.Item>
              <Form.Item name="placeUsage" label="کاربری محل">
                <span>
                  {findPlaceUsage?.Title === null
                    ? "ندارد"
                    : findPlaceUsage?.Title}
                </span>
              </Form.Item>
              <Form.Item name="postalCode" label="کدپستی">
                <span>
                  {workLocationInfo?.PostalCode === null
                    ? "ندارد"
                    : workLocationInfo?.PostalCode}
                </span>
              </Form.Item>
              <Form.Item name="telephone" label="تلفن محل فعالیت">
                <span>
                  {workLocationInfo?.Telephone === null
                    ? "ندارد"
                    : workLocationInfo?.Telephone}
                </span>
              </Form.Item>
              <Form.Item name="email" label="ایمیل">
                <span>
                  {workLocationInfo?.Email === null
                    ? "ندارد"
                    : workLocationInfo?.Email}
                </span>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default WorkLocationInfoFeedback;
