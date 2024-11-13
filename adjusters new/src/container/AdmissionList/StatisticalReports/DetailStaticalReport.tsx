import React, { FC, useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
//import { fetchStatisticalReport,fetchDetailstaticalReport} from "../../../redux/actions";
import { api } from "../../../httpServices/service";
import { ReactComponent as NoFileStorage } from "../../../assets/images/nofileStorage.svg";
import { fetchDetailReportList } from "../ServicesCartable/AdmissionListServices";
import { DETAIL_STATICAL_REPORT_FAILD_INFO } from "../../../constant/cartableActionTypes";

interface IDetailReport {
  record: any;
  dataFilters: any;
  resFilter: any;
}

const DetailStaticalReport: FC<IDetailReport> = ({
  record,
  dataFilters,
  resFilter,
}) => {


  const [pageModel, setPageModel] = useState({
    pageSize: 3,
    pageIndex: 1,
  });
  const dispatch = useDispatch();
  const [dataResult, setDataResult] = useState([] as any);
  const [loading, setLoading] = useState(false);


  // fetch Detail ReportList
  const fetchDetailReportList = (
    detailstaticalReport: any,
    statusId: number
  ) => {
    setLoading(true);
    api
      .post(
        `/report/group-by-applicant-status/${statusId}/details`,
        detailstaticalReport
      )
      .then((res) => {
        // resFilter(res.data)
        setDataResult(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let detailstaticalReport = {
      filters: dataFilters,
      firstPageSize: pageModel.pageSize,
      orderBy: "Id",
      pageIndex: pageModel.pageIndex,
      pageSize: pageModel.pageSize,
    };
    //dispatch(fetchDetailstaticalReport(data,record.StateId))
    // resFilter(dispatch(fetchDetailReportList(dataPaginationReset,record.StateId)))

    fetchDetailReportList(detailstaticalReport, record.StateId);
  
    // console.log( fetchDetailReportList(detailstaticalReport, record.StateId));
  }, [pageModel,dataFilters]);

  useEffect(() => {
    return () => {
      setDataResult([]);
    };
  }, [pageModel]);

  //coloumns Table
  let columns: any = [
    {
      title: "کدرهگیری",
      dataIndex: "RegistrationCode",
      key: "RegistrationCode",
      width: "5%",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
      width: "10%",
    },
    {
      title: "کد ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "10%",
    },
    {
      title: "نوع ارزیاب",
      dataIndex: "CourseTypeTitle",
      key: "CourseTypeTitle",
      width: "10%",
    },
    {
      title: "دوره",
      dataIndex: "CourseTitle",
      key: "CourseTitle",
      width: "10%",
    },

    {
      title: "رشته",
      dataIndex: "AdjustmentFieldTitle",
      key: "AdjustmentFieldTitle",
      width: "20%",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        style={{ margin: "20px" }}
        dataSource={dataResult?.Result}
        loading={loading}
        locale={{
          emptyText: (
            <div>
              {" "}
              <NoFileStorage style={{ width: "60px" }} />{" "}
              <span style={{ marginRight: "-109px" }}>
                داده ای جهت نمایش موجود نیست
              </span>{" "}
            </div>
          ),
        }}
        rowKey={(data: any) => {
          return data.NationalCode + String(record.StateId);
        }}
        pagination={{
          pageSize: pageModel.pageSize,
          total:
            dataFilters?.length > 0
              ? dataResult.TotalCount
              : record?.TotalCount,
          size: "small",
          //showSizeChanger: true,
          showTotal: (total) => `تعداد ${total} `,
          onChange: (current: number, pageSize: any) =>
            setPageModel({
              ...pageModel,
              pageIndex: current,
              pageSize: pageSize,
            }),
          locale: { items_per_page: "/ صفحه" },
        }}
      />
    </>
  );
};

export default DetailStaticalReport;
