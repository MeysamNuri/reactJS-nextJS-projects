import React, { useState, useMemo, useEffect, FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Table,
    Space,
    Tooltip,
    Modal,
    ConfigProvider,
    Popconfirm,
    Input,
    Menu,
    Dropdown
} from "antd";
import moment from "jalali-moment";
import CreatNotificationMoal from './createNotificationModal'
import Highlighter from "react-highlight-words";
import { ReactComponent as Edit } from "../../../../assets/images/edit.svg";
import { ReactComponent as Check } from "../../../../assets/images/ok.svg";
import { ReactComponent as ArrowLeft } from "../../../../assets/images/arrowLeft.svg";
import {
    fetchGetForGridNotifications
} from "../../../../redux/actions";
import { PlusOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";

export interface MoniorNotificationsProps {

}

const MonitorNotifications: React.SFC<MoniorNotificationsProps> = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState<number>(0)
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [edit, setEdit] = useState(false);
    const searchInput = useRef<any>(null);
    const [filterList, setFilterList] = useState<any>([])
    const [selectedRecord, setSelectedRecord] = useState<any>({})
    const [showNoticDetails, setShowNoticDetails] = useState<boolean>(false)
    const [pageModel, setPageModel] = useState({
        pageSize: 15,
        pageIndex: 1,
    });
    const { notificationsList, notificationLoading } = useSelector((state: any) => state.notifications)



    let dataSource = notificationsList?.Result?.map(
        (item: any) => {
            let obj: any = {
                Id: item?.Id,
                Description: <div className="class-name" style={{ direction: "rtl", width: "15em", textAlign: "right" }}>{item.Description}</div>,
                Title: item?.Title,
                CreatedDate: moment(item?.CreatedDate?.split("T")[0]).format(
                    "jYYYY-jMM-jDD"
                ),
                EndDate: moment(item?.EndDate?.split("T")[0]).format(
                    "jYYYY-jMM-jDD"
                ),
                Type: item.Type ? ("بخشنامه") : ("اطلاعیه"),
                Files: item?.Files

            }
            return obj;
        }
    );
    let modelRequest = useMemo(() => {
        return {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: "Id",
            filters: filterList,
        };
    }, [pageModel, filterList]);
    useEffect(() => {
        dispatch(fetchGetForGridNotifications(modelRequest))
    }, [pageModel, filterList])
    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: any) => {
        setFilterList([]);
        clearFilters();
        setSearchText("");
    };
    const handleNotificationsModal = (type: any) => {
        setVisible(true)
        setType(type)
        setSelectedRecord(type)
        setShowNoticDetails(false)
    }
    const handleNotificationDetails = (record: any) => {
        setVisible(true)
        setSelectedRecord(record)
        setShowNoticDetails(true)
    }
    const removeSelectedRecord=()=>{
        setSelectedRecord({})
    }
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
                <Input
                    ref={searchInput}
                    placeholder={`جستجو ${dataIndex === "ApplicantInfoFirstName" ?
                        "نام ارزیاب" :
                        dataIndex === "ApplicantInfoLastName" ?
                            "نام خانوادگی ارزیاب" :
                            dataIndex === "ApplicantInfoNationlCode" ?
                                "کدملی ارزیاب" :
                                dataIndex === "ApplicantInfoCode" ?
                                    "کد ارزیاب" : null
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
        {
            width: "10%",
            title: "عملیات",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <div className="operations">
                    <Tooltip title="جزئیات" placement="topLeft">
                            <div className="detailColum" onClick={() => handleNotificationDetails(record)}>
                                <ArrowLeft />

                            </div>
                        </Tooltip>
                        <Tooltip title="ویرایش" placement="topLeft">
                            <Button
                                onClick={() => handleNotificationsModal(record)}
                                className="action"
                                icon={<Edit />}
                                type="text"
                            //   loading={loadingMonthlyPerformanceId === record.Id}
                            ></Button>

                        </Tooltip>
                       
                    </div>
                </Space>
            ),

        },
        {
            title: "موضوع اعلامیه",
            dataIndex: "Title",
            key: "Title",
            ellipsis: true,
            width: "12%",
        },
        {
            title: "تاریخ صدور",
            dataIndex: "CreatedDate",
            key: "CreatedDate",
            ellipsis: true,
            width: "10%",
        },
        {
            title: "تاریخ اعتبار",
            dataIndex: "EndDate",
            key: "EndDate",
            ellipsis: true,
            width: "10%",
        },

        {
            title: "متن بخشنامه/اعلامیه",
            dataIndex: "Description",
            key: "Description",
            //   filters: adjustmentFilter,
            ellipsis: true,
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
            width: "15%",
        },

        {
            title: "نوع",
            dataIndex: "Type",
            key: "Type",
            ellipsis: true,
            width: "10%",
        },
        {
            title: "فایل ضمیمه شده",
            dataIndex: "FileDescriptionId",
            key: "FileDescriptionId",
            ellipsis: true,
            width: "10%",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <div className="operations">
                        {
                            record?.Files?.length > 0 ?
                                <Tooltip title="پیوست" placement="topLeft">
                                    <Check />
                                </Tooltip> : "-"
                        }


                    </div>
                </Space>)
        },

  
    ];

    const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
        let filteredIndictmentList = [] as any;

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
        if (filters.AdjustmentField != null) {
            let first = [...filters.AdjustmentField].shift();
            let last = [...filters.AdjustmentField].pop();
            let fitrstIndex = filters.AdjustmentField.indexOf(first);
            let lastIndex = filters.AdjustmentField.indexOf(last);

            if (fitrstIndex == lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "AdjustmentFieldId",
                    operator: 1,
                    value: filters?.AdjustmentField[0],
                });
            }

            if (filters.AdjustmentField.length > 1) {
                for (let i = 0; i < filters.AdjustmentField.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "AdjustmentFieldId",
                            operator: 1,
                            value: first,
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.AdjustmentField.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "AdjustmentFieldId",
                            operator: 1,
                            value: last,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (i !== filters.AdjustmentField.length - 1 && i !== fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "AdjustmentFieldId",
                            operator: 1,
                            value: filters?.AdjustmentField[i],
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


    const menu = (
        <Menu style={{ direction: "rtl", textAlign: "right" }}>
            <Menu.Item
                key="0"
                onClick={() => handleNotificationsModal(0)}
                style={{ fontSize: "14px" }}
            >
                اطلاعیه ها
          </Menu.Item>

            <Menu.Divider />
            <Menu.Item
                key="1"
                style={{ fontSize: "14px" }}
                onClick={() => handleNotificationsModal(1)}
            >
                بخشنامه ها
          </Menu.Item>
        </Menu>
    );
    return (
        <ConfigProvider direction="rtl">
            <Dropdown overlay={menu} >
                <Button type="primary">ایجاد</Button>
            </Dropdown>
            <br />
            <br />
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={notificationLoading}
                onChange={handleTableChange}
                pagination={{
                    pageSize: pageModel.pageSize,
                    total: notificationsList?.TotalCount,
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
                                //setFilterList([]);
                            }}
                        >
                            باز نشانی
                        </span>
                    ),
                    filterConfirm: "جستجو",
                    filterEmptyText: "یافت نشد",
                    emptyText: "پرونده ای جهت ارجاع وجود ندارد.",
                }}
            />

            <Modal
                title={`ایجاد بخشنامه ها و اعلامیه ها`}
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
 
                width={1000}
            >
                <CreatNotificationMoal removeSelectedRecord={removeSelectedRecord} showNoticDetails={showNoticDetails} selectedRecord={selectedRecord} onCancel={() => setVisible(false)} type={type} modelRequest={modelRequest} />
            </Modal>
        </ConfigProvider>
    );
}

export default MonitorNotifications;