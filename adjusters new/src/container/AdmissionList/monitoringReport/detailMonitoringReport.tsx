import React, { FC, useEffect, useState, memo } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
//import { fetchStatisticalReport,fetchDetailstaticalReport} from "../../../redux/actions";
import { api } from "../../../httpServices/service";
import { ReactComponent as NoFileStorage } from "../../../assets/images/nofileStorage.svg";
import { DETAIL_STATICAL_REPORT_FAILD_INFO } from "../../../constant/cartableActionTypes";
import moment from "jalali-moment";
interface IDetailReport {
  record: any;
  dataFilters: any;
  resFilter: any;
  searchState: any,
  expandedRowKeys: number[],
  selectedStatusId: number
}

const DetailMonitoringReport: FC<IDetailReport> = ({
  record,
  dataFilters,
  expandedRowKeys,
  selectedStatusId
}) => {


  const [pageModel, setPageModel] = useState({
    pageSize: 5,
    pageIndex: 1,
  });
  const dispatch = useDispatch();
  const [dataResult, setDataResult] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [filterList, setFilterList] = useState<any>([])

  // fetch Detail ReportList
  const fetchDetailReportList = (
    detailstaticalReport: any,

  ) => {
    setLoading(true);
    api
      .post(
        `/report/ManagemenCartableReport/GetAdjuterReportForGrid`,
        detailstaticalReport
      )
      .then((res) => {
        // resFilter(res.data)
        setDataResult(res.data);
      })
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    let filters: any = []
    filters.push({
      propertyName: "StatusId",
      operator: 1,
      value: selectedStatusId
    })

    if (expandedRowKeys?.length !== 0) {
      let findStatus = filters.find((f: any) => (f.value == record?.StatusId))
      if (findStatus) {
        setFilterList([findStatus])
      }

    }

    if (expandedRowKeys?.length == 0) {
      setFilterList([])

    }

    if (dataFilters?.length > 0) {
      let findStatus = filters.find((f: any) => (f.value == record?.StatusId))
      if (findStatus) {
        setFilterList([...dataFilters,findStatus])
      }

    }
  }, [dataFilters, selectedStatusId])

  useEffect(() => {

    let detailstaticalReport = {
      filters: filterList,
      firstPageSize: pageModel.pageSize,
      orderBy: "Id",
      pageIndex: pageModel.pageIndex,
      pageSize: pageModel.pageSize,
    };
    if (filterList?.length > 0) {
      fetchDetailReportList(detailstaticalReport);
    }
  }, [pageModel, filterList]);

  useEffect(() => {
    return () => {
      setDataResult([]);
    };
  }, [pageModel]);
  let dataSource = dataResult?.Result?.map((item: any) => {
    let obj = {
      Id: item.Id,
      key: item.Id,
      FirstName: item.FirstName ?? "-",
      FamilyName: item.FamilyName ?? "-",
      CompanyName: item.CompanyName ?? '-',
      Province: item.Province ?? '-',
      NationalCode: item.NationalCode,
      ApplicantInfoCode: item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
      AdjusterTypeDescription: item.AdjusterTypeDescription,
      AdjusterCode: item.AdjusterCode,
      StatusIdDescription: item.StatusIdDescription,
      SpecializedFieldTitle: item.SpecializedFieldTitle,
      EffectiveDate: moment(item.EffectiveDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
      LicenseCreationDate: moment(item.LicenseCreationDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
      LicenseExpirationDate: moment(item.LicenseExpirationDate?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),



    };

    return obj;
  });

  //coloumns Table
  let columns: any = [
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      width: "5%",
    },
    {
      title: " نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      width: "8%",
    },
    {
      title: "نام شرکت",
      dataIndex: "CompanyName",
      key: "CompanyName",
      width: "8%",
    },
    {
      title: "کد ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "8%",
    },
    {
      title: "نوع ارزیاب",
      dataIndex: "AdjusterTypeDescription",
      key: "AdjusterTypeDescription",
      width: "8%",
    },
    {
      title: "کد ارزیاب",
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      width: "9%",
    },
    {
      title: "وضعیت",
      dataIndex: "StatusIdDescription",
      key: "StatusIdDescription",
      width: "7%",
    },
    {
      title: "تاریخ صدور پروانه",
      dataIndex: "LicenseCreationDate",
      key: "LicenseCreationDate",
      width: "10%",
    },
    {
      title: "تاریخ اعتبار پروانه",
      dataIndex: "LicenseExpirationDate",
      key: "LicenseExpirationDate",
      width: "10%",
    },
    {
      title: "تایخ موثر",
      dataIndex: "EffectiveDate",
      key: "EffectiveDate",
      width: "9%",
    },

    {
      title: "رشته",
      dataIndex: "SpecializedFieldTitle",
      key: "SpecializedFieldTitle",
      width: "8%",
    },
    {
      title: "استان محل فعالیت",
      dataIndex: "Province",
      key: "Province",
      width: "15%",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        style={{ margin: "20px" }}
        dataSource={dataSource}

        loading={loading}
        locale={{
          emptyText: (
            <div>
              {" "}
              <NoFileStorage style={{ width: "60px" }} />{" "}
              <br />
              <br />
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
          showSizeChanger: true,
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

export default memo(DetailMonitoringReport);
