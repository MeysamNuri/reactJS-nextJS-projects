import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, ConfigProvider } from "antd";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { fetchMonitoringReportInfo } from "../../../redux/actions";
import DetailMonitoringReport from "./detailMonitoringReport";
import { IStaticalReport } from "../../../shared/ulitities/Model/StatisticalReport";

interface ITableStatisticalReportProps {
    dataFilters: any;
    searchState: boolean
}

const TableMonitoringReport: FC<ITableStatisticalReportProps> = ({
    dataFilters,
    searchState
}) => {
    const dispatch = useDispatch();
    const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);
    const [selectedStatusId, setSelectedStatusId] = useState<any>()
    const [pageModel, setPageModel] = useState({
        pageSize: 6,
        pageIndex: 1,
    });
    const { viewMonitoring, loadingViewMonitoringReport } = useSelector(
        (state: any) => state.monitoringReport
    );
    // const [responseDataResult, setResponseDataResult] = useState([] as any);
    // const [record, setRecord] = useState(false);


    let dataReport = viewMonitoring?.Result?.map((report: any) => {
        let obg = {
            StatusId: report.StatusId,
            Title: report.Title,
            TotalCount: report.TotalCount
        };
        return obg;
    });


    let data = {
        firstPageSize: pageModel.pageSize,
        pageSize: pageModel.pageSize,
        pageIndex: pageModel.pageIndex,
        orderBy: "ApplicantId",
        filters: dataFilters === null ? [] : dataFilters
    }


    useEffect(() => {
        dispatch(fetchMonitoringReportInfo(data));
    }, [dataFilters]);

    useEffect(() => {
        if (dataFilters?.length == 0) {
            setExpandedRowKeys([])
        }

    }, [dataFilters])

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
        setSelectedStatusId(e.StatusId)
        // setRecord(record);
        let keys = [];
        if (record) {
            keys.push(e.StatusId);
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
                    loading={loadingViewMonitoringReport}
                    pagination={false}
                    rowKey={(record) => record.StatusId}
                    locale={{ emptyText: "داده ای جهت نمایش موجود نیست" }}
                    expandedRowKeys={expandedRowKeys}
                    expandable={{
                        expandedRowRender: (record) => {
                            return (
                                <DetailMonitoringReport
                                    expandedRowKeys={expandedRowKeys}
                                    searchState={searchState}
                                    key={record.StatusId}
                                    record={record}
                                    dataFilters={dataFilters}
                                    resFilter={resFilterHandler}
                                    selectedStatusId={selectedStatusId}
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

export default TableMonitoringReport;
