import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Radio } from "antd";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { stockHolderLegalInquiry, postInquire, fetchStockholderLegalEditToken } from "../../../../redux/actions";
import { INaturalPersonalAll } from "../../../../shared/ulitities/Model/naturalPersonalAll";
import { SET_STOCK_HOLDER } from '../../../../constant/desktop'
import moment from "jalali-moment";
import { toast } from 'react-toastify'
interface IEditStockHolderProps {
    onSubmit: () => void;
    onPrev: () => void;
}

const { Option } = Select;
const { TextArea } = Input;
const EditStockHolder: FC<IEditStockHolderProps> = ({ onSubmit, onPrev }) => {
    const [form] = Form.useForm();
    const [selectedStockHolder, setSelectedStockholder] = useState<any>()
    const [stockHoldertype, setStockHolderType] = useState<boolean>(false)
    const [stockHolderInfo, setStockHolderInfo] = useState<any>()
    const [stockHolderEndDate, setStockHolderEndDate] = useState<any>(null)
    const [stockHolderJoinDate, setStockHolderJoinDate] = useState<any>(null)
    const [stockHolderBirthDate, setStockHolderBirthDate] = useState<any>(null)

    const dispatch = useDispatch();
    const { inquire, loading } = useSelector(
        (state: any) => state.inquire
    );
    const { userLogin } = useSelector((state: any) => state.userLogin);
    const { listStockholderLegal, loading: stockListLoading } = useSelector(
        (state: any) => state.listDraftStockholderLegal
    );
    const selectStokHolderType = (e: any) => {
        setStockHolderType(e.target.value)
    }
    const selectStockHolder = (value: any) => {
        setSelectedStockholder(value)

    }
    useEffect(() => {
        dispatch(fetchStockholderLegalEditToken(userLogin?.Result?.ApplicantId))
    }, [])

    useEffect(() => {
        if (selectedStockHolder) {
            setStockHolderInfo(listStockholderLegal?.Result?.find((f: any) => f.Id === selectedStockHolder))
        }

    }, [selectedStockHolder])

    const onFinish = (values: any) => {
        let stockHolderOBG = {
            beforStockHolderId: stockHolderInfo?.Id,
            nationalCode: values?.nationalCode ?? stockHolderInfo?.NationalCode,
            fullName: values.fullName ?? stockHolderInfo?.FullName,
            joinDate: stockHolderJoinDate !== null ? moment(values.joinDate?.toDate()).format("YYYY-MM-DD") : stockHolderInfo?.JoinDate ?? null,
            birthDate: stockHolderBirthDate !== null ? moment(values.birthDate?.toDate()).format("YYYY-MM-DD") : stockHolderInfo?.BirthDate ?? null,
            shareAmount: values.shareAmount ?? stockHolderInfo?.ShareAmount,
            endDate: stockHolderEndDate !== null ? moment(stockHolderEndDate?.toDate()).format("YYYY-MM-DD") : stockHolderInfo?.EndDate ?? null,
            isLegal: stockHoldertype ?? stockHolderInfo?.IsLegal,
            description: values.description
        }

        dispatch({ type: SET_STOCK_HOLDER, payload: stockHolderOBG });
        onSubmit();
    };


    const prevHandler = () => {
        onPrev();
    };

    useEffect(() => {
        if (stockHolderInfo) {
            form.setFieldsValue({
                birthDate: stockHolderInfo?.BirthDate == null ? null : moment(
                    stockHolderInfo?.BirthDate?.split("T")[0]
                ),
                joinDate: stockHolderInfo?.JoinDate == null ? null : moment(
                    stockHolderInfo?.JoinDate
                        ?.split("T")[0]
                ),
                endDate: stockHolderInfo?.EndDate == null ? null : moment(
                    stockHolderInfo?.EndDate
                        ?.split("T")[0]
                ),
                shareAmount: stockHolderInfo?.ShareAmount,
                nationalCode: stockHolderInfo?.NationalCode,
                // fullName: stockHolderInfo?.FullName,
                // isLegal: stockHolderInfo?.IsLegal
            })
        }

    }, [stockHolderInfo])
    return (
        <>
            <div>

                <Row >
                    <Col span={12}>
                        <Form.Item
                            labelCol={{ span: 7 }}
                            label="لیست سهامداران"
                            name="workLocationInfoId"
                        >
                            <Select
                                placeholder="انتخاب نمایید"
                                style={{ width: "100%" }}
                                allowClear
                                loading={stockListLoading}
                                notFoundContent="لیست سهامداران وجود ندارد"
                                onChange={selectStockHolder}
                            >

                                {listStockholderLegal?.Result?.map((item: any) => (
                                    <Option key={item.Id} value={item.Id}>
                                        {item.FullName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form name="createNewStockHolder" onFinish={onFinish} form={form}>
                    {

                        stockHolderInfo &&
                        <>
                            <Row>

                                <h3>مشخصات سهامدار</h3>

                            </Row>

                            <Row style={{ marginTop: "15px" }} gutter={[16, 8]}>
                                <Col span={8}>
                                    <Form.Item
                                        labelCol={{ span: 8 }}
                                        name="fullName"
                                        label="نام کامل"
                                    >
                                        {/* <Input /> */}
                                        {<span>{stockHolderInfo?.FullName}</span>}
                                    </Form.Item>
                                </Col>

                                <Col span={8}>

                                    <Form.Item
                                        labelCol={{ span: 8 }}
                                        name="nationalCode"
                                        label={stockHolderInfo?.IsLegal ? ("شناسه شرکت") : ("کد ملی")}
                                    >
                                        {<span>{stockHolderInfo?.NationalCode}</span>}
                                    </Form.Item>
                                </Col>


                                <Col span={8}>
                                    <Form.Item
                                        name="isLegal"
                                        labelCol={{ span: 8 }}
                                        label="نوع سهامدار"

                                    >
                                        {/* <Radio.Group

                                            onChange={selectStokHolderType}
                                            optionType="button"
                                            buttonStyle="solid"

                                        >
                                            <Radio.Button value={false}>حقیقی</Radio.Button>
                                            <Radio.Button value={true}>حقوقی</Radio.Button>
                                        </Radio.Group> */}
                                        {<span>{stockHolderInfo?.IsLegal ? ("حقوقی") : ("حقیقی")}</span>}
                                    </Form.Item>
                                </Col>
                                {
                                    !stockHolderInfo?.IsLegal &&
                                    <Col span={12} style={{ paddingRight: "10px" }}>
                                        <Form.Item
                                            name="birthDate"
                                            label="تاریخ تولد"
                                            labelCol={{ span: 8 }}
                                        >
                                            <DatePicker2 placeholder="تاریخ تولد"
                                                clasName="calendar"
                                                value={stockHolderBirthDate}
                                                onChange={(value: any) => setStockHolderBirthDate(value)}
                                            />
                                        </Form.Item>
                                    </Col>
                                }
                                <Col span={12}>
                                    <Form.Item
                                        labelCol={{ span: 8 }}
                                        name="joinDate"
                                        label="تاریخ شروع تخصیص"
                                        rules={[
                                            {
                                                required: true,
                                                message: "انتخاب تاریخ شروع الزامی می باشد",
                                            },
                                        ]}
                                    >
                                        <DatePicker2 placeholder="انتخاب تاریخ"
                                            clasName="calendar"
                                            value={stockHolderJoinDate}
                                            onChange={(value: any) => setStockHolderJoinDate(value)}

                                        />
                                    </Form.Item>
                                </Col>


                                <Col span={12}>
                                    <Form.Item
                                        labelCol={{ span: 8 }}
                                        name="shareAmount"
                                        label="میزان سهم"
                                        rules={[
                                            {
                                                required: true,
                                                message: "میزان سهم الزامی می باشد",
                                            },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        labelCol={{ span: 8 }}
                                        name="endDate"
                                        label="تاریخ پایان تخصیص"
                                    >
                                        <DatePicker2 placeholder="انتخاب تاریخ"
                                            clasName="calendar"
                                            value={stockHolderEndDate}
                                            onChange={(value: any) => setStockHolderEndDate(value)}
                                            min={moment(stockHolderJoinDate)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        labelCol={{ span: 8 }}
                                        name="description"
                                        label="توضیحات"
                                    >
                                        <TextArea autoSize allowClear />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    }

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

export default EditStockHolder;
