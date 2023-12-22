// this component is for: "سوابق کاری مدیر عامل"

//libraries
import React, { FC, useState, useEffect } from "react";
import {
  Form,
  ConfigProvider,
  Row,
  Col,
  Select,
  Button,
  Input,
  Space,
  Spin,
  Checkbox,
  Radio,
  Empty,
  Modal,
  Alert
} from "antd";
import { useSelector, useDispatch } from "react-redux";
//import moment from "jalali-moment";

//redux
import {
  sendWorkExperienceLegal,
  fetchCEOWorkExperienceLegal,
  fetchCEOWorkExperienceLegalEdit,
  // getWorkLocationInfo,
  // patchDraftCEOWorkExperienceLegal,
  // patchDraftCEOWorkExperienceLegalEdit,
  sendWorkExperienceLegalEdit,
  isComeFromRegistration,
  // getWorkExperienceRejectReason,
} from "../../../../redux/actions";

//styles
import classes from "./WorkExperience.module.css";

//components
import CardWorkExperience from "./CardWorkExperience";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { messageWarning, messageError } from "../../../../utils/utils";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import ButtonGroup from "antd/lib/button/button-group";

const { Option } = Select;

interface IWorkExperience {
  onSubmit: () => void;
  onPrev: () => void;
}

const WorkExperience: FC<IWorkExperience> = ({ onSubmit, onPrev }) => {
  const [disableOnEmptyList, setDisableOnEmptyList] = useState(false);
  const [stillWorking, setStillWorking] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  const [companyNameValue, setCompanyNameValue] = useState("");
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [valueCompany, setValueCompany] = useState<any>(null);
  const [changeCompany, setChangeCompany] = useState(false);
  const [add, setAdd] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [messageError, setMessageError] = useState("");
  const [workExpIdsAndCertificates, setWorkExpIdsAndCertificates] = useState(
    {} as any
  );
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //imported states by redux
  const base = useSelector((state: any) => state.baseData);

  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

  const listworkGuide = useSelector(
    (state: any) =>
      state.listDraftCEOWorkExperienceLegal.listWorkExperienceLegal?.Result
  );
  const addLoadingState = useSelector(
    (state: any) => state.sendWorkExperienceStateLegal?.loading
  );
  const getLoadingState = useSelector(
    (state: any) => state.receiveWorkExperienceStateLegal?.loading
  );
  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );
  // const stateNextButtonBasedOnCardWorkExperienceCertificate = useSelector(
  //   (state: any) => state?.disableNextButtonStateDraftLegal?.disableButton
  // );
  // const gotCEOWorkExperienceInfo = useSelector(
  //   (state: any) =>
  //     state.getAllInfoCEOWorkExperienceLegal?.CEOWorkExperienceRelatedInfo
  // );
  const isUserEdit = localStorage.getItem("userEdit");
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;
  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );
  const workExperienceRejectReasonsList = useSelector(
    (state: any) =>
      state?.workExperienceRejectReasons?.workExperienceRejectReason?.Result
  );

  const onFinish = (values: any) => {
    setCompanyNameValue("");
    setChangeCompany(false);
    // setMessageError("")
    setRadioValue(1);
    setValueCompany(null);
    setAdd(true);
    let workExperience = {
      id: values.id,
      startDate: values.startDate,
      endDate:
        values.endDate !== undefined && !values.stillWorking
          ? values.endDate
          : null,
      position: values.position,
      companyId: radioValue === 0 ? valueCompany : -1,
      companyName: radioValue === 1 && companyNameValue,
      stillWorking:
        values.stillWorking === undefined ? false : values.stillWorking,
    };

    if (isUserEdit) {
      changeCompany === false && valueCompany == 0 && companyNameValue == ""
        ? messageWarning("نام محل فعالیت را وارد نمایید")
        : dispatch(
          sendWorkExperienceLegalEdit(
            gotIdForMainEdit,
            workExperience,
            () => {
              dispatch(fetchCEOWorkExperienceLegalEdit(gotIdForMainEdit));
            }
          )
        );
      form.resetFields();
    } else {
      changeCompany === false && valueCompany == 0 && companyNameValue == ""
        ? messageWarning("نام محل فعالیت را وارد نمایید")
        : dispatch(
          sendWorkExperienceLegal(legalDraftId, workExperience, () => {
            dispatch(fetchCEOWorkExperienceLegal(legalDraftId));
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
  const certificateListStatus = () => {
    setDisableOnEmptyList(true);
  };
  const stillWorkingHandler = (e: any) => {
    setStillWorking(e.target.checked);
  };
  const radioChange = (e: any) => {
    setRadioValue(e.target.value);
    setValueCompany(0);
  };
  const handleEdit = () => {
    setEditButtonClicked(true);
  };
  const handleCompanyNameChange = (value: number) => {
    setValueCompany(value);
    setChangeCompany(true);
  };

  const zeroCertificateChecker = (
    listCertificateInfo: any,
    workExpId: any,
    isDelete: boolean
  ) => {
    const obj: any = {};

    if (isDelete) {
      obj[workExpId] = undefined;
      setWorkExpIdsAndCertificates({
        ...workExpIdsAndCertificates,
        ...obj,
      });
    } else if (!isDelete) {
      obj[workExpId] = listCertificateInfo;
      setWorkExpIdsAndCertificates({ ...workExpIdsAndCertificates, ...obj });
    }

    if (Object.values(obj) === []) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  };

  useEffect(() => {
    const haveZero = Object.values(workExpIdsAndCertificates).map((i: any) => {
      if (i?.length === 0) {
        return 0;
      } else {
        return 1;
      }
    });
    if (haveZero.includes(0)) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  }, [workExpIdsAndCertificates]);

  //lifecycle hooks here
  useEffect(() => {
    if (isUserEdit) {
      dispatch(fetchCEOWorkExperienceLegalEdit(gotIdForMainEdit));
      // dispatch(getWorkExperienceRejectReason(gotIdForMainEdit));
      // setIsLastStatusVisible(true);
    } else {
      // if (!comeFromRegistration) {
      dispatch(fetchCEOWorkExperienceLegal(legalDraftId));
      // }
    }
  }, []);

  return (
    <div className={classes.container}>
      <ConfigProvider direction="rtl">
        <Form
          onFinish={onFinish}
          form={form}
          name="workExperience"
          className="personalInfo"
          labelCol={{ xxl: { span: 3 }, xl: { span: 4 }, lg: { span: 5 }, md: { span: 6 }, sm: { span: 8 }, xs: { span: 8 } }}
        >
          <Row>
            <Col md={11} offset={1}>
              <Form.Item
                name="startDate"
                label="از تاریخ"
                className="formLable"
                rules={[
                  {
                    required: true,
                    message: "انتخاب تاریخ شروع الزامی است",
                  },
                ]}

              >
                <DatePicker2 placeholder="تاریخ شروع" />
              </Form.Item>

              <Form.Item
                label="هنوز مشغولم"
                name="stillWorking"
                valuePropName="checked"

              >
                <Checkbox onChange={stillWorkingHandler}></Checkbox>
              </Form.Item>

              <Form.Item
                name="companyId"
                label="محل فعالیت"

              // rules={[
              //   {
              //     required: true,
              //     message: "انتخاب محل فعالیت یا نام شرکت ضروری است",
              //   },
              // ]}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Radio.Group
                    onChange={radioChange}
                    value={radioValue}
                    className={classes.radioGroup}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value={0} style={{ width: "100%" }}>
                      {" "}
                      شرکت{" "}
                    </Radio.Button>
                    <Radio.Button value={1} style={{ width: "100%" }}>
                      سایر
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </Form.Item>
            </Col>

            <Col md={11} offset={1}>
              <Form.Item
                name="endDate"
                label="تا تاریخ"
                className="formLable"
                rules={[
                  {
                    required: !stillWorking,
                    message: "انتخاب تاریخ پایان الزامی است",
                  },
                ]}

              >
                <DatePicker2
                  placeholder="تاریخ پایان"
                  disabled={stillWorking}
                />
              </Form.Item>

              <Form.Item
                label="سمت"
                name="position"
                className="formLable"
                rules={[
                  {
                    required: true,
                    message: "وارد کردن سمت الزامی است",
                  },
                ]}

              >
                <Input name="position" />
              </Form.Item>

              {radioValue === 0 && (
                <Form.Item
                  label="نام شرکت"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "نام شرکت الزامی است",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="انتخاب نمایید"
                    className={classes.selectiveFormLable}
                    onChange={handleCompanyNameChange}
                  >
                    {base?.baseInfo?.Result?.Companys?.map(
                      (company: { Id: number; Title: string }) => (
                        <Option key={company.Id} value={company.Id}>
                          {company.Title}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              )}

              {radioValue === 1 && (
                <Form.Item
                  label="آدرس"
                  name="workLocation"

                  rules={[
                    {
                      required: true,
                      message: "نام محل فعالیت الزامی است",
                    },
                  ]}
                >
                  <Input
                    value={companyNameValue}
                    onChange={(e) => setCompanyNameValue(e.target.value)}
                    placeholder="آدرس محل فعالیت"
                  />
                </Form.Item>
              )}
              {/* {add===true &&  changeCompany === false && valueCompany == 0 && companyNameValue == ""?messageError:null}   */}
            </Col>
          </Row>

          <Row className={classes.nextStep}>
            <Button type="primary" htmlType="submit" loading={addLoadingState}>
              افزودن
            </Button>
          </Row>

          {/* {disableOnEmptyList ? <h1>disable</h1> : <h1>enable</h1>} */}
          {listworkGuide === undefined || listworkGuide === null ? null : (
            <Row style={{ backgroundColor: "#1890ff", padding: "5px 0", color: "white" }}>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>از تاریخ</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>تا تاریخ</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>سمت</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}>محل فعالیت</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>عملیات</Col>
              <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>محل بارگذاری فایل</Col>
            </Row>

          )}
          {listworkGuide === undefined ||
            listworkGuide === null ||
            listworkGuide?.length === 0 ? (
              <>
                <br />
                <Empty description="در ابتدا سوابق کاری خود را اضافه کنید" />
              </>
            ) : (
              listworkGuide?.map(
                (work: {
                  Id: string;
                  StartDate: string;
                  EndDate: string;
                  Position: string;
                  CompanyId: number;
                  CompanyName: string;
                }) => {
                  let findCompany = base?.baseInfo?.Result?.Companys?.find(
                    ({ Id, Title }: { Id: number; Title: string }) =>
                      work.CompanyId === Id
                  );

                  return (
                    <CardWorkExperience
                      key={work.Id}
                      work={work}
                      legalDraftId={legalDraftId}
                      findCompany={findCompany}
                      certificateListStatus={certificateListStatus}
                      handleEdit={handleEdit}
                      zeroCertificateChecker={zeroCertificateChecker}
                    />
                  );
                }
              )
            )}
          <Space size="middle" className={classes.loading}>
            {addLoadingState && (
              <Spin size="default" tip="در حال بارگذاری ..." />
            )}
            {getLoadingState && (
              <Spin size="default" tip="در حال به روز رسانی لیست ..." />
            )}
          </Space>
          <div className={classes.nextStep}>
            <Button
              onClick={prevHandler}
              disabled={
                resultLogin?.ApplicantStatusId ==
                workTaskFlowId?.ReturnToApplicantToCompleteDossier
              }
            >
              مرحله قبلی
            </Button>
            <Button
              type="primary"
              //htmlType="submit"
              onClick={nextHandler}
              disabled={
                disableNextButton ||
                listworkGuide?.length === 0 || listworkGuide === undefined
              }
            >
              مرحله بعدی{" "}
            </Button>
          </div>
        </Form>
        <Modal
          title="آخرین وضعیت متقاضی:"
          visible={isLastStatusVisible}
          footer={null}
          onOk={() => setIsLastStatusVisible(false)}
          onCancel={() => setIsLastStatusVisible(false)}
          width={500}
          centered
        >
          {workExperienceRejectReasonsList?.map((i: any) => (
            <div>{i?.Description}</div>
          ))}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default WorkExperience;
