import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button, Row, Col, ConfigProvider, Input, Popconfirm, Tooltip, Spin, Switch, Collapse } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as NotFile } from "../../../../assets/images/nofileStorage.svg";
import { ReactComponent as Remove } from "../../../../assets/images/remove.svg";
import { ReactComponent as Camera } from "../../../../assets/images/camera.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "jalali-moment";
import {

    uploadFileHandler,
    submitNotifications,
    fetchGetForGridNotifications,
    getNotificationDetails,
    editNotifications,
    removeNotificationDetails,
    removeUploadedFiles,
    removeUploadedFile,
    notificationAvatarFileHandler,
    updateFileList,
    dlFileHandler
} from "../../../../redux/actions";
export interface CreatNotificationMoalProps {
    onCancel: () => void,
    type?: number,
    modelRequest: any,
    selectedRecord: any,
    showNoticDetails: boolean,
    removeSelectedRecord?: any,
    disableDeletefiles?: boolean
}

const CreatNotificationMoal: React.FC<CreatNotificationMoalProps> = ({ showNoticDetails, onCancel, type, modelRequest, selectedRecord, removeSelectedRecord, disableDeletefiles }) => {
    const [form] = Form.useForm();
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const { TextArea } = Input
    const [file, setFile] = useState<any>(null)
    const [noticState, setNoticState] = useState(true)
    const [filesList, setFilesList] = useState<any>([])
    const [endDate, setEndDate] = useState<any>(null)
    const [showUploader, setShowUploader] = useState<boolean>(false)
    const { noticeAvatarFile, noticeAvatarLoading, uploadFile, loading, files, loadingDownload } = useSelector((state: any) => state.uploadFile);
    const { submitNotificationLoading, notificationResult, notificationDetailsInfo, notificationDetailsLoading } = useSelector((state: any) => state.notifications)

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(() => {
        if (selectedRecord.Id) {
            dispatch(getNotificationDetails(selectedRecord.Id))
            setFile(null)
        } else {
            setFile(null)
            dispatch(removeNotificationDetails())

        }

    }, [selectedRecord.Id])

    const fileDownloader = (record: any) => {
        dispatch(dlFileHandler(record.Id));
    };
    useEffect(() => {

        setFilesList([...files])

    }, [files])
    const handleNoticState = (value: any) => {
        setNoticState(value)
    }
    
    useEffect(() => {

        if (notificationDetailsInfo?.Result?.Picture || file !== null) {
            setShowUploader(false)
        }
        else {
            setShowUploader(true)
        }

    }, [file, notificationDetailsInfo])
    const removePosterPic = () => {
        setShowUploader(true)
        setFile(null)
        dispatch(removeUploadedFile(notificationDetailsInfo?.Result.Picture?.Id ?? noticeAvatarFile?.Result?.Id));
    }

    const onFinish = (values: any) => {


        if (selectedRecord.Id) {
            let editNoticOBJ = {
                title: values.title ?? notificationDetailsInfo?.Result?.Title,
                description: values.description ?? notificationDetailsInfo?.Result?.Description,
                endDate: values.endDate === null ? null : values.endDate !== null ? moment(values.endDate?.toDate()).format(
                    "YYYY-MM-DD"
                ) : notificationDetailsInfo?.Result?.EndDate,
                type: notificationDetailsInfo?.Result?.Type,
                fileDescriptionId: notificationDetailsInfo ? notificationDetailsInfo?.Result?.FileDescriptionId : uploadFile?.Result?.FileDescriptionId === null ? null : uploadFile?.Result?.FileDescriptionId,
                picId: noticeAvatarFile?.Result?.FileDescriptionId ?? notificationDetailsInfo?.Result?.PicId ?? null,
                isActive: noticState ?? notificationDetailsInfo?.Result?.IsActive,
                id: selectedRecord.Id
            }
            dispatch(editNotifications(editNoticOBJ, onCancel, modelRequest))
            removeSelectedRecord()
        }
        else {
            let noticOBJ = {
                title: values.title,
                description: values.description,
                endDate: values.endDate === null ? null : moment(values.endDate?.toDate()).format(
                    "YYYY-MM-DD"
                ),
                type: type,
                fileDescriptionId: uploadFile?.Result?.FileDescriptionId === null ? null : uploadFile?.Result?.FileDescriptionId,
                picId: noticeAvatarFile?.Result?.FileDescriptionId,
                isActive: noticState
            }
            dispatch(submitNotifications(noticOBJ, onCancel, modelRequest))

        }
        setFile(null)
        dispatch(removeNotificationDetails())
        form.resetFields()
        setFilesList([])
        dispatch(updateFileList([]))
        dispatch(removeUploadedFiles())

    }
    const getBase64 = (file: any, id: number) => {
        return new Promise(resolve => {
            // Make new FileReader
            let baseURL: any = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function (evt: any) {
                baseURL = reader.result;


                const sendObj = {
                    FileDescriptionId: notificationDetailsInfo?.Result?.PicId ?? noticeAvatarFile?.Result?.FileDescriptionId ?? 0,
                    FileName: file.name,
                    // Content: ""
                };
                let formData = new FormData();
                formData.append("file", file);
                formData.append("model", JSON.stringify(sendObj));
                dispatch(notificationAvatarFileHandler(formData));

            }
        });


    };
    const handleFileInputChange = (e: any, id: any) => {
        let myfile = e.target.files[0]

        getBase64(myfile, id)
            .then(result => {
                file["base64"] = result;

            })
        setFile(e.target.files[0])
    };
    const handleUpload = (e: any) => {

        const fileListAsArray = Array.from(e.target.files);
        fileListAsArray.forEach((v: any) => {
            const sendObj = {
                FileDescriptionId: notificationDetailsInfo?.Result?.FileDescriptionId ?? uploadFile?.Result?.FileDescriptionId ?? 0,
                FileName: v.name,
                // Content: ""
            };
            let formData = new FormData();
            formData.append("file", v);
            formData.append("model", JSON.stringify(sendObj));
            dispatch(uploadFileHandler(formData));
        });
    };

    const removeFile = (file: any) => {
        const newData = filesList?.filter((item: any) => item.Id !== file.Id);
        files?.filter((item: any) => item.Id !== file.Id);
        dispatch(removeUploadedFile(file.Id));
        setFilesList(newData)
        dispatch(updateFileList(newData))
    };
    useEffect(() => {
        setFilesList(notificationDetailsInfo?.Result?.Files ?? [])
        form.setFieldsValue({
            title: notificationDetailsInfo?.Result?.Title,
            endDate: moment(
                notificationDetailsInfo?.Result?.EndDate?.split("T")[0]
            ),
            description: notificationDetailsInfo?.Result?.Description,

        })
    }, [notificationDetailsInfo])
    return (

        <ConfigProvider direction="rtl">
            <Form
                name="statisticalReports"
                onFinish={onFinish}
                form={form}

                style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                }}
                labelCol={{ span: 9 }}
            >
                {

                    notificationDetailsLoading ? <Spin style={{ width: "100%", margin: "20px auto" }} /> :
                        <>

                            <Row className="monitoring-report-search-box">
                                <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    {
                                        noticeAvatarLoading ? <Spin style={{ width: "100%", margin: "10px auto" }} indicator={antIcon} /> :

                                            <Form.Item
                                                name="upload"
                                                label="بارگذاری تصویر"
                                                valuePropName="fileList"
                                                extra="حداکثر 500 کیلو بایت و با فرمت jpg یا png"
                                                className="uploader"

                                            >
                                                <div className="uploadBox">
                                                    {
                                                        file ?
                                                            <img src={URL.createObjectURL(file)} style={{ width: "100%" }} />
                                                            :
                                                            notificationDetailsInfo?.Result?.Picture?.Content !== undefined && !showUploader ?
                                                                <img src={"data:image/png;base64," + notificationDetailsInfo?.Result?.Picture?.Content} /> :
                                                                <Camera style={{ width: "100%", height: "100%" }} />


                                                    }
                                                </div>
                                                {
                                                    showNoticDetails ? null :
                                                        showUploader ?
                                                            <label className="customFileUpload">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileInputChange(e, "DocumentId")}

                                                                />

                                                     بارگذاری فایل
                                             <Upload />
                                                            </label> :
                                                            <div onClick={removePosterPic} className="remove-poser-pic">
                                                                حذف
                                            <Trash style={{ position: "absolute", left: "1", color: "red" }} />
                                                            </div>

                                                }

                                            </Form.Item>
                                    }
                                </Col>
                                <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Form.Item
                                        label="عنوان بخشنامه / اعلامیه"
                                        name="title"
                                        rules={[
                                            { required: true, message: "عنوان الزامی می باشد" },
                                        ]}
                                    >
                                        {
                                            showNoticDetails ?
                                                <span style={{ fontWeight: "bolder" }}>{notificationDetailsInfo?.Result?.Title}</span> :
                                                <Input placeholder="عنوان" />
                                        }

                                    </Form.Item>
                                </Col>
                                {/* <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Form.Item
                            name="registerOpenDate"
                            label="تاریخ صدور"

                            rules={[
                                { required: true, message: "انتخاب  تاریخ صدور الزامی می باشد" },
                            ]}

                        >
                            <DatePicker2 placeholder="شروع صدور" />
                        </Form.Item>
                    </Col> */}
                                <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Form.Item
                                        name="endDate"
                                        label="تاریخ اعتبار"

                                        rules={[
                                            { required: true, message: "انتخاب  تاریخ اعتبار الزامی می باشد" },
                                        ]}

                                    >
                                        {
                                            showNoticDetails ?
                                                <span style={{ fontWeight: "bolder" }}>{moment(notificationDetailsInfo?.Result?.EndDate?.split("T")[0]).format(
                                                    "jYYYY-jM-jD"
                                                )}</span> :
                                                <DatePicker2 value={endDate} onChange={(value: any) => setEndDate(value)} placeholder="تاریخ اعتبار" />

                                        }
                                    </Form.Item>
                                </Col>
                                <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Form.Item
                                        name="description"
                                        label="متن بخشنامه / اطلاعیه"

                                        rules={[
                                            { required: true, message: "متن پیام الزامی می باشد" },
                                        ]}

                                    >
                                        {
                                            showNoticDetails ?
                                                <span style={{ fontWeight: "bolder" }}>{notificationDetailsInfo?.Result?.Description}</span> :
                                                <TextArea placeholder="متن پیام خود را اینجا وارد کنید...." />

                                        }
                                    </Form.Item>
                                </Col>
                                <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                    <Form.Item
                                        name="isActive"
                                        label="وضعیت"

                                    >
                                        {
                                            showNoticDetails ?
                                                <span style={{ fontWeight: "bolder" }}>{notificationDetailsInfo?.Result?.IsActive ? ("فعال") : ("غیر فعال")}</span> :
                                                <Switch
                                                    onChange={handleNoticState}
                                                    checkedChildren="فعال"
                                                    unCheckedChildren="غیر فعال"
                                                    defaultChecked={notificationDetailsInfo ? notificationDetailsInfo?.Result?.IsActive : true}

                                                />
                                        }

                                    </Form.Item>
                                </Col>
                                <Collapse style={{ width: "100%" }}>
                                    <Panel header={"پیوست"} key="1">
                                        <Col xxl={{ span: 24 }} xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                                            {

                                                loading ? <Spin style={{ width: "100%", margin: "10px auto" }} indicator={antIcon} /> :
                                                    <>
                                                        <Form.Item
                                                            name="registerOpenDate"
                                                            label="پیوست"



                                                        >
                                                            {
                                                                showNoticDetails ? null :
                                                                    <>
                                                                        <label className="customFileUpload" style={{ width: "40%" }}>
                                                                            <input
                                                                                type="file"
                                                                                accept="image/jpeg*"
                                                                                onChange={(e) => handleUpload(e)}
                                                                            />
                                                            بارگذاری فایل
                                                            <Upload />
                                                                        </label>
                                                                        <br />
                                                                        {filesList?.length === 0 ? (
                                                                            <div style={{ margin: "0 auto", width: "30%" }}>
                                                                                <NotFile />
                                                                                <h5>فایلی بارگذاری نگردیده است</h5>
                                                                            </div>
                                                                        ) : null}
                                                                        <br />
                                                                    </>

                                                            }


                                                        </Form.Item>
                                                        <Row>

                                                            {filesList?.map((file: any, index: number) => {
                                                                return (
                                                                    <Col span={8}>
                                                                        <div className="cardDoc" style={{ width: "95%" }} key={index}>
                                                                            <div className="uploadFile">
                                                                                <span className="class-name">{file?.FileName}</span>
                                                                                <span style={{ display: "inline-flex" }}>
                                                                                    {!disableDeletefiles ?
                                                                                        <Popconfirm
                                                                                            title="از حذف فایل مورد نظر مطمئن هستید؟"
                                                                                            onConfirm={() => removeFile(file)}
                                                                                            okText="بله"
                                                                                            cancelText="خیر"
                                                                                        >
                                                                                            <Tooltip title="حذف" overlayClassName="popAction">
                                                                                                <a className="action">
                                                                                                    <Remove className="remove" />
                                                                                                </a>
                                                                                            </Tooltip>
                                                                                        </Popconfirm> : null

                                                                                    }

                                                                                    <Button
                                                                                        style={{ border: "none" }}
                                                                                        onClick={() => fileDownloader(file)}
                                                                                        icon={<Download style={{ marginTop: "5px" }} />}
                                                                                        loading={loadingDownload === file.Id}
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        </div>

                                                                    </Col>
                                                                );
                                                            })}

                                                        </Row>
                                                    </>

                                            }

                                        </Col>


                                    </Panel>
                                </Collapse>


                            </Row>

                            <div className="buttonRight">
                                {
                                    showNoticDetails ?
                                        <Button onClick={onCancel}>بستن</Button> :
                                        <Button type="primary" loading={submitNotificationLoading} htmlType="submit">ذخیره</Button>

                                }
                            </div>
                        </>
                }

            </Form>
        </ConfigProvider>
    );
}

export default CreatNotificationMoal;