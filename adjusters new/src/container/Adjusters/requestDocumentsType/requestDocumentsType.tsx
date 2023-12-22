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
import CreateRequestDocType from "./createRequestDocType";
import { useDeletInterviewer } from "../AdjustersHook";
import { fetchRequestDocTypes,deleteRequestTypes } from "../../../redux/actions";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
import { IRequestDocType } from "../../../shared/ulitities/Model/interviewers";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

const RequestDocumentsType = () => {
    const dispatch = useDispatch();
    const [removeInterviewer] = useDeletInterviewer();
    const [addForm, setAddForm] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [visible, setVisible] = useState(false);
    const [customOrder, setCustomOrder] = useState<any>(null);
    const [pageModel, setPageModel] = useState({
        pageSize: 5,
        pageIndex: 1,
    });
    const [searchText, setSearchText] = useState("");
    const [customSort, setCustomSort] = useState({} as any);
    const [searchedColumn, setSearchedColumn] = useState("");
    const [selectedRequestTypeId,setSelectedRequestTypeId]=useState<any>()
    const [filterList, setFilterList] = useState<any>([]);
    const searchInput = useRef<any>(null);
    //const showPic = useSelector((state: any) => state.interviewerPicture.image);
    const { baseInfo } = useSelector((state: any) => state.baseData);
    const specializedField = useSelector(
        (state: any) => state?.specializedField?.specializedField
    );

    let adjustmentField = {
        isActive: null, 
    };

    const { requestDocumetsTypeList, loading, requestTypeDoc ,deleteRequestTypeDoc} = useSelector((state: any) => state.requestDocumentsType)

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
                    placeholder={`جستجو ${dataIndex === "DocumentTitle"
                        ? "عنوان مستند"
                        : dataIndex === "RequestType"
                            ? "نوع درخواست":
                            dataIndex === "AdjusterType" ? "نوع ارزیاب"

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



    //api Request 
    useEffect(() => {
        const advancedSearchModel = {
            firstPageSize: pageModel.pageSize,
            pageSize: pageModel.pageSize,
            pageIndex: pageModel.pageIndex,
            orderBy: customOrder,
            filters: filterList,
        };
        dispatch(fetchRequestDocTypes(advancedSearchModel))
    }, [filterList, requestTypeDoc,deleteRequestTypeDoc,customOrder])


    // all Interviewer
    let requestDocTypes = requestDocumetsTypeList?.Result?.map(
        (requestDoc: IRequestDocType) => {
            let requests = {
                key: requestDoc.Id,
                id: requestDoc.Id,
                DocumentTitle: requestDoc.DocumentTitle,
                AdjusterType: requestDoc.AdjusterType == "1" ? ("حقیقی") : requestDoc.AdjusterType == "2" ? ("حقوقی") : ("دادگستری"),
                IsRequired: requestDoc.IsRequired ? ("بله") : ("خیر"),
                RequestTypeDescription: requestDoc.RequestTypeDescription ?? "-",

            };
            return requests;
        }
    );


    //edit request type doc
    const editRequestTypeDocHandler = (id: number) => {
        setAddForm(false);
        setVisible(true);
        setSelectedRequestTypeId(id)
    };

    //remove request type doc
    const removeRequestTypeDeocHandler = (id: number) => {
        dispatch(deleteRequestTypes(id))
      
        
    };

    //coloumns Table
    let columns: any = [

        {
            title: "نوع ارزیاب",
            dataIndex: "AdjusterType",
            key: "AdjusterType",
            sorter: false,
        //     filterSearch: true,
        //     filters: [
        //         {
        //             key: 1,
        //             text: "حقیقی",
        //             value: 1
        //         },
        //         {
        //             key: 2,
        //             text: "حقوقی",
        //             value: 2
        //         },
        //         {
        //             key: 3,
        //             text: "دادگستری",
        //             value: 3
        //         },
        //     ],
        //     filterIcon: (filters: any) => (
        //         <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
        //     ),
        },

        {
            title: "عنوان مستند",
            dataIndex: "DocumentTitle",
            key: "DocumentTitle",
            sorter: true,
            // sortDirections: ["descend", "ascend"],
            filterSearch: true,

            ...getColumnSearchProps("DocumentTitle"),
            filterIcon: (filters: any) => (
                <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            ),
        },
        {
            title: "نوع درخواست",
            dataIndex: "RequestTypeDescription",
            key: "RequestTypeDescription",
            sorter: false,

            // ...getColumnSearchProps("RequestTypeDescription"),
        },

        {
            title: "اجباری بودن",
            dataIndex: "IsRequired",
            key: "IsRequired",
            filterMode: "menu",

            // filterIcon: (filters: any) => (
            //     <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
            // ),
        },

        {
            title:
                FindAccess(userAccessList.Adjusters_EditInterviewer) &&
                    FindAccess(userAccessList.Adjusters_DeleteInterviewer)
                    ? "عملیات"
                    : "",
            /*  width: "8%", */
            render: (text: any, record: any) => (
                <Space size="middle">
                    <div className="operations">
                        {FindAccess(userAccessList.Adjusters_EditInterviewer) && (
                            <Tooltip title="ویرایش" placement="topLeft">
                                <a
                                    onClick={() => editRequestTypeDocHandler(record.id)}
                                    className="action"
                                >
                                    <Edit />
                                </a>
                            </Tooltip>
                        )}
                        {
                            // requestDocTypes.length >= 1 &&
                            FindAccess(userAccessList.Adjusters_DeleteInterviewer) && (
                                <ConfigProvider direction="rtl">
                                    <Popconfirm
                                        title="از حذف گزینه مورد نظر مطمئن هستید؟"
                                        onConfirm={() => removeRequestTypeDeocHandler(record.id)}
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
                            )}
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

    //show Modal Interviewers
    const showCreateInterviewersHandler = () => {
        setAddForm(true);
        setVisible(true);
    };

  

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setCustomSort(sorter);

        if (sorter.field == "DocumentTitle") {
          if (sorter.order == "ascend") {
            setCustomOrder("DocumentTitle");
          }
          if (sorter.order == "descend" && sorter.order !== "ascend" ) {
            setCustomOrder("Id");
          }
        } else {
          setCustomOrder("Id");
        }

        let filteredIndictmentList = [] as any;

        if (filters.DocumentTitle != null) {
            filteredIndictmentList.push({
                propertyName: "DocumentTitle",
                operator: 1,
                value: filters?.DocumentTitle[0],
            });
        }


        /**
         *
         * فیلتر ارزیاب
         */
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
                    if (i !== filters.AdjusterType.length - 1 && i !== fitrstIndex) {
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

    return (
        <div className="interviewers">
            {FindAccess(userAccessList.Adjusters_CreateInterviewer) && (
                <Button
                    type="primary"
                    onClick={showCreateInterviewersHandler}
                    className="createModal"
                    icon={<PlusOutlined />}
                >
                    ایجاد نوع مستندات درخواست
                </Button>
            )}
            {FindAccess(userAccessList.Adjusters_ViewInterviwers) ? (
                <ConfigProvider direction="rtl">
                    <Table
                        columns={columns}
                        dataSource={requestDocTypes}
                        loading={loading}
                        onChange={handleChange}
                        showSorterTooltip={{ title: "ترتیب افزایشی / کاهشی" }}
                        pagination={{
                            pageSize: pageModel.pageSize,
                            total: requestDocumetsTypeList?.TotalCount,
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
                            emptyText: "  نوع مستند درخواست یافت نشد.",
                        }}
                    />

               
                    <Modal
                        title={addForm ? "ایجاد نوع درخواست مستندات " : "ویرایش نوع درخواست مستندات "}
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
                        width={600}
                        centered
                    >
                        {visible && (
                            <CreateRequestDocType
                            
                                requestDocumetsTypeList={requestDocumetsTypeList}
                                addForm={addForm}
                                selectedRequestTypeId={selectedRequestTypeId}
                                closeModal={() => {
                                    setVisible(false);
                                    dispatch({ type: "CLAER_INTERVIEWR_PICTURE" });
                                }}
                            />

                        )}
                    </Modal>
                </ConfigProvider>
            ) : (
                    <Alert
                        type="warning"
                        message=""
                        description="شما به مشاهده مصاحبه کننده ها دسترسی ندارید."
                    />
                )}
        </div>
    );
};

export default RequestDocumentsType;
