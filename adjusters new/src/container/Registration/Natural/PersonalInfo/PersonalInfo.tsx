//libraries
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
  Collapse,
  Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import AddRelation from "./AddRelation";
import { toast } from "react-toastify";
import LastStatus from "../../lastStatus/LastStatus";
import {
  getAllFamilyMember,
  deletFamilyMember,
  postPersonalInfo,
  uploadProfilePicDraft,
  uploadProfilePicEdit,
  getAllFamilyMemberEdit,
  patchPersonalInfoEdit,
  deletFamilyMemberEdit,
  getDenomtionReligionId,
  getProfilePicDraftNatural,
  getProfilePicEditNatural,
  getPersonalInfoNaturalEdit,
  getBirthCityProvinceIdNatural,
  getResidenceCityProvinceIdNatural,
  getRejectReasonListApplicantDocument,
  getapplicantRejectReason,
  getWorkExperienceRejectReason,
  getPersonalInfoNaturalDraft,
  isComeFromRegistration,
} from "../../../../redux/actions";
import { messageError, messageWarning } from "../../../../utils/utils";
import { relationshipId } from "../../../../shared/ulitities/Enums/relationshipId";
import { INaturalDraftPersonalInfo } from "../../../../shared/ulitities/Model/draftNatural";
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import { ReactComponent as Profile } from "../../../../assets/images/profile.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import classes from "./PersonalInfo.module.css";
import "../../Registration.css";

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

  const [selectedFamilyMember, setSelectedFamilyMember] = useState({
    famliyMemberId: 0,
  });
  const [militaryStatus, setMilitaryStatus] = useState(0);
  const [zeroFamilyMember, setZeroFamilyMember] = useState(true);
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );

  const base = useSelector((state: any) => state.baseData);
  const baseInfoLoading = useSelector((state: any) => state?.baseData?.loading);

  const isUserEdit = localStorage.getItem("userEdit");

  const resultProfile = useSelector((state: any) =>
    isUserEdit
      ? state?.resProfilePic?.showProfilePic?.Result?.Content
      : state?.resProfilePic?.showProfilePic?.Content
  );

  const resultProfileLoading = useSelector(
    (state: any) => state?.resProfilePic?.loading
  );

  const inquiry = useSelector((state: any) => state.NewDraftId.newId?.Result);

  const inquiryMobileNumber = useSelector(
    (state: any) => state?.NewDraftId?.mobile
  );

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const isApplicantSecondLicense = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.IsApplicantSecondLicense
  );
  // const draftIdLocalStorage = useSelector(
  //   (state: any) => state.NewDraftId.newId
  // );
  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");

  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const loadingPersonalInfo = useSelector(
    (state: any) => state.personInfo.loading
  );
  const listDenomination = useSelector(
    (state: any) => state.listDenominationReligionId.listDenonationReligion
  );
  const listDenominationLoading = useSelector(
    (state: any) => state?.listDenominationReligionId?.loading
  );
  const reFamilyMemberLoading = useSelector(
    (state: any) => state.deletFamily.loading
  );
  let familyMembers = useSelector(
    (state: any) => state.allFamilyMembers.allFamilyMember?.Result
  );
  let familyMembersLoading = useSelector(
    (state: any) => state.allFamilyMembers.loading
  );
  const personalInfo = useSelector(
    (state: any) => state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  );

  const uploadProfilePicLoading = useSelector(
    (state: any) => state?.profilePic?.loading
  );
  const listBirthCityProvince = useSelector(
    (state: any) =>
      state?.getBirthCityProvinceIdNatural?.getBirthCityProvinceIdNatural
  );
  const listBirthCityProvinceLoading = useSelector(
    (state: any) => state?.getBirthCityProvinceIdNatural?.loading
  );
  const listResidenceCityProvince = useSelector(
    (state: any) =>
      state?.getResidenceCityProvinceIdNatural
        ?.getResidenceCityProvinceIdNatural
  );
  const listResidenceCityProvinceLoading = useSelector(
    (state: any) => state?.getResidenceCityProvinceIdNatural?.loading
  );
  const adjusterStatus = useSelector(
    (state: any) =>
      state?.sendNatAndRegCodes?.response?.Result?.ApplicantStatusTitle
  );

  const onFinish = (values: any) => {
    setGraduationDate(moment(values.graduationDate.toDate()));
    let personalInformation: INaturalDraftPersonalInfo = {
      birthProvinceId: values.birthProvinceId,
      birthCityId: values.birthCityId,
      issueCityId: values.issueCityId,
      hasAdjusterCode: values.AdjusterCode,
      nationalityId: values.nationalityId,
      religionId: values.religionId,
      denominationId: values.denominationId,
      maritalStatusId: values.maritalStatusId,
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
          patchPersonalInfoEdit(gotIdForMainEdit, personalInformation, onSubmit)
        );
      } else if (!isUserEdit) {
        dispatch(postPersonalInfo(draftId, personalInformation, onSubmit));
      }
    } else if (resultProfile === undefined) {
      messageError("عکس پروفایل ارسال نگردیده است");
    }
  };

  const deleteRowHandler = (record: any) => {
    setSelectedFamilyMember({ famliyMemberId: record.nationalCode });
    if (isUserEdit) {
      dispatch(
        deletFamilyMemberEdit(gotIdForMainEdit, record.nationalCode, () => {
          dispatch(getAllFamilyMemberEdit(gotIdForMainEdit));
        })
      );
    } else {
      dispatch(
        deletFamilyMember(draftId, record.nationalCode, () => {
          dispatch(getAllFamilyMember(draftId));
        })
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
            uploadProfilePicEdit(gotIdForMainEdit, file, () => {
              dispatch(getProfilePicEditNatural(gotIdForMainEdit));
            })
          );
        } else {
          dispatch(
            uploadProfilePicDraft(draftId, file, () => {
              dispatch(getProfilePicDraftNatural(draftId));
            })
          );
        }
      }
    );
  };

  //let getDate = new Date();
  // let tdat = getDate.toLocaleDateString();
  // let test = new Date(getDate.getFullYear() + 1, 1, 1);
  // console.log(test, "test");

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // console.log(today, "today");
  // console.log(tomorrow, "tomorrow");

  // let lastYear = new Date(new Date().getFullYear(), 13, 48);

  const religionHandlerHandler = (value: number) => {
    dispatch(getDenomtionReligionId(value));
    form.setFieldsValue({ denominationId: undefined });
  };

  const birthProvinceHandler = (value: number) => {
    dispatch(getBirthCityProvinceIdNatural(value));
    form.setFieldsValue({ birthCityId: undefined });
  };

  const resideceProvinceHandler = (value: number) => {
    dispatch(getResidenceCityProvinceIdNatural(value));
    form.setFieldsValue({ CityId: undefined });
  };

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      setIsLastStatusVisible(true);
      dispatch(getProfilePicEditNatural(gotIdForMainEdit));
      dispatch(getAllFamilyMemberEdit(gotIdForMainEdit));
      dispatch(getPersonalInfoNaturalEdit(gotIdForMainEdit));
      resultLogin?.ApplicantStatusId !==
        workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
        dispatch(getapplicantRejectReason(gotIdForMainEdit));
      resultLogin?.ApplicantStatusId !==
        workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
        dispatch(getWorkExperienceRejectReason(gotIdForMainEdit));
      resultLogin?.ApplicantStatusId !==
        workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
        dispatch(getRejectReasonListApplicantDocument(gotIdForMainEdit));
    } else if (!isUserEdit) {
      if (isApplicantSecondLicense) {
        dispatch(getPersonalInfoNaturalDraft(draftId));
        dispatch(getAllFamilyMember(draftId));
        dispatch(getProfilePicDraftNatural(draftId));
        dispatch(isComeFromRegistration(false));
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
      dispatch(
        getBirthCityProvinceIdNatural(personalInfo?.Result?.BirthProvinceId)
      );
      dispatch(
        getResidenceCityProvinceIdNatural(personalInfo?.Result?.ProvinceId)
      );
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
    if (familyMembers?.length > 0) {
      setZeroFamilyMember(false);
    } else {
      setZeroFamilyMember(true);
    }
  }, [familyMembers]);

  useEffect(() => {
    if (!isUserEdit) {
      setMaleOrFemale(inquiry?.Gender);
      form.setFieldsValue({ mobile: inquiryMobileNumber });
    }
  }, [inquiry]);

  let disabledRanges = [
    {
      disabled: true,
      start: tomorrow,
      end: moment(tomorrow).add(100, "years"),
    },
  ];

  let data = familyMembers?.map(
    (member: {
      FirstName: string;
      FamilyName: string;
      FamilyRelation: number;
      NationalCode: number;
      BirthDate: any;
    }) => {
      let membersFamily = {
        key: member?.NationalCode,
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
            : member.FamilyRelation === relationshipId.Spouse
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
            okText="بله"
            cancelText="خیر"
          >
            <Button
              type="text"
              // loading={reFamilyMemberLoading}
              disabled={
                resultLogin?.ApplicantStatusId ===
                workTaskFlowId?.ReturnToApplicantToCompleteDossier
              }
            >
              <Trash />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //   graduationDate > today &&
  //    messageWarning(
  //        "تاریخ فارغ التحصیلی نمی تواند بعد زمان جاری باشد"
  //   )

  // }, [graduationDate])

  return (
    <div className="personalInfo">
      <ConfigProvider direction="rtl">
        <Spin spinning={baseInfoLoading} delay={500}>
          <Row>
            <Col span={10} order={1}>
              <Form.Item
                name="upload"
                label="بارگذاری تصویر"
                valuePropName="fileList"
                extra="حداکثر 500 کیلو بایت و با فرمت jpg یا png"
                className={classes.uploader}
                rules={[
                  {
                    required: true,
                    message: "وارد کردن عکس الزامی است",
                  },
                ]}
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
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                    }
                  />
                  {uploadProfilePicLoading ||
                    (resultProfileLoading && <Spin indicator={antIcon} />)}
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
                    : inquiry?.FirstName}
                </span>
              </Form.Item>
              <Form.Item label="نام خانوادگی">
                <span>
                  {isUserEdit
                    ? personalInfo?.Result?.FamilyName
                    : inquiry?.FamilyName}
                </span>
              </Form.Item>

              <Form.Item label="کدملی" className="changeMargin ">
                <span>
                  {isUserEdit
                    ? personalInfo?.Result?.NationalCode
                    : inquiry?.NationalCode}
                </span>
              </Form.Item>
              <Form.Item label="تاریخ تولد" name="birthDate">
                {isUserEdit
                  ? moment(
                      personalInfo?.Result?.BirthDate.split("T")[0]
                    ).format("jYYYY-jM-jD")
                  : moment(inquiry?.BirthDate.split("T")[0]).format(
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
                            placeholder="انتخاب نمایید"
                            optionFilterProp="children"
                            onChange={birthProvinceHandler}
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            allowClear
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
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            allowClear
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
                            placeholder="انتخاب نمایید"
                            onChange={religionHandlerHandler}
                            optionFilterProp="children"
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            allowClear
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
                          <Input disabled={true} maxLength={11} />
                        </Form.Item> */}
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
                          <Input
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            placeholder="example@gmail.com"
                          />
                        </Form.Item>

                        {/* <Form.Item
                          name="gender"
                          label="جنسیت"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message: "جنسیت خود را انتخاب نمایید",
                            },
                          ]}
                        >
                          <Radio.Group
                            //onChange={handleMaleOrFemale}
                            disabled={resultLogin?.ApplicantStatusId === workTaskFlowId?.ReturnToApplicantToCompleteDossier}
                            value={maleOrFemale}
                          >
                            <Space direction="vertical">
                              <Radio key={1} value={1}>
                                مرد */}
                        {maleOrFemale === 1 && (
                          <Form.Item
                            name="militaryStatusId"
                            label="وضعیت نظام وظیفه"
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
                                    // style={{ width: "50px" }}
                                  >
                                    {military.Title}
                                  </Radio.Button>
                                )
                              )}
                            </Radio.Group>
                          </Form.Item>
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
                              disabled={
                                resultLogin?.ApplicantStatusId ===
                                workTaskFlowId?.ReturnToApplicantToCompleteDossier
                              }
                              allowClear
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
                              message: "انتخاب تابعیت الزامی است",
                            },
                          ]}
                          className="formLable"
                        >
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
                              allowClear
                              disabled={
                                disableDenomination ||
                                resultLogin?.ApplicantStatusId ===
                                  workTaskFlowId?.ReturnToApplicantToCompleteDossier
                              }
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
                                  <Radio
                                    key={marital.Id}
                                    value={marital.Id}
                                    disabled={
                                      resultLogin?.ApplicantStatusId ===
                                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                                    }
                                  >
                                    {marital.Title}
                                  </Radio>
                                )
                              )}{" "}
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
                          <Input
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                          />
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
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            allowClear
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
                            timePicker={false}
                            value={graduationDate}
                            onChange={(value: any) =>
                              // value.toDate() > today
                              //   ? messageWarning(
                              //       "تاریخ فارغ التحصیلی نمی تواند بعد زمان جاری باشد"
                              //     )
                              //   :
                                 setGraduationDate(value.toDate())
                            }
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            ranges={disabledRanges}
                            // removable={()=>setGraduationDate(null)}
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
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            allowClear
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
                          <Input
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                          />
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
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            allowClear
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
                          label="تلفن محل سکونت"
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              pattern: /^\d{3,4}\d{8}$/,
                              message: "لطفا تلفن محل سکونت خود را وارد نمایید",
                            },
                          ]}
                        >
                          <Input
                            placeholder="شماره تلفن خود را همراه با پیش شماره بدون فاصله وارد نمایید"
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
                          className="formLable"
                          rules={[
                            {
                              required: true,
                              message:
                                " لطفا کدپستی محل سکونت خود را وارد نمایید  ",
                            },
                            {
                              // pattern: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                              pattern: /^\d{10}$/,
                              message: "کدپستی وارد شده صحیح نمی باشد.",
                            },
                          ]}
                        >
                          <Input
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                            maxLength={10}
                          />
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
                              disabled={
                                resultLogin?.ApplicantStatusId ===
                                workTaskFlowId?.ReturnToApplicantToCompleteDossier
                              }
                              allowClear
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
                          <TextArea
                            rows={4}
                            disabled={
                              resultLogin?.ApplicantStatusId ===
                              workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
            <div className={classes.rightButton}>
              <Button
                onClick={addRelationFamilyHandler}
                type="primary"
                disabled={
                  resultLogin?.ApplicantStatusId ===
                  workTaskFlowId?.ReturnToApplicantToCompleteDossier
                }
              >
                افزودن نسبت
              </Button>
            </div>
            <Row>
              <Col span={20} offset={2}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  loading={familyMembersLoading}
                  locale={{
                    emptyText:
                      "افزودن اطلاعات حداقل یکی از اعضای خانواده الزامی می‌باشد. هیچ رابطه نسبی وجود ندارد.",
                  }}
                  bordered={true}
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
                draftId={draftId}
                closeModal={() => setVisibleFamilyMember(false)}
              />
            )}
          </Modal>
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
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default PersonalInfo;
