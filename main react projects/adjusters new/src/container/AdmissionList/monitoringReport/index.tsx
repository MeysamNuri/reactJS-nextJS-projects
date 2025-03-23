import React, { useState, useMemo, useEffect, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Radio, Row, Tooltip, Button
} from "antd";
import moment from "jalali-moment";
import SearchBox from './searchBox'
import TableMonitoringReport from './tableReport'
import ChartMonitoringReport from './chartMonitoringReport'
import {
    fetchAllAdjustmentField,
    fetchMonitoringReportInfo,
    getBaseInfo,
    exportToExcelMonitoringReports
} from "../../../redux/actions";
import { ReactComponent as Xls } from "../../../assets/images/xls.svg";


interface IMonitoringReportProps {

}
const MonitoringReport: FC<IMonitoringReportProps> = () => {
    const dispatch = useDispatch();
    const [valRadio, setValRadio] = useState("1");
    const [dataFilters, setDataFilters] = useState(null)
    const [searchState, setSearchState] = useState(false)
    const monitoringReportLoading = useSelector((state: any) => state.activeAdjusterLists?.monitoringReportLoading)


    useEffect(() => {
        dispatch(getBaseInfo());
    }, []);

    const onChange = (e: any) => {
        setValRadio(e.target.value);
    };
    const filtersHandler = (dataChild: any) => {
        setDataFilters(dataChild)
    }

    const resetFilters = (dataChild: any) => {
        setSearchState(dataChild)
    }

    const exelHandler = () => {


        let monitoringReport = {
            firstPageSize: 100,
            pageSize: 100,
            pageIndex: 1,
            orderBy: "Id",
            filters: dataFilters,
        };

        dispatch(exportToExcelMonitoringReports(monitoringReport));

    };
    return (
        <div >
            <SearchBox filters={filtersHandler} resetFilters={resetFilters} />

            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>

                <Tooltip title="خروجی اکسل">
                    <Button
                        type="dashed"
                        onClick={exelHandler}
                        loading={monitoringReportLoading}
                        icon={<Xls className="excel" />}

                    ></Button>
                </Tooltip>
                <Radio.Group onChange={onChange} defaultValue="1">
                    <Radio.Button value="2">نمودار</Radio.Button>
                    <Radio.Button value="1">جدول</Radio.Button>
                </Radio.Group>
                <label style={{ marginLeft: "5px" }}  >: نحوه نمایش </label>

            </div>

            <br />
            {valRadio === "1" ? (
                <TableMonitoringReport dataFilters={dataFilters} searchState={searchState} />
            ) : (
                    <ChartMonitoringReport />
                )}


        </div>
    );
};

export default MonitoringReport;
