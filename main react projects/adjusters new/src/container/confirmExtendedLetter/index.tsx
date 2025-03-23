import React, { useEffect } from 'react';
import { Alert, Space,Spin,Row,Col } from 'antd';
import {
    confirmChargonLetter
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import './style.css'
export interface ConfirmExtendedLetterProps {
    
}
 
const ConfirmExtendedLetter: React.FC<ConfirmExtendedLetterProps> = () => {
    const dispatch = useDispatch()
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let QriId: any = url.searchParams.get("id")
    const {confirmChargonLetterInfo}=useSelector((state:any)=>state.chargonLetter)
 
    useEffect(() => {
        if(QriId){
            
            dispatch(confirmChargonLetter(QriId))
        }
     
    }, [QriId])
    return ( 
        <div className="chargon-container">
            <Row className="top-details">
                <Col xxl={{span:5}} lg={{span:6}} md={{span:8}}  sm={{span:8}} xs={{span:12}}>
                <p>نام ونام خانوادگی</p>
                <span>{confirmChargonLetterInfo?.Result?.Name}</span>
                </Col>
                <Col xxl={{span:5}} lg={{span:6}} md={{span:8}}  sm={{span:8}} xs={{span:12}}>
                <p>کد ارزیاب</p>
                <span>{confirmChargonLetterInfo?.Result?.AdjusterCode}</span>
                </Col>
                <Col xxl={{span:4}} lg={{span:6}} md={{span:8}}  sm={{span:8}} xs={{span:12}}>
                <p>نوع ارزیاب</p>
                <span>{confirmChargonLetterInfo?.Result?.IsLegal?("حقوقی"):("حقیقی")}</span>
                </Col>
                <Col xxl={{span:5}} lg={{span:6}} md={{span:8}}  sm={{span:8}} xs={{span:12}}> 
                <p>وضعیت ارزیاب</p>
                <span>{confirmChargonLetterInfo?.Result?.ApplicantStatusDescription}</span>
                </Col>
                <Col xxl={{span:5}} lg={{span:6}} md={{span:8}}  sm={{span:8}} xs={{span:12}}> 
                <p>تاریخ انقضا</p>
                <span>{
                 moment(confirmChargonLetterInfo?.Result?.ExpirationDate?.split("T")[0]).format(
                    "jYYYY-jMM-jDD"
                  )
                }
               
                </span>
                </Col>

            </Row>

            <div style={{height:"80vh"}}>
            <iframe src={  `data:application/pdf;base64,` + confirmChargonLetterInfo?.Result?.ExtendedChargoonLetter?.Content} width="100%" height="100%"/>
          
            </div>
        </div>
     );
}
 
export default ConfirmExtendedLetter;