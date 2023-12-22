import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Tooltip, Switch } from "antd";
import { api } from "../../../../httpServices/service";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { messageSuccess, messageError } from "../../../../utils/utils";
import { Icon } from 'sanhab-components-library'
import {
    uploadFileHandler,
    removeUploadedFiles,
    dlFileHandler,
    removeFileHandler,

} from "../../../../redux/actions";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
export interface WarningFormProps {
    closeModal: () => void,
    selectedItemManamentCartable: any,
    removeFiles?: boolean
}

const WarningForm: React.FC<WarningFormProps> = ({ removeFiles, selectedItemManamentCartable, closeModal }) => {
    const { uploadFile, files } = useSelector((state: any) => state.uploadFile);
    const { TextArea } = Input
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [sendSms, setSendSms] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSendSms = (value: any) => {
        setSendSms(value)

    }

    useEffect(() => {
        dispatch(removeUploadedFiles())
    }, [removeFiles])
    const downloadFile = (file: any) => {

        dispatch(dlFileHandler(file.Id));
    }
    const removeFile = (file: any) => {

        const newData = files.filter((item: any) => item.Id != file.Id);
        dispatch(removeFileHandler(file.Id, newData, () => { }));
    }
    const handleUpload = (e: any) => {
        let fileName = [];
        fileName.push(e.target.files[0]);
        setFile(e.target.files[0]);
        const fileListAsArray = Array.from(e.target.files);
        fileListAsArray.forEach((v: any) => {
            //   let ex: string = '';
            //   switch (v.type) {
            //       case "image/png":
            //           ex = ".png"
            //           break;
            //       case "application/pdf":
            //           ex = ".pdf"
            //           break;
            //       case "image/jpeg":
            //           ex = ".jpeg"
            //           break;
            //       default:
            //           ex = ""
            //           break;
            //   }
            const sendObj = {
                FileDescriptionId: uploadFile?.Result.FileDescriptionId && files.length > 0
                    ? uploadFile?.Result.FileDescriptionId
                    : 0,
                FileName: v.name,
                // Content: ""
            };
            let formData = new FormData();
            formData.append("file", v);
            formData.append("model", JSON.stringify(sendObj));
            dispatch(uploadFileHandler(formData));
        });
    };

    const onFinish = (values: any) => {
        let applicantWarningOBJ = {
            applicantId: selectedItemManamentCartable.ApplicantId,
            title: values.title,
            description: values.description,
            sendSms: sendSms,
            effectiveDate: values.effectiveDate,
            fileDescriptionId: uploadFile?.Result.FileDescriptionId
        }

        setLoading(true);
        api
            .post("/ApplicantWarning", applicantWarningOBJ)
            .then((res: any) => {
                setLoading(false);
                form.resetFields();
                if (res.data.IsSucceed === true) {
                    messageSuccess("گزارش اخطار به درستی ارسال گردید");
                    closeModal();
                } else {
                    messageError("خطا در ارسال گزارش اخطار ");
                }
            })
            .catch((error: any) => {
                setLoading(false);
                messageError("خطا در ارسال گزارش اخطار ");
            });
        dispatch(removeUploadedFiles())
        form.resetFields()
    }
    return (
        <Form onFinish={onFinish} form={form}>
            <Row gutter={[16, 8]}>
                <Col span={24}>
                    <Form.Item
                        name="title"
                        labelCol={{ span: 7 }}
                        label="عنوان"
                        rules={[
                            { required: true, message: "عنوان الزامی می باشد" },
                          ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
 
                <Col span={24}>
                    <Form.Item
                        name="effectiveDate"
                        label=" تاریخ موثر"
                        labelCol={{ span: 7 }}
                        rules={[
                            { required: true, message: "تاریخ موثر الزامی می باشد" },
                          ]}
                    >
                        <DatePicker2 placeholder="تاریخ موثر" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item labelCol={{ span: 7 }} name="sendSms" label=" ارسال پیامک">
                        <Switch
                            onChange={handleSendSms}
                            checkedChildren="فعال"
                            unCheckedChildren="غیر فعال"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="upload"
                        label="بارگذاری فایل"
                        labelCol={{ span: 7 }}
                    >
                        <Tooltip placement="bottom" title="بارگذاری فایل">
                            <label className="customFileUpload customWidthFile ">
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
                <Col span={24} >
                    {
                        files?.length > 0 ?
                            <p className="files-text"><span style={{ color: "orange", borderBottom: "1px solid" }}>{files?.length}</span> تعداد فایل های بارگذاری شده </p>

                            : null
                    }

                    {

                        files?.map((item: any) => (

                            <div className={"List-uploded"}>

                                {/* <img src={remove} alt="remove" onClick={() => removeUplodedFile(item.Id)} />
                                         */}

                                <Icon
                                    onClick={() => downloadFile(item)}
                                    iconType="download"
                                    toolTip="دانلود"
                                    size="medium"


                                />
                                <Icon
                                    onClick={() => removeFile(item)}
                                    iconType="trash"
                                    toolTip="حذف"
                                    size="medium"


                                />
                                <span className="class-name">{item?.FileName}</span>

                            </div>


                        ))

                    }


                </Col>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        labelCol={{ span: 7 }}
                        label="توضیحات"
                        rules={[
                            { required: true, message: "توضیحات الزامی می باشد" },
                          ]}
                    >
                        <TextArea autoSize allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <div className="nextButton">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    ذخیره
          </Button>
            </div>
        </Form>
    );
}

export default WarningForm;