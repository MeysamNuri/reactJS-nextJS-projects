import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Input, Select, Radio } from "antd";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { stockHolderLegalInquiry, postInquire, removeInqiry } from "../../../../redux/actions";
import { SET_STOCK_HOLDER } from '../../../../constant/desktop'
import moment from "jalali-moment";
import { toast } from 'react-toastify'
interface INewStockHolder {
    onSubmit: () => void; 
    onPrev: () => void;
  
}

const { Option } = Select;
const { TextArea } = Input;
const NewStockHolder: FC<INewStockHolder> = ({ onSubmit, onPrev }) => {
    const [form] = Form.useForm();
    const [stockHoldertype, setStockHolderType] = useState<boolean>(false)
    const [birthDate, setBirthDate] = useState<any>(null)
    const [nationalCode, setNationalCode] = useState("")
    const [identifierNumber, setIdentifierNumber] = useState<any>()
    const [stockHolderEndDate, setStockHolderEndDate] = useState<any>(null)
    const [stockHolderJoinDate, setStockHolderJoinDate] = useState<any>(null)
    const dispatch = useDispatch();
    const { inquire, loading } = useSelector(
        (state: any) => state.inquire
    );
    const selectStokHolderType = (e: any) => {
        setStockHolderType(e.target.value)
    }

    const onFinish = (values: any) => {
        let stockHolderOBG = {
            joinDate:values.joinDate==null?null: moment(values.joinDate).format("YYYY-MM-DD"),
            nationalCode: !stockHoldertype ? nationalCode : identifierNumber,
            fullName: !stockHoldertype ? inquire.Result?.FirstName + " " + inquire.Result?.LastName : inquire.Result?.CompanyName,
            isLegal: stockHoldertype,
            birthDate: birthDate == null ? null : moment(birthDate).format("YYYY-MM-DD"),
            shareAmount: values.shareAmount,
            endDate: values.endDate == null ? null : moment(values.endDate).format("YYYY-MM-DD"),
            description: values.description
        }

        dispatch({ type: SET_STOCK_HOLDER, payload: stockHolderOBG });
        onSubmit();
    };


    const prevHandler = () => {
        onPrev();
    };

    const stockHolderInquiry = () => {
        let identityInfo = {
            nationalCode: nationalCode,
            birthDate: moment(birthDate?.toDate()).format("YYYY-MM-DD"),
        };
        if (identityInfo.nationalCode === "" || birthDate === null) return toast.warning("لطفا مقادیر لازم را تکمیل بفرمایید")
        dispatch(postInquire(identityInfo, () => { }));
    };

    const legalStockHolderInquiry = () => {
        if (!identifierNumber) return toast.warning("لطفا مقادیر لازم را تکمیل بفرمایید")
        dispatch(stockHolderLegalInquiry(identifierNumber))
    }
    return (
        <>
            <div>

                <Row >
                    <Col span={24}>
                        <Form.Item

                            labelCol={{ span: 4 }}
                            label="نوع سهامدار"

                        >
                            <Radio.Group
                                disabled={inquire ? true : false}
                                onChange={selectStokHolderType}
                                optionType="button"
                                buttonStyle="solid"
                                defaultValue={false}
                            >
                                <Radio.Button value={false}>حقیقی</Radio.Button>
                                <Radio.Button value={true}>حقوقی</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    {
                        !stockHoldertype ? (
                            <>
                                <Col span={10}>
                                    <Form.Item
                                        labelCol={{ span: 4 }}
                                        name="nationalCode"
                                        label="کد ملی"
                                    >
                                        <Input onChange={(e) => setNationalCode(e.target.value)} value={nationalCode} />
                                    </Form.Item>
                                </Col>
                                <Col span={10} style={{ paddingRight: "10px" }}>
                                    <Form.Item
                                        name="birthDate"
                                        label="تاریخ تولد"
                                        labelCol={{ span: 5 }}
                                    >
                                        <DatePicker2 placeholder="تاریخ تولد"
                                            clasName="calendar"
                                            value={birthDate} onChange={(value: any) => setBirthDate(value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" onClick={stockHolderInquiry} loading={loading}>
                                        استعلام
                                             </Button>
                                </Col>
                            </>
                        ) :
                            (
                                <>

                                    <Col span={12}>
                                        <Form.Item
                                            labelCol={{ span: 6 }}
                                            name="nationalCode"
                                            label="شناسه شرکت"
                                        >
                                            <Input onChange={(e: any) => setIdentifierNumber(e.target.value)} value={identifierNumber} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={2}>
                                        <Button type="primary" onClick={legalStockHolderInquiry}>
                                            استعلام
                        </Button>
                                    </Col>
                                </>
                            )
                    }


                </Row>
                {
                    inquire && !stockHoldertype ?
                        <>

                            <Row>

                                <h3>مشخصات سهامدار</h3>

                            </Row>
                            <Row className="stock-holder-details bgColorGray-1">

                                <Col span={8}>
                                    <p>نام و نام خانوادگی : </p>
                                    <span>{`${inquire.Result?.FirstName} ${inquire.Result?.LastName}`}</span>
                                </Col>
                                <Col span={8}>
                                    <p>کد ملی :</p>
                                    <span>{inquire.Result?.NationalCode}</span>

                                </Col>
                                <Col span={8}>
                                    <p>تاریخ تولد :</p>
                                    {

                                        <span> {

                                            inquire.Result?.BirthDate ?
                                                (
                                                    moment(inquire.Result?.BirthDate?.split("T")[0]).locale('fa').format('YYYY/MM/DD')
                                                ) : "-"
                                        } </span>
                                    }


                                </Col>
                                <Col span={8}>
                                    <p>نام پدر :</p>
                                    <span>{inquire.Result?.FatherName}</span>
                                </Col>

                                <Col span={8}>
                                    <p>جنسیت :</p>
                                    <span>{inquire.Result?.Gender ? ("مرد") : ("زن")}</span>

                                </Col>


                            </Row>
                        </> :

                        inquire && stockHoldertype ?
                            <>
                                <Row>

                                    <h3>مشخصات سهامدار</h3>

                                </Row>
                                <Row className="stock-holder-details bgColorGray-1">

                                    <Col span={8}>
                                        <p>نام شرکت : </p>
                                        <span>{inquire.Result?.CompanyName}</span>
                                    </Col>
                                    <Col span={8}>
                                        <p>شناسه شرکت : </p>
                                        <span>{inquire.Result?.NationalCode}</span>
                                    </Col>
                                    <Col span={8}>
                                        <p>کد ثبت شرکت : </p>
                                        <span>{inquire.Result?.RegistrationCode}</span>
                                    </Col>
                                    <Col span={8}>
                                        <p>نوع شرکت : </p>
                                        <span>{inquire.Result?.CompanyTypeDescription}</span>
                                    </Col>
                                    <Col span={8}>
                                        <p>تاریخ ثبت شرکت : </p>
                                        <span> {

                                            inquire.Result?.RegistrationDate ?
                                                (
                                                    moment(inquire.Result?.RegistrationDate?.split("T")[0]).locale('fa').format('YYYY/MM/DD')
                                                ) : "-"
                                        } </span>
                                    </Col>
                                </Row>


                            </> : null
                }
                <Form name="createNewStockHolder" onFinish={onFinish} form={form}>
                    {

                        inquire &&
                        <Row style={{ marginTop: "15px" }} gutter={[16, 8]}>


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
                                    labelCol={{ span: 6 }}
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
                                    labelCol={{ span: 6 }}
                                    name="description"
                                    label="توضیحات"
                                >
                                    <TextArea autoSize allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
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

export default NewStockHolder;
