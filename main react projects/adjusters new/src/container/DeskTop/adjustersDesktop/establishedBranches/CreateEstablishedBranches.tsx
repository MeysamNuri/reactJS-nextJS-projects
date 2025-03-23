import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Checkbox,
  Radio
} from "antd";
//import { LoadingOutlined } from "@ant-design/icons";
import { AuthValue } from "sanhab-components-library";
import {
  //addEstablishmentBranch,
  getUserRecognition,
  getBaseInfo,
  getResidenceCityProvinceIdNatural,
} from "../../../../redux/actions";
import { IAddEstablishmentBranch } from "../../../../shared/ulitities/Model/desktop/request";
import { SET_ESTABLISH_BRANCH } from "../../../../constant/desktop";

const { Option } = Select;
const { TextArea } = Input;

interface ICreateEstablishedBranchesProps {
  onSubmit: () => void;
  onPrev: () => void;
}
const CreateEstablishedBranches: FC<ICreateEstablishedBranchesProps> = ({
  onSubmit,
  onPrev,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const base = useSelector((state: any) => state?.baseData);
  const [stablish, setStablish] = useState({} as any);
  //const baseLoading = useSelector((state: any) => state.baseData.loading);
  const { stablishBranch } = useSelector((state: any) => state.request);
  const [state, setstate] = useState(false);
  // const userIdLogin = useSelector(
  //   (state: any) => state.userLogin.userLogin?.Result
  // );
  const listResidenceCityProvince = useSelector(
    (state: any) =>
      state?.getResidenceCityProvinceIdNatural
        ?.getResidenceCityProvinceIdNatural
  );
  const listResidenceCityProvinceLoading = useSelector(
    (state: any) => state?.getResidenceCityProvinceIdNatural?.loading
  );

  let userId = AuthValue()?.userId;
  let user = {
    userId: userId,
  };

  // useEffect(() => {
  //   userId !== undefined &&
  //     dispatch(
  //       getUserRecognition(
  //         user,
  //         () => {},
  //         () => {}
  //       )
  //     );
  // }, []);
  const onFinish = (values: any) => {
    let createBranches: IAddEstablishmentBranch = {
      beforWorkLocationInfoId: 0,
      cityId: values.cityId,
      provinceId: values.provinceId,
      address: values.address,
      telephone: values.telephone,
      postalCode: values.postalCode,
      email: values.email,
      description: values.description,
      placeUsage: values.placeUsage,
      fax: values.fax,
      website: values.website
    };

    setStablish(createBranches);
    dispatch({ type: SET_ESTABLISH_BRANCH, payload: createBranches });
    // dispatch(addEstablishmentBranch(createBranches, userIdLogin?.ApplicantId));
    onSubmit();
    setstate(true);
  };

  const prevHandler = () => {
    onPrev();
  };
  // const nextStepHandler = () => {
  //   onSubmit();
  // };

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      cityId: stablishBranch?.cityId,
      address: stablishBranch?.address,
      telephone: stablishBranch?.telephone,
      postalCode: stablishBranch?.postalCode,
      email: stablishBranch?.email,
      website: stablishBranch?.website,
      description: stablishBranch?.description,
      mobile: stablishBranch?.mobile,
      provinceId: stablishBranch?.provinceId,
      placeUsage: stablishBranch?.placeUsage,
      fax: stablishBranch?.fax,
    });
  }, [stablishBranch]);

  const cityProvinceHandler = (value: number) => {
    dispatch(getResidenceCityProvinceIdNatural(value));
  };

  return (
    <div>
      <Form name="createEstablish" onFinish={onFinish} form={form}>
        <Row gutter={[16, 8]}>
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
            <Form.Item name="cityId" labelCol={{ span: 5 }} label="شهر">
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
              labelCol={{ span: 5 }}
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
              labelCol={{ span: 5 }}
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
              <Radio.Group>
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
              labelCol={{ span: 5 }}
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
              labelCol={{ span: 5 }}
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
    </div>
  );
};

export default CreateEstablishedBranches;
