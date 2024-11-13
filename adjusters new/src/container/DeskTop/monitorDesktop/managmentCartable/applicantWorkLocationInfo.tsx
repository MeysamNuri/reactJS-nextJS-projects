import React, { useEffect, useState, FC } from "react";
import { Table, ConfigProvider, Button, Space, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import {
    fetchApplicantWorkLocation,
    adjusterDesckTopApplicantWorkLocation
} from "../../../../redux/actions";
export interface IApplicantWorkLocationInfoProps {
    applicantId?: number,
    isFromAdjusterDescktop?: boolean
}

const ApplicantWorkLocationInfo: React.FC<IApplicantWorkLocationInfoProps> = ({ applicantId, isFromAdjusterDescktop }) => {
    const dispatch = useDispatch();
    const {
        appicantWorkLocationInfo,
        applicantWorkLocationLoading,
    } = useSelector((state: any) => state.listBoardMember);
    const [pageModel, setPageModel] = useState({
        pageIndex: 1,
        pageSize: 3,
    });
    const [filterList, setFilterList] = useState<any>([]);

    useEffect(() => {
        if (isFromAdjusterDescktop) {
            dispatch(adjusterDesckTopApplicantWorkLocation())
        } else {
            dispatch(fetchApplicantWorkLocation(applicantId))
        }

    }, [])

    let data = appicantWorkLocationInfo?.Result?.map((item: any) => {
        let obj = {
            key: item.Id,
            BranchManager:!isFromAdjusterDescktop?item.BranchManager:item?.BranchManager==null?"-":(item?.BranchManager?.Person?.FirstName+" "+item?.BranchManager?.Person?.FamilyName),
            PlaceUsageDescription: item.PlaceUsageDescription,
            PostalCode: item.PostalCode,
            Telephone: item.Telephone,
            Email: item.Email,
            MainBranch:item.MainBranch==1?("اصلی"):("فرعی"),
            Address: item.Province?.Title + "-" + item.City?.Title + "-" + (item.Address??"")
            //   SendDate: moment(sms?.SendDate.split("T")[0]).format("jYYYY-jM-jD"),

        };
        return obj;
    });

    //coloumns Table
    let columns: any = [

        {
            title: "مدیر شعبه",
            dataIndex: "BranchManager",
            key: "BranchManager",
            width: "13%",
        },
        {
            title: "کاربری محل",
            dataIndex: "PlaceUsageDescription",
            key: "PlaceUsageDescription",
            width: "13%",
        },
        isFromAdjusterDescktop?
        {
            title: "نوع دفتر",
            dataIndex: "MainBranch",
            key: "MainBranch",
            width: "12%",
        }:{},
        {
            title: "کد پستی",
            dataIndex: "PostalCode",
            key: "PostalCode",
            width: "10%",
        },
        {
            title: "تلفن",
            dataIndex: "Telephone",
            key: "Telephone",
            width: "11%",
        },
        {
            title: "ایمیل",
            dataIndex: "Email",
            key: "Email",
            width: "12%",
        },
        {
            title: "محل شعبه",
            dataIndex: "Address",
            key: "Address",
            width: "28%",
        },


    ];

    return (
        <ConfigProvider direction="rtl">
            <Table
                columns={columns}
                dataSource={data}
                //   onChange={handleTableChange}
                loading={applicantWorkLocationLoading}
                pagination={{
                    pageSize: pageModel.pageSize,
                    total: appicantWorkLocationInfo?.TotalCount,
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

export default ApplicantWorkLocationInfo;