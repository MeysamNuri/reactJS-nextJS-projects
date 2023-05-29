import React from "react";
import { Column } from "@ant-design/plots";
import {useSelector } from "react-redux";
import {IStaticalReport}  from "../../../shared/ulitities/Model/StatisticalReport"



const ChartStatisticalReport = () => {
  const { statisticalReports } = useSelector(
    (state: any) => state.statisticalReports
  );

  let data = statisticalReports?.Result?.map((report: IStaticalReport) => {
    let obj = {
      value: report.TotalCount,
      title: report.Title,
    };
    return obj;
  }); 

  

   const config = {
    data,
    xField: 'title',
    yField: 'value',
    isGroup: true,
    isStack: true,
    seriesField: 'title',
    groupField: 'value',
  };
 

  return (
    <>
      <Column {...config} />
    </>
  );
};

export default ChartStatisticalReport;
