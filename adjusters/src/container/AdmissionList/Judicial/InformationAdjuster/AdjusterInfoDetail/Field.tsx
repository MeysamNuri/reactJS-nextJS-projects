import React, { FC, useEffect, useState } from "react";
import { Form, Select, Button, Row, Col, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IAneAdjusterList } from "../../../../../shared/ulitities/Model/oneAdjuster";
import {
  getSubFieldBasedOnFieldNatural,
  applicantFieldInterviewer,
  fetchFieldInterviewer,
  getSpecializedFieldInfoEdit,
  fetchSubField,
  fetchAllAdjustmentField,
} from "../../../../../redux/actions";

const { Option } = Select;

interface IFeildProps {
  oneAdjusterList?: IAneAdjusterList;
  closeModal: () => void;
  activeTabInbox?: string;
}
const Feild: FC<IFeildProps> = ({
  oneAdjusterList,
  closeModal,
  activeTabInbox,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //const { data: specializedField, isLoading } = useGetSpecializedFeild();
  const { resFieldInterviewer } = useSelector((state: any) => state.score);
  const { feildInfo, loading } = useSelector((state: any) => state.feildInfo);
  const [value, setValue] = useState(null);
  const { subFields } = useSelector((state: any) => state.subField);
  const {
    getSubFieldBasedOnFieldNatural: Feilds,
    loading: subFieldBasedOnFieldNaturalLoading,
  } = useSelector((state: any) => state.getSubFieldBasedOnFieldNatural);

  const { loadingFeildInterviewer } = useSelector((state: any) => state.score);

  const { specializedField } = useSelector(
    (state: any) => state?.specializedField
  );

  let adjustmentField = {
    isActive: value,
  };

  useEffect(() => {
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, [value]);

  const onFinish = (values: any) => {
    let feild = {
      // applicantId: oneAdjusterList.ApplicantId,
      adjustmentFieldId: values.adjustmentFieldId,
      subFieldIds: values.SubFields,
    };
    dispatch(
      applicantFieldInterviewer(
        oneAdjusterList?.ApplicantId,
        feild,
        () => {},
        () => closeModal()
      )
    );
  };

  useEffect(() => {
    dispatch(
      fetchFieldInterviewer(oneAdjusterList?.ApplicantId, (e: number) => {
        dispatch(getSubFieldBasedOnFieldNatural(e));
      })
    );

    dispatch(
      getSpecializedFieldInfoEdit(oneAdjusterList?.ApplicantId, () => {})
    );
  }, []);

  useEffect(() => {
    feildInfo &&
      feildInfo?.Result?.AdjustmentFieldId !== undefined &&
      dispatch(
        fetchSubField(oneAdjusterList?.ApplicantId, (e: number) =>
          dispatch(
            getSubFieldBasedOnFieldNatural(feildInfo?.Result?.AdjustmentFieldId)
          )
        )
      );
  }, [feildInfo?.Result?.AdjustmentFieldId]);

  const changeFieldHandler = (value: number) => {
    form.setFieldsValue({ SubFields: [] });
    value !== undefined && dispatch(getSubFieldBasedOnFieldNatural(value));
  };

  let SubFieldRegister = subFields?.Result?.map((item: any) => item.SubFieldId);
  let SubFieldId = resFieldInterviewer?.Result?.SubFieldsDto?.map(
    (item: any) => item.AdjustmentFieldId
  );



  useEffect(() => {
    form.setFieldsValue({
      adjustmentFieldId:
        resFieldInterviewer?.Result === null
          ? feildInfo?.Result?.AdjustmentFieldId
          : resFieldInterviewer?.Result?.SpecializedFieldDto?.AdjustmentFieldId,
      SubFields: SubFieldId === undefined ? SubFieldRegister : SubFieldId,
    });
  }, [resFieldInterviewer, oneAdjusterList?.ApplicantId, feildInfo, subFields]);

  // const subFieldHandler = (value: any) => {
  //   console.log(value, "valueeeeeeeeeDubFeild");

  useEffect(() => {
    form.setFieldsValue({
      adjustmentFieldId: null,

      SubFields: null,
    });
  }, [value]);

  const onChange = (e: any) => {
    setValue(e.target.value);
   
  };


  return (
    <div>
      <Form form={form} name="field" onFinish={onFinish}>
        <Form.Item name="active" label="فعال/غیرفعال">
          <Radio.Group value={value} onChange={onChange} >
            <Radio value={1}>فعال</Radio>
            <Radio value={0}>غیرفعال</Radio>
          </Radio.Group>
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="adjustmentFieldId"
              label="رشته تخصصی"
              rules={[
                { required: true, message: "لطفا رشته تخصصی را انتخاب نمایید" },
              ]}
              labelCol={{ span: 8 }}
            >
              <Select
                placeholder="انتخاب نمایید"
                allowClear
                onChange={changeFieldHandler}
              >
                {specializedField?.Result?.map(
                  (field: { AdjustmentFieldId: number; Title: string }) => (
                    <Option
                      key={field.AdjustmentFieldId}
                      value={field.AdjustmentFieldId}
                    >
                      {field.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="SubFields"
              label="زیر رشته تخصصی"
              rules={[
                { required: true, message: "لطفا نام زیر رشته را وارد نمایید" },
              ]}
              labelCol={{ span: 8 }}
            >
              <Select
                placeholder="انتخاب نمایید"
                allowClear
                loading={subFieldBasedOnFieldNaturalLoading}
                mode="multiple"
                //onChange={subFieldHandler}
                notFoundContent={Feilds === null && "زیر رشته ای موجود نیست"}
              >
                {Feilds?.Result?.map(
                  (subField: { AdjustmentFieldId: number; Title: string }) => (
                    <Option
                      key={subField.AdjustmentFieldId}
                      value={subField.AdjustmentFieldId}
                    >
                      {subField.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <div className="submit  submitFixLeft ">
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingFeildInterviewer}
          >
            ذخیره
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Feild;
