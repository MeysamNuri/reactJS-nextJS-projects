import React, { useState, useEffect } from "react";
import { Form, Select, Button, Row, Col, Input, Switch, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { applicantForbiddnSourcePosition, applicantForbiddnPosition, forbiddenBaseInfo, getForbiddenBaseInfoDetails,editForbiddenBaseInfo } from "../../../redux/actions";
export interface CreateForbiddenInfoProps {
    addForm: boolean,
    selectedForbiddenId: number
}

const CreateForbiddenInfo: React.SFC<CreateForbiddenInfoProps> = ({ addForm, selectedForbiddenId }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [selectedPosition, setSelectedPosition] = useState<any>()
    const [selectedSourcePosition, setSelectedSourcePosition] = useState<any>()
    const [isActive, setIsActive] = useState<boolean>(false)
    const { Option } = Select;
    const { forbiddenPositionLoading,
        forbiddenPositionDetails,
        forbiddenSubmitLoading,
        forbiddenSourcePostitionLoading,
        forbiddenSourcePostitionDetails,
        getForbiddenDetailsLoading,
        getForbiddenDetails
    } = useSelector((state: any) => state.forbiddenInfo)
    useEffect(() => {
        dispatch(applicantForbiddnSourcePosition())
        dispatch(applicantForbiddnPosition())
    }, [])


    useEffect(() => {
        if (selectedForbiddenId !== undefined) {
            dispatch(getForbiddenBaseInfoDetails(selectedForbiddenId))
        }

    }, [selectedForbiddenId])

    const handlePosition = (value: any) => {
        setSelectedPosition(value)
    }
    const handleSourcePosition = (value: any) => {
        setSelectedSourcePosition(value)
    }
    const handleStatus = (value: any) => {
        setIsActive(value)
    }
    
    const onFinish = (values: any) => {
        if(addForm){
            let obj = {
                title: values.title,
                position: selectedPosition,
                sourcePosition: selectedSourcePosition,
                isActive: isActive,
                code: values.code
            }
            dispatch(forbiddenBaseInfo(obj))
        }else{
            let obj = {
                title: values.title??getForbiddenDetails?.Result.Title,
                position: selectedPosition??getForbiddenDetails?.Result.Position,
                sourcePosition: selectedSourcePosition??getForbiddenDetails?.Result.SourcePosition,
                isActive: isActive??getForbiddenDetails?.Result.IsActive,
                code: values.code??getForbiddenDetails?.Result.Code,
                id: selectedForbiddenId
            }
            dispatch(editForbiddenBaseInfo(obj))
        }
      

    }
    useEffect(() => {
        if(getForbiddenDetails&&!addForm){
        
                setIsActive(getForbiddenDetails?.Result.IsActive)
                form.setFieldsValue({
                    title:getForbiddenDetails?.Result.Title,
                    code:getForbiddenDetails?.Result.Code,
                    position:getForbiddenDetails?.Result.PositionDescription,
                    sourcePosition:getForbiddenDetails?.Result.SourcePositionDescription,
                   
                })
            }
            else{
                form.resetFields()
                setIsActive(false)
            }
          
        
    }, [getForbiddenDetails,addForm])

    return (

        <div>
            <Form name="forbidden" onFinish={onFinish} form={form}>
                {
                    getForbiddenDetailsLoading ? <Spin style={{ width: "100%", margin: "20px auto" }} /> :
                        <Row>

                            <Col span={12}>
                                <Form.Item
                                    label="عنوان شاخص"
                                    name="title"
                                    labelCol={{ md: 5, xxl: 6, xl: 6, }}

                                    rules={[
                                        {
                                            required: true,
                                            message: "عنوان الزامی می باشد",
                                        },
                                        {
                                            pattern: /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/,
                                            message: "نام باید با حروف فارسی باشد",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    label="کد شاخص"
                                    name="code"
                                    style={{ marginRight: "10px" }}
                                    labelCol={{ md: 5, xxl: 6, xl: 6, }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "کد شاخص الزامی می باشد.",
                                        },

                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>

                            </Col>

                            <Col span={12} >
                                <Form.Item
                                    name="position"
                                    label="سمت"
                                    labelCol={{ md: 5, xxl: 6, xl: 6, }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "انتخاب سمت الزامی است",
                                        },
                                    ]}
                                >
                                    <Select
                                        //style={{ width: "350px" }}
                                        placeholder="انتخاب نمایید"
                                        loading={forbiddenPositionLoading}
                                        onChange={handlePosition}
                                    >
                                        {forbiddenPositionDetails?.Result?.map(
                                            (item: any) => (
                                                <Option key={item.Value} value={item.Value}>
                                                    {item.Description}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    name="sourcePosition"
                                    label="منبع"
                                    style={{ marginRight: "10px" }}
                                    labelCol={{ md: 5, xxl: 6, xl: 6, }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "انتخاب منبع الزامی است",
                                        },
                                    ]}
                                >
                                    <Select
                                        onChange={handleSourcePosition}
                                        placeholder="انتخاب نمایید"
                                        loading={forbiddenSourcePostitionLoading}
                                    >
                                        {forbiddenSourcePostitionDetails?.Result?.map((item: any) => (
                                            <Option key={item.Value} value={item.Value}>
                                                {item.Description}
                                            </Option>
                                        )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="isActive"
                                    label="وضعیت"

                                    labelCol={{ md: 5, xxl: 6, xl: 6, }}

                                >
                                    <Switch
                                        onChange={handleStatus}
                                        defaultChecked={false}
                                        checked={isActive}
                                        checkedChildren="فعال"
                                        unCheckedChildren="غیر فعال"
                                        
                                    />
                                </Form.Item>

                            </Col>

                        </Row>
                }


                <div className="submit">
                    <Button
                        loading={forbiddenSubmitLoading}
                        type="primary"
                        htmlType="submit"

                    >
                        ذخیره
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreateForbiddenInfo;