import React, { useEffect, useState, FC, useRef } from "react";
import {  ConfigProvider, Button, Space, Input ,Row,Col,Spin} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "jalali-moment";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import {
    fetchAdjusterCompanyInfo
} from "../../../../redux/actions";

interface IAdjusterCompanyInfoProps {
    applicantId?: number;
}

const AdjusterCompanyInfo: FC<IAdjusterCompanyInfoProps> = ({ applicantId }) => {
    const dispatch = useDispatch();
    const {
        adjusterCompanyInfoDetails,
        adjusterCompanyInfoLoading,
    } = useSelector((state: any) => state.companyBaseInfo);
    const [pageModel, setPageModel] = useState({
        pageIndex: 1,
        pageSize: 3,
    });

    const searchInput = useRef<any>(null);
 
    useEffect(() => {
        dispatch(fetchAdjusterCompanyInfo(applicantId))
    }, [])


    
    
    return (
        <div>
            <ConfigProvider direction="rtl">
                {
                    adjusterCompanyInfoLoading?<Spin style={{margin:"20px auto",width:"100%"}} />
                    :
                    <Row className="stock-holder-details bgColorGray-1">

                    <Col span={8}>
                        <p>نام شرکت : </p>
                        <span>{adjusterCompanyInfoDetails?.Result?.CompanyName}</span>
                    </Col>
                    <Col span={8}>
                        <p>نوع شرکت :</p>
                        <span>{adjusterCompanyInfoDetails?.Result?.CompanyTypeDescription}</span>

                    </Col>
                    <Col span={8}>
                        <p>شناسه ملی :</p>
                        <span>{adjusterCompanyInfoDetails?.Result?.NationalCode}</span>

                    </Col>
                    <Col span={8}>
                        <p>کد ثبتی :</p>
                        <span>{adjusterCompanyInfoDetails?.Result?.RegistrationCode}</span>

                    </Col>
                    <Col span={8}>
                        <p>درصد سهام :</p>
                        <span>{adjusterCompanyInfoDetails?.Result?.SharePercentage}</span>

                    </Col>
                    <Col span={8}>
                        <p>میزان سرمایه: </p>
                        <span>{adjusterCompanyInfoDetails?.Result?.Assets}</span>

                    </Col>
                    <Col span={8}>
                        <p>وب سایت :</p>
                        <span>{adjusterCompanyInfoDetails?.Result?.Website}</span>

                    </Col>
                    <Col span={8}>
                        <p>تاریخ ثبت :</p>
                        {

                            <span> {

                                adjusterCompanyInfoDetails?.Result?.RegistrationDate ?
                                    (
                                        moment(adjusterCompanyInfoDetails?.Result?.RegistrationDate?.split("T")[0]).locale('fa').format('YYYY/MM/DD')
                                    ) : "-"
                            } </span>
                        }


                    </Col>
                  
                

                </Row>
                }
               
            </ConfigProvider>
        </div>
    );
};

export default AdjusterCompanyInfo;
