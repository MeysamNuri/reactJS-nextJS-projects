//libraries
import React, { FC, useEffect, useState } from "react";
import {
  Form,
  ConfigProvider,
  Row,
  Col,
  Select,
  Input,
  Radio,
  Button,
  Spin,
  Space,
  Empty,
  Table,
  Alert
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "jalali-moment";

//redux actuator functions
import {
  sendBoardMemberDraft,
  fetchBoarMemberListLegalDraft,
  fetchBoardMemberListLegalEdit,
  sendBoardMemberEdit,
  getBirthCityProvinceIdLegal,
  isComeFromRegistration,
  isAddMemberClicked,
  fetchNaturalJudicalPesonalList,
  emptySerachedAdjuster
} from "../../../../redux/actions";

//styles
import classes from "./BoardMember.module.css";
import { toast } from 'react-toastify'
//components
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import CardBoardMember from "./CardBoardMember";
import { INaturalPersonalAll } from "../../../../shared/ulitities/Model/naturalPersonalAll";

const { Option } = Select;
const { TextArea } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface IBoardMember {
  onSubmit: () => void;
  onPrev: () => void;
}

const BoardMember: FC<IBoardMember> = ({ onSubmit, onPrev }) => {
  const [form] = Form.useForm();
  const { Search } = Input
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("")
  const [selectedAdjusterInfo, setSelctedAdjusterInfo] = useState<any>()
  const base = useSelector((state: any) => state.baseData);
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [isDataIncomplete, setIsDataIncomplete] = useState(false);
  const [haveOneMember, setHaveOneMember] = useState(false);

  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

  const addLoadingState = useSelector(
    (state: any) => state.boadMemberAddToListLoadingStatelegal?.loading
  );
  const getLoadingState = useSelector(
    (state: any) => state.listDraftWorkExperienceLegal?.loading
  );
  const listBoardMemberContent = useSelector(
    (state: any) =>
      state.listDraftWorkExperienceLegal.listWorkExperienceLegal?.Result
  );
  const gotAllInfoBoardMember = useSelector(
    (state: any) =>
      state?.getAllInfoBoardMemberWorkExperience?.boardMemberRelatedInfo
  );
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const { loading, naturaljudicalPersonalList } = useSelector(
    (state: any) => state.naturaljudicalPersonalList
  );
  const { companyTyesDetails } = useSelector(
    (state: any) => state?.getCompanyInfoDraftLegal
  );

  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  // const listBirthCityProvince = useSelector(
  //   (state: any) =>
  //     state?.getBirthCityProvinceLegal?.getBirthCityProvinceIdLegal
  // );
  // const listBirthCityProvinceLoading = useSelector(
  //   (state: any) => state?.getBirthCityProvinceLegal?.loading
  // );
  // const comeFromRegistration = useSelector(
  //   (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  // );
  const { naturalPersonalAll } = useSelector(
    (state: any) => state.naturalPersonalAll
  );
  const isAddMemberClickedGlabalState = useSelector(
    (state: any) => state?.isAddMemberClickedLegal?.isClicked
  );

  const workLocationInfo = useSelector(
    (state: any) => state?.getWorkLocationDraftLegal?.workLocation?.Result
  );
  const onFinish = (values: any) => {
    let boardMember = isUserEdit
      ? {
        ApplicantId: selectedAdjusterInfo?.applicantId,
        appointmentDate: values.appointmentDate,
        positionId: Number(values.positionId),
        workLocationInfoId: workLocationInfo[0]?.Id,
      }
      : {
        // nationalCode: values.nationalCode,
        ApplicantId: selectedAdjusterInfo?.applicantId,
        //birthDate: values.birthDate,
        // provinceId: values.provinceId,
        //cityId: Number(values.cityId),
        // university: values.university,
        // academicDegreeId: Number(values.academicDegreeId),
        // AcademicFieldId: Number(values.AcademicFieldId),
        // SubAcademicField: values.SubAcademicField,
        // graduationDate: values.graduationDate,
        appointmentDate: values.appointmentDate,
        positionId: Number(values.positionId),
        // adjusterCode: values.adjusterCode,
        // email: values.email,
        // address: values.address,
        // mobile: values.mobile,
        // telephone: values.telephone,
        // postalCode: values.postalCode,
      };

    if (isUserEdit) {
      dispatch(
        sendBoardMemberEdit(gotIdForMainEdit, boardMember, () => {
          dispatch(fetchBoardMemberListLegalEdit(gotIdForMainEdit));
          dispatch(isAddMemberClicked(true));
        })
      );
      form.resetFields();
    } else {
      if (!selectedAdjusterInfo?.applicantId) return toast.warning("لطفا مدیر عامل را انتخاب کنید")
      dispatch(
        sendBoardMemberDraft(legalDraftId, boardMember, () => {
          dispatch(fetchBoarMemberListLegalDraft(legalDraftId, () => { }));
          dispatch(isAddMemberClicked(true));
        })
      );
      form.resetFields();
    }
  };

  //click handlers
  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };
  const nextHandler = () => {
    onSubmit();
  };
  const handleEdit = () => {
    setEditButtonClicked(true);
  };
  const birthProvinceHandler = (value: number) => {
    dispatch(getBirthCityProvinceIdLegal(value));
    form.setFieldsValue({ cityId: undefined });
  };

  //lifecycle hooks here
  useEffect(() => {

    if (isUserEdit) {
      dispatch(fetchBoardMemberListLegalEdit(gotIdForMainEdit));
    } else if (!isUserEdit && listBoardMemberContent !== undefined) {
      form.setFieldsValue({
        // nationalCode: listBoardMemberContent[0]?.NationalCode,
        // birthDate: moment(listBoardMemberContent[0]?.BirthDate.split("T")[0]),
        positionId: listBoardMemberContent[0]?.PositionId,
      });
    }
  }, []);



  const handleSlectedAdjuster = (record: any) => {
    dispatch(emptySerachedAdjuster())
    setSelctedAdjusterInfo(record)
  }
  const onSearch = (value: any) => {
    setSelctedAdjusterInfo({})
    setSearchValue(value)
    const searchOBJ = {
      count: 5,
      searchTerm: value
    }
    dispatch(fetchNaturalJudicalPesonalList(searchOBJ))
  }
  useEffect(() => {
    if (
      listBoardMemberContent !== null &&
      listBoardMemberContent !== undefined
    ) {
      if (listBoardMemberContent?.length === 1) {
        setHaveOneMember(true);
      } else if (listBoardMemberContent?.length !== 1) {
        setHaveOneMember(false);
      }
      if (
        //listBoardMemberContent[0]?.AcademicDegreeId === 0 &&
        listBoardMemberContent[0]?.CityId === 0 &&
        listBoardMemberContent[0]?.ProvinceId === 0
      ) {
        setIsDataIncomplete(true);
      } else {
        setIsDataIncomplete(false);
      }
    }
  }, [listBoardMemberContent]);

  useEffect(() => {
    if (gotAllInfoBoardMember !== null && editButtonClicked) {
      form.setFieldsValue({
        nationalCode: gotAllInfoBoardMember?.Result?.NationalCode,
        birthDate:
          parseInt(
            gotAllInfoBoardMember?.Result?.BirthDate?.split("T")[0]?.substring(
              0,
              4
            )
          ) > 1900
            ? moment(gotAllInfoBoardMember?.Result?.BirthDate.split("T")[0])
            : undefined,
        provinceId:
          gotAllInfoBoardMember?.Result?.ProvinceId !== 0
            ? gotAllInfoBoardMember?.Result?.ProvinceId
            : undefined,
        cityId:
          gotAllInfoBoardMember?.Result?.CityId !== 0
            ? gotAllInfoBoardMember?.Result?.CityId
            : undefined,
        university: gotAllInfoBoardMember?.Result?.University,
        academicDegreeId: gotAllInfoBoardMember?.Result?.AcademicDegreeId,
        AcademicFieldId: gotAllInfoBoardMember?.Result?.AcademicFieldId,
        SubAcademicField: gotAllInfoBoardMember?.Result?.SubAcademicField,
        graduationDate:
          parseInt(
            gotAllInfoBoardMember?.Result?.GraduationDate?.split(
              "T"
            )[0]?.substring(0, 4)
          ) > 1900
            ? moment(
              gotAllInfoBoardMember?.Result?.GraduationDate.split("T")[0]
            )
            : undefined,
        appointmentDate:
          parseInt(
            gotAllInfoBoardMember?.Result?.AppointmentDate?.split(
              "T"
            )[0]?.substring(0, 4)
          ) > 1900
            ? moment(
              gotAllInfoBoardMember?.Result?.AppointmentDate.split("T")[0]
            )
            : undefined,
        positionId: gotAllInfoBoardMember?.Result?.PositionId,
        adjusterCode: gotAllInfoBoardMember?.Result?.AdjusterCode,
        email: gotAllInfoBoardMember?.Result?.Email,
        address: gotAllInfoBoardMember?.Result?.Address,
        mobile: gotAllInfoBoardMember?.Result?.Mobile,
        telephone: gotAllInfoBoardMember?.Result?.Telephone,
        postalCode: gotAllInfoBoardMember?.Result?.PostalCode,
      });
    }
  }, [gotAllInfoBoardMember?.IsSucceed, gotAllInfoBoardMember?.Result]);
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
      <Row>
        <Col span={24}>
          {haveOneMember && !isAddMemberClickedGlabalState && (
            <p style={{ color: "red" }}>
              {" "}
                لطفا در ابتدا اطلاعات مدیر عامل را تکمیل نمایید
            </p>
          )}
        </Col>
      </Row>
      <Form
        onFinish={onFinish}
        form={form}
        name="boardMember"
        className={`${classes.ItemContainer} personalInfo`}
        scrollToFirstError={true}
        labelCol={{ xxl: { span: 4 }, xl: { span: 4 }, lg: { span: 6 }, sm: { span: 8 }, xs: { span: 8 } }}

      >
        <Row>
          <Col style={{ paddingLeft: "15px" }} xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} >


            <Form.Item
              label="تاریخ انتصاب"
              name="appointmentDate"
              className="formLable"
              rules={[
                {
                  required: true,
                  message: "انتخاب تاریخ انتصاب الزامی است",
                },
              ]}
            >
              <DatePicker2 placeholder="انتخاب تاریخ" />
            </Form.Item>
          </Col>
          <Col style={{ paddingLeft: "15px" }} xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} >
            <Form.Item
              name="positionId"
              label="سمت"
              // className="formLable"
              rules={[
                {
                  required: true,
                  message: "انتخاب سمت الزامی است",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
              >
                {base?.baseInfo?.Result?.Positions?.map(
                  (Position: { Id: number; Title: string }) => (
                    <Option
                      key={Position.Id}
                      value={Position.Id}
                      disabled={haveOneMember && !isAddMemberClickedGlabalState && Position.Id !== 1 && isUserEdit !== "1"
                      }
                    >
                      {Position.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col style={{ paddingLeft: "15px" }} xxl={{ span: 12 }} xl={{ span: 12 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} >
            <Form.Item
              label={<span><span style={{ color: "red", fontSize: "14px" }}>*</span> ارزیابان حقیقی </span>}
              name="naturalApplicantId"
              className="formLable"

            >
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
                  <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                    <p>کد ارزیابی :</p>
                    <span>{selectedAdjusterInfo?.adjusterCode}</span>
                  </Col>
                  <Col xl={{ span: 8 }} lg={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                    <p>نام و نام خانوادگی :</p>
                    <span>{`${selectedAdjusterInfo?.firstName} ${selectedAdjusterInfo?.familyName} `}</span>
                  </Col>
                </Row>
            }
          </Col>
          <Col span={12}>
          </Col>
        </Row>
        <div className={classes.nextStep}>
          <Button htmlType="submit" loading={addLoadingState}>
            افزودن
          </Button>
        </div>
        <br />
        {
          companyTyesDetails == 2 ?
            <Alert message={` متقاضی محترم؛ برای شرکت های ارزیابی حقوقی وجود سه عضو الزامی است `} closable type="warning" /> :
            <Alert message={` متقاضی محترم؛ برای موسسه های ارزیابی حقوقی وجود دو عضو الزامی است `} closable type="warning" />
        }

        {listBoardMemberContent === undefined ||
          listBoardMemberContent?.length === 0 ? null : (
            <Row style={{ padding: "0 5px" }}>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>نام و نام خانوادگی</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 4 }} xs={{ span: 4 }}>کد ملی</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>تاریخ انتصاب</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 3 }} xs={{ span: 3 }}>سمت</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>کد ارزیابی</Col>
              {/* <Col xxl={{span:4}} xl={{span:4}} lg={{span:4}} md={{span:6}} sm={{span:8}} xs={{span:8}}>موبایل</Col> */}
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>تاریخ تولد</Col>
              {/* <Col xl={3}>رشته تحصیلی</Col> */}
            </Row>
          )}

        {listBoardMemberContent === undefined ||
          listBoardMemberContent?.length === 0 ? (
            <Empty description="در ابتدا اطلاعات خود را اضافه کنید" />
          ) : (
            listBoardMemberContent?.map(
              (content: {
                Id: string;
                PositionId: number;
                AcademicDegreeId: number;
                AcademicFieldId: number;
              }) => {
                let findPosition = base?.baseInfo?.Result?.Positions?.find(
                  ({ Id, Title }: { Id: number; Title: string }) =>
                    content.PositionId === Id
                );
                let findAcademicDegree = base?.baseInfo?.Result?.AcademicDegrees?.find(
                  ({ Id, Title }: { Id: number; Title: string }) =>
                    content.AcademicDegreeId === Id
                );
                let findMajor = base?.baseInfo?.Result?.AcademicFields?.find(
                  ({ Id, Title }: { Id: number; Title: string }) =>
                    content.AcademicFieldId === Id
                );

                return (
                  <CardBoardMember
                    key={content.Id}
                    work={content}
                    legalDraftId={legalDraftId}
                    findAcademicDegree={findAcademicDegree}
                    findPosition={findPosition}
                    findMajor={findMajor}
                    handleEdit={handleEdit}
                    positionId={content.PositionId}
                  />
                );
              }
            )
          )}
        <Space size="middle" className={classes.loading}>
          {addLoadingState && <Spin size="default" tip="در حال بارگذاری ..." />}
          {getLoadingState && (
            <Spin size="default" tip="در حال به روز رسانی لیست ..." />
          )}
        </Space>
        <div className={classes.nextStep}>
          <Button onClick={prevHandler}>مرحله قبلی</Button>

          <Button
            type="primary"
            //htmlType="submit"
            onClick={nextHandler}
            disabled={(companyTyesDetails == 2 && listBoardMemberContent?.length < 3)
              ||
              (companyTyesDetails == 9 && listBoardMemberContent?.length < 2) ||
              listBoardMemberContent === undefined ||
              //|| isDataIncomplete
              (!isUserEdit && !isAddMemberClickedGlabalState)
            }
          >
            مرحله بعدی
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default BoardMember;
