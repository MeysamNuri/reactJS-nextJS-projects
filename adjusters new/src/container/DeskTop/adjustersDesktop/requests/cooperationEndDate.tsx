import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Radio, InputNumber } from "antd";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { fetchListBoardMember } from "../../../../redux/actions";
import { SET_COOPERATION_END_DATE } from '../../../../constant/desktop'
import moment from "jalali-moment";
import { toast } from 'react-toastify'
interface ICooperationEndDateProps {
    onSubmit: () => void;
    onPrev: () => void;
}

const { Option } = Select;
const { TextArea } = Input;
const CooperationEndDate: FC<ICooperationEndDateProps> = ({ onSubmit, onPrev }) => {
    let userIdRecognition = Number(localStorage.getItem("userRecognition"));
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [cooperationEndDate, setCooperationEndDate] = useState<any>(null)
    const [selectedBoardMemberId, setSelctedBoardMemberId] = useState<number>(0)
    const listMember = useSelector(
        (state: any) => state.listBoardMember.listBoardMember
    );
    const memberLoading = useSelector(
        (state: any) => state.listBoardMember.loading
    );
    useEffect(() => {
        dispatch(
            fetchListBoardMember(userIdRecognition)
        );

    }, []);

    const selectBoardMember = (value: any) => {
        setSelctedBoardMemberId(value)
    }
    const onFinish = (values: any) => {
        let cooperationEndDateOBG = {
            boardMemberId: selectedBoardMemberId,
            cooperationEndDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
            description: values.description
        }

        dispatch({ type: SET_COOPERATION_END_DATE, payload: cooperationEndDateOBG });
        onSubmit();
    };


    const prevHandler = () => {
        onPrev();
    };
    return (
        <>
            <div>
                <Form name="createCapitalIncrease" onFinish={onFinish} form={form}>
                    <Row gutter={12}>


                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 7 }}
                                label="انتخاب عضو"
                                name="boardMemberId"
                                rules={[{ required: true, message: "انتخاب عضو الزامی می باشد " }]}
                            >
                                <Select
                                    placeholder="انتخاب نمایید"
                                    style={{ width: "100%" }}
                                    allowClear
                                    loading={memberLoading}
                                    notFoundContent="عضو وجود ندارد"
                                    onChange={selectBoardMember}
                                >

                                    {listMember?.Result?.map((item: any) => (
                                        <Option key={item.Id} value={item.Id}>
                                            {item.IdentityInfo?.FullName + "- " + item?.PositionTitle}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="cooperationEndDate"
                                label="تاریخ پایان همکاری"
                                labelCol={{ span: 8 }}
                                rules={[{ required: true, message: "تاریخ پایان همکاری الزامی می باشد " }]}
                            >
                                <DatePicker2 placeholder="تاریخ پایان همکاری" value={cooperationEndDate} onChange={(value: any) => setCooperationEndDate(value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{ span: 7 }}
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

export default CooperationEndDate;
