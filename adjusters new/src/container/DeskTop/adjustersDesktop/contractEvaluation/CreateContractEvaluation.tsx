import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { Form, Button, Row, Col, Input, Select, Checkbox } from "antd";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import {
  addContactEvaluation,
  editContactEvaluation,
} from "../../../../redux/actions";
import { CONTRACTEVALUATION_ID_SUCCESS } from "../../../../constant/desktop";

const { Option } = Select;

interface ICreateContractEvaluationProps {
  closeModal: () => void;
  modelcontractEvaluation: any;
  edit: boolean;
}

const CreateContractEvaluation: FC<ICreateContractEvaluationProps> = ({
  closeModal,
  modelcontractEvaluation,
  edit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { baseInfo, loading } = useSelector((state: any) => state?.baseData);
  const {
    contractEvaluationId,
    loadingEditContractEvaluation,
    loadingAddContractEvaluation,
  } = useSelector((state: any) => state.contractEvaluation);

  useEffect(() => {
    if (edit === false) {
      dispatch({ type: CONTRACTEVALUATION_ID_SUCCESS, payload: null });
    }
  }, [edit]);

  const handleLoading = () => {
    if (edit && loadingEditContractEvaluation) {
      return true;
    } else if (!edit && loadingAddContractEvaluation) {
      return true;
    }else{
      return false
    }
  };

  const onFinish = (values: any) => {
    let contractEvaluation = {
      contractEvaluationCode: values.contractEvaluationCode,
      contractStartDate: moment(values.contractStartDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      contractEndDate: moment(values.contractEndDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      contractingParty: values.contractingParty,
      companyId: values.companyId,
      insurerName: values.insurerName,
      insurerId: values.insurerId,
      calculationRemunerationMethod: values.calculationRemunerationMethod,
      reportingMethod: values.reportingMethod,
      authorityLevel: values.authorityLevel,
      terminatingCondition: values.terminatingCondition,
      resolutionDispute: values.resolutionDispute,
      systemCode: values.systemCode,
      // description: values.description,
      registrationDate: moment(values?.registrationDate.toDate()).format(
        "YYYY-MM-DD"
      ),
    };
    let editContractEvaluation = {
      contractEvaluationCode: values.contractEvaluationCode,
      contractStartDate: moment(values.contractStartDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      contractEndDate: moment(values.contractEndDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      contractingParty: values.contractingParty,
      companyId: values.companyId,
      insurerName: values.insurerName,
      insurerId: values.insurerId,
      calculationRemunerationMethod: values.calculationRemunerationMethod,
      reportingMethod: values.reportingMethod,
      authorityLevel: values.authorityLevel,
      terminatingCondition: values.terminatingCondition,
      resolutionDispute: values.resolutionDispute,
      systemCode: values.systemCode,
      // description: values.description,
      registrationDate: moment(values?.registrationDate.toDate()).format(
        "YYYY-MM-DD"
      ),
      id: contractEvaluationId?.Result?.Id,
    };
    edit
      ? dispatch(
          editContactEvaluation(
            editContractEvaluation,
            () => closeModal(),
            modelcontractEvaluation
          )
        )
      : dispatch(
          addContactEvaluation(
            contractEvaluation,
            () => closeModal(),
            modelcontractEvaluation
          )
        );
  };

  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        contractEvaluationCode:
          contractEvaluationId?.Result?.ContractEvaluationCode,
        contractStartDate: moment(
          contractEvaluationId?.Result?.contractStartDate
        ),
        contractEndDate: moment(contractEvaluationId?.Result?.contractEndDate),
        contractingParty: contractEvaluationId?.Result?.ContractingParty,
        companyId: contractEvaluationId?.Result?.CompanyId,
        insurerName: contractEvaluationId?.Result?.InsurerName,
        insurerId: contractEvaluationId?.Result?.InsurerId,
        reportingMethod: contractEvaluationId?.Result?.ReportingMethod,
        authorityLevel: contractEvaluationId?.Result.AuthorityLevel,
        terminatingCondition:
          contractEvaluationId?.Result?.TerminatingCondition,
        resolutionDispute: contractEvaluationId?.Result?.ResolutionDispute,
        systemCode: contractEvaluationId?.Result?.SystemCode,
        calculationRemunerationMethod:
          contractEvaluationId?.Result.CalculationRemunerationMethod,
        // description: contractEvaluation?.description,
        registrationDate: moment(
          contractEvaluationId?.Result?.registrationDate
        ),
      });
    }
  }, [contractEvaluationId]);

  return (
    <div>
      <Form name="createContractEvaluation" onFinish={onFinish} form={form}>
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              name="insurerName"
              labelCol={{ span: 8 }}
              label="نام/ عنوان بیمه گذار"
              rules={[
                {
                  required: true,
                  message: "نام بیمه گذار ضروری است.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="insurerId"
              labelCol={{ span: 9 }}
              label="شماره/شناسه ملی بیمه گذار"
              rules={[
                {
                  required: true,
                  message: " وارد نمودن  شماره/شناسه ملی بیمه گذار ضروری است",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              label="نام شرکت"
              name="companyId"
              rules={[
                {
                  required: true,
                  message: "انتخاب نام شرکت لزامی است",
                },
              ]}
            >
              <Select
                //style={{ width: "350px" }}
                placeholder="انتخاب نمایید"
                loading={loading}
              >
                {baseInfo?.Result?.Companys?.map(
                  ({ Id, Title }: { Id: number; Title: string }) => (
                    <Option key={Id} value={Id}>
                      {Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 9 }}
              label="تاریخ شروع قرارداد"
              name="contractStartDate"
              rules={[
                {
                  required: true,
                  message: "تاریخ شروع قرارداد الزامی می باشد.",
                },
              ]}
            >
              <DatePicker2 placeholder="تاریخ شروع قرارداد" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              label="تاریخ پایان قرارداد"
              name="contractEndDate"
              rules={[
                {
                  required: true,
                  message: "تاریخ پایان قرارداد الزامی می باشد.",
                },
              ]}
            >
              <DatePicker2 placeholder="تاریخ پایان قرارداد" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contractEvaluationCode"
              label="شماره قرارداد ارزیابی خسارت"
              labelCol={{ span: 9 }}
              rules={[
                {
                  required: true,
                  message: "وارد نمودن شماره قرارداد الزامی می باشد.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="calculationRemunerationMethod"
              label="روش محاسبه حق الزحمه"
              labelCol={{ xxl: 8, xl: 8, md: 8, sm: 9 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="reportingMethod"
              label="نحوه ارائه و ارسال گزارش"
              labelCol={{ span: 9 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="authorityLevel"
              label="حدوداختیارات ارزیاب"
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 9 }}
              name="contractingParty"
              label="طرف قرارداد"
              rules={[
                {
                  required: true,
                  message: "وارد کردن طرف قرارداد الزامی است",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="terminatingCondition"
              label="شرایط فسخ قرارداد"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="systemCode"
              label="کد سیستمی"
              labelCol={{ span: 9 }}
            >
              <Input />
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 8 }}
              name="registrationDate"
              label="تاریخ ثبت نام"
            >
              <DatePicker2 placeholder="تاریخ ثبت نام" />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item
              labelCol={{ span: 9 }}
              name="description"
              label="توضیحات"
            >
              <TextArea autoSize allowClear />
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item
              name="resolutionDispute"
              style={{ textAlign: "right" }}
              valuePropName="checked"
            >
              <Checkbox>
                مرجع رسیدگی کننده به اختلافات در قرارداد تعیین شده است
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <div className="nextButton">
          <Button
            type="primary"
            htmlType="submit"
            loading={handleLoading()}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateContractEvaluation;
