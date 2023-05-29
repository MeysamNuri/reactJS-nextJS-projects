import React, { useState } from "react";
import { Radio } from "antd";
import ChartStatisticalReport from "./ChartStatisticalReport";
import TableStatisticalReport from "./TableStatisticalReport";
import SearchBox from './SearchBox'
  ;
const StatisicalReports = () => {
  const [valRadio, setValRadio] = useState("1");
  const [dataFilters, setDataFilters] = useState(null)

  const onChange = (e: any) => {
    setValRadio(e.target.value);
  };

  const filtersHandler = (dataChild: any) => {
    setDataFilters(dataChild)
  }

  return (
    <div>
      <SearchBox filters={filtersHandler} />
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px", alignItems: "center" }}>

        <Radio.Group onChange={onChange} defaultValue="1">
          <Radio.Button value="2">نمودار</Radio.Button>
          <Radio.Button value="1">جدول</Radio.Button>
        </Radio.Group>
        <label style={{ marginLeft: "5px" }}  >: نحوه نمایش </label>
      </div>

      {valRadio === "1" ? (
        <TableStatisticalReport dataFilters={dataFilters} />
      ) : (
          <ChartStatisticalReport />
        )}

    </div>
  );
};

export default StatisicalReports;
