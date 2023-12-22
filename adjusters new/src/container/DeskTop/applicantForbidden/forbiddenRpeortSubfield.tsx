import React, { useState, useEffect, FC, memo, } from "react";
import {
    Table,
    Space,
    ConfigProvider,
    Radio
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FilterFilled } from "@ant-design/icons";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import {
    fetchApplicantForbiddneInfo
} from "../../../redux/actions";
export interface ForbiddenReportSubFieldProps {
    record: any,
    key: number,

}

const ForbiddenReportSubField: React.FC<ForbiddenReportSubFieldProps> = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState<any>(null)
    const [filterList, setFilterList] = useState<any>([]);
  
    const [pageModel, setPageModel] = useState({
        pageSize: 20,
        pageIndex: 1,
    });


    let {
        reportNaturalJudicalEvalutor,
        applicantForbiddenInfo,
        applicantForbiddenLoading
    } = useSelector((state: any) => state.cartableReportAllInfo);
    //coloumns Table
    let columns: any = [

        {
            title: "نام",
            dataIndex: "FirstName",
            key: "FirstName",
            //   ...getColumnSearchProps("FirstName"),
            responsive: ["sm"],
        },
        {
            title: "نام خانوادگی",
            dataIndex: "FamilyName",
            key: "FamilyName",
            //   ...getColumnSearchProps("FamilyName"),
            responsive: ["sm"],
        },

        {
            title: ` کد ارزیابی`,
            dataIndex: "AdjusterCode",
            key: "AdjusterCode",
            //   ...getColumnSearchProps("AdjusterCode"),
            responsive: ["sm"],
        },


        {
            title: "کدملی",
            dataIndex: "NationalCode",
            key: "NationalCode",
            //   ...getColumnSearchProps("NationalCode"),
            responsive: ["sm"],
        },

        {
            title: "تاریخ تولد",
            dataIndex: "BirthDate",
            key: "BirthDate",

        },


        {
            title: "تلفن همراه",
            dataIndex: "Mobile",
            key: "Mobile",
            //   ...getColumnSearchProps("Mobile"),
            responsive: ["sm"],
        },

        {
            title: "نتیجه شاخص",
            dataIndex: "ForbiddenResult",
            key: "ForbiddenResult",
            responsive: ["sm"],

        },
        {
            title: "کد شاخص",
            dataIndex: "Code",
            key: "Code",
            responsive: ["sm"],

        },
        {
            title: "آدرس",
            dataIndex: "Address",
            key: "Address",
            responsive: ["sm"],

        },


    ];
    useEffect(() => {
        let data = applicantForbiddenInfo?.Result?.map(
            (report: any) => {
                let obj = {
                    Id: report.ApplicantId,
                    key: report?.ApplicantId,
                    ApplicantId: report.ApplicantId,
                    ForbiddenFiles: report.ApplicantPersonalInfo?.Person?.ForbiddenFiles,
                    FirstName: report?.ApplicantPersonalInfo?.Person?.FirstName,
                    FamilyName: report?.ApplicantPersonalInfo?.Person?.FamilyName,
                    NationalCode: report?.ApplicantPersonalInfo?.Person?.NationalCode,
                    BirthDate: moment(report?.ApplicantPersonalInfo?.Person?.BirthDate?.split("T")[0]).format(
                        "jYYYY-jMM-jDD"
                    ),
                    Mobile: report?.ApplicantPersonalInfo?.Mobile,
                    AdjusterCode: report?.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
                    ForbiddenResult: report?.ForbiddenResult,
                    Address: report?.ApplicantPersonalInfo?.Address,
                    Code: report?.Forbidden?.Code
                };
                return obj;
            }
        );
        setData(data)
    }, [reportNaturalJudicalEvalutor, applicantForbiddenInfo])

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={applicantForbiddenLoading}
                // onChange={handleChange}
                pagination={{
                    pageSize: pageModel.pageSize,
                    total: reportNaturalJudicalEvalutor ? reportNaturalJudicalEvalutor?.data.TotalCount : applicantForbiddenInfo?.TotalCount,
                    showTotal: (total) => `تعداد کل : ${total} `,
                    showSizeChanger: true,
                    onChange: (current: any, pageSize: any) =>
                        setPageModel({
                            ...pageModel,
                            pageIndex: current,
                            pageSize: pageSize,
                        }),
                    locale: { items_per_page: "/ صفحه" },
                }}
                locale={{
                    filterReset: (
                        <span
                            onClick={() => {
                                document
                                    .querySelector(".ant-dropdown")!
                                    .classList.add("ant-dropdown-hidden");
                                setFilterList([]);
                            }}
                        >
                            باز نشانی
                        </span>
                    ),
                    filterConfirm: "جستجو",
                    filterEmptyText: "یافت نشد",
                    emptyText: "پرونده ای موجود نیست.",
                }}
            />

        </>
    );
}

export default memo(ForbiddenReportSubField);