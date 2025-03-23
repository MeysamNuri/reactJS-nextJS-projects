import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Radio ,InputNumber} from "antd";
import { SET_CAPITAL_INCREASE } from '../../../../constant/desktop'

interface ICapitalIncreaseProps {
    onSubmit: () => void;
    onPrev: () => void;
}

const { TextArea } = Input;
const CapitalIncrease: FC<ICapitalIncreaseProps> = ({ onSubmit, onPrev }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();


    const onFinish = (values: any) => {
        let capitalOBG = {
            capital: values.capital,
            description: values.description
        }

        dispatch({ type: SET_CAPITAL_INCREASE, payload: capitalOBG });
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
                                name="capital"
                                label="افزایش سرمایه"
                                rules={[
                                    {
                                        required: true,
                                        message: "افزایش سرمایه الزامی می باشد",
                                    },
                                ]}
                            >
                                <InputNumber style={{width:"100%"}}  formatter={(value:any) => ` ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                                    parser={(value:any) => value.replace(new RegExp(/\$\s?|(,*)/g), '')} />
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

export default CapitalIncrease;
