import React, { FC, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select } from "antd";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { fetchNaturalPersonalAll } from "../../../../redux/actions";
import { INaturalPersonalAll } from "../../../../shared/ulitities/Model/naturalPersonalAll";
import {SET_CEO} from '../../../../constant/desktop'

interface ICeoProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const { Option } = Select;
const { TextArea } = Input;
const Ceo: FC<ICeoProps> = ({ onSubmit, onPrev }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { naturalPersonalAll } = useSelector(
    (state: any) => state.naturalPersonalAll
  );
  const { ceo } = useSelector((state: any) => state.request);

  const onFinish = (values: any) => {
    let ceo={
        applicantId: values.applicantId,
        description:values.description,
        cooperationEndDate: values.cooperationEndDate
    }
    dispatch({ type: SET_CEO, payload: ceo });
    onSubmit();
  };


  


  useEffect(() => {
   form.setFieldsValue({
    applicantId: ceo?.applicantId,
    description:ceo?.description,
     cooperationEndDate:ceo?.cooperationEndDate 
   })
  }, [ceo])

  const prevHandler = () => {
    onPrev();
  };

  useEffect(() => {
    dispatch(fetchNaturalPersonalAll());
  }, []);

  return (
    <>
      <div>
        <Form name="createCeo" onFinish={onFinish} form={form}>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Form.Item
                name="applicantId"
                labelCol={{ span: 4 }}
                label="ارزیاب"
                rules={[
                  {
                    required: true,
                    message: "انتخاب نوع ارزیاب الزامی می باشد",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="انتخاب نمایید"
                >
                  {naturalPersonalAll?.Result?.map(
                    (person: INaturalPersonalAll) => (
                      <Option
                        key={person.ApplicantId}
                        value={person.ApplicantId}
                      >
                        {person.FullName}
                      </Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="cooperationEndDate"
                label="تاریخ انتصاب"
                labelCol={{ span: 5 }}
              >
                <DatePicker2 placeholder="تاریخ انتصاب" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 4 }}
                name="description"
                label="توضیحات"
              >
                <TextArea autoSize allowClear />
              </Form.Item>
            </Col>
          </Row>
          <div className="nextButton">
            <Button onClick={prevHandler}>مرحله قبلی</Button>
            <Button type="primary" htmlType="submit">
              مرحله بعدی
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Ceo;
