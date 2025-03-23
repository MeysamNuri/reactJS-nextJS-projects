import React from 'react';
import { Row, Col, ConfigProvider,Spin } from 'antd'
export interface InsuranceInquiryProps {

}

const InsuranceInquiry: React.SFC<InsuranceInquiryProps> = () => {
    let source = "https://sanhabnet.centinsur.ir/inq/policyinqforevl.aspx"
    if (!source) {
        return <Spin style={{width:"100%",margin:"20px auto"}}/>;
    }

    const src = source;
    return (

        <ConfigProvider direction="rtl" >
            <Row>
                <div style={{width:"100%",height:"80vh"}}>
                    <iframe style={{width:"100%",height:"100%"}} src={src}></iframe>
                </div>
            </Row>
        </ConfigProvider>
    );
}

export default InsuranceInquiry;