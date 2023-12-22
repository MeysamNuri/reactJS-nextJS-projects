import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import {
  Button,
  Form,
  Input,
  ConfigProvider,
  Radio,
  Select,
  Checkbox,
  Table,
  Row,
  Col
} from "antd";
import moment from "jalali-moment";
import {
  userEdit,
  getValidCourses,
  sendDraftId,
  sendLegalId,
  sendJudicalId,
  isComeFromRegistration,
  getAllAdjusterType,
  isLoggedInOrInquired,
  fetchNaturalJudicalPesonalList,
  emptySerachedAdjuster
} from "../../../redux/actions";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { licenseTypes } from "../../../shared/ulitities/Enums/licenseTypes ";
import { ICourse } from "../../../shared/ulitities/Model/course";
import {
  INaturalPersonalList,
  INewId,
} from "../../../shared/ulitities/Model/login";
import styles from "./AdjusterRegister.module.css";
import { toast } from "react-toastify";

const { Option } = Select;
const { Search } = Input
interface IAdjusterFastRegister {
  closeModal?: () => void;
  personMoblile: number
}

const AdjusterFastRegister: FC<IAdjusterFastRegister> = ({ closeModal, personMoblile }) => {
  const [form] = Form.useForm();
  let history = useHistory();
  const [searchValue, setSearchValue] = useState("")
  const [selectedAdjusterInfo, setSelctedAdjusterInfo] = useState<any>()
  const dispatch = useDispatch();
  const [registerCloseDate, setRegisterCloseDate] = useState("");
  const [registerOpenDate, setRegisterOpenDate] = useState("");
  const [isSelectCourse, setIsSelectCourse] = useState(false);
  const [adjusterTypeId, setAdjusterTypeId] = useState(0);

  const { loading, naturaljudicalPersonalList } = useSelector(
    (state: any) => state.naturaljudicalPersonalList
  );
  /*  const { NewDraftId, error } = useSelector((state: any) => state.NewDraftId); */

  const allAdjusterType = useSelector(
    (state: any) => state?.allAdjusterType?.allAdjusterType
  );

  const loadingNewDraftIDNatural = useSelector(
    (state: any) => state?.NewDraftId?.loading
  );
  const loadingNewDraftIDLegal = useSelector(
    (state: any) => state?.newDraftLegalId.loading
  );
  const loadingNewDraftIDJudicial = useSelector(
    (state: any) => state?.newJudicalDraftId?.loading
  );
  const validCourses = useSelector(
    (state: any) => state?.getValidCourses?.validCourses?.Result
  );

  const { checkPhoneNumber } = useSelector(
    (state: any) => state.checkPhoneNumber
  );

  const { register } = useSelector(
    (state: any) => state.checkPhoneNumber
  );

  const onFinish = (values: any) => {
    let adjusterNatural: INewId = {
      adjusterTypeId: values.adjusterTypeId,
      courseId: values.courseId,
      nationalCode: values.nationalCode??register?.Result?.NationalCode,
      // birthDate: values.birthDate,
      birthDate:
        values.birthDate?
        moment(values.birthDate.toDate()).format("YYYY-MM-DD"):register?.Result?.BirthDate,
      applicantId: values.ApplicantId,
      mobile: checkPhoneNumber.Result?.Item3 ?? personMoblile,
      licenseType:
        values.licenseType === true
          ? licenseTypes.SecondLicense
          : licenseTypes.FirstLicense,
    };
    let adjusterLegal = {
      adjusterTypeId: values.adjusterTypeId,
      courseId: values.courseId,
      applicantId: selectedAdjusterInfo?.applicantId,
      mobile: checkPhoneNumber.Result?.Item3 ?? personMoblile,
    };
    let adjusterJudicial: INewId = {
      adjusterTypeId: values.adjusterTypeId,
      courseId: values.courseId,
      nationalCode: values.nationalCode??register?.Result?.NationalCode,
      birthDate:
        values.birthDate?
        moment(values.birthDate.toDate()).format("YYYY-MM-DD"):register?.Result?.BirthDate,
      applicantId: values.ApplicantId,
      mobile: checkPhoneNumber.Result?.Item3 ?? personMoblile,
      licenseType: licenseTypes.FirstLicense,
    };

    dispatch(userEdit(false));
    localStorage.setItem("userEdit", "");
    dispatch(isComeFromRegistration(true));

    switch (values.adjusterTypeId) {
      case adjusterType.natural:
        dispatch(isLoggedInOrInquired(true));
        dispatch(
          sendDraftId(adjusterNatural, () => {
            history.push("/natural");
          })
        );
        break;
      case adjusterType.legal:
        dispatch(isLoggedInOrInquired(true));

        if (!selectedAdjusterInfo?.applicantId) return toast.warning("لطفا مدیر عامل را انتخاب کنید")
        dispatch(
          sendLegalId(adjusterLegal, () => {
            history.push("/legal");
          })
        );
        break;
      case adjusterType.judical:
        dispatch(isLoggedInOrInquired(true));
        dispatch(
          sendJudicalId(adjusterJudicial, () => {
            history.push("/judical");
          })
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.history.pushState({}, document.title, window.location.pathname);
  }, [])
  const CourseIdHandler = (i: any) => {
    // setRegisterOpenDate("");
    // setRegisterCloseDate("");
    setAdjusterTypeId(i.target.value);
    dispatch(getValidCourses(i?.target?.value));
    setIsSelectCourse(true);
    form.setFieldsValue({ courseId: undefined });
  };

  const handleSelectedCourse = (value: any) => {
    validCourses?.map((course: ICourse) => {
      if (course.CourseId === value) {
        const opn = course.RegisterOpenDate.split("T")[0];
        const cls = course.RegisterCloseDate.split("T")[0];
        setRegisterOpenDate(opn);
        setRegisterCloseDate(cls);
      }
    });
  };

  useEffect(() => {
    dispatch(getAllAdjusterType());
    // dispatch(fetchNaturalJudicalPesonalList());
  }, []);
  const onSearch = (value: any) => {
    setSelctedAdjusterInfo({})
    setSearchValue(value)
    const searchOBJ = {
      count: 5,
      searchTerm: value
    }
    dispatch(fetchNaturalJudicalPesonalList(searchOBJ))
  }

  const handleSlectedAdjuster = (record: any) => {
    dispatch(emptySerachedAdjuster())
    setSelctedAdjusterInfo(record)
  }
  let data = naturaljudicalPersonalList?.Result?.map((request: any) => {
    let obj = {
      Id: request.Id,
      key: request.Id,
      adjusterCode: request.AdjusterCode,
      firstName: request.FirstName,
      familyName: request.FamilyName,
      applicantId: request.ApplicantId
    };
    return obj;
  });
  //coloumns Table
  let columns: any = [
    {
      title: "کد ارزیاب",
      dataIndex: "adjusterCode",
      key: "adjusterCode",
      width: "18%",

    },
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",

    },
    {
      title: "نام خانوادگی",
      dataIndex: "familyName",
      key: "familyName",
      width: "20%",

    },
    {
      title: "عملیات",
      dataIndex: "action",
      key: "action",
      width: "7%",
      render: (p: any, record: any) => <Button type="primary" onClick={() => handleSlectedAdjuster(record)}>انتخاب</Button>
    },
  ]
  return (
    <ConfigProvider direction="rtl">
      <Form name="basic" onFinish={onFinish} form={form}>
        <Form.Item
          name="adjusterTypeId"
          label="نوع ارزیاب"
          rules={[
            { required: true, message: "انتخاب نوع ارزیاب الزامی می باشد" },
          ]}
          labelCol={{ span: 5 }}
        >
          <Radio.Group className={styles.radioGroup} onChange={CourseIdHandler}>
            {allAdjusterType?.Result?.map(
              ({
                CourseTypeId,
                Title,
              }: {
                CourseTypeId: number;
                Title: string;
              }) => (
                <Radio.Button
                  key={CourseTypeId}
                  value={CourseTypeId}
                  className={styles.radioButtonAdjTp}
                >
                  {Title}
                </Radio.Button>
              )
            )}
          </Radio.Group>
        </Form.Item>
        {adjusterTypeId === adjusterType.legal ? (
          <>
            <Form.Item
              name="ApplicantId"
              label={<span><span style={{ color: "red", fontSize: "14px" }}>*</span> مدیر عامل </span>}
              labelCol={{ span: 5 }}

            >
              {/* <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                onChange={handleSelectedCourse}
                allowClear
                notFoundContent={
                  naturaljudicalPersonalList?.Result === null &&
                  "ارزیابی موجود نیست"
                }
              >
                {naturaljudicalPersonalList?.Result?.map(
                  (person: INaturalPersonalList) => (
                    <Option key={person.PersonId} value={person.ApplicantId}>
                      {person.FullName}
                    </Option>
                  )
                )}
              </Select> */}
              <p>جستجو بر اساس نام خانوادگی یا کد ارزیابی</p>
              <Search placeholder="جستجوی نام خانوادگی یا کد ارزیابی"
                loading={loading}
                onSearch={onSearch} />

            </Form.Item>
            {
              selectedAdjusterInfo?.adjusterCode === undefined ?
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  locale={{ emptyText: "لیست خالی می باشد" }}
                /> :
                <Row className="manager-info-container">
                  <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                    <p>کد ارزیابی :</p>
                    <span>{selectedAdjusterInfo?.adjusterCode}</span>
                  </Col>
                  <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                    <p>نام و نام خانوادگی :</p>
                    <span>{`${selectedAdjusterInfo?.firstName} ${selectedAdjusterInfo?.familyName} `}</span>
                  </Col>
                </Row>
            }
            {/*  <Form.Item
              name="mobileNumber"
              label="شماره موبایل"
              rules={[
                {
                  required: true,
                  message: "وارد کردن شماره موبایل الزامی است",
                },
                {
                  pattern: /^\d{11}$/,
                  message: " شماره موبایل وارد شده صحیح نمی باشد.",
                },
              ]}
              labelCol={{ span: 5 }}
              className={styles.formItem}
            >
              <Input
                name="mobileNumber"
                placeholder="شماره موبایل"
                maxLength={11}
                className={styles.formInputNatCode}
              />
            </Form.Item> */}
          </>
        ) : (
            <>
              {
                register?.Result?.NationalCode ? null :

                  <>

                    <Form.Item
                      name="nationalCode"
                      label="کد ملی"
                      rules={[
                        {
                          required: true,
                          message: "وارد کردن کد ملی الزامی است",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "کدملی وارد شده صحیح نمی باشد.",
                        },
                      ]}
                      labelCol={{ span: 5 }}
                      className={styles.formItem}
                    >
                      <Input name="nationalCode" placeholder="کد ملی" maxLength={10} />
                    </Form.Item>
                    <Form.Item
                      name="birthDate"
                      label="تاریخ تولد"
                      rules={[
                        {
                          required: true,
                          message: "انتخاب تاریخ تولد الزامی است",
                        },
                      ]}
                      labelCol={{ span: 5 }}
                    >
                      <DatePicker2
                        placeholder="انتخاب تاریخ"
                        className={styles.formInput}
                      />
                    </Form.Item>
                  </>
              }

              {adjusterTypeId === adjusterType.natural && (
                <Form.Item
                  name="licenseType"
                  valuePropName="checked"
                // label="متقاضی پروانه دوم می باشم"
                >
                  <Checkbox>متقاضی پروانه دوم می باشم</Checkbox>
                </Form.Item>
              )}
            </>
          )}

        <Form.Item
          name="courseId"
          label="دوره ها"
          labelCol={{ span: 5 }}
          //className={styles.formItem}
          rules={[{ required: true, message: "انتخاب دوره ها الزامی می باشد" }]}
        >
          {isSelectCourse ? (
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="در ابتدا نوع ارزیاب را انتخاب نمایید"
              onChange={handleSelectedCourse}
              notFoundContent={
                validCourses?.length === 0 && "دوره ای یافت  نشد"
              }
            >
              {validCourses?.map((course: ICourse) => (
                <Option key={course.CourseId} value={course.CourseId}>
                  {course.Title}
                </Option>
              ))}
            </Select>
          ) : (
              <p className={styles.selectAdjTypeText}>
                در ابتدا نوع ارزیاب را انتخاب نمایید
              </p>
            )}
        </Form.Item>
        <div className={styles.ValidDatefromTo}>
          {registerOpenDate && registerCloseDate && (
            <>
              <div>
                <span style={{ color: "#7987a1" }}>مهلت ثبت نام : </span>
                از تاریخ: {moment(registerOpenDate).format("jD-jM-jYYYY") + " "}
                تا تاریخ: {moment(registerCloseDate).format("jD-jM-jYYYY")}
              </div>
            </>
          )}
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={
              loadingNewDraftIDNatural ||
              loadingNewDraftIDLegal ||
              loadingNewDraftIDJudicial
            }
            block
            className={styles.button}
          >
            ثبت نام
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default AdjusterFastRegister;
