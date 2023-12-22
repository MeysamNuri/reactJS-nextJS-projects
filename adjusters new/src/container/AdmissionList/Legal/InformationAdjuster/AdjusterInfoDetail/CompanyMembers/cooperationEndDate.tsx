import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Input, Button, Form } from 'antd'
import DatePicker2 from "../../../../../../components/UI/DatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { toast } from 'react-toastify'
import {
    fetchListBoardMember,
    boardMemberEndCooperation,
    stockHolderEndCooperation,
    fetchStockholderLegalEditToken,
    employeeEndCooperation,
    fetchEmployeeLegalEditToken,
    employeeEndDate,
    stockHolderEndDateManagmentCartable,
    boardMemberCartableManagementEndDate
} from "../../../../../../redux/actions";
export interface CooperationendDateModalProps {
    selectedBoardMember: any,
    userIdRecognition?: number | undefined,
    closeModal: () => void;
    isFromStockHolder?: boolean,
    activeTab?:string,
    isEvaluatorDesktopInformation?:number,
    activeTabCompanyMember?:string,
    selectedItemManagmentCartable?:any
}

const CooperationendDateModal: React.FC<CooperationendDateModalProps> = ({selectedItemManagmentCartable,activeTabCompanyMember,isEvaluatorDesktopInformation, selectedBoardMember, userIdRecognition, closeModal, isFromStockHolder,activeTab }) => {
    const { TextArea } = Input
    const [form] = Form.useForm();
    const [endCooperationdescription, setEndCooperationDescription] = useState("");
    const [cooperationEndDate, setCooperationEndDate] = useState<any>(null)
    const dispatch = useDispatch();
    const { boardMemberEndCooperationLoading } = useSelector(
        (state: any) => state.request
    );


    const submitEndCooperation = () => {

        if (activeTab=="1"&& isEvaluatorDesktopInformation!==2) {
            let endCooperationOBJ = {
                Id: selectedBoardMember?.Id,
                cooperationEndDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
                description: endCooperationdescription,
                founderId: selectedBoardMember?.FounderId
            }
            dispatch(boardMemberEndCooperation(
                endCooperationOBJ,
                () => {
                    dispatch(fetchListBoardMember(userIdRecognition))
                },
                closeModal

            ))
        }
        else if(activeTab=="2"&& isEvaluatorDesktopInformation!==2) {
            let endCooperationOBJ = { 
                Id: selectedBoardMember?.Id,
                endDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",

            }
            if (!cooperationEndDate) return toast.warning("لطفا تاریخ پایان همکاری را مشخص کنید")
            dispatch(stockHolderEndCooperation(
                endCooperationOBJ,
                () => {
                    dispatch(fetchStockholderLegalEditToken(userIdRecognition));
                },
                closeModal

            ))
        }
        else if(activeTab=="3"&& isEvaluatorDesktopInformation!==2) {
            let endCooperationOBJ = {
                Id: selectedBoardMember?.Id,
                endDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",

            }
            if (!cooperationEndDate) return toast.warning("لطفا تاریخ پایان همکاری را مشخص کنید")
            dispatch(employeeEndCooperation(
                endCooperationOBJ,
                () => {
                    dispatch(fetchEmployeeLegalEditToken(userIdRecognition))
                },
                closeModal

            ))
        }
        else if(activeTabCompanyMember=="1"&&isEvaluatorDesktopInformation==2){
            let endCooperationOBJ = {
                id: selectedBoardMember?.Id,
                cooperationEndDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
                founderId: selectedBoardMember?.FounderId

            }
            if (!cooperationEndDate) return toast.warning("لطفا تاریخ پایان همکاری را مشخص کنید")
            dispatch(boardMemberCartableManagementEndDate(
                endCooperationOBJ,
                () => {
                    dispatch(fetchListBoardMember(selectedItemManagmentCartable?.ApplicantId));
                },
                closeModal

            ))
        }
        else if(activeTabCompanyMember=="3"&&isEvaluatorDesktopInformation==2){
            let endCooperationOBJ = {
                Id: selectedBoardMember?.Id,
                endDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",

            }
            if (!cooperationEndDate) return toast.warning("لطفا تاریخ پایان همکاری را مشخص کنید")
            dispatch(employeeEndDate(
                endCooperationOBJ,
                () => {
                    dispatch(fetchEmployeeLegalEditToken(selectedItemManagmentCartable?.ApplicantId));
                },
                closeModal

            ))
        }
        else if(activeTabCompanyMember=="2"&&isEvaluatorDesktopInformation==2){

            let endCooperationOBJ = {
                Id: selectedBoardMember?.Id,
                endDate: moment(cooperationEndDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",

            }
            if (!cooperationEndDate) return toast.warning("لطفا تاریخ پایان همکاری را مشخص کنید")
            dispatch(stockHolderEndDateManagmentCartable(
                endCooperationOBJ,
                () => {
                    dispatch(fetchStockholderLegalEditToken(selectedItemManagmentCartable?.ApplicantId));
                },
                closeModal

            ))
        }
    }
  
    let convertDate= moment.from(selectedBoardMember?.AppointmentDate??selectedBoardMember?.EmploymentDate, 'fa', 'YYYY/MM/DD');


    return (
        <>
            <Row gutter={16}>

                <Col className="gutter-row" xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <div className="titles">نام و نام خانوادگی</div>
                    <span className="contentColumns">
                        {selectedBoardMember?.FullName !== undefined ? (
                            <span>
                                {" "}
                                {selectedBoardMember?.FullName}
                            </span>
                        ) : (
                                <Skeleton loading={true} active paragraph={false} />
                            )}
                    </span>
                </Col>
                <Col className="gutter-row" xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <div className="titles">کد ملی/شناسه شرکت</div>
                    <span className="contentColumns">
                        {selectedBoardMember?.NationalCode !== undefined ? (
                            <span>
                                {" "}
                                {selectedBoardMember?.NationalCode}
                            </span>
                        ) : (
                                <Skeleton loading={true} active paragraph={false} />
                            )}
                    </span>
                </Col>
                {
                    isFromStockHolder ?
                        (<>
                            <Col className="gutter-row" xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                                <div className="titles">تاریخ شروع تخصیص</div>
                                <span className="contentColumns">
                                    {selectedBoardMember.JoinDate !== undefined ? (
                                        <span>
                                            {" "}
                                            <span>
                                                {selectedBoardMember.JoinDate}
                                            </span>
                                        </span>
                                    ) : (
                                            <Skeleton loading={true} active paragraph={false} />
                                        )}
                                </span>
                            </Col>
                            <Col className="gutter-row" xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                                <div className="titles">میزان سهم</div>
                                <span className="contentColumns">
                                    {selectedBoardMember.ShareAmount !== undefined ? (
                                        <span>
                                            {" "}
                                            <span>
                                                {selectedBoardMember.ShareAmount}
                                            </span>
                                        </span>
                                    ) : (
                                            <Skeleton loading={true} active paragraph={false} />
                                        )}
                                </span>
                            </Col>

                        </>
                        ) :
                        <>
                            <Col className="gutter-row" xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                                <div className="titles">سمت</div>
                                <span className="contentColumns">
                                    {selectedBoardMember?.PositionTitle !== undefined ||selectedBoardMember?.Position!==undefined ? (
                                        <span>
                                            {" "}
                                            {selectedBoardMember?.PositionTitle??selectedBoardMember?.Position}
                                        </span>
                                    ) : (
                                            <Skeleton loading={true} active paragraph={false} />
                                        )}
                                </span>
                            </Col>
                            <Col className="gutter-row" xxl={{ span: 6 }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                                <div className="titles">تاریخ انتصاب</div>
                                <span className="contentColumns">
                                    {selectedBoardMember?.AppointmentDate !== undefined||selectedBoardMember?.EmploymentDate!==undefined ? (
                                        <span>
                                            {" "}
                                            {selectedBoardMember?.AppointmentDate ??selectedBoardMember?.EmploymentDate}

                                        </span>
                                    ) : (
                                            <Skeleton loading={true} active paragraph={false} />
                                        )}
                                </span>
                            </Col>
                        </>
                }

            </Row >
            <br /> 
            <Row>
                {
                    isFromStockHolder ? null :
                        <Col span={12} style={{ paddingLeft: "8px" }}>
                            <TextArea autoSize placeholder="توضیحات ..." value={endCooperationdescription} onChange={(e) => setEndCooperationDescription(e.target.value)} />
                        </Col>
                }
                <Col span={12} style={{ paddingRight: "8px" }}>
                    <DatePicker2  min={moment(convertDate)} placeholder="تاریخ پایان همکاری" value={cooperationEndDate} onChange={(value: any) => setCooperationEndDate(value)} />

                </Col>
            </Row>
            <br />
            <div className="submit">
                <Button type="primary" onClick={submitEndCooperation} loading={boardMemberEndCooperationLoading}>
                    ذخیره
                </Button>
            </div>

        </>
    );
}

export default CooperationendDateModal;