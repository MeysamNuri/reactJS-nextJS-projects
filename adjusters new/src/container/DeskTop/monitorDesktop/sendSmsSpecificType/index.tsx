import React, { useEffect, useState } from 'react';
import { Input, ConfigProvider, Spin, Row, Col, Form, Select, Button, Tabs, Tooltip } from 'antd';
import {
    fetchAllStatuses,
    sendSmsSpecificType,
    uploadFileHandler,
    sendBatchSpecificType
} from "../../../../redux/actions";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { useDispatch, useSelector } from "react-redux";

import './style.css'
export interface sendSmsSpecificTypeProps {

}

const SendSmsSpecificType: React.FC<sendSmsSpecificTypeProps> = () => {
    const dispatch = useDispatch();
    const { TabPane } = Tabs;
    const [file, setFile] = useState(null);
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TextArea } = Input
    const [activeTab, setActiveTab] = useState<any>("1")
    const handleActiveTab = (value: any) => {
        setActiveTab(value)
        form.resetFields()
    }
    useEffect(() => {

        dispatch(fetchAllStatuses());
    }, []);

    let { statusList } = useSelector((state: any) => state.allChangeStatusReason);
    let { smsSpecificTypeLoading } = useSelector((state: any) => state.smsOutBoxList);
    let { sendBatchSpecificTypeLoading } = useSelector((state: any) => state.smsBatchSend);
    const { uploadFile, files } = useSelector((state: any) => state.uploadFile);

    const onFinish = (values: any) => {
        const smsBody = {
            sbject: values.subject,
            body: values.body,
            adjusterTypeId: values.adjusterTypeId,
            statusId: values.state
        }
        dispatch(sendSmsSpecificType(smsBody))

    }
    const onFinish2 = (values: any) => {
        const smsBody = {
            text: values.body,
            adjusterTypeId: values.adjusterTypeId,
            statusId: values.state,
            fileDescriptionId: uploadFile?.Result.FileDescriptionId
        }
        dispatch(sendBatchSpecificType(smsBody))

    }
    const handleUpload = (e: any) => {
        let fileName = [];
        fileName.push(e.target.files[0]);
        setFile(e.target.files[0]);
        const fileListAsArray = Array.from(e.target.files);
        fileListAsArray.forEach((v: any) => {

            const sendObj = {
                FileDescriptionId: uploadFile?.Result.FileDescriptionId ?? 0,
                FileName: v.name,
                // Content: ""
            };
            let formData = new FormData();
            formData.append("file", v);
            formData.append("model", JSON.stringify(sendObj));
            dispatch(uploadFileHandler(formData));
        });
    }
    return (

        <div>
            <ConfigProvider direction="rtl">
                <Tabs
                    onChange={handleActiveTab}
                >
                    <TabPane tab="پیامک" key={1}>

                    </TabPane>
                    <TabPane tab="پیام" key={2}>
                    </TabPane>


                </Tabs>
                {
                    activeTab == "1" ?
                        <Form name="createCourse" onFinish={onFinish} form={form} className="form-details">
                            <Row gutter={[16, 8]}>
                                <Col span={12}>
                                    <Form.Item
                                        name="adjusterTypeId"
                                        labelCol={{ span: 5 }}
                                        label="نوع ارزیاب"
                                        rules={[
                                            { required: true, message: "انتخاب نوع ارزیاب الزامی می باشد" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="انتخاب ارزیاب"
                                            style={{ width: "100%" }}
                                            allowClear
                                        >

                                            <Option key={"1"} value={"1"}>
                                                حقیقی
                  </Option>
                                            <Option key={"2"} value={"2"}>
                                                حقوقی
                  </Option>
                                            <Option key={"3"} value={"3"}>
                                                دادگستری
                  </Option>


                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="state"
                                        labelCol={{ span: 5 }}
                                        label="وضعیت ارزیاب"
                                        rules={[
                                            { required: true, message: "انتخاب نوع ارزیاب الزامی می باشد" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="انتخاب وضعیت"
                                            style={{ width: "100%" }}
                                            allowClear
                                        >
                                            {statusList?.Result?.map(
                                                (status: any) => (
                                                    <Option key={status.Value} value={status.Value}>
                                                        {status.Description}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="subject"
                                        labelCol={{ span: 5 }}
                                        label="موضوع"
                                        rules={[
                                            { required: true, message: "انتخاب موضوع الزامی می باشد" },
                                        ]}
                                    >
                                        <Input />

                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="body"
                                        labelCol={{ span: 5 }}
                                        label="پیام"
                                        rules={[
                                            { required: true, message: "پیام الزامی می باشد" },
                                        ]}
                                    >
                                        <TextArea />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <div style={{ display: 'flex', direction: "ltr" }}>
                                <Button type="primary" htmlType="submit" loading={smsSpecificTypeLoading}>
                                    ارسال
                    </Button>
                            </div>

                        </Form>
                        :

                        <Form name="createCourse" onFinish={onFinish2} form={form} className="form-details">
                            <Row gutter={[16, 8]}>
                                <Col span={12}>
                                    <Form.Item
                                        name="adjusterTypeId"
                                        labelCol={{ span: 5 }}
                                        label="نوع ارزیاب"
                                        rules={[
                                            { required: true, message: "انتخاب نوع ارزیاب الزامی می باشد" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="انتخاب ارزیاب"
                                            style={{ width: "100%" }}
                                            allowClear
                                        >

                                            <Option key={"1"} value={"1"}>
                                                حقیقی
                  </Option>
                                            <Option key={"2"} value={"2"}>
                                                حقوقی
                  </Option>
                                            <Option key={"3"} value={"3"}>
                                                دادگستری
                  </Option>


                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="state"
                                        labelCol={{ span: 5 }}
                                        label="وضعیت ارزیاب"
                                        rules={[
                                            { required: true, message: "انتخاب نوع ارزیاب الزامی می باشد" },
                                        ]}
                                    >
                                        <Select
                                            placeholder="انتخاب وضعیت"
                                            style={{ width: "100%" }}
                                            allowClear
                                        >
                                            {statusList?.Result?.map(
                                                (status: any) => (
                                                    <Option key={status.Value} value={status.Value}>
                                                        {status.Description}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        name="body"
                                        labelCol={{ span: 5 }}
                                        label="پیام"
                                        rules={[
                                            { required: true, message: "پیام الزامی می باشد" },
                                        ]}
                                    >
                                        <TextArea />

                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="upload"
                                        label="بارگذاری فایل"
                                        labelCol={{ span: 5 }}

                                    >
                                        <Tooltip placement="bottom" title="بارگذاری فایل">
                                            <label className="customFileUpload">
                                                <Upload />
                                                <input
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    onChange={(e) => handleUpload(e)}
                                                />
                                            </label>
                                        </Tooltip>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div style={{ display: 'flex', direction: "ltr" }}>
                                <Button type="primary" htmlType="submit" loading={sendBatchSpecificTypeLoading}>
                                    ارسال
                                </Button>
                            </div>


                        </Form>

                }
            </ConfigProvider>
        </div>

    );
}

export default SendSmsSpecificType;