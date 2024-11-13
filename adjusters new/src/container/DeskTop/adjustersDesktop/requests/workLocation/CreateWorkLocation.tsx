import React, { FC, useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Radio,
  Spin,
  Checkbox,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AuthValue } from "sanhab-components-library";
import { LoadingOutlined } from "@ant-design/icons";
import { CHANGE_WORK_LOCATION } from "../../../../../constant/desktop";
import {
  IAddChangeWorkLocation,
  IChangeWorkLocation,
} from "../../../../../shared/ulitities/Model/desktop/request";
import {
  getBaseInfo,
  //addChangeWorkLocation,
  fetchWorkLocation,
  fetchWorkingLocationList,
  getResidenceCityProvinceIdNatural,
} from "../../../../../redux/actions";

const { Option } = Select;
const { TextArea } = Input;

interface IWorkLocationProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CreateWorkLocation: FC<IWorkLocationProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedWorkLocation, setSelectedWorkLocation] = useState<number>(0)
  const [findBeforLocationInfo, setBeforLocationInfo] = useState<any>({})
  let userIdRecognition = Number(localStorage.getItem("userRecognition"));
  const base = useSelector((state: any) => state?.baseData);
  const baseLoading = useSelector((state: any) => state.baseData.loading);
  const listWorkLocations = useSelector(
    (state: any) => state.workLocation.listWorkLocation?.Result
  );
  const listWorkLocationsLoading = useSelector(
    (state: any) => state.workLocation.loading
  );
  const listResidenceCityProvince = useSelector(
    (state: any) =>
      state?.getResidenceCityProvinceIdNatural
        ?.getResidenceCityProvinceIdNatural
  );
  const listResidenceCityProvinceLoading = useSelector(
    (state: any) => state?.getResidenceCityProvinceIdNatural?.loading
  );
  const {
    applicantWorkingLocation,
    loadingApplicantWorkingLocation } = useSelector((state: any) => state.request)
  // useEffect(() => {
  //   dispatch(fetchWorkLocation(userIdRecognition));
  // }, []);

  useEffect(() => {
    dispatch(fetchWorkingLocationList());
  }, []);
  const onFinish = (values: any) => {
    let changeWorkLocation: IAddChangeWorkLocation = {
      beforWorkLocationInfoId: selectedWorkLocation,
      cityId: values.cityId ?? findBeforLocationInfo?.CityId,
      provinceId: values.provinceId ?? findBeforLocationInfo?.ProvinceId,
      address: values.address ?? findBeforLocationInfo?.Address,
      telephone: values.telephone ?? findBeforLocationInfo?.Telephone,
      postalCode: values.postalCode ?? findBeforLocationInfo?.PostalCode,
      email: values.email ?? findBeforLocationInfo?.Email,
      description: values.description,
      placeUsage: values.placeUsage ?? findBeforLocationInfo?.PlaceUsage,
      fax: values.fax ?? findBeforLocationInfo?.Fax,
      website: values.website ?? findBeforLocationInfo?.Website

    };
    dispatch({ type: CHANGE_WORK_LOCATION, payload: changeWorkLocation });
    onSubmit();
  }

  const selectWorkLocation = (value: any) => {
    setSelectedWorkLocation(value)
  }
  const prevHandler = () => {
    onPrev();
  };

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  const cityProvinceHandler = (value: number) => {
    dispatch(getResidenceCityProvinceIdNatural(value));
  };
  useEffect(() => {
    if (selectedWorkLocation) {
      setBeforLocationInfo(applicantWorkingLocation?.Result?.find((f: any) => f.Id === selectedWorkLocation))
    }

  }, [selectedWorkLocation])
  useEffect(() => {
    form.setFieldsValue({
      provinceId: findBeforLocationInfo?.ProvinceId,
      cityId: findBeforLocationInfo?.CityId,
      address: findBeforLocationInfo?.Address,
      postalCode: findBeforLocationInfo?.PostalCode,
      website: findBeforLocationInfo?.Website,
      email: findBeforLocationInfo?.Email,
      telephone: findBeforLocationInfo?.Telephone,
      fax: findBeforLocationInfo?.Fax,
      placeUsage: findBeforLocationInfo?.PlaceUsage
    })
    if (findBeforLocationInfo?.ProvinceId) {
      dispatch(getResidenceCityProvinceIdNatural(findBeforLocationInfo?.ProvinceId));
    }

  }, [findBeforLocationInfo])
  return (
    <Form name="createWorkLocation" onFinish={onFinish} form={form}>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 7 }}
            label="محل فعالیت قبلی"
            name="workLocationInfoId"
            rules={[{ required: true, message: "محل فعالیت الزامی می باشد " }]}
          >
            <Select
              placeholder="انتخاب نمایید"
              style={{ width: "100%" }}
              allowClear
              loading={loadingApplicantWorkingLocation}
              notFoundContent="محل فعالیت وجود ندارد"
              onChange={selectWorkLocation}
            >

              {applicantWorkingLocation?.Result?.map((work: any) => (
                <Option key={work.Id} value={work.Id}>
                  {work.Province?.Title + " " + work.City?.Title + " " + (work.Address ? work.Address : "")}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="provinceId" labelCol={{ span: 4 }} label="استان">
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="انتخاب نمایید"
              onChange={cityProvinceHandler}
            >
              {base?.baseInfo?.Result?.Provinces?.map(
                (province: { Cities: any; Id: number; Title: string }) => (
                  <Option key={province.Id} value={province.Id}>
                    {province.Title}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cityId" labelCol={{ span: 7 }} label="شهر">
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="انتخاب نمایید"
              loading={listResidenceCityProvinceLoading}
            >
              {listResidenceCityProvince?.map(
                (city: {
                  Id: number;
                  CityId: number;
                  Title: string;
                  ProvinceId: any;
                }) => (
                  <Option key={city?.Id} value={city?.Id}>
                    {city?.Title}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address" label="آدرس" labelCol={{ span: 4 }}>
            <TextArea
              placeholder="آدرس جدید را وارد نمایید"
              autoSize
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 7 }}
            name="postalCode"
            label="کد پستی"
            rules={[
              {
                required: true,
                message: "کدپستی محل سکونت خود را وارد نمایید",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "کدپستی وارد شده صحیح نمی باشد.",
              },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 4 }}
            name="website"
            label="وبسایت"
            className="formLable"
            rules={[
              {
                pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                message: "وبسایت به طور صحیح وارد نشده",
              },
            ]}
          >
            <Input name="website" placeholder="wwww.test.com" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 7 }}
            name="placeUsage"
            label="کاربری محل"
            className="formLable"
            rules={[
              {
                required: true,
                message: "انتخاب کاربری محل الزامی است",
              },
            ]}
          >
            <Radio.Group >
              {base?.baseInfo?.Result?.PlaceUsages?.map(
                (place: { Id: number; Title: string }) => {
                  return (
                    <Radio.Button key={place.Id} value={place.Id}>
                      {place.Title}
                    </Radio.Button>
                  );
                }
              )}
            </Radio.Group>
          </Form.Item>

        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="ایمیل"
            labelCol={{ span: 4 }}
            rules={[
              {
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                message: "ایمیل وارد شده صحیح نمی باشد.",
              },
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item
            name="telephone"
            label="تلفن"
            labelCol={{ span: 7 }}
            rules={[
              {
                required: true,
                pattern: /^\d{3,4}\d{8}$/,
                message: "تلفن محل شعبه خود را با پیش شماره لطفا وارد نمایید",
              },
            ]}
          >
            <Input maxLength={11} placeholder="02122983976" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 4 }}
            name="fax"
            label="فکس"
            rules={[
              {
                pattern: /^[0-9]{11}$/,
                message: "شماره فکس وارد شده صحیح نمی باشد.",
              },
            ]}
          >
            <Input name="fax" placeholder="شماره فکس 10 رقمی خود را وارد نمایید" maxLength={11} />

          </Form.Item>
        </Col>

        {/* <Col span={12}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="لیست شعب"
              name="beforWorkLocationInfoId"
            >
              <TextArea
                placeholder="آدرس قدیم را وارد نمایید"
                autoSize
                allowClear
              />
            </Form.Item>
          </Col> */}


        {/* <Col span={12}>
            <Form.Item
              labelCol={{ span: 4 }}
              label="دفتر اصلی"
              name="mainBranch"
              valuePropName="checked"
            >
              <Checkbox value="1" style={{ lineHeight: "32px" }}></Checkbox>
            </Form.Item>
          </Col> */}
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 7 }}
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
  );
};

export default CreateWorkLocation;
