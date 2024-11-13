//libraries
import React, { useEffect, useState, FC } from "react";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Input,
  ConfigProvider,
  Space,
  Empty,
  Spin,
  Checkbox,
  Radio,
  Modal,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { IJudicalDraftWorkExperience } from "../../../../shared/ulitities/Model/draftJudical";

//components
import CardWorkExperince from "./CardWorkExperince";
import { messageWarning, messageError } from "../../../../utils/utils";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";

//redux axctions
import {
  sendJudicalWorkExperienceDraft,
  fetchJudicalWorkExperienceDraft,
  getWorkLocationInfoDraftJudical,
  getPersonalInfoJudicialDraft,
  sendJudicalWorkExperienceEdit,
  fetchJudicalWorkExperienceEdit,
  getWorkLocationInfoEditJudical,
  disableNextButtonJudicialWorkExperience,
  fetchJudicalFamilyMemberDraft,
  getJudicalProfilePicDraft,
  isComeFromRegistration,
  getWorkExperienceRejectReason,
} from "../../../../redux/actions";

//styles
import classes from "./Resume.module.css";

const { Option } = Select;

interface IWorkExperienceProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const Resume: FC<IWorkExperienceProps> = ({ onSubmit, onPrev }) => {
  const [value, setValue] = useState(1);
  const [valueCompany, setValueCompany] = useState(0);
  const [text, setText] = useState("");
  const [stilBusy, setStilBusy] = useState(false);
  const [visibleList, setVisibleList] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [workExpIdsAndCertificates, setWorkExpIdsAndCertificates] = useState(
    {} as any
  );
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);
  const [changeCompany, setChangeCompany] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const base = useSelector((state: any) => state.baseData);
  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );

  const judicalDraftIdState = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result?.DraftId
  );
  const judicalDraftIdLocalStorage = localStorage.getItem("judicalDraftId");
  const judicalDraftId =
    judicalDraftIdState !== undefined
      ? judicalDraftIdState
      : judicalDraftIdLocalStorage;

  const loadingAddWorkExperience = useSelector(
    (state: any) => state.judicalAddWorkExperience.loading
  );
  const isUserEdit = localStorage.getItem("userEdit");
  const resultListWorkExperience = useSelector((state: any) =>
    isUserEdit
      ? {
          WorkExperience:
            state?.judicalListWorkExperience?.listJudicalWorkExperienceGuid
              ?.Result,
        }
      : state?.judicalListWorkExperience?.listJudicalWorkExperienceGuid?.Result
  );

  const loadingListWorkExperince = useSelector(
    (state: any) => state.judicalListWorkExperience.loading
  );

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  // const disableNextButton = useSelector(
  //   (state: any) =>
  //     state?.judicialDisableNextButtonWorkExperience?.disableButton
  // );
  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );
  const workExperienceRejectReasonsList = useSelector(
    (state: any) =>
      state?.workExperienceRejectReasons?.workExperienceRejectReason?.Result
  );

  const onFinish = (values: any) => {
    setText("");
    setChangeCompany(false);
    setValue(1);
    let workExperince: IJudicalDraftWorkExperience = {
      position: values.position,
      companyId: value === 0 ? valueCompany : -1,
      startDate: moment(values.startDate.toDate()).format("YYYY-MM-DD"),
      companyName: value === 1 ? text : null,
      endDate:
        values.endDate !== undefined && !values.stillWorking
          ? moment(values.endDate.toDate()).format("YYYY-MM-DD")
          : null,
      stillWorking:
        values.stillWorking === undefined ? false : values.stillWorking,
    };

    if (!isUserEdit) {
      changeCompany === false && valueCompany == 0 && text == ""
        ? messageWarning("نام شرکت را وارد نمایید")
        : dispatch(
            sendJudicalWorkExperienceDraft(judicalDraftId, workExperince, () =>
              dispatch(fetchJudicalWorkExperienceDraft(judicalDraftId))
            )
          );
      form.resetFields();
    } else if (isUserEdit) {
      changeCompany === false && valueCompany == 0 && text == ""
        ? messageWarning("نام شرکت را وارد نمایید")
        : dispatch(
            sendJudicalWorkExperienceEdit(gotIdForMainEdit, workExperince, () =>
              dispatch(fetchJudicalWorkExperienceEdit(gotIdForMainEdit))
            )
          );
      form.resetFields();
    }
    setVisibleList(true);
    setText("");
    setStilBusy(false);
    setValueCompany(0);
  };

  //handlers here:
  const onChange = (e: any) => {
    setValue(e.target.value);
    setValueCompany(0);
  };
  const nextButtonHandler = () => {
    onSubmit();
    setVisibleError(true);
  };
  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
    if (!isUserEdit) {
      dispatch(getPersonalInfoJudicialDraft(judicalDraftId, () => {}));
      dispatch(fetchJudicalFamilyMemberDraft(judicalDraftId));
      dispatch(getJudicalProfilePicDraft(judicalDraftId));
    }
  };
  const stillBusyHandler = (e: any) => {
    setStilBusy(e.target.checked);
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
  };

  useEffect(() => {
    const haveZero = Object.values(workExpIdsAndCertificates).map((i: any) => {
      if (i?.length === 0 || i === null) {
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

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(fetchJudicalWorkExperienceEdit(gotIdForMainEdit));
      // dispatch(getWorkExperienceRejectReason(gotIdForMainEdit));
      // setIsLastStatusVisible(true);
    } else {
      // if (!comeFromRegistration) {
      dispatch(fetchJudicalWorkExperienceDraft(judicalDraftId));
      // }
    }
  }, []);

  return (
    <div className={classes.container}>
      <ConfigProvider direction="rtl">
        <Form
          onFinish={onFinish}
          form={form}
          name="personalInfo"
          className="personalInfo"
        >
          <Row>
            <Col md={10} offset={1}>
              <Form.Item
                name="startDate"
                label="از تاریخ"
                rules={[
                  {
                    required: true,
                    message: "انتخاب  تاریخ شروع الزامی است",
                  },
                ]}
                labelCol={{ span: 3, offset: 1 }}
              >
                <DatePicker2 placeholder="تاریخ شروع" />
              </Form.Item>
              <Form.Item
                name="stillWorking"
                valuePropName="checked"
                label="هنوز مشغولم"
                labelCol={{ span: 3, offset: 1 }}
              >
                <Checkbox onChange={stillBusyHandler}></Checkbox>
              </Form.Item>
              <Form.Item
                name="companyId"
                label="محل فعالیت"
                labelCol={{ span: 3, offset: 1 }}
                rules={[
                  {
                    required: true,
                    message: "انتخاب محل فعالیت یا نام شرکت ضروری است",
                  },
                ]}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className={classes.radioGroup}
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
                rules={[
                  {
                    required: !stilBusy,
                    message: "انتخاب  تاریخ پایان الزامی است",
                  },
                ]}
                labelCol={{ span: 3, offset: 1 }}
              >
                <DatePicker2 placeholder="تاریخ پایان" disabled={stilBusy} />
              </Form.Item>

              <Form.Item
                label="سمت"
                name="position"
                rules={[
                  {
                    required: true,
                    message: "وارد کردن  سمت الزامی است",
                  },
                ]}
                labelCol={{ span: 3, offset: 1 }}
              >
                <Input name="position" />
              </Form.Item>
              {value === 0 && (
                <Form.Item label="نام شرکت" labelCol={{ span: 3, offset: 1 }}>
                  <Select
                    placeholder="انتخاب نمایید"
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
              {value === 1 && (
                <Form.Item label="نام شرکت" labelCol={{ span: 3, offset: 1 }} rules={[
                  {
                    required: true,
                    message: "لطفا نام شرکت وارد نمایید",
                  },
                ]}>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>

          <div className={classes.nextStep}>
            <Button
              htmlType="submit"
              loading={loadingAddWorkExperience}
              type="primary"
            >
              افزودن
            </Button>
          </div>

          <Row className={classes.titleResume}>
            <Col md={3}>از تاریخ</Col>
            <Col md={3}>تا تاریخ</Col>
            <Col md={3}>سمت</Col>
            <Col md={3}>محل فعالیت</Col>
            <Col md={6}>محل بارگذاری فایل</Col>
            <Col md={3}>عملیات</Col>
          </Row>

          {loadingListWorkExperince === true ? (
            <Spin />
          ) : resultListWorkExperience?.WorkExperience?.length === 0 ||
            resultListWorkExperience?.WorkExperience?.length === undefined ? (
            !isUserEdit && (
              <Empty description="در ابتدا سابقه کاری خود را اضافه کنید" />
            )
          ) : (
            resultListWorkExperience?.WorkExperience?.map(
              (work: {
                Id: string;
                CompanyName: any;
                StartDate: string;
                EndDate: string;
                Position: string;
                CompanyId: number;
                StillWorking: boolean;
              }) => {
                let findCompany = base?.baseInfo?.Result?.Companys?.find(
                  ({ Id, Title }: { Id: number; Title: string }) =>
                    work.CompanyId === Id
                );
                return (
                  <CardWorkExperince
                    key={work.Id}
                    work={work}
                    judicalDraftId={judicalDraftId}
                    findCompany={findCompany}
                    onSubmit={onSubmit}
                    onError={() => setVisibleError(true)}
                    zeroCertificateChecker={zeroCertificateChecker}
                  />
                );
              }
            )
          )}
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
              onClick={nextButtonHandler}
              // disabled={
              //   disableNextButton ||
              //   resultListWorkExperience === undefined ||
              //   resultListWorkExperience?.WorkExperience?.length === 0
              // }
            >
              مرحله بعدی
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

export default Resume;
