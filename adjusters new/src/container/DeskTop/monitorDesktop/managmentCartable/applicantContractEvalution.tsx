import React, { useEffect, useState, FC, useMemo } from "react";
import { Table, ConfigProvider, Button, Space, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import {
    fetchContactEvaluation
} from "../../../../redux/actions";
export interface IApplicantContrsctEvalutionProps {
    applicantId: number
}

const ApplicantContrsctEvalution: React.FC<IApplicantContrsctEvalutionProps> = ({ applicantId }) => {
    const dispatch = useDispatch();
    const {
        viewContractEvaluation,
        loadingViewContractEvaluation,
        loadingContractEvaluationId,
    } = useSelector((state: any) => state.contractEvaluation);
    const [pageModel, setPageModel] = useState({
        pageIndex: 1,
        pageSize: 3,
    });
    const [filterList, setFilterList] = useState<any>([]);
    useEffect(() => {
        let initialFilters: any = []
        initialFilters.push({
            propertyName: "ApplicantId",
            operator: 1,
            value: applicantId
        })
        setFilterList(initialFilters)
    }, [])

    let modelContractEvaluation = useMemo(() => {
        return {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList,
        };
    }, [pageModel, filterList]);

    useEffect(() => {
        if (filterList.length > 0) {
            dispatch(fetchContactEvaluation(modelContractEvaluation));
        }

    }, [pageModel, filterList]);

    let data = viewContractEvaluation?.Result?.map((item: any) => {
        let obj = {
            Id: item.Id,
            key: item.Id,
            ApplicantInfoFirstName: item.ApplicantPersonalInfo?.Person.FirstName,
            ApplicantInfoLastName: item.ApplicantPersonalInfo?.Person.FamilyName,
            ApplicantInfoNationlCode: item.ApplicantPersonalInfo?.Person.NationalCode,
            ApplicantInfoCode: item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
            ApplicantId: item.ApplicantId,
            InsurerId: item.InsurerId,
            InsurerName: item.InsurerName,
            AuthorityLevel: item.AuthorityLevel,
            CalculationRemunerationMethod: item.CalculationRemunerationMethod,
            ContractEvaluationCode: item.ContractEvaluationCode,
            ContractStartDate: moment(
                item?.ContractStartDate?.split("T")[0]
            ).format("jYYYY-jMM-jDD"),
            ContractEndDate: moment(item?.ContractEndDate?.split("T")[0]).format(
                "jYYYY-jMM-jDD"
            ),
            contractEvaluationCode: item.ContractEvaluationCode,
            ReportingMethod: item.ReportingMethod,
            ContractingParty: item.ContractingParty,

            SystemCode: item.SystemCode,
            TerminatingCondition: item.TerminatingCondition,
            ResolutionDispute: item.ResolutionDispute

        };
        return obj;
    });
    //coloumns Table
    let columns: any = [

        {
            title: "نام/ عنوان بیمه گذار",
            dataIndex: "InsurerName",
            key: "InsurerName",
            ellipsis: true,
            width: "25%",

        },
        // {
        //   title: "شماره/شناسه ملی بیمه گذار",
        //   dataIndex: "insurerId",
        //   key: "insurerId",
        //   ellipsis: true,
        //   width: "10%",
        //   ...getColumnSearchProps("insurerId"),
        // },

        {
            title: "تاریخ شروع قرارداد",
            dataIndex: "ContractStartDate",
            key: "ContractStartDate",
            ellipsis: true,
            width: "20%",
        },

        {
            title: "تاریخ پایان قرارداد",
            dataIndex: "ContractEndDate",
            key: "ContractEndDate",
            ellipsis: true,
            width: "20%",
        },
        {
            title: "شماره قرارداد",
            dataIndex: "ContractEvaluationCode",
            key: "ContractEvaluationCode",
            width: "18%",
            ellipsis: true,

        },


        {
            title: "طرف قرارداد",
            width: "18%",
            dataIndex: "ContractingParty",
            key: "ContractingParty",
            ellipsis: true,

        },
        // {
        //   title: "توضیحات",
        //   dataIndex: "Description",
        //   key: "Description",
        //   ellipsis: true,
        // },


    ];

    return (
        <ConfigProvider direction="rtl">
            <Table
                columns={columns}
                dataSource={data}
                //   onChange={handleTableChange}
                loading={loadingViewContractEvaluation}
                pagination={{
                    pageSize: pageModel.pageSize,
                    total: viewContractEvaluation?.TotalCount,
                    showSizeChanger: true,
                    size: "small",
                    showTotal: (total) => `تعداد کل : ${total} `,
                    onChange: (current: number, pageSize: any) =>
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
                    emptyText: "اطلاعاتی وجود ندارد",
                }}
            />

        </ConfigProvider>


    );
}

export default ApplicantContrsctEvalution;