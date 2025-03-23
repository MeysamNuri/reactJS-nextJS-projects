import React, { useEffect, useState, useRef } from "react";
import { usePaginatedQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { FindAccess } from "sanhab-components-library";
import {
    Table,
    Button,
    Space,
    Modal,
    Pagination,
    ConfigProvider,
    Popconfirm,
    Tooltip,
    Input,
    Alert,
} from "antd";
import { SearchOutlined, PlusOutlined, FilterFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { useDeletInterviewer } from "../AdjustersHook";
import { api } from "../../../httpServices/service";
import { forbiddenBaseInfoList, deleteforbiddenBaseInfo } from "../../../redux/actions";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import CreateForbiddenInfo from './createForbiddenInfo'
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

const ForbiddenBaseInfo = () => {
    const dispatch = useDispatch();

    const [addForm, setAddForm] = useState(false);
    const [current, setCurrent] = useState(1);
    const [visible, setVisible] = useState(false);
    const [selectedForbiddenId,setSelectedForbiddenId]=useState<any>()
    const [customOrder, setCustomOrder] = useState<any>(null);
    const [pageModel, setPageModel] = useState({
        pageSize: 10,
    });
    const [searchText, setSearchText] = useState("");
    const [customSort, setCustomSort] = useState({} as any);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [filterList, setFilterList] = useState<any>([]);
    const searchInput = useRef<any>(null);


    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const { forbiddenListDetails, forbiddenListLoading, forbiddenSubmitDetails ,
        deleteForbiddenDetails,
        deleteForbiddenLoading
    } = useSelector((state: any) => state.forbiddenInfo)
    const handleReset = (clearFilters: any) => {
        setFilterList([]);
        clearFilters();
        setSearchText("");
    };

    useEffect(() => {
        setVisible(false)
    }, [forbiddenSubmitDetails])
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
                    placeholder={`جستجو ${dataIndex === "firstName"
                            ? "نام"
                            : dataIndex === "familyName"
                                ? "نام خانوادگی"
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

    // const handleSorting = (sorter: any) => {

    //   console.log(sorter, "sorterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

    //   if (sorter.field == "familyName") {
    //     if (sorter.order == "ascend") {
    //       setCustomOrder("FamilyName");
    //     }
    //     if (sorter.order == "descend") {
    //       setCustomOrder("FamilyName desc");
    //     }
    //   } else {
    //     setCustomOrder("Id");
    //   }
    // };




    useEffect(() => {
        const forbiddenModel = {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: current,
            orderBy: customOrder,
            filters: filterList,
        };
        dispatch(forbiddenBaseInfoList(forbiddenModel))
  
    }, [forbiddenSubmitDetails,deleteForbiddenDetails])

    // all Interviewer
    let forbiddenData = forbiddenListDetails?.Result?.map(
        (item: any) => {
            let forbidden = {
                key: item.Id,
                id: item.Id,
                Title: item.Title,
                PositionDescription: item.PositionDescription,
                SourcePositionDescription: item.SourcePositionDescription,
                Code: item.Code,
                IsActive: item.IsActive ? ("فعال") : ("غیر فعال")
            };
            return forbidden;
        }
    );


    //edit forbidden
    const editForbiddenHandler = (id: number) => {
        // setLoading(true);
        setAddForm(false);
        setVisible(true);
       setSelectedForbiddenId(id)
    };

    //remove forbidden
    const removeForbiddenHandler = (id: number) => {
        dispatch(deleteforbiddenBaseInfo(id))
    };

    //coloumns Table
    let columns: any = [

        {
            title: "عنوان",
            dataIndex: "Title",
            key: "Title",
            sorter: false,
            ellipsis: true,
            // ...getColumnSearchProps("Title"), 
        },


        {
            title: "کد",
            dataIndex: "Code",
            key: "Code",
            ellipsis: true,
            sorter: false,
        },
        {
            title: "منبع",
            dataIndex: "SourcePositionDescription",
            key: "SourcePositionDescription",
            sorter: false,

        },
        {
            title: "سمت",
            dataIndex: "PositionDescription",
            key: "PositionDescription",
            sorter: false,
            /* width: "11%", */
        },

        {
            title: "وضعیت",
            dataIndex: "IsActive",
            key: "IsActive",
            sorter: false,
            ellipsis: true,
        },

        {
            title: "عملیات"
            ,
            /*  width: "8%", */
            render: (text: any, record: any) => (
                <Space size="middle">
                    <div className="operations">
                        {FindAccess(userAccessList.Adjusters_EditInterviewer) && (
                            <Tooltip title="ویرایش" placement="topLeft">
                                <a
                                    onClick={() => editForbiddenHandler(record.id)}
                                    className="action"
                                >
                                    <Edit />
                                </a>
                            </Tooltip>
                        )}
                        {forbiddenListDetails?.Result.length >= 1 &&

                            <ConfigProvider direction="rtl">
                                <Popconfirm
                                    title="از حذف شاخص مورد نظر مطمئن هستید؟"
                                    onConfirm={() => removeForbiddenHandler(record.id)}
                                    okText="بله"
                                    cancelText="خیر"
                                    
                                >
                                    <Tooltip title="حذف" placement="topLeft">
                                        <a className="action">
                                            <Trash />
                                        </a>
                                    </Tooltip>
                                </Popconfirm>
                            </ConfigProvider>
                        }
                    </div>
                </Space>
            ),
        },
    ];

    //change Page

    const changePageHandler = (page: number, pageSize: any) => {
        return (
            setPageModel({
                ...pageModel,
                pageSize: pageSize,
            }),
            setCurrent(page)
        );
    };

    //show Modal forbidden
    const showCreateForbiddensHandler = () => {
        setAddForm(true);
        setVisible(true);
    };



    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setCustomSort(sorter);
        if (sorter.field === "familyName" && sorter.order === "ascend") {
            setCustomOrder("FamilyName");
        } else if (sorter.order === "descend" && sorter.field === "familyName") {
            setCustomOrder("FamilyName desc");
        } else {
            setCustomOrder(null);
        }

        let filteredIndictmentList = [] as any;

        if (filters.familyName != null) {
            filteredIndictmentList.push({
                propertyName: "FamilyName",
                operator: 1,
                value: filters?.familyName[0],
            });
        }



        /**
         * شرکت
         */
        if (filters.CompanyTitle != null) {
            let first = [...filters.CompanyTitle].shift();
            let last = [...filters.CompanyTitle].pop();
            let fitrstIndex = filters.CompanyTitle.indexOf(first);
            let lastIndex = filters.CompanyTitle.indexOf(last);

            if (fitrstIndex == lastIndex) {
                filteredIndictmentList.push({
                    propertyName: "CompanyId",
                    operator: 1,
                    value: filters?.CompanyTitle[0],
                });
            }

            if (filters.CompanyTitle.length > 1) {
                for (let i = 0; i < filters.CompanyTitle.length; i++) {
                    //اولی
                    if (i == fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "CompanyId",
                            operator: 1,
                            value: first,
                            operand: 1,
                            isOpenGroup: true,
                            isCloseGroup: false,
                        });
                    }

                    //آخری
                    if (i == filters.CompanyTitle.length - 1) {
                        filteredIndictmentList.push({
                            propertyName: "CompanyId",
                            operator: 1,
                            value: last,
                            operand: 0,
                            isOpenGroup: false,
                            isCloseGroup: true,
                        });
                    }

                    //منهای اخری
                    if (i !== filters.CompanyTitle.length - 1 && i !== fitrstIndex) {
                        filteredIndictmentList.push({
                            propertyName: "CompanyId",
                            operator: 1,
                            value: filters?.CompanyTitle[i],
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
        <div className="interviewers">
            {
                <Button
                    type="primary"
                    onClick={showCreateForbiddensHandler}
                    className="createModal"
                    icon={<PlusOutlined />}
                >
                    ایجاد شاخص
        </Button>
            }
            {

                (
                    <ConfigProvider direction="rtl">
                        <Table
                            columns={columns}
                            dataSource={forbiddenData}
                            pagination={false}
                            loading={forbiddenListLoading}
                            onChange={handleChange}
                            showSorterTooltip={{ title: "ترتیب افزایشی / کاهشی" }}
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
                                emptyText: "شاخص یافت نشد.",
                            }}
                        />

                        <ConfigProvider direction="rtl">
                            <Pagination
                                total={forbiddenListDetails?.TotalCount}
                                pageSize={pageModel.pageSize}
                                showSizeChanger={true}
                                showTotal={(total, range) => (
                                    <span>{` تعداد کل شاخص ها:   ${total} `}</span>
                                )}
                                current={current}
                                onChange={changePageHandler}
                                locale={{ items_per_page: "/ صفحه" }}
                            />
                        </ConfigProvider>
                        <Modal
                            title={addForm ? "ایجاد فرم شاخص " : "ویرایش فرم شاخص "}
                            visible={visible}
                            footer={null}
                            onOk={() => {
                                setVisible(false);
                                dispatch({ type: "CLAER_INTERVIEWR_PICTURE" });
                            }}
                            onCancel={() => {
                                dispatch({ type: "CLAER_INTERVIEWR_PICTURE" });
                                setVisible(false);
                            }}
                            width={1000}
                            centered
                        >
                            {visible && (
                                <CreateForbiddenInfo addForm={addForm} selectedForbiddenId={selectedForbiddenId}/>
                            )}
                        </Modal>
                    </ConfigProvider>
                )}
        </div>
    );
};

export default ForbiddenBaseInfo;
