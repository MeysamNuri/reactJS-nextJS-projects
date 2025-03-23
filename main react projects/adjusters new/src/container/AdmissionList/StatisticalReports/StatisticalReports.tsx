import React, { useState } from "react";
import { Radio,Button,Tooltip } from "antd";
import {
  statisticReportExcel
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ChartStatisticalReport from "./ChartStatisticalReport";
import TableStatisticalReport from "./TableStatisticalReport";
import { ReactComponent as Xls } from "../../../assets/images/xls.svg";
import SearchBox from './SearchBox'
  ;
const StatisicalReports = () => {
  const [valRadio, setValRadio] = useState("1");
  const [dataFilters, setDataFilters] = useState(null)
  const [modelReport,setModelReport]=useState<any>({})
  const dispatch = useDispatch();
  const onChange = (e: any) => {
    setValRadio(e.target.value);
  };

  const filtersHandler = (dataChild: any) => {
    setDataFilters(dataChild)
  }
  const fetchModelReport=(value:any)=>{
    setModelReport(value)
  }

  const exelHandler = () => {
     dispatch(statisticReportExcel(modelReport));
  };
  return (
    <div>
      <SearchBox filters={filtersHandler} /> 
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px", alignItems: "center" }}>
      <Tooltip title="خروجی اکسل">
          <Button
            type="dashed"
            onClick={exelHandler}
            // loading={loadingExcel}
            icon={<Xls className="excel" />}
            className="centerIconButton iconCenter"
          ></Button>
        </Tooltip>
        <Radio.Group onChange={onChange} defaultValue="1">
          <Radio.Button value="2">نمودار</Radio.Button>
          <Radio.Button value="1">جدول</Radio.Button>
        </Radio.Group>
        <label style={{ marginLeft: "5px" }}  >: نحوه نمایش </label>
      </div>

      {valRadio === "1" ? (
        <TableStatisticalReport dataFilters={dataFilters} fetchModelReport={(value:any)=>fetchModelReport(value)}/>
      ) : (
          <ChartStatisticalReport />
        )}

    </div>
  );
};

export default StatisicalReports;
