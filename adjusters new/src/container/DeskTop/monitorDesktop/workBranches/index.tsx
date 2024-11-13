import React, { useEffect, useState, useRef } from 'react';
import { Input, ConfigProvider, Spin, Row, Col, Radio, Space, Button, Table, Tooltip } from 'antd';
import {
    applicantWorkLocationList,
    exportToExcelApplicantWorkLocation,
    getBaseInfo
} from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Highlighter from "react-highlight-words";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import { ReactComponent as Xls } from "../../../../assets/images/xls.svg";
export interface ApplicantWorkBranchesProps {

}

const ApplicantWorkBranches: React.FC<ApplicantWorkBranchesProps> = () => {
    const dispatch = useDispatch();
    const {
        applicantBranchList,
        applicantBranchListLoading,
    } = useSelector((state: any) => state.listBoardMember);
    const { baseInfo } = useSelector((state: any) => state?.baseData);

    const [pageModel, setPageModel] = useState({
        pageIndex: 1,
        pageSize: 5,
    });
    const [filterList, setFilterList] = useState<any>([]);
    const [dataIndex, setDataIndex] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const [CityList, setCityList] = useState<any>([])
    const [selectedCityList, setSelectedCityList] = useState<any>()
    const [data, setData] = useState([])
    const [cityFilters, setCityFilters] = useState<any>([])
    const [filterState, setFilterState] = useState<number>(7)
    const [tableKey, setTableKey] = useState(0);
    const removeFilterRef = useRef<any>(null)
    const applicantWorklocationLoading = useSelector((state: any) => state.activeAdjusterLists?.applicantWorklocationLoading)

    useEffect(() => {
        dispatch(getBaseInfo());
    }, []);
    useEffect(() => {
        let data = applicantBranchList?.Result?.map((item: any) => {
            let obj = {
                key: item.Id,
                PlaceUsageDescription: item.PlaceUsageDescription,
                BranchManager: item.BranchManager?.Person ? (item.BranchManager?.Person?.FirstName + " " + item.BranchManager?.Person?.FamilyName) : "-",
                PostalCode: item.PostalCode,
                Telephone: item.Telephone,
                Email: item.Email,
                ProvinceTitle: item.Province?.Title,
                CityTitle: item?.City?.Title,
                MainBranch: item.MainBranch == 1 ? ("اصلی") : ("فرعی"),
                Address: item.Province?.Title + "-" + item.City?.Title + "-" + (item.Address ?? ""),
                AdjustmentCompanyInfoTitle: item?.ApplicantPersonalInfo?.Applicant?.AdjustmentCompanyInfoTitle ?? '-',
                NationalCodeOut: item.ApplicantPersonalInfo?.Person.NationalCodeOut,
                ApplicantInfoCode: item.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
                FirstName: item.ApplicantPersonalInfo?.Person.FirstName,
                FamilyName: item.ApplicantPersonalInfo?.Person.FamilyName,
                //   SendDate: moment(sms?.SendDate.split("T")[0]).format("jYYYY-jM-jD"),

            };
            return obj;
        });
        setData(data)
    }, [applicantBranchList])
    let provinceFilters = baseInfo?.Result?.Provinces?.map((province: any) => {
        let provinceObj = {
            key: province.Id,
            text: province.Title,
            value: province.Id,
        };
        return provinceObj;
    });
    const createcityList = (array1: any, array2: any) => {
        const result = array1?.filter((cert: any) => {
            let arr: any = array2?.filter((detail: any) => detail === cert.Id)
            return !(arr?.length === 0)
        });
        setSelectedCityList(result)

    }
    useEffect(() => {
        createcityList(baseInfo?.Result?.Provinces, cityFilters)
    }, [baseInfo, cityFilters])


    useEffect(() => {
        let newlist: any[] = selectedCityList?.map((item: any) => {
            return item?.Cities?.map((city: any) => {
                let obj = {
                    key: city.Id,
                    text: city.Title,
                    value: city.Id,
                }
                return obj
            })

        })
        const output = newlist?.flat();

        setCityList(output)


    }, [selectedCityList])
    const resetFiltersHandler = () => {
        removeFilterRef?.current?.click()
        setTableKey(tableKey => tableKey + 1);
        setFilterList([])
        setPageModel({
            ...pageModel,
            pageIndex: 1
        })

        setSearchText("")
    }
    const exelHandler = () => {


        let applicantorkLocationReport = {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList,
        };

        dispatch(exportToExcelApplicantWorkLocation(applicantorkLocationReport));

    };
    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div style={{ padding: 8 }}>
                {
                    // dataIndex === "CreationDate" ? (
                    //   <div style={{ display: "flex", marginBottom: "5px" }}   >
                    //     <DatePicker2
                    //       placeholder="از تاریخ"
                    //       value={startCreationDate}
                    //       onChange={(value: any) => handleStartCreationDate(value)}
                    //     />
                    //     <DatePicker2
                    //       placeholder="تا تاریخ"
                    //       value={endCreationDate}
                    //       onChange={(value: any) => handleEndCreationDate(value)}
                    //     />
                    //   </div>) :
                    dataIndex === "FirstName" ||
                        dataIndex === "FamilyName" ||
                        dataIndex === "AdjustmentCompanyInfoTitle" ||

                        dataIndex === "ApplicantInfoCode"
                        ?
                        <>

                            <Input
                                value={selectedKeys[0]}
                                onChange={(e) =>
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                }
                                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                style={{ marginBottom: 8, display: "block" }}
                            />
                            <Radio.Group onChange={(e: any) => radioCahnge(e, clearFilters)} defaultValue={7}>
                                <Radio value={7}>شامل</Radio>
                                <Radio value={1}>برابر</Radio>

                            </Radio.Group>
                        </>
                        :

                        (


                            <Input
                                placeholder={`جستجو ${dataIndex === "RequestTypeId" ? "نوع درخواست" :
                                    dataIndex === "ApplicantInfoCode" ? "کد ارزیاب" :
                                        dataIndex === "FamilyName" ? "نام خانوادگی" :
                                            dataIndex === "NationalCodeOut" ? "کدملی" :
                                                dataIndex === "FirstName" ? "نام" :
                                                    dataIndex === "AdjustmentCompanyInfoTitle" ? "نام شرکت"

                                                        : null
                                    }`}
                                value={selectedKeys[0]}
                                onChange={(e) =>
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                }
                                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                style={{ marginBottom: 8, display: "block" }}
                            />
                        )}
                <Space>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        باز نشانی
              </Button>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        جستجو
              </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => (
            <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value)
                : "",

        render: (text: any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffff00", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                    text
                ),
    });

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        setDataIndex(dataIndex);
        // if ((dataIndex = "CreationDate")) {
        //   filterList.push({
        //     propertyName: "CreationDate",
        //     operator: filterAdvanceOperator.GreaterOrEqual,
        //     value: moment(startCreationDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
        //   });
        //   filterList.push({
        //     propertyName: "CreationDate",
        //     operator: filterAdvanceOperator.LessOrEqual,
        //     value: moment(endCreationDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",

        //   });
        // }
        setSearchedColumn(dataIndex);
        setSearchText(selectedKeys[0]);
        confirm();
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText("");
        setFilterState(7)
        setFilterList([])
    };
    const radioCahnge = (e: any, clearFilters: any) => {

        setFilterState(e.target.value)
        setSearchText("");
        setDataIndex("")
        clearFilters();

    }
    const handleChange = (pagination: any, filters: any, sorter: any) => {

        let filteredIndictmentList = [] as any;
        if (filters.FamilyName != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.FamilyName",
                operator: filterState,
                value: filters?.FamilyName[0],
            });
        }

        if (filters.FirstName != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.FirstName",
                operator: filterState,
                value: filters?.FirstName[0],
            });
        }
        if (filters.ApplicantInfoCode != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.AdjusterCode",
                operator: filterState,
                value: filters?.ApplicantInfoCode[0],
            });
        }
        if (filters.NationalCodeOut != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.NationalCode",
                operator: 1,
                value: filters?.NationalCodeOut[0],
            });
        }
        if (filters.AdjustmentCompanyInfoTitle != null) {
            filteredIndictmentList.push({
                propertyName: "Applicant.CompanyName",
                operator: filterState,
                value: filters?.AdjustmentCompanyInfoTitle[0],
            });
        }
        if (filters.ProvinceTitle != null) {
            let first = [...filters.ProvinceTitle].shift();
            let last = [...filters.ProvinceTitle].pop();
            let fitrstIndex = filters.ProvinceTitle.indexOf(first);
            let lastIndex = filters.ProvinceTitle.indexOf(last);
            setCityFilters(filters?.ProvinceTitle)
            if (fitrstIndex === lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "ProvinceId",
                    operator: 1,
                    value: filters?.ProvinceTitle[0],
                });
            }

            if (filters.ProvinceTitle.length > 1) {
                for (let i = 0; i < filters.ProvinceTitle.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "ProvinceId",
                            operator: 1,
                            value: first,
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.ProvinceTitle.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "ProvinceId",
                            operator: 1,
                            value: last,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (i !== filters.ProvinceTitle.length - 1 && i !== fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "ProvinceId",
                            operator: 1,
                            value: filters?.ProvinceTitle[i],
                            operand: 1,
                            isOpenGroup: false,
                            isCloseGroup: false,
                        });
                    }
                }
            }
        }
        if (filters.CityTitle != null) {
            let first = [...filters.CityTitle].shift();
            let last = [...filters.CityTitle].pop();
            let fitrstIndex = filters.CityTitle.indexOf(first);
            let lastIndex = filters.CityTitle.indexOf(last);
            if (fitrstIndex === lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "CityId",
                    operator: 1,
                    value: filters?.CityTitle[0],
                });
            }

            if (filters.CityTitle.length > 1) {
                for (let i = 0; i < filters.CityTitle.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "CityId",
                            operator: 1,
                            value: first,
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.CityTitle.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "CityId",
                            operator: 1,
                            value: last,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (i !== filters.CityTitle.length - 1 && i !== fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "CityId",
                            operator: 1,
                            value: filters?.CityTitle[i],
                            operand: 1,
                            isOpenGroup: false,
                            isCloseGroup: false,
                        });
                    }
                }
            }
        }

        if (filters.RequestTypeDescription != null) {
            let first = [...filters.RequestTypeDescription].shift();
            let last = [...filters.RequestTypeDescription].pop();
            let fitrstIndex = filters.RequestTypeDescription.indexOf(first);
            let lastIndex = filters.RequestTypeDescription.indexOf(last);

            if (fitrstIndex == lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "RequestType",
                    operator: 1,
                    value: filters?.RequestTypeDescription[0],
                });
            }

            if (filters.RequestTypeDescription.length > 1) {
                for (let i = 0; i < filters.RequestTypeDescription.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "RequestType",
                            operator: 1,
                            value: first,
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.RequestTypeDescription.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "RequestType",
                            operator: 1,
                            value: last,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (
                        i !== filters.RequestTypeDescription.length - 1 &&
                        i !== fitrstIndex
                    ) {
                        filteredIndictmentList.push({
                            propertyName: "RequestType",
                            operator: 1,
                            value: filters?.RequestTypeDescription[i],
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


    useEffect(() => {
        let requestBody = {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList,
        };
        dispatch(applicantWorkLocationList(requestBody))
    }, [pageModel, filterList, dataIndex])



    //coloumns Table
    let columns: any = [

        {
            title: "مدیر شعبه",
            dataIndex: "BranchManager",
            key: "BranchManager",
            width: "9%",
        },
        {
            title: "نام شرکت ",
            dataIndex: "AdjustmentCompanyInfoTitle",
            key: "AdjustmentCompanyInfoTitle",
            width: "9%",
            ...getColumnSearchProps("AdjustmentCompanyInfoTitle"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),


        },
        {
            title: "نام ارزیاب/مدیرعامل",
            dataIndex: "FirstName",
            key: "FirstName",
            width: "12%",
            ...getColumnSearchProps("FirstName"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),


        },
        {
            title: "نام خانوادگی ارزیاب/مدیرعامل",
            dataIndex: "FamilyName",
            key: "FamilyName",
            width: "14%",
            ...getColumnSearchProps("FamilyName"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
        },
        {
            title: "کدملی",
            dataIndex: "NationalCodeOut",
            key: "NationalCodeOut",
            width: "8%",
            ...getColumnSearchProps("NationalCodeOut"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
        },

        {
            title: "کد ارزیاب",
            dataIndex: "ApplicantInfoCode",
            key: "ApplicantInfoCode",
            width: "8%",
            ...getColumnSearchProps("ApplicantInfoCode"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
        },
        {
            title: "کاربری محل",
            dataIndex: "PlaceUsageDescription",
            key: "PlaceUsageDescription",
            width: "8%",
        },


        {
            title: "کد پستی",
            dataIndex: "PostalCode",
            key: "PostalCode",
            width: "7%",
        },
        {
            title: "تلفن",
            dataIndex: "Telephone",
            key: "Telephone",
            width: "7%",
        },
        {
            title: "ایمیل",
            dataIndex: "Email",
            key: "Email",
            width: "7%",
        },
        {
            title: "محل شعبه",
            dataIndex: "Address",
            key: "Address",
            width: "18%",
        },
        {
            title: "استان",
            dataIndex: "ProvinceTitle",
            key: "ProvinceTitle",
            filters: provinceFilters,

            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
            with: "14%"
        },
        {
            title: "شهر",
            dataIndex: "CityTitle",
            key: "CityTitle",
            filters: CityList,
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
            responsive: ["sm"],
        },

    ];

    return (
        <ConfigProvider direction="rtl">
            <Row style={{ direction: "ltr" }}>

                <Tooltip title="خروجی اکسل">
                    <Button
                        type="dashed"
                        onClick={exelHandler}
                        loading={applicantWorklocationLoading}
                        icon={<Xls className="excel" />}
                        className="centerIconButton iconCenter"
                    ></Button>
                </Tooltip>
                <Button onClick={resetFiltersHandler} type="dashed">پاکسازی همه فیلتر ها</Button>
            </Row>
            <br />
            <Table
                key={tableKey}
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                loading={applicantBranchListLoading}
                pagination={{
                    pageSize: pageModel.pageSize,
                    total: applicantBranchList?.TotalCount,
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
                            ref={removeFilterRef}
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

export default ApplicantWorkBranches;