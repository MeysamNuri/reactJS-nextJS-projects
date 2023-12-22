import React from 'react';
import Employee from "../../DeskTop/adjustersDesktop/employee/Employee";
import { ConfigProvider } from 'antd'
export interface EmployeeInformationProps {

}

const EmployeeInformation: React.FC<EmployeeInformationProps> = () => {
    return (

        <ConfigProvider direction="rtl">

            <Employee isFromMenue={true} />
        </ConfigProvider>
    );
}

export default EmployeeInformation;