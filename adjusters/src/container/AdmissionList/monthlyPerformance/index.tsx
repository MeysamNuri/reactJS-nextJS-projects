import React from 'react';
import MonthlyPerformance from "../../DeskTop/adjustersDesktop/monthlyPerformance/MonthlyPerfomance";
import { ConfigProvider } from 'antd'
export interface MonthlyPerformanceProps {
    
}
 
const MonthlyPerformanceReport: React.FC<MonthlyPerformanceProps> = () => {
    return ( 
        <ConfigProvider direction="rtl">

        <MonthlyPerformance  isFromMenue={true} />
    </ConfigProvider>
     );
}
 
export default MonthlyPerformanceReport; 