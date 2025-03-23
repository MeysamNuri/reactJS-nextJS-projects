//libraries
import React, { FC,useEffect } from "react";
import {
  Form,
  ConfigProvider,
  Row,
  Col,
  Select,
  Input,
  Button,
  Empty,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";

//redux
import {
  sendEmployeeLegal,
  fetchEmployeeLegal,
  //patchDraftEmployeeLegal,
  fetchEmployeeLegalEdit,
  sendEmployeeLegalEdit,
} from "../../../../redux/actions";

//styles
import classes from "./Employee.module.css";

//components
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import CardEmployee from "./CardEmployee";

const { Option } = Select;

interface IEmployee {
  onSubmit: () => void;
  onPrev: () => void;
}

const Employee: FC<IEmployee> = ({ onSubmit, onPrev }) => {
  //const [editButtonClicked, setEditButtonClicked] = useState(false);

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

  const listworkGuide = useSelector(
    (state: any) => state?.listEmployeeLegal.listEmploeeLegal?.Result
  );
  const loadingState = useSelector(
    (state: any) => state?.employeeDraftLegal?.loading
  );
  const gotAllInfoEmployeeLegal = useSelector(
    (state: any) => state?.getAllInfoEmployeeLegal?.employeeRelatedInfo
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
  // const comeFromRegistration = useSelector(
  //   (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  // );

  const onFinish = (values: any) => {
    let employee = {
      nationalCode: values.nationalCode,
      birthDate: moment(values.birthDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      employmentDate: values.employmentDate,
      position: values.position,
      academicDegreeId: values.academicDegreeId,
      AcademicFieldId: values.AcademicFieldId,
    };

    if (isUserEdit) {
      dispatch(
        sendEmployeeLegalEdit(gotIdForMainEdit, employee, () => {
          dispatch(fetchEmployeeLegalEdit(gotIdForMainEdit));
        })
      );
    } else {
      dispatch(
        sendEmployeeLegal(legalDraftId, employee, () => {
          dispatch(fetchEmployeeLegal(legalDraftId));
        })
      );
    }
  };

  //click handlers
  const prevHandler = () => {
    onPrev();
  };

  const nextHandler = () => {
    onSubmit();
  };

  const handleEdit = () => {
    // setEditButtonClicked(true);
  };

  if (gotAllInfoEmployeeLegal?.IsSucceed && !isUserEdit) {
    form.setFieldsValue({
      nationalCode: gotAllInfoEmployeeLegal?.Result?.NationalCode,
      //birthDate: gotAllInfoEmployeeLegal?.Result?.BirthDate,
      //employmentDate: gotAllInfoEmployeeLegal?.Result?.EmploymentDate,
      position: gotAllInfoEmployeeLegal?.Result?.Position,
      academicDegreeId: gotAllInfoEmployeeLegal?.Result?.AcademicDegreeId,
      AcademicFieldId: gotAllInfoEmployeeLegal?.Result?.AcademicFieldId,
    });
  } else if (gotAllInfoEmployeeLegal?.IsSucceed && isUserEdit) {
    form.setFieldsValue({
      nationalCode: gotAllInfoEmployeeLegal?.Result?.NationalCode,
      birthDate: moment(
        gotAllInfoEmployeeLegal?.Result?.BirthDate.split("T")[0]
      ),
      employmentDate: moment(
        gotAllInfoEmployeeLegal?.Result?.EmploymentDate.split("T")[0]
      ),
      position: gotAllInfoEmployeeLegal?.Result?.Position,
      academicDegreeId: gotAllInfoEmployeeLegal?.Result?.AcademicDegreeId,
      AcademicFieldId: gotAllInfoEmployeeLegal?.Result?.AcademicFieldId,
    });
  } else {
    form.resetFields();
  }

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(fetchEmployeeLegalEdit(gotIdForMainEdit));
    } else {
      // if (!comeFromRegistration) {
      dispatch(fetchEmployeeLegal(legalDraftId));
      // } 
    }
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <Form
        onFinish={onFinish}
        form={form}
        name="employee"
        className={`${classes.ItemContainer} personalInfo`}
      >
        <Row>
          <Col span={11} offset={1}>
            <Form.Item
              label="کد ملی"
              name="nationalCode"
              className="formLable"
              // rules={[
              //   {
              //     required: true,
              //     message: "وارد کردن کد ملی الزامی می باشد.",
              //   },
              //   {
              //     pattern: /^\d{10}$/,
              //     message: "کد ملی وارد شده صحیح نمی باشد.",
              //   },
              // ]}
            >
              <Input
                name="nationalCode"
                maxLength={10}
                // value={nationalCode}
                // onChange={(e) => setNationalCode(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="تاریخ استخدام"
              name="employmentDate"
              className="formLable"
              // rules={[
              //   {
              //     required: true,
              //     message: "انتخاب تاریخ استخدام شدن الزامی است",
              //   },
              // ]}
            >
              {/* <DatePicker2
                placeholder="انتخاب تاریخ"
                value={employmentDate}
                onChange={(value: any) => setGotEmployeeDateDate(value.toDate())}
              /> */}
              <DatePicker2 placeholder="انتخاب تاریخ" />
            </Form.Item>
            <Form.Item
              name="academicDegreeId"
              label="مدرک تحصیلی"
              className="formLable"
              // rules={[
              //   {
              //     required: true,
              //     message: "انتخاب مدرک تحصیلی الزامی است",
              //   },
              // ]}
            >
              {/* <Radio.Group>
                {base?.baseInfo?.Result?.AcademicDegrees?.map(
                  (academicDegree: { Id: number; Title: string }) => (
                    <Radio.Button value={academicDegree.Id}>
                      {academicDegree.Title}
                    </Radio.Button>
                  )
                )}
              </Radio.Group> */}
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
          </Col>
          <Col span={11} offset={1}>
            <Form.Item
              label="تاریخ تولد"
              name="birthDate"
              className="formLable"
              // rules={[
              //   {
              //     required: true,
              //     message: "انتخاب تاریخ تولد الزامی است",
              //   },
              // ]}
            >
              {/* <DatePicker2
                placeholder="انتخاب تاریخ"
                value={birthDate}
                onChange={(value: any) => setBirthDate(value.toDate())}
              /> */}
              <DatePicker2 placeholder="انتخاب تاریخ" />
            </Form.Item>
            <Form.Item
              label="سمت"
              name="position"
              className="formLable"
              // rules={[
              //   {
              //     required: true,
              //     message: "وارد کردن سمت الزامی است",
              //   },
              // ]}
            >
              {/* <Input
                name="position"
                placeholder="عضو هیت مدیره / مدیر عامل / رییس هیات مدیره / نایب رییس هیت مدیره"
              /> */}
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
              >
                {base?.baseInfo?.Result?.Positions?.filter(
                  (item: any) => item.IsBoardMember === false
                )?.map((Position: { Id: number; Title: string }) => (
                  <Option key={Position.Id} value={Position.Id}>
                    {Position.Title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="رشته تحصیلی"
              name="AcademicFieldId"
              className="formLable"
              // rules={[
              //   {
              //     required: true,
              //     message: "انتخاب رشته تحصیلی الزامی است",
              //   },
              // ]}
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
          </Col>
        </Row>
        <Row className={classes.nextStep}>
          <Button
          type="primary"
            htmlType="submit"
            //htmlType={ ? "submit" : }
            loading={loadingState}
          >
            افزودن
          </Button>
        </Row>
        {listworkGuide === undefined || listworkGuide?.length === 0 ? (
          <Empty description="در ابتدا اطلاعات کارکنان را اضافه کنید" />
        ) : (
          <Row>
            <Col xl={3}>نام و نام خانوادگی</Col>
            <Col xl={3}>کد ملی</Col>
            <Col xl={3}>تاریخ تولد</Col>
            <Col xl={4}>تاریخ استخدام</Col>
            <Col xl={5}>سمت</Col>
            <Col xl={3}></Col>
          </Row>
        )}
        {listworkGuide?.map(
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
              <CardEmployee
                key={work?.Id}
                work={work}
                legalDraftId={legalDraftId}
                findCompany={findCompany}
                handleEdit={handleEdit}
              />
            );
          }
        )}
        <div className={classes.nextStep}>
          <Button onClick={prevHandler}>مرحله قبلی</Button>

          <Button
            type="primary"
            //htmlType="submit"
            onClick={nextHandler}
            // disabled={
            //   listworkGuide?.length === 0 || listworkGuide === undefined
            // }
          >
            مرحله بعدی
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default Employee;
