import React, { useEffect, FC, useState } from "react";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Input,
  ConfigProvider,
  Empty,
  Radio,
  Checkbox,
  Spin,
  Modal,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import moment from "jalali-moment";
import {toast} from 'react-toastify'
import classes from "./Resume.module.css";
import CardWorkExperince from "./CardWorkExperince";
import {
  sendWorkExperienceEdit,
  sendWorkExperienceDraft,
  fetchWorkExperienceEdit,
  fetchWorkExperienceDraft,
  isComeFromRegistration,
  getWorkExperienceRejectReason,
} from "../../../../redux/actions";
import { messageWarning} from "../../../../utils/utils";
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import LastStatus from "../../lastStatus/LastStatus";
import nofileStorage from "../../../../assets/images/nofileStorage.svg";
const { Option } = Select;



interface IWorkExperienceProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const Resume: FC<IWorkExperienceProps> = ({ onSubmit, onPrev }) => {
  const [value, setValue] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [busy, setBusy] = useState(false);
  const [valueCompany, setValueCompany] = useState(0);
  const [dataChild, setDataChild] = useState("");
  const [changeCompany, setChangeCompany] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [findedIsAprroved,setFindedIsApproved]=useState(false)
  const [workExpIdsAndCertificates, setWorkExpIdsAndCertificates] = useState(
    {} as any
  );

  const [
    haveMoreThanFiveYearExperience,
    setHaveMoreThanFiveYearExperience,
  ] = useState(false);
  const [
    isExamNotNeededNotEnoughWorkExperience,
    setIsExamNotNeededNotEnoughWorkExperience,
  ] = useState(false);
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const base = useSelector((state: any) => state.baseData);
  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );

  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");

  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const loadingListWorkExperience = useSelector(
    (state: any) => state.listWorkExperienceId.loading
  );
  // const workGuid = useSelector(
  //   (state: any) => state.workExperience.workExperience?.Result
  // );
  const stAddworkLoading = useSelector(
    (state: any) => state.workExperience.loading
  );
  const listworkExperince = useSelector(
    (state: any) => state.listWorkExperienceId.listWorkExperienceGuid?.Result
  );
  const isUserEdit = localStorage.getItem("userEdit");

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const disableNextButtonNaturalWorkExperience = useSelector(
    (state: any) => state?.disableNextButtonNaturalWorkExperience?.disableButton
  );

  const isExamNotNeeded = useSelector(
    (state: any) => state?.isExamNotNeededNatural?.isExamNotNeeded
  );
  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );
  // const workExperienceRejectReasonsList = useSelector(
  //   (state: any) =>
  //     state?.workExperienceRejectReasons?.workExperienceRejectReason?.Result
  // );
  // const comeFromRegistration = useSelector(
  //   (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  // );
  // const resultLogin = useSelector(
  //   (state: any) => state.sendNatAndRegCodes.response?.Result
  // );

  const onFinish = (values: any) => {
    setCompanyName("");
    setChangeCompany(false);
    setValue(1);
    let resume = {
      position: values.position,
      companyId: valueCompany > 0 ? valueCompany : -1,
      companyName: companyName ? companyName : "",
      startDate: moment(values.startDate.toDate()).format("YYYY-MM-DD"),
      endDate:
        values.endDate !== undefined && !values.stillWorking
          ? moment(values.endDate.toDate()).format("YYYY-MM-DD")
          : null,
      stillWorking:
        values.stillWorking === undefined ? false : values.stillWorking,
    };
    var p = /^[\u0600-\u06FF-\_\!\.0-9\s]+$/;
    if (!p.test(resume?.companyName) && value==1) return toast.warning("نام شرکت فارسی نوشته شود")
  
    if (isUserEdit) {
      changeCompany === false && valueCompany === 0 && companyName === ""
        ? messageWarning("نام شرکت را وارد نمایید")
        : dispatch(
            sendWorkExperienceEdit(gotIdForMainEdit, resume, () => {
              dispatch(fetchWorkExperienceEdit(gotIdForMainEdit));
            })
          );
    } else {
      changeCompany === false && valueCompany === 0 && companyName === ""
        ? messageWarning("نام شرکت را وارد نمایید")
        : dispatch(
            sendWorkExperienceDraft(draftId, resume, () => {
              dispatch(fetchWorkExperienceDraft(draftId));
            })
          );
    }
    form.resetFields();
    setBusy(false);
    setCompanyName("");
    setValueCompany(0);
  };

  //handlers
  const nextButtonHandler = () => {
    onSubmit();
  };
  const prevHandler = () => {
    onPrev();
    if (!isUserEdit) {
      dispatch(isComeFromRegistration(false));
    }
  };
  const onChange = (e: any) => {
    setValue(e.target.value);
    setValueCompany(0);
  };
  const dataChildHandler = (data: any, error: string) => {
    setDataChild(data);
  };

  const stillBusyHandler = (e: any) => {
    setBusy(e.target.checked);
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

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(fetchWorkExperienceEdit(gotIdForMainEdit));
      resultLogin?.ApplicantStatusId ===
        workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
        dispatch(getWorkExperienceRejectReason(gotIdForMainEdit));
      resultLogin?.ApplicantStatusId ===
        workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
        setIsLastStatusVisible(true);
    } else {
      dispatch(fetchWorkExperienceDraft(draftId));
    }
  }, []);

  useEffect(() => {
    const yearsWorkedArr = listworkExperince?.map(
      (work: {
        Id: string;
        StartDate: string;
        EndDate: string;
        Position: string;
        CompanyId: number;
      }) => {
        const endDate = Math.ceil(
          Date.parse(work?.EndDate) / (1000 * 60 * 60 * 24)
        );
        const startDate = Math.ceil(
          Date.parse(work?.StartDate) / (1000 * 60 * 60 * 24)
        );
        const daysWorked = endDate - startDate;
        const yearsWorked = daysWorked / 365;

        return yearsWorked;
      }
    );

    const workExperienceMoreThanFiveYears = yearsWorkedArr?.find(
      (yearsWorked: any) => yearsWorked > 5
    );

    const haveEnoughWE = workExperienceMoreThanFiveYears === undefined;

    if (haveEnoughWE) {
      setHaveMoreThanFiveYearExperience(true);
    } else {
      setHaveMoreThanFiveYearExperience(false);
    }
  }, [listworkExperince, isExamNotNeeded, haveMoreThanFiveYearExperience]);

  useEffect(() => {
    if (!haveMoreThanFiveYearExperience && isExamNotNeeded) {
      setIsExamNotNeededNotEnoughWorkExperience(true);
    } else {
      setIsExamNotNeededNotEnoughWorkExperience(false);
    }
  }, [
    isExamNotNeeded,
    haveMoreThanFiveYearExperience,
    listworkExperince,
    isExamNotNeededNotEnoughWorkExperience,
  ]);
const getIsApprovedDetails=(value:any)=>{
  setFindedIsApproved(value?true:false)
}
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
                    message: "انتخاب تاریخ شروع الزامی است",
                  },
                ]}
                labelCol={{ span: 3, offset: 3 }}
              >
                <DatePicker2 placeholder="تاریخ شروع" />
              </Form.Item>
              <Form.Item
                name="stillWorking"
                valuePropName="checked"
                label="هنوز مشغولم"
                labelCol={{ span: 3, offset: 3 }}
              >
                <Checkbox onChange={stillBusyHandler}></Checkbox>
              </Form.Item>
              <Form.Item
                name="companyId"
                label="محل فعالیت"
                labelCol={{ span: 3, offset: 3 }}
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

            <Col md={10} offset={1}>
              <Form.Item
                name="endDate"
                label="تا تاریخ"
                rules={[
                  {
                    required: !busy,
                    message:
                      "در صورت اتمام همکاری, انتخاب تاریخ اتمام الزامی است, در غیر این صورت لطفا گزینه هنوز مشغول هستم را انتخاب نمایید",
                  },
                ]}
                labelCol={{ span: 3, offset: 3 }}
              >
                <DatePicker2 placeholder="تاریخ پایان" disabled={busy} />
              </Form.Item>
              <Form.Item
                label="سمت"
                name="position"
                rules={[
                  {
                    required: true,
                    message: "لطفا سمت خود را وارد نمایید",
                  },
                ]}
                labelCol={{ span: 3, offset: 3 }}
              >
                <Input />
              </Form.Item>
              {value === 0 && (
                <Form.Item label="نام شرکت" labelCol={{ span: 3, offset: 3 }}  rules={[
                  {
                    required: true,
                    message: "لطفا نام شرکت وارد نمایید",
                  },
                ]}>
                  <Select
                    placeholder="انتخاب نمایید"
                    onChange={handleCompanyNameChange}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    // style={{ width: "90%", position: "absolute", left: "0px" }}
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
                <Form.Item label={<span><span style={{color:"red"}}>*</span> نام شرکت </span>} labelCol={{ span: 3, offset: 3 }}>
                  <Input
                    value={companyName}
                    onChange={(e: any) => setCompanyName(e.target.value)}
                    // style={{ width: "90%", position: "absolute", left: "0px" }}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>

          <div className={classes.nextStep}>
            <Button type="primary" htmlType="submit" loading={stAddworkLoading}>
              افزودن
            </Button>
          </div>
          <Row className={classes.titleColumn}>
            <Col xl={3}> از تاریخ</Col>
            <Col xl={3}>تا تاریخ</Col>
            <Col xl={3}>سمت</Col>
            <Col xl={5}>محل فعالیت</Col>
            <Col xl={6}>محل بارگذاری فایل</Col>
            <Col xl={3}>عملیات</Col>
          </Row>

          {loadingListWorkExperience ? (
            <Spin />
          ) : listworkExperince?.length === 0 ||
            listworkExperince === null ||
            listworkExperince === undefined ? (
            <Empty description="در ابتدا سابقه کاری خود را اضافه کنید"   image={nofileStorage} />
          ) : (
            listworkExperince?.map(
              (work: {
                Id: string;
                StartDate: string;
                EndDate: string;
                Position: string;
                CompanyId: number;
              }) => {
                let findCompany = base?.baseInfo?.Result?.Companys?.find(
                  ({ Id, Title }: { Id: number; Title: string }) =>
                    work.CompanyId === Id
                );

                return (
                  <CardWorkExperince
                  getIsApprovedDetails={getIsApprovedDetails}
                    key={work.Id}
                    work={work}
                    draftId={draftId}
                    findCompany={findCompany}
                    dataChild={dataChildHandler}
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
                resultLogin?.ApplicantStatusId ===
                workTaskFlowId?.ReturnToApplicantToCompleteDossier
              }
            >
              مرحله قبلی
            </Button>
            <Button
              type="primary"
              onClick={nextButtonHandler}
              disabled={
                disableNextButton ||
                listworkExperince === null ||
                listworkExperince === undefined ||
                findedIsAprroved==true||
                listworkExperince?.length === 0
              }
            >
              مرحله بعدی
            </Button>
          </div>
          {/* {isExamNotNeededNotEnoughWorkExperience && (
            <div style={{ color: "red" }}>
              هیچ سابقه کاری که بالای 5 سال باشد اینجا هنوز وارد نشده, اما در
              قسمت اطلاعات رشته این گزینه انتخاب شده است.
            </div>
          )} */}
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
          {/* {workExperienceRejectReasonsList?.map((i: any) => (
            <div>{i?.Description}</div>
          ))} */}
          <LastStatus closModal={() => setIsLastStatusVisible(false)} />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Resume;
