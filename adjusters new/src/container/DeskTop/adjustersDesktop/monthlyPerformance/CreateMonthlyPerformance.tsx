import React, { FC, useEffect } from "react";
import { Form, Button, Row, Col, Input, Select, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import UploadFile from "../../UploadFile";
import {
  addMonthlyPerformance,
  editMonthlyPerformance,
} from "../../../../redux/actions";
import { MONTHLY_PERFORMANCE_ID_SUCCESS } from "../../../../constant/desktop";

const { Option } = Select;
const { TextArea } = Input;

interface ICreateMonthlyPerformanceProps {
  closeModal: () => void;
  modelMonthlePerformance: any;
  edit: boolean;
}

const CreateMonthlyPerfomance: FC<ICreateMonthlyPerformanceProps> = ({
  closeModal,
  modelMonthlePerformance,
  edit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const specializedField = useSelector(
    (state: any) => state?.specializedField?.specializedField
  );
  const { uploadFile } = useSelector((state: any) => state.uploadFile);
  const { userLogin } = useSelector((state: any) => state.userLogin);
  const {
    loadingAddMonthlyPerformance,
    monthlyPerformanceId,
    loadingEditMonthlyPerformance,
  } = useSelector((state: any) => state.monthlyPerformance);

  useEffect(() => {
    if (edit === false) {
      dispatch({ type: MONTHLY_PERFORMANCE_ID_SUCCESS, payload: null });
    }
  }, [edit]);

  const onFinish = (values: any) => {
    let monthlyPerformance = {
      applicantId: userLogin?.Result?.ApplicantId,
      documentCount: values.documentCount,
      adjustmentFieldId: values.adjustmentFieldId,
      description: values.description,
      fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    };
    let updateMonthlyPerformance = {
      applicantId: userLogin?.Result?.ApplicantId,
      documentCount: values.documentCount,
      adjustmentFieldId: values.adjustmentFieldId,
      description: values.description,
      fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
      id: monthlyPerformanceId?.Result?.Id,
    };

    edit
      ? dispatch(
          editMonthlyPerformance(
            updateMonthlyPerformance,
            () => closeModal(),
            modelMonthlePerformance
          )
        )
      : dispatch(
          addMonthlyPerformance(
            monthlyPerformance,
            () => closeModal(),
            modelMonthlePerformance
          )
        );
  };

  useEffect(() => {
    form.setFieldsValue({
      documentCount: monthlyPerformanceId?.Result?.DocumentCount,
      adjustmentFieldId: monthlyPerformanceId?.Result?.AdjustmentFieldId,
      description: monthlyPerformanceId?.Result?.Description,
      fileDescriptionId: uploadFile?.Result?.FileDescriptionId,
    });
  }, [monthlyPerformanceId]);

  const handleLoading = () => {
    if (edit && loadingEditMonthlyPerformance) {
      return true;
    } else if (!edit && loadingAddMonthlyPerformance) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Form name="createMonthlyPerformance" onFinish={onFinish} form={form}>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 9 }}
              label="زمینه تخصصی"
              name="adjustmentFieldId"
              rules={[
                {
                  required: true,
                  message: "انتخاب زمینه تخصصی الزامی می باشد",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="انتخاب نمایید"
                allowClear
              >
                {specializedField?.Result?.map((field: any) => (
                  <Option
                    key={field.AdjustmentFieldId}
                    value={field.AdjustmentFieldId}
                  >
                    {field.Title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              labelCol={{ span: 9 }}
              label="تعداد پرونده های بررسی شده"
              name="documentCount"
              rules={[
                {
                  required: true,
                  message: "لطفا تعداد پرونده های بررسی شده را انتخاب نمایید",
                },
              ]}
            >
              <InputNumber min={1}  defaultValue={1} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              labelCol={{ span: 9 }}
              label="توضیحات"
            >
              <TextArea autoSize allowClear />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item labelCol={{ span: 9 }} label="بارگذاری فایل">
              <UploadFile />
            </Form.Item>
          </Col>
        </Row>
        <div className="nextButton">
          <Button type="primary" htmlType="submit" loading={handleLoading()}>
            ذخیره
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateMonthlyPerfomance;
