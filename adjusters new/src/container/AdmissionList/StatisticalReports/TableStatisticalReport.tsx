import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, ConfigProvider,Tooltip,Button } from "antd";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { fetchStatisticalReport } from "../../../redux/actions";
import DetailStaticalReport from "./DetailStaticalReport";
import { IStaticalReport } from "../../../shared/ulitities/Model/StatisticalReport";
import { ReactComponent as NoFileStorage } from "../../../assets/images/nofileStorage.svg";

interface ITableStatisticalReportProps {
  dataFilters: any;
  fetchModelReport:any
}

const TableStatisticalReport: FC<ITableStatisticalReportProps> = ({
  dataFilters,
  fetchModelReport
}) => {
  const dispatch = useDispatch();
  const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);
  const [pageModel, setPageModel] = useState({
    pageSize: 6,
    pageIndex: 1,
  });
  const { statisticalReports, loading } = useSelector(
    (state: any) => state.statisticalReports
  );
  // const [responseDataResult, setResponseDataResult] = useState([] as any);
  // const [record, setRecord] = useState(false);


  

  let dataReport = statisticalReports?.Result?.map((report: IStaticalReport) => {
    let obg = {
      StateId: report.StateId,
      Title: report.Title,
      TotalCount:   report.TotalCount
    };
    return obg;
  });

 let data= {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: "ApplicantId",
    filters: dataFilters==null?[]:dataFilters
  }

  

  useEffect(() => {
    dispatch(fetchStatisticalReport(data));
    fetchModelReport(data)
  }, [dataFilters]); 

  //coloumns Table
  let columns: any = [
    {
      title: "وضعیت متقاضی",
      dataIndex: "Title",
      key: "Title",
    },

    {
      title: "تعداد کل افراد",
      dataIndex: "TotalCount",
      key: "TotalCount",
    },
  ];

  
  const handelExpand = (record: any, e: any) => {
   
    // setRecord(record);
    let keys = [];
    if (record) {
      keys.push(e.StateId);
    }
    setExpandedRowKeys([...keys]);
  };

  const resFilterHandler = (dataRes: any) => {
   
    // setResponseDataResult(dataRes);
  };



  return (
    <>
      <ConfigProvider direction="rtl">
        <Table
          columns={columns}
          dataSource={dataReport}
          showSorterTooltip={false}
          loading={loading}
          pagination={false}
          rowKey={(record) => record.StateId}
          locale={{ emptyText: "داده ای جهت نمایش موجود نیست" }}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <DetailStaticalReport
                  key={record.StateId}
                  record={record}
                  dataFilters={dataFilters}
                  resFilter={resFilterHandler}
                />
              );
            },
            onExpand: (record, e) => {
              handelExpand(record, e);
            },

            expandIcon: (props) => {
              if (props.expanded) {
                return (
                  <a
                    style={{ color: "black" }}
                    onClick={(e) => {
                      props.onExpand(props.record, e);
                    }}
                  >
                    <CaretDownOutlined />
                  </a>
                );
              } else {
                return (
                  <a
                    style={{ color: "black" }}
                    onClick={(e) => {
                      props.onExpand(props.record, e);
                    }}
                  >
                    <CaretLeftOutlined />
                  </a>
                );
              }
            },
          }} 
        />
      </ConfigProvider>
    </>
  );
};

export default TableStatisticalReport;
