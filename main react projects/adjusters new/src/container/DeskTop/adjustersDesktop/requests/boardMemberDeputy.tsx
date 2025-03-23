import React, { useState, FC, useEffect } from "react";
import { Input, Button, Row, Col, Spin, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SET_DESCRIPTION } from "../../../../constant/desktop";
import moment from "jalali-moment";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { fetchBoardMemberDeputy, searchAdjuster, applicantBoardMemberDeputyDetails } from "../../../../redux/actions";
import { toast } from 'react-toastify'
interface IBoardMemberDeputyProps {
    onSubmit: () => void;
    onPrev: () => void;

}

const BoardMemberDeputy: FC<IBoardMemberDeputyProps> = ({ onSubmit, onPrev }) => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("")
    const [description, setDescription] = useState("")
    const [collaborationEndDate, setCollaborationEndDate] = useState(moment)
    const [collaborationStartDate, setCollaborationStartDate] = useState(moment)
    const [selectedAdjusterInfo, setSelctedAdjusterInfo] = useState<any>()
    const { applicantBoardMemberDeputy, loadingBoardMemberDeputy, adjusterSearchResult, adjusterSearchLoading } = useSelector((state: any) => state.request)
    const { Search, TextArea } = Input;

    const prevHandler = () => {
        onPrev();
    };
    let boardMemberDeputyOBJ = {
        applicantRequestId: 0,
        applicantId: selectedAdjusterInfo?.applicantId,
        currentApplicantId: applicantBoardMemberDeputy?.Result?.Applicant?.Id??null,
        cooperationEndDate: collaborationEndDate,
        startDate: collaborationStartDate,
        description: description
    }

    const nextStepHandler = () => {
        onSubmit();
        dispatch(applicantBoardMemberDeputyDetails(boardMemberDeputyOBJ));

    };

    const onSearch = (value: any) => {
        setSelctedAdjusterInfo({})
        setSearchValue(value)
        const searchOBJ = {
            count: 10,
            searchTerm: value
        }
        dispatch(searchAdjuster(searchOBJ))
    }
    useEffect(() => { 
        dispatch(fetchBoardMemberDeputy())

    }, [])
    const handleSlectedAdjuster = (record: any) => {

        setSelctedAdjusterInfo(record)
    }
    useEffect(() => {
        if (searchValue !== "" && adjusterSearchResult?.Result.length === 0) {
            toast.warning("موردی پیدا نشد")
        }

    }, [searchValue, adjusterSearchResult])
    let data = adjusterSearchResult?.Result?.map((request: any) => {
        let obj = {
            Id: request.Id,
            key: request.Id,
            adjusterCode: request.AdjusterCode,
            firstName: request.FirstName,
            familyName: request.FamilyName,
            applicantId: request.ApplicantId
        };
        return obj;
    });
    //coloumns Table
    let columns: any = [
        {
            title: "کد ارزیاب",
            dataIndex: "adjusterCode",
            key: "adjusterCode",
            width: "18%",

        },
        {
            title: "نام",
            dataIndex: "firstName",
            key: "firstName",
            width: "20%",

        },
        {
            title: "نام خانوادگی",
            dataIndex: "familyName",
            key: "familyName",
            width: "20%",

        },
        {
            title: "عملیات",
            dataIndex: "action",
            key: "action",
            width: "7%",
            render: (p: any, record: any) => <Button type="primary" onClick={() => handleSlectedAdjuster(record)}>انتخاب</Button>
        },
    ]
    return (
        <div >
            <Row className="manager-info-container">
                <Col span={24}>
                    <h4>اطلاعات نایب رئیس هیئت مدیره <span style={{ color: "orange" }}>فعلی</span></h4>
                    <hr />
                </Col>


                {
                    loadingBoardMemberDeputy ? <Spin style={{ width: "100%", margin: "20px auto" }} /> :

                        <>
                            {
                                applicantBoardMemberDeputy?.Result == null ?
                                    <h4 style={{ margin: "30px auto", color: "red" }}>اطلاعات نایب رئیس هیئت مدیره فعلی یافت نشد</h4>
                                    :
                                    <>
                                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                            <p>کد ارزیابی :</p>
                                            <span>{applicantBoardMemberDeputy?.Result?.Applicant?.AdjusterCode ?? "-"}</span>
                                        </Col>
                                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                            <p>نام و نام خانوادگی :</p>
                                            <span>{applicantBoardMemberDeputy?.Result?.Person?.FullName}</span>
                                        </Col>
                                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                            <p>تاریخ تولد :</p>
                                            <span>{moment(applicantBoardMemberDeputy?.Result?.Person?.BirthDate?.split("T")[0]).format(
                                                "jYYYY-jMM-jD"
                                            )}</span>
                                        </Col>
                                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                            <p>کد ملی :</p>
                                            <span>{applicantBoardMemberDeputy?.Result?.Person?.NationalCode}</span>
                                        </Col>

                                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                            <p>تاریخ پایان همکاری :</p>
                                            <DatePicker2 placeholder="تاریخ پایان همکاری" value={collaborationEndDate} onChange={(value: any) => setCollaborationEndDate(value)} />
                                        </Col>
                                    </>
                            }
                        </>
                }

            </Row>
            <Row className="manager-info-container">
                <Col span={24}>
                    <h4>اطلاعات نایب رئیس هیئت مدیره <span style={{ color: "orange" }}>جدید</span></h4>
                    <hr />

                </Col>
                <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 10 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <p>جستجو بر اساس نام خانوادگی یا کد ارزیابی</p>
                    <Search placeholder="جستجوی نام خانوادگی یا کد ارزیابی"
                        loading={adjusterSearchLoading}
                        onSearch={onSearch} />
                </Col>

            </Row>
            {
                selectedAdjusterInfo?.adjusterCode === undefined ?
                    <Table
                        columns={columns}
                        dataSource={data}

                        pagination={false}


                    /> :
                    <Row className="manager-info-container">
                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                            <p>کد ارزیابی :</p>
                            <span>{selectedAdjusterInfo?.adjusterCode}</span>
                        </Col>
                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                            <p>نام و نام خانوادگی :</p>
                            <span>{`${selectedAdjusterInfo?.firstName} ${selectedAdjusterInfo?.familyName} `}</span>
                        </Col>

                        <Col xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                            <p>تاریخ شروع همکاری :</p>
                            <DatePicker2 placeholder="تاریخ شروع همکاری" value={collaborationStartDate} onChange={(value: any) => setCollaborationStartDate(value)} />
                        </Col>
                        <Col xl={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <p>توضیحات :</p>
                            <TextArea value={description} onChange={(e: any) => setDescription(e.target.value)} />
                        </Col>

                    </Row>
            }
            <div className="nextButton">
                <Button onClick={prevHandler}>مرحله قبلی</Button>
                <Button type="primary" onClick={nextStepHandler}>
                    مرحله بعدی
        </Button>
            </div>
        </div >
    );
};

export default BoardMemberDeputy;
