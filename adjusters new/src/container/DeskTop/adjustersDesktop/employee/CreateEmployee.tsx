import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Select } from "antd";
import moment from "jalali-moment";
import Inquire from "../../../Inquire/Inquire";
import ResponseInquire from "../../../Inquire/ResponseInquire";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import {
  getBaseInfo,
  addEmployee,
  fetchMyEmployee,
  editEmploye,
} from "../../../../redux/actions";
import { INQUIRE_SUCCESS } from "../../../../constant/actionTypes";
import { EMPLOYEE_ID_SUCCESS } from "../../../../constant/desktop";

const { Option } = Select;

interface ICreatEmployeeProps {
  closeModal: () => void;
  modelEmployee: any;
  edit: boolean;
}

const CreatreEmployee: FC<ICreatEmployeeProps> = ({
  closeModal,
  modelEmployee,
  edit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { baseInfo, loading } = useSelector((state: any) => state?.baseData);
  const { inquire } = useSelector((state: any) => state.inquire);
  const {
    loadingAddEmployee,
    viewEmployeeId,
    loadingEditEmployee,
  } = useSelector((state: any) => state.employee);

  const onFinish = (values: any) => {
    let emploee = {
      workLocationInfoId: null,
      employmentDate: moment(values.employmentDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      endDate:
        values?.endDate == null
          ? null
          : moment(values.endDate.toDate()).format("YYYY-MM-DD"),
      position: values.position,
      academicDegreeId: values.academicDegreeId,
      academicFieldId: values.academicFieldId,
      identityInfo: {
        nationalCode: Number(inquire?.Result?.NationalCode),
        birthDate: moment(inquire?.Result?.BirthDate.split("T")[0]).format(
          "YYYY-MM-DD"
        ),
        firstName: inquire?.Result?.FirstName,
        familyName: inquire?.Result?.LastName,
        fatherName: inquire?.Result?.FatherName,
        gender: inquire?.Result?.Gender == false ? 0 : 1,
      },
    };

    let editEmploee = {
      workLocationInfoId: null,
      employmentDate: moment(values?.employmentDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      endDate:
        values?.endDate == null
          ? null
          : moment(values?.endDate.toDate()).format("YYYY-MM-DD"),
      position: values.position,
      academicDegreeId: values.academicDegreeId,
      academicFieldId: values.academicFieldId,
      identityInfo: {
        nationalCode: viewEmployeeId?.Result?.IdentityInfo?.NationalCode,
        birthDate: moment(
          viewEmployeeId?.Result?.IdentityInfo?.BirthDate.split("T")[0]
        ).format("YYYY-MM-DD"),
        firstName: viewEmployeeId?.Result?.IdentityInfo?.FirstName,
        familyName: viewEmployeeId?.Result?.IdentityInfo?.FamilyName,
        fatherName: viewEmployeeId?.Result?.IdentityInfo?.FatherName,
        gender: viewEmployeeId?.Result?.IdentityInfo?.Gender == false ? 0 : 1,
      },
      id: viewEmployeeId?.Result?.Id,
    };

    edit
      ? dispatch(
          editEmploye(
            editEmploee,
            () => {
              dispatch(fetchMyEmployee(modelEmployee));
            },
            () => closeModal()
          )
        )
      : dispatch(
          addEmployee(
            emploee,
            () => {
              dispatch(fetchMyEmployee(modelEmployee));
            },
            () => closeModal(),
            () => dispatch({ type: INQUIRE_SUCCESS, payload: null })
          )
        );
  };

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);

  useEffect(() => {
    if (!edit) {
      form.resetFields();
      dispatch({ type: EMPLOYEE_ID_SUCCESS, payload: null });
    }
  }, [edit]);
  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        academicFieldId:
          viewEmployeeId?.Result?.AcademicField === null
            ? "انتخاب کنید"
            : viewEmployeeId?.Result?.AcademicFieldId,
        academicDegreeId: viewEmployeeId?.Result?.AcademicDegreeId,
        endDate:
          viewEmployeeId?.Result?.EndDate === null
            ? null
            : moment(viewEmployeeId?.Result?.EndDate),
        employmentDate: moment(viewEmployeeId?.Result?.EmploymentDate),
        position: viewEmployeeId?.Result?.Position,
      });
    }
  }, [viewEmployeeId]);


  const handleLoading = () => {
    if (edit && loadingEditEmployee) {
      return true;
    } else if (!edit && loadingAddEmployee) {
      return true;
    }else{
      return false
    }
  };

  return (
    <div>
      <Inquire />
      <ResponseInquire identityInfo={viewEmployeeId?.Result?.IdentityInfo} />
      <Form name="createEmployee" onFinish={onFinish} form={form}>
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 7 }}
              name="employmentDate"
              label="تاریخ شروع فعالیت"
            >
              <DatePicker2 placeholder="تاریخ شروع فعالیت" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 7 }}
              name="endDate"
              label="تاریخ پایان فعالیت"
            >
              <DatePicker2 placeholder="تاریخ پایان فعالیت" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="academicDegreeId"
              label="مدرک تحصیلی"
              labelCol={{ span: 7 }}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                loading={loading}
                allowClear
              >
                {baseInfo?.Result?.AcademicDegrees?.map(
                  (degree: { Id: number; Title: string }) => (
                    <Option key={degree.Id} value={degree.Id}>
                      {degree.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 7 }}
              name="academicFieldId"
              label="رشته تحصیلی"
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
              >
                {baseInfo?.Result?.AcademicFields?.map(
                  (major: { Id: number; Title: string }) => (
                    <Option key={major.Id} value={major.Id}>
                      {major.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item
              name="position"
              label="سمت"
              labelCol={{ span: 7 }}
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
                loading={loading}
                allowClear
              >
                {baseInfo?.Result?.Positions?.filter(
                  (item: any) => item.IsBoardMember === false
                )?.map((Position: { Id: number; Title: string }) => (
                  <Option key={Position.Id} value={Position.Id}>
                    {Position.Title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name="description"
              label="توضیحات"
            >
              <TextArea autoSize allowClear />
            </Form.Item>
          </Col> */}
        </Row>
        <div className="nextButton">
          <Button
            type="primary"
            htmlType="submit"
            loading={
              handleLoading()

            }
            disabled={inquire === null && viewEmployeeId === null}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatreEmployee;
