import React, { useEffect, useState } from 'react';
import './styles.css'
import { useDispatch, useSelector } from "react-redux";
import {
    fetchActiveAdjuster,
    getBaseInfo,
    exportToExcelActiveAdjusters
} from "../../redux/actions";
import { Table, ConfigProvider, Space, Input, Button, Row, Tooltip, Radio } from 'antd'
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import moment from "jalali-moment";
import DatePicker2 from "../../components/UI/DatePicker/DatePicker";
import { ReactComponent as Ok } from '../../assets/images/ok.svg'
import SubGridForLegalAdjusters from './subGridForLegalAdjusters'
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { ReactComponent as Xls } from "../../assets/images/xls.svg";
import { filterAdvanceOperator } from "../../shared/ulitities/Enums/advanceSearchOperator";
import Highlighter from "react-highlight-words";
export interface EvalutorListProps {

}

const EvalutorList: React.FC<EvalutorListProps> = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [startCreationDate, setStartCreationDate] = useState<any>(null);
    const [endCreationDate, setEndCreationDate] = useState<any>(null);
    const [filterList, setFilterList] = useState<any>([]);
    const [dataIndex, setDataIndex] = useState("");
    const [startLicenseExpirationDate, setStartLicenseExpirationDate] = useState<any>(null)
    const [endLicenseExpirationDate, setEndLicenseExpirationDate] = useState<any>(null)
    const [filterState, setFilterState] = useState<number>(7)
    const [customOrder, setCustomOrder] = useState<any>(null);
    const {
        activeAdjusterLists,
        activeAdjustersLoading
    } = useSelector((state: any) => state.activeAdjusterLists);

    const { baseInfo } = useSelector((state: any) => state?.baseData);

    const dispatch = useDispatch();
    const [data, setData] = useState();
    useEffect(() => {
        dispatch(getBaseInfo());
    }, []);
    document.title = "اسامی ارزیابان خسارت بیمه ای فعال"
    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        pageIndex: 1,
    });
    useEffect(() => {
        let activeAdjusterReport = {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList
        };

        dispatch(fetchActiveAdjuster(activeAdjusterReport));


    }, [pageModel, filterList, dataIndex]);
    let provinceFilters = baseInfo?.Result?.Provinces?.map((province: any) => {
        let provinceObj = {
            key: province.Id,
            text: province.Title,
            value: province.Id,
        };
        return provinceObj;
    });

    useEffect(() => {
        setData(
            activeAdjusterLists?.Result?.map((request: any) => {
                return {
                    ...request,
                    Id: request.ApplicantId,
                    FirstName: request?.FirstName,
                    FamilyName: request?.FamilyName,
                    ProvinceTitle: request?.Province,
                    City: request?.City,
                    Address: request?.Address,
                    AdjusterCode: request?.AdjusterCode,
                    LicenseExpirationDate: moment(request.LicenseExpirationDate.split("T")[0]).format(
                        "jYYYY-jMM-jDD"
                    ),
                    AdjusterTypeDescription: request?.AdjusterTypeDescription,
                    CompanyName: request?.CompanyName ?? "-",
                    SpecializedFieldTitle: request?.SpecializedFieldTitle,
                    // AdjusterType: request?.AdjusterType == 2 ? <Ok /> : request?.AdjusterTypeDescription ,
                    AdjusterType: request?.AdjusterTypeDescription,
                    AdjusterTypeId: request?.AdjusterType

                };
            })
        );
    }, [activeAdjusterLists]);
    //از تاریخ
    const handleStartLicenseExpiration = (value: any) => {
        setStartLicenseExpirationDate(value)
    }
    //تا تاریخ
    const handleEndLicenseExpiration = (value: any) => {
        setEndLicenseExpirationDate(value)
    }
    const radioCahnge = (e: any,clearFilters:any) => {

        setFilterState(e.target.value)
        setSearchText("");
        setDataIndex("")
        setStartLicenseExpirationDate(null)
        setEndLicenseExpirationDate(null)
        clearFilters();
     
    }


    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div style={{ padding: 8 }}>
                {dataIndex === "LicenseExpirationDate" ? (
                    <div style={{ display: "flex", marginBottom: "5px" }}   >
                        <DatePicker2
                            placeholder="از تاریخ"
                            value={startCreationDate}
                            onChange={(value: any) => handleStartLicenseExpiration(value)}
                        />
                        <DatePicker2
                            placeholder="تا تاریخ"
                            value={endCreationDate}
                            onChange={(value: any) => handleEndLicenseExpiration(value)}
                        />
                    </div>) :
                    dataIndex === "AdjusterCode" ?
                        <>

                            <Input
                                value={selectedKeys[0]}
                                onChange={(e) =>
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                }
                                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                                style={{ marginBottom: 8, display: "block" }}
                            />
                            <Radio.Group onChange={(e:any)=>radioCahnge(e,clearFilters)} defaultValue={7}>
                                <Radio value={7}>شامل</Radio>
                                <Radio value={1}>برابر</Radio>

                            </Radio.Group>
                        </>
                        :


                        (


                            <Input
                                placeholder={`جستجو ${dataIndex === "RequestTypeId" ? "نوع درخواست" :
                                    dataIndex === "FirstName" ? "نام ارزیاب" :
                                        dataIndex === "FamilyName" ? "نام خانوادگی" :
                                            dataIndex === "AdjusterCode" ? "کد ارزیاب" :
                                                dataIndex === "SpecializedFieldTitle" ? "زمینه تخصصی" :
                                                    dataIndex === "Province" ? "استان" :
                                                        dataIndex === "City" ? "شهر" :
                                                            dataIndex === "AdjusterType" ? "نوع ارزیاب"

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
                    .includes(value.toLowerCase())
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
        if ((dataIndex = "LicenseExpirationDate")) {
            filterList.push({
                propertyName: "LicenseExpirationDate",
                operator: filterAdvanceOperator.GreaterOrEqual,
                value: moment(startLicenseExpirationDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
            });
            filterList.push({
                propertyName: "LicenseExpirationDate",
                operator: filterAdvanceOperator.LessOrEqual,
                value: moment(endLicenseExpirationDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",

            });
        }
        setSearchedColumn(dataIndex);
        setSearchText(selectedKeys[0]);
        confirm();
    };

    const handleReset = (clearFilters: any) => {
        if (dataIndex === "LicenseExpirationDate") {
            setFilterList([])
            setStartLicenseExpirationDate(null)
            setEndLicenseExpirationDate(null)
            setDataIndex("")
        }
        clearFilters();
        setSearchText("");
    };
 
    let columns: any = [

        {
            title: <Tooltip title={"نوع ارزیاب"}>نوع</Tooltip>,
            dataIndex: "AdjusterType",
            key: "AdjusterType",
            width: "5%",
            filters: [
                {
                    key: 1,
                    text: "حقیقی",
                    value: 1
                },
                {
                    key: 2,
                    text: "حقوقی",
                    value: 2
                },
                {
                    key: 3,
                    text: "دادگستری",
                    value: 3
                },
            ]

        },

        {
            title: <Tooltip title={"نام ارزیاب/مدیر عامل"}>نام</Tooltip>,
            dataIndex: "FirstName",
            key: "FirstName",
            width: "5%",
            ...getColumnSearchProps("FirstName"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),

        },
        {
            title: <Tooltip title={"نام خانوادگی ارزیاب / مدیر عامل"}>نام خانوادگی</Tooltip>,
            dataIndex: "FamilyName",
            key: "FamilyName",
            width: "9%",
            ...getColumnSearchProps("FamilyName"),
            // filterIcon: (filters: any) => (
            //     <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            // ),

        },
        {
            title: "کد ارزیاب",
            dataIndex: "AdjusterCode",
            key: "AdjusterCode",
            width: "7%",
            ...getColumnSearchProps("AdjusterCode"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),

        },
        {
            title: "عنوان موسسه",
            dataIndex: "CompanyName",
            key: "CompanyName",
            width: "12%",
            ...getColumnSearchProps("CompanyName"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
        },
        {
            title: "اعتبار پروانه",
            dataIndex: "LicenseExpirationDate",
            key: "LicenseExpirationDate",
            width: "8%",
            ...getColumnSearchProps("LicenseExpirationDate"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
        },

        {
            title: "زمینه تخصصی",
            dataIndex: "SpecializedFieldTitle",
            key: "SpecializedFieldTitle",
            width: "13%",
            ...getColumnSearchProps("SpecializedFieldTitle"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),

        },
        {
            title: "تلفن همراه",
            dataIndex: "Mobile",
            key: "Mobile",
            width: "9%",
        },
        {
            title: "استان",
            dataIndex: "ProvinceTitle",
            key: "ProvinceTitle",
            width: "9%",
            filters: provinceFilters,
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),

        },
        {
            title: "شهر",
            dataIndex: "City",
            key: "City",
            width: "9%",

        },


        {
            title: "آدرس",
            dataIndex: "Address",
            key: "Address",
            width: "20%",
        },


    ];
    const handleChange = (pagination: any, filters: any, sorter: any) => {

        if (sorter.field == "CreationDate") {
            if (sorter.order == "ascend") {
                setCustomOrder("Id");
            }
            if (sorter.order == "descend") {
                setCustomOrder("ApplicantRequest.Id Desc");
            }
        } else {
            setCustomOrder("Id");
        }
        let filteredIndictmentList = [] as any;
        if (filters.FamilyName != null) {
            filteredIndictmentList.push({
                propertyName: "FamilyName",
                operator: 7,
                value: filters?.FamilyName[0],
            });
        }

        if (filters.FirstName != null) {
            filteredIndictmentList.push({
                propertyName: "FirstName",
                operator: 7,
                value: filters?.FirstName[0],
            });
        }
        if (filters.AdjusterCode != null) {
            filteredIndictmentList.push({
                propertyName: "AdjusterCode",
                operator: filterState,
                value: filters?.AdjusterCode[0],
            });
        }
        if (filters.SpecializedFieldTitle != null) {
            filteredIndictmentList.push({
                propertyName: "SpecializedFieldTitle",
                operator: 7,
                value: filters?.SpecializedFieldTitle[0],
            });
        }
        if (filters.CompanyName != null) {
            filteredIndictmentList.push({
                propertyName: "CompanyName",
                operator: 7,
                value: filters?.CompanyName[0],
            });
        }
        if (filters.ProvinceTitle != null) {
            let first = [...filters.ProvinceTitle].shift();
            let last = [...filters.ProvinceTitle].pop();
            let fitrstIndex = filters.ProvinceTitle.indexOf(first);
            let lastIndex = filters.ProvinceTitle.indexOf(last);

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
        if (filters.AdjusterType != null) {
            let first = [...filters.AdjusterType].shift();
            let last = [...filters.AdjusterType].pop();
            let fitrstIndex = filters.AdjusterType.indexOf(first);
            let lastIndex = filters.AdjusterType.indexOf(last);

            if (fitrstIndex == lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "AdjusterType",
                    operator: 1,
                    value: filters?.AdjusterType[0],
                });
            }

            if (filters.AdjusterType.length > 1) {
                for (let i = 0; i < filters.AdjusterType.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "AdjusterType",
                            operator: 1,
                            value: first,
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.AdjusterType.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "AdjusterType",
                            operator: 1,
                            value: last,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (
                        i !== filters.AdjusterType.length - 1 &&
                        i !== fitrstIndex
                    ) {
                        filteredIndictmentList.push({
                            propertyName: "AdjusterType",
                            operator: 1,
                            value: filters?.AdjusterType[i],
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



    const exelHandler = () => {


        let activeAdjusterReport = {
            firstPageSize: 100,
            pageSize: 100,
            pageIndex: 1,
            orderBy: "Id",
            filters: filterList,
        };

        dispatch(exportToExcelActiveAdjusters(activeAdjusterReport));

    };
    return (
        <div className="evl-list-conatiner">
            <ConfigProvider direction="rtl">
                <Row style={{ direction: "ltr" }}>

                    <Tooltip title="خروجی اکسل">
                        <Button
                            type="dashed"
                            onClick={exelHandler}
                            // loading={loadingExcel}
                            icon={<Xls className="excel" />}
                            className="centerIconButton iconCenter"
                        ></Button>
                    </Tooltip>
                </Row>
                <br />
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={activeAdjustersLoading}
                    rowKey={(record) => record.Id}
                    scroll={{ x: 1450 }}
                    onChange={handleChange}
                    locale={{
                        emptyText: "لیست خالی می باشد",
                        filterConfirm: "جستجو",
                        filterReset: "باز نشانی",
                        filterEmptyText: "یافت نشد"
                    }}
                    expandable={{
                        expandedRowRender: (record) => {
                            return <SubGridForLegalAdjusters record={record} />;
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
                                        {
                                            props?.record?.AdjusterTypeId == 2 &&
                                            <CaretLeftOutlined />
                                        }

                                    </a>
                                );
                            }
                        },
                    }}


                    pagination={{
                        pageSize: pageModel.pageSize,
                        total: activeAdjusterLists?.TotalCount,
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
            </ConfigProvider>
        </div>
    );
}

export default EvalutorList;