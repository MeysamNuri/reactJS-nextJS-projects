//libraries
import React, { FC, useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Row,
  Col,
  Input,
  Select,
  Radio,
  Button,
  Spin,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
//redux
import {
  sendWorkLocationInfoDraft,
  sendWorkLocationInfoEdit,
  getCompanyInfoDraft,
  getCompanyInfoEdit,
  getWorkLocationInfoLegalEdit,
  isComeFromRegistration,
  getWorkCityProvinceIdLegal,
  getWorkLocationInfo,
  fetchBoarMemberListLegalDraft,
} from "../../../../redux/actions";

//styles
//import classes from "./WorkLocation.module.css";

const { Option } = Select;
const { TextArea } = Input;

interface IWorkLocation {
  onSubmit: () => void;
  onPrev: () => void;
}

const WorkLocation: FC<IWorkLocation> = ({ onSubmit, onPrev }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const base = useSelector((state: any) => state.baseData);
  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );

  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

  const workLocationInfo = useSelector(
    (state: any) => state?.getWorkLocationDraftLegal?.workLocation?.Result
  );
  const workLocationDraftLegalLoadingState = useSelector(
    (state: any) => state?.workLocationDraftLegal?.loading
  );
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const idForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const listWorkCityProvince = useSelector(
    (state: any) => state?.getWorkCityProvinceLegal?.getWorkCityProvinceIdLegal
  );
  const listWorkCityProvinceLoading = useSelector(
    (state: any) => state?.getWorkCityProvinceLegal?.loading
  );
  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );

  const onFinish = (values: any) => {
    let workLocation = {
      provinceId: values.provinceId,
      cityId: values.cityId,
      address: values.address,
      telephone: values.telephone,
      placeUsage: values.placeUsage,
      postalCode: values.postalCode,
      email: values.email,
      website: values.website,
      fax: values.fax,
    };
    var p = /^[\u0600-\u06FF-\_\!\.0-9\s]+$/;
    if (!p.test(workLocation?.address)) return toast.warning("محل فعالیت فارسی نوشته شود")
  
    if (isUserEdit) {
      dispatch(
        sendWorkLocationInfoEdit(idForMainEdit, workLocation, () => {
          onSubmit();
        })
      );
    } else {
      dispatch(sendWorkLocationInfoDraft(legalDraftId, workLocation, () => {}));
      dispatch(
        fetchBoarMemberListLegalDraft(legalDraftId, () => {
          onSubmit();
        })
      );
    }
  };

  //handlers
  const prevHandler = () => {
    dispatch(isComeFromRegistration(false));
    onPrev();
  };

  const workProvinceHandler = (value: number) => {
    dispatch(getWorkCityProvinceIdLegal(value));
    form.setFieldsValue({ cityId: undefined });
  };

  //lifecyclehooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(
        getWorkLocationInfoLegalEdit(idForMainEdit, (provinceId) => {
          dispatch(getWorkCityProvinceIdLegal(provinceId));
        })
      );
    } else {
      // if (!comeFromRegistration) {
      dispatch(getWorkLocationInfo(legalDraftId));
      // }
    }
  }, []);

  useEffect(() => {
    if (workLocationInfo !== undefined && isUserEdit) {
      form.setFieldsValue({
        provinceId: workLocationInfo[0]?.ProvinceId,
        cityId: workLocationInfo[0]?.CityId,
        address: workLocationInfo[0]?.Address,
        telephone: workLocationInfo[0]?.Telephone,
        placeUsage:
          workLocationInfo[0]?.PlaceUsage !== 0
            ? workLocationInfo[0]?.PlaceUsage
            : undefined,
        postalCode: workLocationInfo[0]?.PostalCode,
        email: workLocationInfo[0]?.Email,
        website: workLocationInfo[0]?.Website,
        fax: workLocationInfo[0]?.Fax,
      });
    } else if (workLocationInfo !== undefined && !isUserEdit) {
      form.setFieldsValue({
        provinceId:
          workLocationInfo?.ProvinceId !== 0
            ? workLocationInfo?.ProvinceId
            : undefined,
        cityId:
          workLocationInfo?.CityId !== 0 ? workLocationInfo?.CityId : undefined,
        address: workLocationInfo?.Address,
        telephone: workLocationInfo?.Telephone,
        placeUsage:
          workLocationInfo?.PlaceUsage !== 0
            ? workLocationInfo?.PlaceUsage
            : undefined,
        postalCode: workLocationInfo?.PostalCode,
        email: workLocationInfo?.Email,
        website: workLocationInfo?.Website,
        fax: workLocationInfo?.Fax,
      });
    } 
  }, [workLocationInfo]);

  return (
    <ConfigProvider direction="rtl">
      <Form
        onFinish={onFinish}
        form={form}
        name="workLocation"
        className= {` personalInfo`}
      >
        <Row justify="space-around">
          <Col md={11} offset={1}>
            <Form.Item
              name="provinceId"
              label="استان"
              rules={[
                {
                  required: true,
                  message: "انتخاب استان الزامی است",
                },
              ]}
              className="formLable"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                onChange={workProvinceHandler}
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

            <Form.Item name="address" label="آدرس" className="formLable">
              <TextArea
                name="address"
                rows={4}
                placeholder="لطفا آدرس خود را وارد نمایید"
              />
            </Form.Item>

            <Form.Item
              name="postalCode"
              label="کدپستی"
              className="formLable"
              rules={[
                {
                  required: true,
                  message: "انتخاب کدپستی الزامی است",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "کد پستی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input
                name="postalCode"
                placeholder="کد پستی 10 رقمی خود را وارد نمایید"
                maxLength={10}
              />
            </Form.Item>

            <Form.Item
              name="fax"
              label="فکس"
              className="formLable"
              rules={[
                {
                  pattern: /^[0-9]{11}$/,
                  message: "شماره فکس وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input name="fax" placeholder="شماره فکس 11 رقمی خود را وارد نمایید" maxLength={11} />
            </Form.Item>
          </Col>
          <Col md={11} offset={1}>
            <Form.Item
              name="cityId"
              label="شهر"
              rules={[
                {
                  required: true,
                  message: "انتخاب شهر الزامی است",
                },
              ]}
              className="formLable"
            >
              {listWorkCityProvinceLoading ? (
                <Spin indicator={antIcon} />
              ) : (
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
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
              name="telephone"
              label="تلفن"
              className="formLable"
              rules={[
                {
                  required: true,
                  message: "وارد کردن تلفن الزامی است",
                },
                {
                  pattern: /^\d{3,4}\d{8}$/,
                  message:
                    "تلفن محل سکونت خود را با پیش شماره لطفا وارد نمایید",
                },
              ]}
            >
              <Input
                name="telephone"
                placeholder="02155555555"
                maxLength={11}
              />
            </Form.Item>

            <Form.Item
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

            <Form.Item
              name="email"
              label="ایمیل"
              className="formLable"
              rules={[
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "ایمیل به طور صحیح وارد نشده",
                },
              ]}
            >
              <Input name="email" placeholder="test@sample.com" />
            </Form.Item>

            <Form.Item
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
        </Row>
        <div className="nextStep">
          <Button onClick={prevHandler}>مرحله قبلی</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={workLocationDraftLegalLoadingState}
          >
            مرحله بعدی
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default WorkLocation;
