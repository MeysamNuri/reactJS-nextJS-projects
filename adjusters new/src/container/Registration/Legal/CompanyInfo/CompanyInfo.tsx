import React, { FC, useState, useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Row,
  Col,
  Input,
  Button,
  Modal,
  InputNumber,
  Select
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import momentJalali from "jalali-moment";
import {
  sendCompanyInfoDraft,
  getBaseInfo,
  sendCompanyInfoEdit,
  getCompanyInfoEdit,
  getCompanyInfoDraft,
  getapplicantRejectReason,
  getWorkExperienceRejectReason,
  getRejectReasonListApplicantDocument,
  getCompanyTypes,
  companyTypeDetails
} from "../../../../redux/actions";
import LastStatus from "../../lastStatus/LastStatus";
import DatePicker2 from '../../../../components/UI/DatePicker/DatePicker'
import { toast } from "react-toastify";
interface ICompanyProps {
  onSubmit: () => void;
}

const CompanyInfo: FC<ICompanyProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>()
  const [registerationDate, setRegisterationDate] = useState<any>(null)
  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );

  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );

  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );

  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const idForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;
  const companyInfo = useSelector(
    (state: any) => state.getCompanyInfoDraftLegal?.companyInfo?.Result
  );
  const { comnayTypesInfo, loadingCompanyTypes } = useSelector(
    (state: any) => state.getCompanyInfoDraftLegal
  );
  const loadingCompanyInfoState = useSelector(
    (state: any) => state?.getCompanyInfoDraftLegal?.loading
  );
  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );
  // const applicantRejectReasonsList = useSelector(
  //   (state: any) => state?.applicantRejectReasons?.rejectReason?.Result
  // );
  const adjusterStatus = useSelector(
    (state: any) =>
      state?.sendNatAndRegCodes?.response?.Result?.ApplicantStatusTitle
  );
  const handleSelectCompany = (value: any) => {
    setSelectedCompany(value)
  }
  const onFinish = (values: any) => {
  
    let companyInfoOBJ = {
      nationalCode: values.nationalCode,
      sharePercentage: values.sharePercentage,
      assets: values.assets,
      //licenseIssueDate: values.licenseIssueDate,
      //provinceId: values.provinceId,
      website: values.website,
      companyName: values.companyName,
      companyType: selectedCompany??companyInfo?.CompanyType,
      registrationCode: values.registrationCode,
      registrationDate:values.registrationDate===undefined?null: momentJalali(values.registrationDate?.toDate()).format("YYYY-MM-DD")
    };
    var p = /^[\u0600-\u06FF-\_\!\.0-9\s]+$/;
    if (!p.test(companyInfoOBJ?.companyName)) return toast.warning("نام شرکت فارسی نوشته شود")
  
dispatch(companyTypeDetails(selectedCompany))
    if (isUserEdit) {
      dispatch(
        sendCompanyInfoEdit(idForMainEdit, companyInfoOBJ, () => {
          onSubmit();
        })
      );
    } else {
      dispatch(
        sendCompanyInfoDraft(legalDraftId, companyInfoOBJ, () => {
          onSubmit();
        })
      );
    }
  };

  //lifecycle hooks
  useEffect(() => {
    dispatch(getBaseInfo());
    dispatch(getCompanyTypes());
    if (isUserEdit) {
      dispatch(getCompanyInfoEdit(idForMainEdit));
      setIsLastStatusVisible(true);
      dispatch(getapplicantRejectReason(idForMainEdit));
      dispatch(getWorkExperienceRejectReason(idForMainEdit));
      dispatch(getRejectReasonListApplicantDocument(idForMainEdit));
    } else {
      if (!comeFromRegistration) {
        dispatch(getCompanyInfoDraft(legalDraftId));
      }
    }
  }, []);

  useEffect(() => {
    if (companyInfo) {
      form.setFieldsValue({
        nationalCode: companyInfo?.NationalCode,
        sharePercentage: companyInfo?.SharePercentage,
        assets: companyInfo?.Assets,
        //licenseIssueDate: companyInfo?.LicenseIssueDate!=null? moment(companyInfo?.LicenseIssueDate?.split("T")[0]):null,
        //provinceId: companyInfo?.ProvinceId,
        website: companyInfo?.Website,
        companyName: companyInfo?.CompanyName,
        companyType: companyInfo?.CompanyType,
        registrationDate:companyInfo?.RegistrationDate&& momentJalali(
          companyInfo?.RegistrationDate
        ),
        registrationCode: companyInfo?.RegistrationCode
      });
    }
  }, [companyInfo]);

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    }
    const regex = /^[0-9]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <ConfigProvider direction="rtl">
      <Form
        onFinish={onFinish}
        form={form}
        name="companyInfo"
        labelCol={{ xxl: 6, xl: 6, md: 7, sm: 8, xs: 8 }}
      >
        <Row justify="space-around">
          <Col md={11} offset={1}>
            <Form.Item
              name="nationalCode"
              label="شناسه ملی شرکت"
              rules={[
                {
                  required: true,
                  message: "وارد کردن شناسه ملی شرکت الزامی است",
                },
                {
                  pattern: /^[0-9]*$/,
                  message: "شناسه ملی وارد شده صحیح نمی باشد.",
                },
              ]}
            >
              <Input placeholder="به عدد وارد نمایید" maxLength={11} />
            </Form.Item>
            <Form.Item
              name="assets"
              label="میزان سرمایه"
              rules={[
                {
                  required: true,
                  message: "وارد کردن میزان سرمایه الزامی است.",
                },
                // {
                //   pattern: /^[0-9]*$/,
                //   message: "میزان سرمایه وارد شده صحیح نمی باشد.",
                // },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
                className="NoWrapInputNumber"
                onKeyDown={handleKeyDown}
              />
            </Form.Item>

            <Form.Item
              name="companyName"
              label="موسسه/ نام شرکت"
              rules={[
                {
                  required: false,
                  message: "وارد کردن نام شرکت الزامی است",
                },
              ]}
            >
              <Input placeholder="نام شرکت" />
            </Form.Item>
            <Form.Item
              name="registrationCode"
              label="کد ثبتی"
              rules={[
                {
                  required: true,
                  message: "وارد کردن کد ثبتی الزامی است",
                },
              ]}
            >
              <Input placeholder="کد ثبتی" />
            </Form.Item>
          </Col>
          <Col md={11} offset={1}>
            <Form.Item
              name="sharePercentage"
              label="تعداد  سهم"
              rules={[
                {
                  required: true,
                  message: "وارد کردن تعداد  سهم الزامی است",
                },

              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="website"
              label="وبسایت"
              rules={[
                {
                  pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                  message: "وبسایت درست وارد نشده",
                },
              ]}
            >
              <Input placeholder="wwww.test.com" />
            </Form.Item>
            <Form.Item
              name="companyType"
              label="نوع شرکت"
              rules={[
                {
                  required: true,
                  message: "وارد کردن نوع شرکت الزامی است",
                },

              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                onChange={handleSelectCompany}
                allowClear

              >
                {comnayTypesInfo?.Result?.map(
                  (comany: any) => (
                    <Option key={comany.Value} value={comany.Value}>
                      {comany.Description}
                    </Option>
                  )
                )}
              </Select>

            </Form.Item>

            <Form.Item
              name="registrationDate"
              label="تاریخ ثبت"

            >
              <DatePicker2 placeholder="انتخاب تاریخ" />
            </Form.Item>
            {/* 
            <Form.Item
              name="provinceId"
              label="استان"
              className="formLable"
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
              >
                {base?.baseInfo?.Result?.Provinces?.map(
                  (province: { Cities: any; Id: number; Title: string }) => (
                    <Option key={province.Id} value={province.Id}>
                      {province.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item> */}
          </Col>
        </Row>
        <div className="nextStep">
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingCompanyInfoState}
          >
            مرحله بعدی
          </Button>
        </div>
      </Form>
      <Modal
        title={`آخرین وضعیت: ${adjusterStatus}  `}
        visible={isLastStatusVisible}
        footer={null}
        onOk={() => setIsLastStatusVisible(false)}
        onCancel={() => setIsLastStatusVisible(false)}
        width={500}
        centered
      >
        <LastStatus closModal={() => setIsLastStatusVisible(false)} />
      </Modal>
    </ConfigProvider>
  );
};

export default CompanyInfo;
