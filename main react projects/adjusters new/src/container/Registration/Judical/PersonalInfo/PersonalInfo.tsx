import React, { useState, useEffect, FC } from "react";
import {
  Form,
  Select,
  Radio,
  Button,
  Row,
  Col,
  Input,
  ConfigProvider,
  Modal,
  Space,
  Popconfirm,
  Table,
  Spin,
  Collapse,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { LoadingOutlined } from "@ant-design/icons";
import { RemoveCookie } from "sanhab-components-library";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { messageError, messageWarning } from "../../../../utils/utils";
import AddRelation from "./AddRelation";
import LastStatus from "../../lastStatus/LastStatus";
import {
  fetchJudicalFamilyMemberDraft,
  fetchJudicalFamilyMemberEdit,
  deletJudicalFamilyMemberEdit,
  deletJudicalFamilyMemberDraft,
  sendPersonalInfoDraft,
  sendPersonalInfoEdit,
  uploadJudicalProfilePicDraft,
  uploadJudicalProfilePicEdit,
  getPersonalInfoJudicialDraft,
  getPersonalInfoJudicialEdit,
  getDenomtionReligionId,
  getJudicalProfilePicDraft,
  getJudicalProfilePicEdit,
  getBirthCityProvinceId,
  getResidenceCityProvinceId,
  getapplicantRejectReason,
  getWorkExperienceRejectReason,
  getRejectReasonListApplicantDocument,
} from "../../../../redux/actions";
import { IJudicalDraftPersonalInfo } from "../../../../shared/ulitities/Model/draftJudical";
import { relationshipId } from "../../../../shared/ulitities/Enums/relationshipId";
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";
import { ReactComponent as Profile } from "../../../../assets/images/profile.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import classes from "./PersonalInfo.module.css";
import "../../Registration.css";
import { toast } from "react-toastify";

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface IPersonalInfoProps {
  onSubmit: () => void;
}

const PersonalInfo: FC<IPersonalInfoProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [graduationDate, setGraduationDate] = useState<any>(null);
  const [visibleFamilyMember, setVisibleFamilyMember] = useState(false);
  const [disableDenomination, setDisableDenomination] = useState(false);
  const [maleOrFemale, setMaleOrFemale] = useState();
  const [militaryStatus, setMilitaryStatus] = useState(0);
  const [zeroFamilyMember, setZeroFamilyMember] = useState(true);
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const resultProfile = useSelector((state: any) =>
    isUserEdit
      ? state?.showJudicalProfilePic?.showjudicalProfilePic?.Result?.Content
      : state?.showJudicalProfilePic?.showjudicalProfilePic?.Content
  );
  // const resultProfileLoading = useSelector(
  //   (state: any) => state?.resProfilePic?.loading
  // );
  const profilePicLoading = useSelector(
    (state: any) => state?.judicalProfilePic?.loading
  );
  const base = useSelector((state: any) => state?.baseData);
  const baseInfoLoading = useSelector((state: any) => state?.baseData?.loading);

  const loadingPersonalInfo = useSelector(
    (state: any) => state.judicalPersonalInfo.loading
  );
  const judicalDraftIdState = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result?.DraftId
  );
  const judicalDraftIdLocalStorage = localStorage.getItem("judicalDraftId");
  const judicalDraftId =
    judicalDraftIdState !== undefined
      ? judicalDraftIdState
      : judicalDraftIdLocalStorage;
  const isApplicantSecondLicense = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.IsApplicantSecondLicense
  );
  const judicalInqury = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result
  );
  const inquiryMobileNumber = useSelector(
    (state: any) => state.newJudicalDraftId?.mobile
  );
  let judicalFamilyMembers = useSelector(
    (state: any) =>
      state?.judicalAllFamilyMember?.judicalAllFamilyMember?.Result
  );
  let judicalFamilyMembersLoading = useSelector(
    (state: any) => state.judicalAllFamilyMember.loading
  );

  const personalInfo = useSelector(
    (state: any) => state?.judicalGetPersonalInfoDraft?.personalInfoJudical
  );

  const listDenomination = useSelector(
    (state: any) => state?.listDenominationReligionId?.listDenonationReligion
  );

  const listDenominationLoading = useSelector(
    (state: any) => state?.listDenominationReligionId?.loading
  );

  useEffect(() => {
    RemoveCookie("sanhab-auth");
    RemoveCookie("sanhab-access");
  }, []);

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  // let lastYear = new Date(new Date().getFullYear(), 13, 48);


  let disabledRanges = [
    {
      disabled: true,
      start: tomorrow,
      end: moment(tomorrow).add(100, "years"),
    },
  ];

  const listBirthCityProvince = useSelector(
    (state: any) =>
      state?.judicialGetBirthCityProvinceId?.getBirthCityProvinceIdJudicial
  );

  const listBirthCityProvinceLoading = useSelector(
    (state: any) => state?.judicialGetBirthCityProvinceId?.loading
  );

  const listResidenceCityProvince = useSelector(
    (state: any) =>
      state?.judicialGetResidenceCityProvinceId
        ?.getResidenceCityProvinceIdJudicial
  );
  const listResidenceCityProvinceLoading = useSelector(
    (state: any) => state?.judicialGetResidenceCityProvinceId?.loading
  );
  const adjusterStatus = useSelector(
    (state: any) =>
      state?.sendNatAndRegCodes?.response?.Result?.ApplicantStatusTitle
  );

  // console.log(moment(graduationDate).isBefore(tomorrow), "graduationDateeeeeeeeeeeeee");

  const onFinish = (values: any) => {
    setGraduationDate(values.graduationDate);
    let personalInformation: IJudicalDraftPersonalInfo = {
      birthProvinceId: values.birthProvinceId,
      birthCityId: values.birthCityId,
      issueCityId: values.issueCityId,
      hasAdjusterCode: values.AdjusterCode,
      nationalityId: values.nationalityId,
      religionId: values.religionId,
      denominationId: values.denominationId,
      maritalStatusId: Number(values.maritalStatusId),
      spouseName: values.spouseName,
      spouseJob: values.spouseJob,
      academicDegreeId: Number(values.academicDegreeId),
      militaryStatusId: values.militaryStatusId,
      AcademicFieldId: values.AcademicFieldId,
      university: values.university,
      graduationDate:
        values.graduationDate > today
          ? messageWarning("تاریخ فارغ التحصیلی نمی تواند بعد زمان جاری باشد")
          : moment(values.graduationDate.toDate()).format("YYYY-MM-DD"),
      SubAcademicField: values.SubAcademicField,
      provinceId: values.provinceId,
      cityId: values.CityId,
      fieldContainedInLicenseOfJudiciary:
        values.fieldContainedInLicenseOfJudiciary,
      validityOfLicenseOfJudiciary: values.validityOfLicenseOfJudiciary,
      address: values.address,
      postalCode: values.postalCode,
      telephone: values.telephone,
      mobile: isUserEdit ? personalInfo?.Result?.Mobile : inquiryMobileNumber,
      email: values.email,
    };
    var p = /^[\u0600-\u06FF-\_\!\.0-9\s]+$/;
    if (!p.test(personalInformation?.university)) return toast.warning("نام دانشگاه فارسی نوشته شود")
  
    if (!p.test(personalInformation?.address)) return toast.warning("آدرس فارسی نوشته شود")
    if (!p.test(personalInformation?.SubAcademicField)) return toast.warning("گرایش فارسی نوشته شود")
  

    if (resultProfile !== undefined) {
      if (isUserEdit) {
        dispatch(
          sendPersonalInfoEdit(gotIdForMainEdit, personalInformation, onSubmit)
        );
      } else {
        dispatch(
          sendPersonalInfoDraft(judicalDraftId, personalInformation, onSubmit)
        );
      }
    } else if (resultProfile === undefined) {
      messageError("عکس پروفایل ارسال نگردیده است");
    }
  };

  //delete family Member
  const deleteRowHandler = (record: any) => {
    if (isUserEdit) {
      dispatch(
        deletJudicalFamilyMemberEdit(
          gotIdForMainEdit,
          record.nationalCode,
          () => {
            dispatch(fetchJudicalFamilyMemberEdit(gotIdForMainEdit));
          }
        )
      );
    } else {
      dispatch(
        deletJudicalFamilyMemberDraft(
          judicalDraftId,
          record.nationalCode,
          () => {
            dispatch(fetchJudicalFamilyMemberDraft(judicalDraftId));
          }
        )
      );
    }
  };

  const addRelationFamilyHandler = () => {
    setVisibleFamilyMember(true);
  };

  // const handleMaleOrFemale = (e: any) => {
  //   setMaleOrFemale(e.target.value);
  // };

  const handleMilitaryStatus = (e: any) => {
    setMilitaryStatus(e.target.value);
  };

  //lifecyclehooks here
  useEffect(() => {
    if (isUserEdit) {
      setIsLastStatusVisible(true);
      dispatch(getPersonalInfoJudicialEdit(gotIdForMainEdit));
      dispatch(getJudicalProfilePicEdit(gotIdForMainEdit));
      dispatch(fetchJudicalFamilyMemberEdit(gotIdForMainEdit));
      dispatch(getapplicantRejectReason(gotIdForMainEdit));
      dispatch(getWorkExperienceRejectReason(gotIdForMainEdit));
      dispatch(getRejectReasonListApplicantDocument(gotIdForMainEdit));
    } else if (!isUserEdit) {
      if (isApplicantSecondLicense) {
        dispatch(getPersonalInfoJudicialDraft(judicalDraftId, () => { }));
        dispatch(fetchJudicalFamilyMemberDraft(judicalDraftId));
        dispatch(getJudicalProfilePicDraft(judicalDraftId));
      }
    }
  }, [isApplicantSecondLicense]);

  useEffect(() => {
    if (personalInfo?.IsSucceed) {
      form.setFieldsValue({
        birthProvinceId: personalInfo?.Result?.BirthProvinceId,
        birthCityId: personalInfo?.Result?.BirthCityId,
        issueCityId: personalInfo?.Result?.IssueCityId,
        hasAdjusterCode: personalInfo?.Result?.HasAdjusterCode,
        nationalityId: personalInfo?.Result?.NationalityId,
        religionId: personalInfo?.Result?.ReligionId,
        denominationId: personalInfo?.Result?.DenominationId,
        maritalStatusId: personalInfo?.Result?.MaritalStatusId,
        fieldContainedInLicenseOfJudiciary:
          personalInfo?.Result?.FieldContainedInLicenseOfJudiciary,
        validityOfLicenseOfJudiciary: moment(
          personalInfo?.Result?.ValidityOfLicenseOfJudiciary.split("T")[0]
        ),
        spouseName: personalInfo?.Result?.SpouseName,
        spouseJob: personalInfo?.Result?.SpouseJob,
        academicDegreeId: personalInfo?.Result?.AcademicDegreeId,
        militaryStatusId: personalInfo?.Result?.MilitaryStatusId,
        AcademicFieldId: personalInfo?.Result?.AcademicFieldId,
        university: personalInfo?.Result?.University,
        graduationDate: moment(
          personalInfo?.Result?.GraduationDate.split("T")[0]
        ),
        SubAcademicField: personalInfo?.Result?.SubAcademicField,
        provinceId: personalInfo?.Result?.ProvinceId,
        CityId: personalInfo?.Result?.CityId,
        address: personalInfo?.Result?.Address,
        postalCode: personalInfo?.Result?.PostalCode,
        telephone: personalInfo?.Result?.Telephone,
        mobile: personalInfo?.Result?.Mobile,
        email: personalInfo?.Result?.Email,
        gender: personalInfo?.Result?.Gender,
      });
      dispatch(getDenomtionReligionId(personalInfo?.Result?.ReligionId));
      dispatch(getBirthCityProvinceId(personalInfo?.Result?.BirthProvinceId));
      dispatch(getResidenceCityProvinceId(personalInfo?.Result?.ProvinceId));
      setMaleOrFemale(personalInfo?.Result?.Gender);
    }
  }, [personalInfo?.IsSucceed, personalInfo?.Result]);

  useEffect(() => {
    if (listDenomination.length === 0) {
      setDisableDenomination(true);
    } else {
      setDisableDenomination(false);
    }
  }, [listDenomination]);

  useEffect(() => {
    if (judicalFamilyMembers?.length > 0) {
      setZeroFamilyMember(false);
    } else {
      setZeroFamilyMember(true);
    }
  }, [judicalFamilyMembers]);

  useEffect(() => {
    if (!isUserEdit) {
      setMaleOrFemale(judicalInqury?.Gender);
      form.setFieldsValue({ mobile: inquiryMobileNumber });
    }
  }, [judicalInqury]);

  let data = judicalFamilyMembers?.map(
    (member: {
      FirstName: string;
      FamilyName: string;
      FamilyRelation: number;
      NationalCode: number;
      BirthDate: string;
    }) => {
      let membersFamily = {
        key: member?.BirthDate,
        fullName: member?.FirstName + " " + member?.FamilyName,
        familyRelation:
          member?.FamilyRelation === relationshipId.Father
            ? "پدر"
            : member?.FamilyRelation === relationshipId.Mother
              ? "مادر"
              : member?.FamilyRelation === relationshipId.Sister
                ? "خواهر"
                : member?.FamilyRelation === relationshipId.Brother
                  ? "برادر"
                  : member?.FamilyRelation === relationshipId.Spouse
                    ? "همسر"
                    : member.FamilyRelation === relationshipId.FatherInLaw
                      ? "پدرزن"
                      : member.FamilyRelation === relationshipId.MotherInLaw
                        ? "مادرزن"
                        : "سایر",
        nationalCode: member?.NationalCode,
        BirthDate: moment(member?.BirthDate.split("T")[0]).format(
          "jYYYY-jM-jD"
        ),
      };
      return membersFamily;
    }
  );
  let columns: any = [
    {
      title: "نسبت",
      dataIndex: "familyRelation",
    },
    {
      title: "کد ملی",
      dataIndex: "nationalCode",
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
    },
    {
      title: "تاریخ تولد",
      dataIndex: "BirthDate",
    },
    {
      title: "عملیات",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          {/* <Edit /> */}
          <Popconfirm
            title="آیا از حذف خود مطمئن می باشید؟"
            onConfirm={() => deleteRowHandler(record)}
            // onCancel={cancel}
            okText="بله"
            cancelText="خیر"
          >
            <Trash />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleUpload = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];

    fileExtentionValidator(
      e,
      500000,
      ["image/jpg", "image/jpeg", "image/png"],
      () => {
        if (isUserEdit) {
          dispatch(
            uploadJudicalProfilePicEdit(file, gotIdForMainEdit, () => {
              dispatch(getJudicalProfilePicEdit(gotIdForMainEdit));
            })
          );
        } else {
          dispatch(
            uploadJudicalProfilePicDraft(
              judicalDraftId,
              file,

              () => {
                dispatch(getJudicalProfilePicDraft(judicalDraftId));
              }
            )
          );
        }
      }
    );
  };

  const religionHandlerHandler = (value: number) => {
    dispatch(getDenomtionReligionId(value));
    form.setFieldsValue({ denominationId: undefined });
  };

  const birthProvinceHandler = (value: number) => {
    dispatch(getBirthCityProvinceId(value));
    form.setFieldsValue({ birthCityId: undefined });
  };

  const resideceProvinceHandler = (value: number) => {
    dispatch(getResidenceCityProvinceId(value));
    form.setFieldsValue({ CityId: undefined });
  };

  return (
    <div className="personalInfo">
      <ConfigProvider direction="rtl">
        <Spin spinning={baseInfoLoading} delay={500}>
          <Row>
            <Col span={9} offset={1} order={1}>
              <Form.Item
                name="upload"
                label="بارگذاری تصویر"
                valuePropName="fileList"
                extra="حداکثر 500 کیلو بایت و با فرمت jpg یا png"
                className={classes.uploader}
              >
                <div className={classes.uploadBox}>
                  {resultProfile ? (
                    <img src={"data:image/png;base64," + resultProfile} />
                  ) : (
                      <Profile />
                    )}
                </div>
                <label className={classes.customFileUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e)}
                  />
                  {profilePicLoading && <Spin indicator={antIcon} />}
                  بارگذاری فایل
                  <Upload />
                </label>
              </Form.Item>
            </Col>
            <Col span={11} offset={3}>
              <Form.Item label="نام">
                <span>
                  {isUserEdit
                    ? personalInfo?.Result?.FirstName
                    : judicalInqury?.FirstName}
                </span>
              </Form.Item>
              <Form.Item label="نام خانوادگی">
                <span>
                  {isUserEdit
                    ? personalInfo?.Result?.FamilyName
                    : judicalInqury?.FamilyName}
                </span>
              </Form.Item>
              <Form.Item
                label="کدملی"
                name="nationalityId"
                className="changeMargin"
              >
                <span>
                  {isUserEdit
                    ? personalInfo?.Result?.NationalCode
                    : judicalInqury?.NationalCode}
                </span>
              </Form.Item>
              <Form.Item label="تاریخ تولد" name="birthDate">
                {isUserEdit
                  ? moment(
                    personalInfo?.Result?.BirthDate.split("T")[0]
                  ).format("jYYYY-jM-jD")
                  : moment(judicalInqury?.BirthDate.split("T")[0]).format(
                    "jYYYY-jM-jD"
                  )}
              </Form.Item>
              <Form.Item label="موبایل">
                <span>
                  {isUserEdit
                    ? personalInfo?.Result?.Mobile
                    : inquiryMobileNumber}
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Form
            name="personalInfo"
            onFinish={onFinish}
            form={form}
            className="personalInfo"
            scrollToFirstError={true}
          >
            <Row>
              <Col span={20} offset={2}>
                <Collapse defaultActiveKey={["1", "2", "3"]}>
                  <Panel header="اطلاعات فردی" key="1">
                    <Row>
                      <Col md={11} offset={1}>
                        <Form.Item
                          name="birthProvinceId"
                          label="استان محل تولد"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب استان محل تولد الزامی است",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                            onChange={birthProvinceHandler}
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
                          name="issueCityId"
                          label="شهر محل صدور"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب شهر محل صدور الزامی است",
                            },
                          ]}
                          className="formLable"
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                          >
                            {base?.baseInfo?.Result?.Provinces?.map(
                              (province: {
                                Id: number;
                                Title: string;
                                Cities: any;
                              }) =>
                                province?.Cities?.map((city: any) => (
                                  <Option key={city.Id} value={city.Id}>
                                    {city.Title}
                                  </Option>
                                ))
                            )}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          name="religionId"
                          label="دین"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب دین الزامی است",
                            },
                          ]}
                          className="formLable"
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                            onChange={religionHandlerHandler}
                          >
                            {base?.baseInfo?.Result?.Religions?.map(
                              (religion: {
                                Id: number;
                                Title: string;
                                Denominations: any;
                              }) => (
                                <Option key={religion.Id} value={religion.Id}>
                                  {religion.Title}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>

                        {/* <Form.Item
                          name="mobile"
                          label="موبایل"
                          rules={[
                            {
                              required: true,
                              message: "لطفا شماره موبایل خود را وارد نمایید",
                            },
                            {
                              pattern: /^(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
                              message: "شماره موبایل وارد شده صحیح نمی باشد.",
                            },
                          ]}
                          className="formLable"
                        >
                          <Input disabled={true} name="mobile" maxLength={11} />
                        </Form.Item> */}

                        <Form.Item
                          label="رشته مندرج در پروانه دادگستری"
                          name="fieldContainedInLicenseOfJudiciary"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message:
                                "رشته مندرج در پروانه دادگستری خود را وارد نمایید",
                            },
                          ]}
                        >
                          <Input name="fieldContainedInLicenseOfJudiciary" />
                        </Form.Item>
                        <Form.Item
                          name="email"
                          label="ایمیل"
                          className="formLable"
                          rules={[
                            {
                              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                              message: "ایمیل وارد شده صحیح نمی باشد.",
                            },
                          ]}
                        >
                          <Input name="email" placeholder="example@gmail.com" />
                        </Form.Item>
                        {/* <Form.Item
                          name="gender"
                          label="جنسیت"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب جنسیت الزامی است",
                            },
                          ]}
                        >
                          <Radio.Group onChange={handleMaleOrFemale}>
                            <Space direction="vertical">
                              <Radio key={1} value={1}>
                                مرد */}
                        {maleOrFemale === 1 && (
                          <span>
                            <Form.Item
                              label="وضعیت نظام وظیفه"
                              name="militaryStatusId"
                              rules={[
                                {
                                  required: maleOrFemale === 1,
                                  message:
                                    "وضعیت نظام وظیفه خود را انتخاب نمایید",
                                },
                              ]}
                            >
                              <Radio.Group
                                onChange={handleMilitaryStatus}
                                className={classes.militaryRadioGroup}
                              >
                                {base?.baseInfo?.Result?.MilitaryServiceStatuses?.map(
                                  (military: { Id: number; Title: string }) => (
                                    <Radio.Button
                                      key={military.Id}
                                      value={military.Id}
                                    >
                                      {military.Title}
                                    </Radio.Button>
                                  )
                                )}
                              </Radio.Group>
                            </Form.Item>
                          </span>
                        )}
                        {/* </Radio>
                              <Radio key={0} value={0}>
                                زن
                              </Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item> */}
                      </Col>
                      <Col md={11} offset={1}>
                        <Form.Item
                          name="birthCityId"
                          label="شهر محل تولد"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب شهر محل تولد الزامی است",
                            },
                          ]}
                        >
                          {listBirthCityProvinceLoading ? (
                            <Spin indicator={antIcon} />
                          ) : (
                              <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="انتخاب نمایید"
                              >
                                {listBirthCityProvince?.map(
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
                          name="nationalityId"
                          label="تابعیت"
                          rules={[
                            {
                              required: true,
                              message: "لطفا تابعیت خود را وارد نمایید",
                            },
                          ]}
                          className="formLable"
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                          >
                            {base?.baseInfo?.Result?.Nationalities?.map(
                              (national: { Id: number; Title: string }) => (
                                <Option key={national.Id} value={national.Id}>
                                  {national.Title}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="denominationId"
                          label="مذهب"
                          className="formLable"
                          rules={[
                            {
                              required: !disableDenomination,
                              message: "انتخاب نام مذهب الزامی است",
                            },
                          ]}
                        >
                          {listDenominationLoading ? (
                            <Spin indicator={antIcon} />
                          ) : (
                              <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="انتخاب نمایید"
                                disabled={disableDenomination}
                              >
                                {listDenomination?.map(
                                  (religion: { Id: number; Title: string }) => (
                                    <Option key={religion.Id} value={religion.Id}>
                                      {religion.Title}
                                    </Option>
                                  )
                                )}
                              </Select>
                            )}
                        </Form.Item>

                        <Form.Item
                          label="تاریخ اعتبار پروانه دادگستری"
                          name="validityOfLicenseOfJudiciary"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message:
                                "لطفا تاریخ اعتبار پروانه دادگستری را وارد نمایید",
                            },
                          ]}
                        >
                          <DatePicker2
                            placeholder="انتخاب تاریخ"
                            value={graduationDate}
                            onChange={(value: any) =>
                              setGraduationDate(value.toDate())
                            }
                          />
                        </Form.Item>

                        <Form.Item
                          name="maritalStatusId"
                          label="وضعیت تاهل"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب وضعیت تاهل الزامی است",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Space direction="vertical">
                              {base?.baseInfo?.Result?.MaritalStatuses?.map(
                                (marital: { Id: number; Title: string }) => (
                                  <Radio key={marital.Id} value={marital.Id}>
                                    {marital.Title}
                                  </Radio>
                                )
                              )}
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                  <Panel header="اطلاعات تحصیلی" key="2">
                    <Row>
                      <Col md={11} offset={1}>
                        <Form.Item
                          label="دانشگاه"
                          name="university"
                          className="formLable"
                          rules={[
                            {

                              required: true,
                              message:
                                " لطفا دانشگاه تحصیل خود را وارد نمایید ",
                            },
                          ]}
                        >
                          <Input name="university" />
                        </Form.Item>
                        <Form.Item
                          label="رشته تحصیلی"
                          name="AcademicFieldId"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب رشته تحصیلی الزامی است",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                          >
                            {base?.baseInfo?.Result?.AcademicFields?.map(
                              (major: { Id: number; Title: string }) => (
                                <Option key={major.Id} value={major.Id}>
                                  {major.Title}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="تاریخ فارغ التحصیلی"
                          name="graduationDate"
                          rules={[
                            {
                              required: true,
                              message: "تاریخ فارغ التحصیلی خود را وارد نمایید",
                            },
                          ]}
                        >
                          <DatePicker2
                            placeholder="انتخاب تاریخ"
                            value={graduationDate}
                            onChange={(value: any) =>
                              value.toDate() > today
                                ? messageWarning(
                                  "تاریخ فارغ التحصیلی نمی تواند بعد زمان جاری باشد"
                                )
                                : setGraduationDate(value.toDate())
                            }
                            ranges={disabledRanges}
                          />

                        </Form.Item>
                      </Col>
                      <Col md={11} offset={1}>
                        <Form.Item
                          name="academicDegreeId"
                          label="مدرک تحصیلی"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب مدرک تحصیلی الزامی است",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                          >
                            {base?.baseInfo?.Result?.AcademicDegrees?.map(
                              (degree: { Id: number; Title: string }) => (
                                <Option key={degree.Id} value={degree.Id}>
                                  {degree.Title}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="گرایش"
                          name="SubAcademicField"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message:
                                "لطفا گرایش رشته تحصیلی خود را وارد نمایید",
                            },
                          ]}
                        >
                          <Input name="SubAcademicField" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                  <Panel header="آدرس محل سکونت" key="3">
                    <Row>
                      <Col md={11} offset={1}>
                        <Form.Item
                          name="provinceId"
                          label="استان محل سکونت"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب استان محل سکونت الزامی است",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            placeholder="انتخاب نمایید"
                            onChange={resideceProvinceHandler}
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
                          name="postalCode"
                          label="کدپستی"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "کدپستی محل سکونت خود را وارد نمایید",
                            },
                            {
                              pattern: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                              message: "کدپستی وارد شده صحیح نمی باشد.",
                            },
                          ]}
                        >
                          <Input name="postalCode" maxLength={10} />
                        </Form.Item>

                        <Form.Item
                          name="address"
                          label="آدرس"
                          rules={[
                            {
                              required: true,
                              message: "لطفا آدرس خود را وارد نمایید",
                            },
                          ]}
                          className="formLable extera"
                          extra="با توجه به اینکه مدارک به آدرس پستی شما ارسال میگردد خواهشمند است در درج آدرس نهایت دقت را اعمال نمایید ."
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                      </Col>
                      <Col md={11} offset={1}>
                        <Form.Item
                          name="CityId"
                          label="شهر محل سکونت"
                          rules={[
                            {
                              required: true,
                              message: "انتخاب شهر محل سکونت الزامی است",
                            },
                          ]}
                        >
                          {listResidenceCityProvinceLoading ? (
                            <Spin indicator={antIcon} />
                          ) : (
                              <Select
                                showSearch
                                optionFilterProp="children"
                                placeholder="انتخاب نمایید"
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
                            )}
                        </Form.Item>
                        <Form.Item
                          name="telephone"
                          label="تلفن محل سکونت"
                          className="formLable"
                          rules={[
                            {
                              pattern: /^\d{3,4}\d{8}$/,
                              message:
                                "تلفن محل سکونت خود را با پیش شماره لطفا وارد نمایید",
                            },
                            {
                              required: true,
                              message: "لطفا تلفن محل سکونت خود را وارد نمایید",
                            },
                          ]}
                        >
                          <Input
                            name="telephone"
                            placeholder="02155555555"
                            // className="dirTextPlaceHolder"
                            maxLength={11}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>

            <Button
              className={classes.rightButton}
              onClick={addRelationFamilyHandler}
              type="primary"
            >
              افزودن نسبت
            </Button>
            <Row>
              <Col span={20} offset={2}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  loading={judicalFamilyMembersLoading}
                  locale={{
                    emptyText:
                      "افزودن اطلاعات حداقل یکی از اعضای خانواده الزامی می‌باشد. هیچ رابطه نسبی وجود ندارد.",
                  }}
                />
              </Col>
            </Row>
            <div className={classes.nextStep}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingPersonalInfo}
                disabled={zeroFamilyMember}
              >
                مرحله بعدی
              </Button>
            </div>
          </Form>
          <Modal
            title="افزودن"
            visible={visibleFamilyMember}
            footer={null}
            onOk={() => setVisibleFamilyMember(false)}
            onCancel={() => setVisibleFamilyMember(false)}
            width={600}
            centered
          >
            {visibleFamilyMember && (
              <AddRelation
                judicalDraftId={judicalDraftId}
                closeModal={() => setVisibleFamilyMember(false)}
              />
            )}
          </Modal>{" "}
          <Modal
            title={`آخرین وضعیت: ${adjusterStatus}`}
            visible={isLastStatusVisible}
            footer={null}
            onOk={() => setIsLastStatusVisible(false)}
            onCancel={() => setIsLastStatusVisible(false)}
            width={500}
            centered
          >
            <LastStatus closModal={() => setIsLastStatusVisible(false)} />
          </Modal>
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default PersonalInfo;
