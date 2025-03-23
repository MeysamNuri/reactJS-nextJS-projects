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
import {toast} from 'react-toastify'
import {
  sendWorkPlacesDraft,
  sendWorkPlacesEdit,
  getWorkLocationInfoNaturalEdit,
  getWorkLocationInfoNaturalDraft,
  getWorkCityProvinceIdNatural,
  isComeFromRegistration,
} from "../../../../redux/actions";

//enums
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";

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
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const base = useSelector((state: any) => state.baseData);
  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );
  // const draftIdLocalStorage = useSelector(
  //   (state: any) => state.NewDraftId.newId
  // );
  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");

  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const workLocationInfo = useSelector(
    (state: any) =>
      state?.getWorkLocationInfoDraftNatural?.naturalDraftWorkLocationInfo
  );
  const workLocationInfoLoading = useSelector(
    (state: any) => state?.getWorkLocationInfoDraftNatural?.loading
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
      state?.getWorkCityProvinceIdNatural?.getWorkCityProvinceIdNatural
  );
  const listWorkCityProvinceLoading = useSelector(
    (state: any) => state?.getWorkCityProvinceIdNatural?.loading
  );

  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );
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

    var p = /^[\u0600-\u06FF-\_\!\.0-9\s]+$/;
    if (!p.test(workPlaces?.address)) return toast.warning("آدرس فارسی نوشته شود")
  
    if (isUserEdit) {
      dispatch(sendWorkPlacesEdit(gotIdForMainEdit, workPlaces, onSubmit)); 
    } else { 
      dispatch(sendWorkPlacesDraft(draftId, workPlaces, onSubmit));
    }
  };

  const prevHandler = () => {
    onPrev();
    if (!isUserEdit) {
      dispatch(isComeFromRegistration(false));
    }
  };

  const workProvinceHandler = (value: number) => {
    dispatch(getWorkCityProvinceIdNatural(value));
    form.setFieldsValue({ cityId: undefined });
  };

  useEffect(() => {
    if (isUserEdit) {
      dispatch(
        getWorkLocationInfoNaturalEdit(gotIdForMainEdit, (provinceId) => {
          dispatch(getWorkCityProvinceIdNatural(provinceId));
        })
      );
    } else {
      dispatch(
        getWorkLocationInfoNaturalDraft(draftId, (provinceId: number) => {
          dispatch(getWorkCityProvinceIdNatural(provinceId));
        })
      );
    }
  }, []);

  useEffect(() => {
    if (workLocationInfo?.IsSucceed) {
      form.setFieldsValue({
        provinceId:
          workLocationInfo?.Result?.ProvinceId !== 0
            ? workLocationInfo?.Result?.ProvinceId
            : undefined,
        cityId:
          workLocationInfo?.Result?.CityId !== 0
            ? workLocationInfo?.Result?.CityId
            : undefined,
        address: workLocationInfo?.Result?.Address,
        telephone: workLocationInfo?.Result?.Telephone,
        placeUsage: workLocationInfo?.Result?.PlaceUsage,
        postalCode: workLocationInfo?.Result?.PostalCode,
        email: workLocationInfo?.Result?.Email,
        fax: workLocationInfo?.Result?.Fax,
        website: workLocationInfo?.Result?.Website,
      });
    }
  }, [workLocationInfo?.IsSucceed, workLocationInfo?.Result]);

  return (
    <div>
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
                  labelCol={{ xxl: 3, xl: 4, md: 5 }}
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
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  >
                    {base?.baseInfo?.Result?.Provinces?.map(
                      (province: {
                        Cities: any;
                        Id: number;
                        Title: string;
                      }) => (
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
                  labelCol={{ xxl: 3, xl: 4, md: 5, sm: 6 }}
                  rules={[
                    {
                      pattern: /^\d{3,4}\d{8}$/,
                      message:
                        "تلفن محل فعالیت خود را با پیش شماره لطفا وارد نمایید",
                    },
                  ]}
                >
                  <Input
                    placeholder="02155555555"
                    maxLength={11}
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="postalCode"
                  label="کدپستی"
                  labelCol={{ xxl: 3, xl: 4, md: 5 }}
                  rules={[
                    {
                      pattern: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                      message: "کدپستی وارد شده صحیح نمی باشد.",
                    },
                  ]}
                >
                  <Input
                    placeholder="6715765163"
                    maxLength={10}
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="آدرس"
                  labelCol={{ xxl: 3, xl: 4, md: 5 }}
                >
                  <TextArea
                    rows={4}
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="cityId"
                  label="شهر"
                  labelCol={{ xxl: 2, xl: 3, md: 5, sm: 6 }}
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
                      disabled={
                        resultLogin?.ApplicantStatusId ===
                        workTaskFlowId?.ReturnToApplicantToCompleteDossier
                      }
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
                  labelCol={{ xxl: 2, xl: 3, md: 5, sm: 6 }}
                >
                  <Radio.Group>
                    {base?.baseInfo?.Result?.PlaceUsages?.map(
                      (place: { Id: number; Title: string }) => (
                        <Radio.Button
                          disabled={
                            resultLogin?.ApplicantStatusId ===
                            workTaskFlowId?.ReturnToApplicantToCompleteDossier
                          }
                          key={place.Id}
                          value={place.Id}
                        >
                          {place.Title}
                        </Radio.Button>
                      )
                    )}
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="ایمیل"
                  labelCol={{ xxl: 2, xl: 3, md: 5, sm: 6 }}
                  rules={[
                    {
                      pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                      message: "ایمیل وارد شده صحیح نمی باشد.",
                    },
                  ]}
                >
                  <Input
                    placeholder="example@gmail.com"
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="فکس"
                  name="fax"
                  labelCol={{ xxl: 2, xl: 3, md: 5, sm: 6 }}
                  rules={[
                    {
                      pattern: /^\d{11}$/,
                      message: "فکس وارد نشده صحیح نمی باشد",
                    },
                  ]}
                >
                  <Input
                    maxLength={11}
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="وبسایت"
                  name="website"
                  labelCol={{ xxl: 2, xl: 3, md: 5, sm: 6 }}
                  rules={[
                    {
                      pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                      message: "وبسایت درست وارد نشده",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                    placeholder="wwww.test.com"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="nextStep">
              <Button onClick={prevHandler}>مرحله قبلی</Button>
              <Button type="primary" htmlType="submit" loading={stWorkLoading}>
                مرحله بعدی
              </Button>
            </div>
          </Form>
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default WorkPlace;
