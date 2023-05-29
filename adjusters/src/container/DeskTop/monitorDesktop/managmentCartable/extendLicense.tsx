import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Tooltip, Switch } from "antd";
import { api } from "../../../../httpServices/service";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { messageSuccess, messageError } from "../../../../utils/utils";
import { Icon } from 'sanhab-components-library'
import {
    uploadFileHandler,

} from "../../../../redux/actions";
import moment from "jalali-moment";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
export interface ExtendLicenseProps {
    closeModal: () => void,
    selectedItemManamentCartable: any
}

const ExtendLicense: React.FC<ExtendLicenseProps> = ({ closeModal, selectedItemManamentCartable }) => {

    const { TextArea } = Input
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    let exYear = parseInt(selectedItemManamentCartable?.licenseExpireDate.split("T")[0].split("-")[0]) + 3

    let FullYearLicenseExoireDate = exYear.toString() + "-" + selectedItemManamentCartable?.licenseExpireDate.split("T")[0].split("-")[1] + "-" + selectedItemManamentCartable?.licenseExpireDate.split("T")[0].split("-")[2]

    useEffect(() => {
        form.setFieldsValue({
            expirationDate: moment(FullYearLicenseExoireDate)
        })
    })

    const onFinish = (values: any) => {
        let applicantWarningOBJ = {
            applicantId: selectedItemManamentCartable.ApplicantId,
            description: values.description,
            expirationDate: values.expirationDate??FullYearLicenseExoireDate,

        }

        setLoading(true);
        api
            .post("/License/Extend", applicantWarningOBJ)
            .then((res: any) => {
                setLoading(false);
                form.resetFields();
                if (res.data.IsSucceed === true) {
                    messageSuccess("تمدید اعتبار پروانه انجام شد");
                    closeModal();
                } else {
                    messageError("خطا در تمدید اعتبار پروانه");
                }
            })
            .catch((error: any) => {
                setLoading(false);
                messageError("خطا در تمدید اعتبار پروانه ");
            });
    }
    return (
        <Form onFinish={onFinish} form={form}>
            <Row gutter={[16, 8]}>


                <Col span={24}>
                    <Form.Item
                        name="expirationDate"
                        label="انتخاب تاریخ تمدید"
                        labelCol={{ span: 7 }}
                    >
                        <DatePicker2 placeholder="تاریخ تمدید" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        name="description"
                        labelCol={{ span: 7 }}
                        label="توضیحات"
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

export default ExtendLicense;