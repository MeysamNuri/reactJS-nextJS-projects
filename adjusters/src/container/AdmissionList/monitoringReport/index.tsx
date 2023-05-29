import React, { useState, useMemo, useEffect, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Radio
} from "antd";
import moment from "jalali-moment";
import SearchBox from './searchBox'
import TableMonitoringReport from './tableReport'
import ChartMonitoringReport from './chartMonitoringReport'
import {
    fetchAllAdjustmentField,
    fetchMonitoringReportInfo,
    getBaseInfo,

} from "../../../redux/actions";
import { IMonitoringReport } from "../../../shared/ulitities/Model/monitoringReport";
import { filterAdvanceOperator } from "../../../shared/ulitities/Enums/advanceSearchOperator";



interface IMonitoringReportProps {

}
const MonitoringReport: FC<IMonitoringReportProps> = () => {
    const dispatch = useDispatch();
    const [valRadio, setValRadio] = useState("1");
    const [dataFilters, setDataFilters] = useState(null)
    const [searchState,setSearchState]=useState(false)


    useEffect(() => {
        dispatch(getBaseInfo());
    }, []); 

    const onChange = (e: any) => {
        setValRadio(e.target.value);
      };
    const filtersHandler = (dataChild: any) => {
        setDataFilters(dataChild)
      }
    
    const resetFilters= (dataChild: any) => {
        setSearchState(dataChild)
      }
    

    return (
        <div >
            <SearchBox filters={filtersHandler} resetFilters={resetFilters}/>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px", alignItems: "center" }}>

                <Radio.Group onChange={onChange} defaultValue="1">
                    <Radio.Button value="2">نمودار</Radio.Button>
                    <Radio.Button value="1">جدول</Radio.Button>
                </Radio.Group>
                <label style={{ marginLeft: "5px" }}  >: نحوه نمایش </label>
            </div>
            {valRadio === "1" ? (
        <TableMonitoringReport dataFilters={dataFilters} searchState={searchState} />
      ) : (
          <ChartMonitoringReport />
        )}


        </div>
    );
};

export default MonitoringReport;
