import React, { FC, useEffect, useState } from "react";
import { Form, Select, Button, Row, Col, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";
import {
  fetchListNaturalCartable,
  getSubFieldBasedOnFieldNatural,
  applicantFieldInterviewer,
  fetchFieldInterviewer,
  getSpecializedFieldInfoEdit,
  fetchSubField,
  fetchAllAdjustmentField,
  cartableReportAllInfo,
  editApplicantFieldInterviewer,
  getApplicantFieldInterviewerDetail
} from "../../../../../../redux/actions";
import { adjusterType } from "../../../../../../shared/ulitities/Enums/adjusterTypeId";
import {toast} from 'react-toastify'
const { Option } = Select;

interface IFeildInterviewerProps {
  oneAdjusterList?: IAneAdjusterList;
  closeModal: () => void;
  isInterviewInvitation?: any;
  modelReport?: any
  selectedItemManagmentCartable?: any,
  recordReport?:any 
           
           
}
const FeildInterviewer: FC<IFeildInterviewerProps> = ({
  oneAdjusterList,
  closeModal,
  isInterviewInvitation,
  modelReport,
  selectedItemManagmentCartable,
  recordReport
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const {
    loadingResFieldInterviewer,
    resFieldInterviewer,
    loadingFeildInterviewer
  } = useSelector((state: any) => state.score);

  const { feildInfo, loading: feildInfoLoading } = useSelector(
    (state: any) => state.feildInfo
  );
  const { subFields } = useSelector((state: any) => state.subField);
  
  const { getSubFieldBasedOnFieldNatural: Feilds, loading } = useSelector(
    (state: any) => state.getSubFieldBasedOnFieldNatural
  );
  const { modelCartable } = useSelector(
    (state: any) => state.listNaturalCartable
  );
  const { specializedField } = useSelector(
    (state: any) => state?.specializedField
  ); 

  const onFinish = (values: any) => {
    if (selectedItemManagmentCartable?.ApplicantId||recordReport) {
      let fieldInfoOBJ = {
        applicantId: selectedItemManagmentCartable?.ApplicantId??recordReport?.ApplicantId,
        adjustmentFieldId: values.adjustmentFieldId,
        subFieldIds: values.SubFieldId,
      }
      if(fieldInfoOBJ?.subFieldIds?.length>2) return toast.warning("نمی توانید بیش از دو زیر رشته انتخاب کنید")
      dispatch( 
        editApplicantFieldInterviewer( 
          fieldInfoOBJ,
          ()=>closeModal(),
         ()=>{
          dispatch(
            getApplicantFieldInterviewerDetail(selectedItemManagmentCartable.ApplicantId)
          );
         }
        )
      )

    } else {
      let feildInterviewer = {
        adjustmentFieldId: values.adjustmentFieldId,
        subFieldIds: values.SubFieldId,
      };
      if(feildInterviewer?.subFieldIds?.length>2) return toast.warning("نمی توانید بیش از دو زیر رشته انتخاب کنید")
      isInterviewInvitation ?
        dispatch(
          applicantFieldInterviewer(
            oneAdjusterList?.ApplicantId ?? selectedItemManagmentCartable?.ApplicantId,
            feildInterviewer,
            () => {
              dispatch(cartableReportAllInfo(modelReport, adjusterType.natural, () => closeModal()));
            },
            () => { }
          )
        )
        :
        dispatch(
          applicantFieldInterviewer(
            oneAdjusterList?.ApplicantId ?? selectedItemManagmentCartable?.ApplicantId,
            feildInterviewer,
            () => {
              dispatch(fetchListNaturalCartable(modelCartable, () => { }));
            },
            () => { }
          )
        );
    }

  };



  useEffect(() => {
    dispatch(
      fetchFieldInterviewer(oneAdjusterList?.ApplicantId ?? selectedItemManagmentCartable?.ApplicantId, (e: number) => {
        dispatch(getSubFieldBasedOnFieldNatural(e));
      })
    );

    dispatch(
      getSpecializedFieldInfoEdit(oneAdjusterList?.ApplicantId ?? selectedItemManagmentCartable?.ApplicantId, () => { })
    );

  }, []);

  let adjustmentField = {
    isActive: value,
  };

  useEffect(() => {
    dispatch(fetchAllAdjustmentField(adjustmentField));
  }, [value, oneAdjusterList?.ApplicantId, selectedItemManagmentCartable?.ApplicantId])

  useEffect(() => {
    // feildInfo &&
    feildInfo?.Result?.AdjustmentFieldId != undefined &&
      dispatch(
        fetchSubField(oneAdjusterList?.ApplicantId ?? selectedItemManagmentCartable?.ApplicantId, (e: number) =>
          dispatch(
            getSubFieldBasedOnFieldNatural(feildInfo?.Result?.AdjustmentFieldId)
          )
        )
      );
  }, [oneAdjusterList?.ApplicantId, selectedItemManagmentCartable?.ApplicantId]);

  const changeFieldHandler = (value: number) => {
    form.setFieldsValue({ SubFieldId: [] });
    value !== undefined && dispatch(getSubFieldBasedOnFieldNatural(value));
  };

  let SubFieldId = resFieldInterviewer?.Result?.SubFieldsDto?.map(
    (item: any) => item.AdjustmentFieldId
  );
  let SubFieldRegister = subFields?.Result?.map((item: any) => item.SubFieldId);

  useEffect(() => {
    form.setFieldsValue({
      adjustmentFieldId:
        resFieldInterviewer?.Result == null
          ? feildInfo?.Result?.AdjustmentFieldId
          : resFieldInterviewer?.Result?.SpecializedFieldDto?.AdjustmentFieldId,
      SubFieldId: SubFieldId == undefined ? SubFieldRegister : SubFieldId,
    });
  }, [resFieldInterviewer, feildInfo, subFields, value]);

  useEffect(() => {
    form.setFieldsValue({
      adjustmentFieldId: undefined,
      SubFieldId: undefined
    });
  }, [value]);



  // useEffect(() => {
  //   dispatch(fetchAllAdjustmentField(adjustmentField));
  // }, [value,activeTabInbox])


  const onChange = (e: any) => {
    setValue(e.target.value)

  };


  return (
    <div>
      <Form form={form} name="interviewerFeild" onFinish={onFinish}>
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
                loading={loadingResFieldInterviewer || feildInfoLoading}
                style={{ width: 240, border: "1px solid #cccccc" }}
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
              name="SubFieldId"
              label="زیر رشته تخصصی"
              rules={[
                { required: true, message: "لطفا نام زیر رشته را وارد نمایید" },
              ]}
              labelCol={{ span: 8 }}
            >
              <Select
                placeholder="انتخاب نمایید"
                allowClear
                loading={loading}
                mode="multiple"
                // onChange={subFieldHandler}
                notFoundContent={
                  Feilds?.Result == null && "زیر رشته ای موجود نیست"
                }
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

        <div className="submit">
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

export default FeildInterviewer;
