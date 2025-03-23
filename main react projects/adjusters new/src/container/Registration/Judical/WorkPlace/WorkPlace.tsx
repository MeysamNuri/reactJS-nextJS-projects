//libraries
import React, { FC, useEffect } from "react";
import {
  Form,
  Select,
  Radio,
  Button,
  Row,
  Col,
  Input,
  ConfigProvider,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

//redux actions
import {
  sendJudicalWorkPlacesDraft,
  sendJudicalWorkPlacesEdit,
  getWorkLocationInfoEditJudical,
  getWorkLocationInfoDraftJudical,
  getWorkCityProvinceId,
  isComeFromRegistration,
} from "../../../../redux/actions";

//styles
//import classes from "../Judical.module.css";

const { Option } = Select;
const { TextArea } = Input;

interface IWorkPlacesProps {
  onSubmit: () => void;
  onPrev: () => void;
}

// const selectAfter = (
//   <Select defaultValue=".com" className="select-after">
//     <Option value=".com">com.</Option>
//     <Option value=".jp">jp.</Option>
//     <Option value=".cn">cn.</Option>
//     <Option value=".org">org.</Option>
//   </Select>
// );

// const selectBefore = (
//   <Select defaultValue="http://" className="select-before">
//     <Option value="http://">http://</Option>
//     <Option value="https://">https://</Option>
//   </Select>
// );

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const WorkPlace: FC<IWorkPlacesProps> = ({ onSubmit, onPrev }) => {
  const base = useSelector((state: any) => state.baseData);

  const judicalDraftIdState = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result?.DraftId
  );
  const judicalDraftIdLocalStorage = localStorage.getItem("judicalDraftId");
  const judicalDraftId =
    judicalDraftIdState !== undefined
      ? judicalDraftIdState
      : judicalDraftIdLocalStorage;

  const workLocationInfoLoading = useSelector(
    (state: any) => state.judicalWorkPlaces.loading
  );

  const gotJudicalWorkLocationInfoDraft = useSelector(
    (state: any) =>
      state?.judicalGetWorkLocationInfoDraft?.workLocationInfoDraftJudical
  );
  const stWorkLoading = useSelector((state: any) => state.workPlaces.loading);
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const listWorkCityProvince = useSelector(
    (state: any) =>
      state?.judicialGetWorkCityProvinceId?.getWorkCityProvinceIdJudicial
  );
  const listWorkCityProvinceLoading = useSelector(
    (state: any) => state?.judicialGetWorkCityProvinceId?.loading
  );

  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    let workPlaces = {
      provinceId: values.provinceId,
      cityId: values.cityId,
      address: values.address,
      telephone: values.telephone,
      placeUsage: values.placeUsage,
      postalCode: values.postalCode,
      email: values.email,
      fax: values.fax,
      website: values.website,
    };
    if (!isUserEdit) {
      dispatch(
        sendJudicalWorkPlacesDraft(judicalDraftId, workPlaces, onSubmit)
      );
    } else if (isUserEdit) {
      dispatch(
        sendJudicalWorkPlacesEdit(gotIdForMainEdit, workPlaces, onSubmit)
      );
    }
  };

  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };

  const workProvinceHandler = (value: number) => {
    dispatch(getWorkCityProvinceId(value));
    form.setFieldsValue({ cityId: undefined });
  };

  useEffect(() => {
    if (gotJudicalWorkLocationInfoDraft?.IsSucceed) {
      form.setFieldsValue({
        provinceId:
          gotJudicalWorkLocationInfoDraft?.Result?.ProvinceId !== 0
            ? gotJudicalWorkLocationInfoDraft?.Result?.ProvinceId
            : undefined,
        cityId:
          gotJudicalWorkLocationInfoDraft?.Result?.CityId !== 0
            ? gotJudicalWorkLocationInfoDraft?.Result?.CityId
            : undefined,
        address: gotJudicalWorkLocationInfoDraft?.Result?.Address,
        telephone: gotJudicalWorkLocationInfoDraft?.Result?.Telephone,
        placeUsage: gotJudicalWorkLocationInfoDraft?.Result?.PlaceUsage,
        postalCode: gotJudicalWorkLocationInfoDraft?.Result?.PostalCode,
        email: gotJudicalWorkLocationInfoDraft?.Result?.Email,
        fax: gotJudicalWorkLocationInfoDraft?.Result?.Fax,
        website: gotJudicalWorkLocationInfoDraft?.Result?.Website,
      });
    }
  }, [
    gotJudicalWorkLocationInfoDraft?.IsSucceed,
    gotJudicalWorkLocationInfoDraft?.Result,
  ]);

  useEffect(() => {
    if (isUserEdit) {
      dispatch(
        getWorkLocationInfoEditJudical(gotIdForMainEdit, (provinceId) => {
          dispatch(getWorkCityProvinceId(provinceId));
        })
      );
    } else {
      //if (!comeFromRegistration) {
      dispatch(getWorkLocationInfoDraftJudical(judicalDraftId));
      // }
    }
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <Spin spinning={workLocationInfoLoading} delay={500}>
        <Form
          onFinish={onFinish}
          form={form}
          name="personalInfo"
          className="personalInfo"
        >
          <Row justify="space-around">
            <Col span={11}>
              <Form.Item
                name="provinceId"
                label="استان"
                labelCol={{ span: 3 }}
                rules={[
                  {
                    required: true,
                    message: "انتخاب استان الزامی است",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                  onChange={workProvinceHandler}
                  allowClear
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

              <Form.Item
                name="telephone"
                label="تلفن محل فعالیت"
                labelCol={{ span: 3 }}
                rules={[
                  {
                    pattern: /^\d{3,4}\d{8}$/,
                    message:
                      "تلفن محل فعالیت خود را با پیش شماره لطفا وارد نمایید",
                  },
                ]}
              >
                <Input placeholder="02155555555" maxLength={11} />
              </Form.Item>
              <Form.Item
                name="postalCode"
                label="کدپستی"
                labelCol={{ span: 3 }}
                rules={[
                  {
                    pattern: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                    message: "کدپستی وارد شده صحیح نمی باشد.",
                  },
                ]}
              >
                <Input placeholder="6715765163" maxLength={10} />
              </Form.Item>
              <Form.Item name="address" label="آدرس" labelCol={{ span: 3 }}>
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item
                name="cityId"
                label="شهر"
                labelCol={{ span: 2 }}
                rules={[
                  {
                    required: true,
                    message: "انتخاب  شهر الزامی است",
                  },
                ]}
              >
                {listWorkCityProvinceLoading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="انتخاب نمایید"
                    allowClear
                  >
                    {listWorkCityProvince?.map(
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
                )}
              </Form.Item>

              <Form.Item
                name="placeUsage"
                label="کاربری محل"
                labelCol={{ span: 2 }}
              >
                <Radio.Group>
                  {base?.baseInfo?.Result?.PlaceUsages?.map(
                    (place: { Id: number; Title: string }) => (
                      <Radio.Button key={place.Id} value={place.Id}>
                        {place.Title}
                      </Radio.Button>
                    )
                  )}
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="email"
                label="ایمیل"
                labelCol={{ span: 2 }}
                rules={[
                  {
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                    message: "ایمیل وارد شده صحیح نمی باشد.",
                  },
                ]}
              >
                <Input placeholder="example@gmail.com" />
              </Form.Item>
              <Form.Item
                label="فکس"
                name="fax"
                labelCol={{ span: 2 }}
                rules={[
                  {
                    pattern: /^\d{11}$/,
                    message: "فکس وارد نشده صحیح نمی باشد",
                  },
                ]}
              >
                <Input maxLength={11} />
              </Form.Item>

              <Form.Item
                label="وبسایت"
                name="website"
                labelCol={{ span: 2 }}
                rules={[
                  {
                    pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                    message: "وبسایت درست وارد نشده",
                  },
                ]}
              >
                <Input placeholder="wwww.test.com" />
              </Form.Item>
            </Col>
          </Row>

          <div className="nextStep">
            <Button onClick={prevHandler}>مرحله قبلی</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={stWorkLoading ? true : false}
            >
              مرحله بعدی
            </Button>
          </div>
        </Form>
      </Spin>
    </ConfigProvider>
  );
};

export default WorkPlace;
