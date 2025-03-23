import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table, Tabs } from "antd";



const SubGridForLegalAdjusters = (props: any) => {
    const [data, setData] = useState();
    const [branchData, setBranchData] = useState();
    const [pageModel, setPageModel] = useState({
        pageSize: 5,
        pageIndex: 1,
    });
    const { TabPane } = Tabs;
    const [tabKey, setTabKey] = useState("1")
    const handleTabKey = (value: any) => {
        setTabKey(value)
    }

    useEffect(() => {
        if (tabKey === "1") {
            setData(
                props.record?.BoardMembers?.map((request: any) => {
                    return {
                        ...request,
                        Id: request.ApplicantId,
                        FullName: request?.IdentityInfo?.FullName,
                        PositionTitle: request?.PositionTitle,
                        City: request?.City,
                        SpecializedFieldTitle: request?.SpecializedFieldTitle,
                        AdjusterCode: request?.AdjusterCode,
                        CooperationEndDate: request.CooperationEndDate === null ? "-" : moment(request.CooperationEndDate?.split("T")[0]).format(
                            "jYYYY-jMM-jDD"
                        ),


                    };
                })
            );
        } else {
            setBranchData(
                props.record?.ApplicantWorkLocationInfos?.map((request: any) => {
                    return {
                        ...request,
                        Id: request.ApplicantId,
                        Province: request?.Province?.Title,

                        City: request?.City?.Title,
                        Address: request?.Address,
                        Email: request?.Email,



                    };
                })
            );
        }


    }, [props.record, tabKey]);

    //coloumns Table
    let columns: any = [
        {
            title: "کد ارزیابی",
            dataIndex: "AdjusterCode",
            key: "AdjusterCode",
        },
        {
            title: "نام و نام خانوادگی",
            dataIndex: "FullName",
            key: "FullName",
        },
        {
            title: "سمت",
            dataIndex: "PositionTitle",
            key: "PositionTitle",
        },
        {
            title: "زمینه تخصصی",
            dataIndex: "SpecializedFieldTitle",
            key: "SpecializedFieldTitle",
        },
        {
            title: "تاریخ پایان همکای",
            dataIndex: "CooperationEndDate",
            key: "CooperationEndDate",
        },
    ];
    let branchColumns: any = [
        {
            title: "استان",
            dataIndex: "Province",
            key: "Province",
        },
        {
            title: "شهر",
            dataIndex: "City",
            key: "City",
        },
        {
            title: "آدرس",
            dataIndex: "Address",
            key: "Address",
        },
        {
            title: "ایمیل",
            dataIndex: "Email",
            key: "Email",
        },

    ];

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={handleTabKey}>
                <TabPane tab="اعضای هیئت مدیره" key="1">

                </TabPane>
                <TabPane tab="شعبه ها" key="2">

                </TabPane>
            </Tabs>
            {
                tabKey === "1" ?
                    <Table
                        columns={columns}
                        dataSource={data}
                        showSorterTooltip={false}
                        locale={{ emptyText: "لیست خالی می باشد" }}
                        pagination={{
                            pageSize: pageModel.pageSize,
                            total: props.record?.BoardMembers?.length,
                            showSizeChanger: true,
                            showTotal: (total) => `تعداد کل : ${total} `,
                            onChange: (current: number, pageSize: any) =>
                                setPageModel({
                                    ...pageModel,
                                    pageIndex: current,
                                    pageSize: pageSize,
                                }),
                            locale: { items_per_page: "/ صفحه" },
                        }}

                    /> :


                    <Table
                        columns={branchColumns}
                        dataSource={branchData}
                        showSorterTooltip={false}
                        locale={{ emptyText: "لیست خالی می باشد" }}
                        pagination={{
                            pageSize: pageModel.pageSize,
                            total: props.record?.ApplicantWorkLocationInfos?.length,
                            showSizeChanger: true,
                            showTotal: (total) => `تعداد کل : ${total} `,
                            onChange: (current: number, pageSize: any) =>
                                setPageModel({
                                    ...pageModel,
                                    pageIndex: current,
                                    pageSize: pageSize,
                                }),
                            locale: { items_per_page: "/ صفحه" },
                        }}

                    />
            }

        </div>
    );
};

export default SubGridForLegalAdjusters;
