import React, { useState, useMemo, useEffect, useRef, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Table,
    Space,
    Input,
} from "antd";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { PlusOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";
import {
    fetchAllAdjustmentField,
    fetchApplicantWarninsList,
    getBaseInfo,
    fetchEmployeeId,
} from "../../../../redux/actions";
import DatePicker2 from "../../../../components/UI/DatePicker/DatePicker";
import { IApplicantWarnings } from "../../../../shared/ulitities/Model/desktop/applicantWarnings";
import { INQUIRE_SUCCESS } from "../../../../constant/actionTypes";
import { filterAdvanceOperator } from "../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";

interface IApplicantWarningsProps {
    isManagmentCartable?: boolean;
    applicantId?: number;  
    isFromMenue?: boolean,
    isFromDeskTop?:boolean
}
const ApplicantWarnings: FC<IApplicantWarningsProps> = ({isFromDeskTop, isManagmentCartable, applicantId,isFromMenue }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [efectiveDate, setEffectiveDate] = useState<any>(null);
    const [endEfectiveDate, setEndEfectiveDate] = useState<any>(null);
    const [dataIndex, setDataIndex] = useState("");
    const [customOrder, setCustomOrder] = useState<any>(null);
    const [filterList, setFilterList] = useState<any>(
        isManagmentCartable
            ? [
                {
                    propertyName: "ApplicantId",
                    operator: 1,
                    value: applicantId,
                },
            ]
            : []
    );
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<any>(null);
    // const { baseInfo } = useSelector((state: any) => state?.baseData);
    const {
        loadingApllicantWarnings,
        applicantWarningsList,

    } = useSelector((state: any) => state.applicantWarnings);
    const [pageModel, setPageModel] = useState({
        pageSize: 15,
        pageIndex: 1,
    });


    let dataSource = applicantWarningsList?.Result?.map((item: IApplicantWarnings) => {
        let obj = {
            Id: item.Id,
            key: item.Id,
            ApplicantInfoFirstName: item.ApplicantPersonalInfo?.Person?.FirstName,
            ApplicantInfoLastName: item.ApplicantPersonalInfo?.Person?.FamilyName,
            ApplicantInfoNationlCode: item.ApplicantPersonalInfo?.Person?.NationalCode,
            ApplicantInfoCode: item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
            Title: item.Title,
            SendSms: item.SendSms ? ("بله") : ("خیر"),
            Description: item.Description,
            EffectiveDate: moment(item.EffectiveDate?.split("T")[0]).format(
                "jYYYY-jMM-jDD"
            ),



        };

        return obj;
    });

    let adjustmentField = {
        isActive: null,
    };

    useEffect(() => {
        dispatch(fetchAllAdjustmentField(adjustmentField));
    }, []);


  //از تاریخ موثر
  const handleDateEffectiveDate = (value: any) => {
    setEffectiveDate(value);
  };

  //تا تاریخ موثر
  const handleEndDateEffectiveDate = (value: any) => {
    setEndEfectiveDate(value);
  };
    let modelApplicantWarnings = useMemo(() => {
        return {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList,
        };
    }, [pageModel, filterList,dataIndex]);

    useEffect(() => {
        dispatch(fetchApplicantWarninsList(modelApplicantWarnings,isManagmentCartable??isFromMenue));
    }, [pageModel, filterList,dataIndex]);

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        setDataIndex(dataIndex);
        if ((dataIndex = "EffectiveDate")) {
          filterList.push({
            propertyName: "EffectiveDate",
            operator: filterAdvanceOperator.GreaterOrEqual,
            value: moment(efectiveDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
          });
          filterList.push({
            propertyName: "EffectiveDate",
            operator: filterAdvanceOperator.LessOrEqual,
            value: moment(endEfectiveDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",
    
          });
        }
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: any) => {
        if (dataIndex === "EffectiveDate") {
            setFilterList([])
            setEffectiveDate(null)
            setEndEfectiveDate(null)
            setDataIndex("")
          }
        setFilterList([]);
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                  {dataIndex === "EffectiveDate" ? (
          <div style={{ display: "flex", marginBottom: "5px" }}   >
            <DatePicker2
              placeholder="از تاریخ"
              value={efectiveDate}
              onChange={(value: any) => handleDateEffectiveDate(value)}
            />
            <DatePicker2
              placeholder="تا تاریخ"
              value={endEfectiveDate}
              onChange={(value: any) => handleEndDateEffectiveDate(value)}
            />
          </div>
        ) : (
                <Input
                    ref={searchInput}
                    placeholder={`جستجو ${dataIndex === "ApplicantInfoFirstName" ?
                            "نام ارزیاب" :
                            dataIndex === "ApplicantInfoLastName" ?
                                "نام خانوادگی ارزیاب" :
                                dataIndex === "ApplicantInfoNationlCode" ?
                                    "کدملی ارزیاب" :
                                    dataIndex === "ApplicantInfoCode" ?
                                        "کد ارزیاب" :
                                        dataIndex === "Title" ?
                                            "عنوان" :
                                            dataIndex === "Description" ?
                                                "توضیحات"

                                                : null
                        }`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                )}
                <Space>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        باز نشانی
          </Button>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        جستجو
          </Button>
                </Space>
            </div>
        ),

        filterIcon: (filtered: any) => (
            <FilterFilled
                style={{
                    color: filtered ? "#E64848" : undefined,
                }}
            />
        ),

        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                    text
                ),
    });

    let columns: any = [
        /*   {
    
          render: (value:any, item:any, index:any) => pageModel.pageIndex === 1 ? (index + 1) : ((pageModel.pageIndex - 1) * pageModel.pageSize) + (index + 1)
        }, */
        !isManagmentCartable&&!isFromDeskTop ?
            {
                title: "نام ارزیاب",
                dataIndex: "ApplicantInfoFirstName",
                key: "ApplicantInfoFirstName",
                ellipsis: true,
                width: "16%",
                ...getColumnSearchProps("ApplicantInfoFirstName"),
            } : {},
        !isManagmentCartable&&!isFromDeskTop ?
            {
                title: "نام خانوادگی ارزیاب",
                dataIndex: "ApplicantInfoLastName",
                key: "ApplicantInfoLastName",
                ellipsis: true,
                width: "22%",
                ...getColumnSearchProps("ApplicantInfoLastName"),
            } : {},

        !isManagmentCartable&&!isFromDeskTop ?
            {
                title: "کدملی ارزیاب",
                dataIndex: "ApplicantInfoNationlCode",
                key: "ApplicantInfoNationlCode",
                ellipsis: true,
                width: "19%",
                ...getColumnSearchProps("ApplicantInfoNationlCode"),
            } : {},
        !isManagmentCartable &&!isFromDeskTop?
            {
                title: "کد ارزیابی",
                dataIndex: "ApplicantInfoCode",
                key: "ApplicantInfoCode",
                ellipsis: true,
                width: "16%",
                ...getColumnSearchProps("ApplicantInfoCode"),
            } : {},
        {
            title: "عنوان",
            dataIndex: "Title",
            key: "Title",
            ellipsis: true,
            width: "16%",
            ...getColumnSearchProps("Title"),
        },


        {
            title: "تاریخ موثر",
            dataIndex: "EffectiveDate",
            key: "EffectiveDate",
            ellipsis: true,
            width: "18%",
            sorter:true,
            ...getColumnSearchProps("EffectiveDate"),
        },
        {
            title: "ارسال پیامک",
            dataIndex: "SendSms",
            key: "SendSms",
            ellipsis: true,
            width: "18%",

        },
        {
            title: "توضیحات",
            dataIndex: "Description",
            key: "Description",
            ellipsis: true,
            width: "70%",
        },
        // {
        //     title: !isManagmentCartable && !isFromMenue && "عملیات",
        //     width: "7%",
        //     render: (text: any, record: any) => (
        //         <Space size="middle">
        //             <div className="operations">
        //                 {!isManagmentCartable && !isFromMenue && (
        //                     <Tooltip title="ویرایش" placement="topLeft">
        //                         <Button
        //                             onClick={() => editEmployeeHandler(record)}
        //                             className="action"
        //                             type="text"
        //                             //   loading={loadingViewEmployeeId === record.Id}
        //                             icon={<Edit />}
        //                         ></Button>
        //                     </Tooltip>
        //                 )}
        //             </div>
        //         </Space>
        //     ),
        // },
    ];

    const visibleRegisterHandler = () => {
        setVisible(true);
        setEdit(false);
    };

    const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
        // if (sorter.field == "CreationDate") {
        //     if (sorter.order == "ascend") {
        //       setCustomOrder("Id");
        //     }
        //     if (sorter.order == "descend") {
        //       setCustomOrder("ApplicantRequest.Id Desc");
        //     }
        //   } else {
        //     setCustomOrder("Id");
        //   }
        let filteredIndictmentList = [] as any;
        isManagmentCartable
            ? filteredIndictmentList.push({
                propertyName: "ApplicantId",
                operator: 1,
                value: applicantId,
            })
            : ([] as any);
        if (filters.ApplicantInfoFirstName != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.FirstName",
                operator: 7,
                value: filters?.ApplicantInfoFirstName[0],
            });
        }
        if (filters.ApplicantInfoLastName != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.FamilyName",
                operator: 7,
                value: filters?.ApplicantInfoLastName[0],
            });
        }
        if (filters.ApplicantInfoNationlCode != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.NationalCode",
                operator: 1,
                value: filters?.ApplicantInfoNationlCode[0],
            });
        }
        if (filters.ApplicantInfoCode != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.AdjusterCode",
                operator: 7,
                value: filters?.ApplicantInfoCode[0],
            });
        }
        if (filters.Description != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.Description",
                operator: 7,
                value: filters?.Description[0],
            });
        }
        if (filters.Title != null) {
            filteredIndictmentList.push({
                propertyName: "Title",
                operator: 7,
                value: filters?.Title[0],
            });
        }


        if (filters.PositionDescription != null) {
            let first = [...filters.PositionDescription].shift();
            let last = [...filters.PositionDescription].pop();
            let fitrstIndex = filters.PositionDescription.indexOf(first);
            let lastIndex = filters.PositionDescription.indexOf(last);

            if (fitrstIndex == lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "Position",
                    operator: 1,
                    value: Number(filters?.PositionDescription[0]),
                });
            }

            if (filters.PositionDescription.length > 1) {
                for (let i = 0; i < filters.PositionDescription.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "PositionDescription",
                            operator: 1,
                            value: Number(first),
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.PositionDescription.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "PositionDescription",
                            operator: 1,
                            value: Number(last),
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (
                        i !== filters.PositionDescription.length - 1 &&
                        i !== fitrstIndex
                    ) {
                        filteredIndictmentList.push({
                            propertyName: "Position",
                            operator: 1,
                            value: Number(filters?.PositionDescription[i]),
                            operand: 1,
                            isOpenGroup: false,
                            isCloseGroup: false,
                        });
                    }
                }
            }
        }

        setFilterList(filteredIndictmentList);
    };

    return (
        <div>
        
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loadingApllicantWarnings}
                onChange={handleTableChange}
                pagination={{
                    pageSize: pageModel.pageSize,
                    total: applicantWarningsList?.TotalCount,
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
                    emptyText: "لیست خالی است",
                }}
            />

        </div>
    );
};

export default ApplicantWarnings;
