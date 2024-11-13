import React from 'react';
import ApplicantWarnings from "../../DeskTop/adjustersDesktop/applicantWarnings";
import { ConfigProvider } from 'antd'
export interface ApplicantWarningsInfoProps {

}

const ApplicantWarningsInfo: React.FC<ApplicantWarningsInfoProps> = () => {
    return (

        <ConfigProvider direction="rtl">

            <ApplicantWarnings isFromMenue={true} />
        </ConfigProvider>
    );
}

export default ApplicantWarningsInfo;