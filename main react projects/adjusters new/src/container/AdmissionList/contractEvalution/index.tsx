import React from 'react';
import ContractEvaluation from "../../DeskTop/adjustersDesktop/contractEvaluation/ContractEvaluation";
import { ConfigProvider } from 'antd'
export interface ContractEvalutionProps {

}

const ContractEvalution: React.FC<ContractEvalutionProps> = () => {
    return (

        <ConfigProvider direction="rtl">

            <ContractEvaluation isFromMenue={true} />
        </ConfigProvider>
    );
}

export default ContractEvalution;