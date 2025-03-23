import React, { useState, useEffect, FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, ConfigProvider, Tooltip, Button, Row, Col, Select, Form } from "antd";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { fetchApplicantForbiddenReport, fetchApplicantForbiddneInfo } from "../../../redux/actions";
import ForbiddenReportSubField from './forbiddenRpeortSubfield'
export interface ForbiddenReportProps {

}

const ForbiddenReport: React.FC<ForbiddenReportProps> = () => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);
    const [selectedCodeId, setSelectedCodeId] = useState<any>()
    const [selectedYear, setSelectedYear] = useState<any>("1402")
    const [dataFilter, setDataFilter] = useState<any>([])
    const [pageModel, setPageModel] = useState({
        pageSize: 6,
        pageIndex: 1,
    });
    const { forbiddenReportDetails, forbiddenReportLoading } = useSelector(
        (state: any) => state.forbiddenInfo
    );
    const handleYear = (value: any) => {
        setSelectedYear(value)
    }
    let dataReport = forbiddenReportDetails?.Result?.map((report: any) => {
        let obg = {
            Code: report.Code,
            Title: report.Title,
            TotalCount: report.TotalCount,
            Year: report.Year
        };
        return obg;
    });


    let columns: any = [
        {
            title: "کد شاخص",
            dataIndex: "Code",
            key: "Code",
        },

        {
            title: "عنوان شاخص",
            dataIndex: "Title",
            key: "Title",
        },
        {
            title: "ناصحیح",
            dataIndex: "TotalCount",
            key: "TotalCount",
        },
        {
            title: "سال",
            dataIndex: "Year",
            key: "Year",
        },
    ];
    useEffect(() => {
        dispatch(fetchApplicantForbiddenReport(selectedYear));

    }, [selectedYear]);


    const handelExpand = (record: any, e: any) => {
        setSelectedCodeId(e.Code)
        // setRecord(record);
        let keys = [];
        if (record) {
            keys.push(e.Code);
        }
        setExpandedRowKeys([...keys]);
    };

    const resFilterHandler = (dataRes: any) => {

        // setResponseDataResult(dataRes);
    };
    useEffect(() => {
        let filters: any = []
        filters.push({
            propertyName: "Year",
            operator: 1,
            value: selectedYear,
        },
            {
                propertyName: "Forbidden.Code",
                operator: 1,
                value: selectedCodeId,
            }
            ,
            {
                propertyName: "Flag",
                operator: 1,
                value: true,
            }

        )
        setDataFilter(filters)

    }, [selectedCodeId, selectedYear])


    useEffect(() => {
        let cartableReport = {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: dataFilter,
        };
        dispatch(
            fetchApplicantForbiddneInfo(
                cartableReport
            ));

    }, [pageModel, dataFilter]);

    return (
        <>
            <Row>
                <Col span={8} >
                    <Form.Item
                        label="انتخاب سال"
                        name="years"
                        labelCol={{ xxl: 5, xl: 7, md: 10, sm: 12 }}
                    >
                        <Select
                            defaultValue="1402"
                            onChange={handleYear}
                            options={
                                [
                                    {
                                        year: 1402,
                                        value: "1402"
                                    },
                                    {
                                        year: 1403,
                                        value: "1403"
                                    },
                                    {
                                        year: 1404,
                                        value: "1404"
                                    },

                                ]
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
            <ConfigProvider direction="rtl">
                <Table
                    columns={columns}
                    dataSource={dataReport}
                    showSorterTooltip={false}
                    loading={forbiddenReportLoading}
                    pagination={false}
                    rowKey={(record) => record.Code}
                    locale={{ emptyText: "داده ای جهت نمایش موجود نیست" }}
                    expandedRowKeys={expandedRowKeys}
                    expandable={{
                        expandedRowRender: (record) => {
                            return (
                                <div style={{padding:"25px 0"}}>
                                    <ForbiddenReportSubField
                                        key={record.Code}
                                        record={record}
                                    //   resFilter={resFilterHandler}
                                    />
                                </div>

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
}

export default memo(ForbiddenReport);