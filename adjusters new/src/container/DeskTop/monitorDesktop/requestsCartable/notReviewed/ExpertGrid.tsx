import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Modal,
  Space,
  ConfigProvider,
  Input,
  Button,
  Alert,
  Radio
} from "antd";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import { Icon } from 'sanhab-components-library'
import DatePicker2 from "../../../../../components/UI/DatePicker/DatePicker";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { FindAccess } from "sanhab-components-library";
import Detail from "../../managmentCartable/detail/Detail";
import LegalDetail from "../../managmentCartable/legal/Detail";
import DetailBoardMember from "../../../adjustersDesktop/requests/detailRequest/DetailBoardMember";
import ChangeManagerReuestDetails from "../../../adjustersDesktop/requests/detailRequest/changeManagerRequest";
import BoardMemberBoss from "../../../adjustersDesktop/requests/detailRequest/boardMemberBoss";
import BoardMemberBossDeputy from "../../../adjustersDesktop/requests/detailRequest/boardMemberBossDeputy";
import DetailEstablishedBranches from "../../../adjustersDesktop/requests/detailRequest/DetailEstablishBranches";
import NewStockHolderDetails from "../../../adjustersDesktop/requests/detailRequest/newStockHolderDetails";
import CooperationEndDateDetails from "../../../adjustersDesktop/requests/detailRequest/cooperationEndDate";
import DetailEditStockHolder from "../../../adjustersDesktop/requests/detailRequest/editStockHolderDetails";
import DetailWorkLocation from "../../../adjustersDesktop/requests/detailRequest/DetailWorkLocation";
import DetailAddPerson from "../../../adjustersDesktop/requests/detailRequest/DetailAddPerson";
import DetailBranchManger from "../../../adjustersDesktop/requests/detailRequest/DetailBranchManager";
import DetailCapialIncrease from "../../../adjustersDesktop/requests/detailRequest/capitalDetails";
import DetailGeneral from "../../../adjustersDesktop/requests/detailRequest/DetailGeneral";
import ReActiveDetails from "../../../adjustersDesktop/requests/detailRequest/reActiveDetails";
import {
  fetchListRequestTypesForFilters,
  detailRequesById,
  fetchListExpertAwaitRequest,
} from "../../../../../redux/actions";
import { IListRequest } from "../../../../../shared/ulitities/Model/desktop/request";
import { userAccessList } from "../../../../../shared/ulitities/Enums/userAccessList";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg"; 

interface INotReviewProps {
  activeAwait?: string;
  activeReview?: any
}

const ExpertGrid: FC<INotReviewProps> = ({ activeAwait, activeReview }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [startCreationDate, setStartCreationDate] = useState<any>(null);
  const [endCreationDate, setEndCreationDate] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const [filterList, setFilterList] = useState<any>([]);
  const [dataIndex, setDataIndex] = useState("");
  const [showCartableDetails, setShowCartableDetails] = useState(false)
  const [customOrder, setCustomOrder] = useState<any>("ApplicantRequest.Id Desc");
  const [filterState, setFilterState] = useState<number>(7)
  const [selectedItemManagmentCartable, setSelectedItemManagmentCartable] = useState({} as any);
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [data, setData] = useState();

  const handleShowCartableDetailModal = (record: any) => {
    setShowCartableDetails(!showCartableDetails)
    setSelectedItemManagmentCartable(record)

  }

  const handleCancelModal = () => {
    setShowCartableDetails(false)
  }
  const {
    listExpertAwaitRequestGrid,
    loadingExpertAwaitRequestGrid,
    ApplicantRequestFilters,
  } = useSelector((state: any) => state.request);

  useEffect(() => {
    dispatch(fetchListRequestTypesForFilters());
  }, []);

  useEffect(() => {
    setData(
      listExpertAwaitRequestGrid?.Result?.map((request: IListRequest) => {
        return {
          ...request,
          key: request.Id,
          Expert: request?.Expert ? (request?.Expert?.Person?.FirstName + " " + request?.Expert?.Person?.LastName) : "-",
          Boss: request?.Boss ? (request?.Boss?.Person?.FirstName + " " + request?.Boss?.Person?.LastName) : "-",
          Response: request.Response ?? '-',
          ApplicantInfoCode: request.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
          Description: request.Description,
          FirstName: request.ApplicantPersonalInfo.Person.FirstName,
          FamilyName: request.ApplicantPersonalInfo.Person.FamilyName,
          NationalCodeOut: request.ApplicantPersonalInfo.Person.NationalCodeOut,
          CreationDate: moment(request.CreationDate.split("T")[0]).format(
            "jYYYY-jMM-jDD"
          ),
          AdjustmentCompanyInfoTitle:request?.ApplicantPersonalInfo?.Applicant?.AdjustmentCompanyInfoTitle??'-',
        };
      })
    );
  }, [listExpertAwaitRequestGrid]);

  useEffect(() => {

    if (activeReview) {
      let filterTypes: any = []


      filterTypes.push({
        propertyName: "RequestType",
        operator: 1,
        value: activeReview,
      })
      setFilterList(filterTypes)
    }
    else {
      
      setFilterList([])
    }

  }, [activeReview,customOrder,pageModel])

  
  useEffect(() => {
    let cartableReport = {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: customOrder,
      filters:filterList
        // filterList.length === 0
        //   ? [
        //     {
        //       operator: filterAdvanceOperator.Equal, 
        //       propertyName: "Status",
        //       value: 1,
        //     },
        //   ]
        //   : filterList,
    };

    if (activeAwait == "1") {
      if(filterList.length>0|| !activeReview ){
        dispatch(fetchListExpertAwaitRequest(cartableReport));
      }
    }
  }, [pageModel, activeAwait, filterList, dataIndex, customOrder]);


  const modelExpertGrid = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: "Id",
    filters:filterList
      // filterList.length === 0
      //   ? [
      //     {
      //       operator: filterAdvanceOperator.Equal,
      //       propertyName: "Status",
      //       value: 1,
      //     },
      //   ]
      //   : filterList,
  };


  let requestTypesFilter = ApplicantRequestFilters?.Result?.map(
    (requestType: { Value: number; Description: string }) => {
      let data = {
        key: requestType.Value,
        value: requestType.Value,
        text: requestType.Description,
      };
      return data;
    }
  );


  const detailHandler = (record: IListRequest) => {
    dispatch(detailRequesById(record.Id));
    setSelectedRequest(record);
    setVisible(true);
  };
  //از تاریخ موثر
  const handleStartCreationDate = (value: any) => {
    setStartCreationDate(value);
  };

  //تا تاریخ موثر
  const handleEndCreationDate = (value: any) => {
    setEndCreationDate(value);
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        {dataIndex === "CreationDate" ? (
          <div style={{ display: "flex", marginBottom: "5px" }}   >
            <DatePicker2
              placeholder="از تاریخ"
              value={startCreationDate}
              onChange={(value: any) => handleStartCreationDate(value)}
            />
            <DatePicker2
              placeholder="تا تاریخ"
              value={endCreationDate}
              onChange={(value: any) => handleEndCreationDate(value)}
            />
          </div>) :
           dataIndex === "FirstName" ||
           dataIndex === "FamilyName"||
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
               <Radio.Group onChange={(e:any)=>radioCahnge(e,clearFilters)} defaultValue={7}>
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
                    dataIndex === "NationalCodeOut" ? "کدملی":
                    dataIndex === "FirstName" ? "نام"

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
    if ((dataIndex = "CreationDate")) {
      filterList.push({
        propertyName: "CreationDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: moment(startCreationDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
      });
      filterList.push({
        propertyName: "CreationDate",
        operator: filterAdvanceOperator.LessOrEqual,
        value: moment(endCreationDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",

      });
    }
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    if (dataIndex === "CreationDate") {
      setFilterList([])
      setStartCreationDate(null)
      setEndCreationDate(null)
      setDataIndex("")
    }
    clearFilters();
    setSearchText("");
    setFilterState(7)
  };

  const radioCahnge = (e: any,clearFilters:any) => {

    setFilterState(e.target.value)
    setSearchText("");
    setDataIndex("")
    setStartCreationDate(null)
      setEndCreationDate(null)
    clearFilters();
 
}
  let customComponent = null;
  switch (selectedRequest?.RequestType) {
    case 4:
      customComponent = <DetailBoardMember
        selectedRequest={selectedRequest}
        modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)} />;
      break;
    case 6:
      customComponent = (
        <DetailEstablishedBranches selectedRequest={selectedRequest} modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 7:
      customComponent = (
        <DetailWorkLocation selectedRequest={selectedRequest} modelExpertGrid={modelExpertGrid}
          detailRequestGetWay={DetailRequestGetWay.Expert}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 5:
      customComponent = <DetailAddPerson selectedRequest={selectedRequest} />;
      break;
    case 9:
      customComponent = (
        <DetailBranchManger selectedRequest={selectedRequest}  modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 12:
      customComponent = (
        <ReActiveDetails selectedRequest={selectedRequest}  modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 13:
      customComponent = (
        <NewStockHolderDetails selectedRequest={selectedRequest}  modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 14:
      customComponent = (
        <DetailCapialIncrease selectedRequest={selectedRequest}  modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 18:
      customComponent = (
        <DetailEditStockHolder selectedRequest={selectedRequest}  modelExpertGrid={modelExpertGrid}
        detailRequestGetWay={DetailRequestGetWay.Expert}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 15:
      customComponent = (
        <ChangeManagerReuestDetails selectedRequest={selectedRequest} modelExpertGrid={modelExpertGrid}
          detailRequestGetWay={DetailRequestGetWay.Expert}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 16:
      customComponent = (
        <BoardMemberBoss selectedRequest={selectedRequest} modelExpertGrid={modelExpertGrid}
          detailRequestGetWay={DetailRequestGetWay.Expert}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 17:
      customComponent = (
        <BoardMemberBossDeputy selectedRequest={selectedRequest} modelExpertGrid={modelExpertGrid}
          detailRequestGetWay={DetailRequestGetWay.Expert}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 19:
      customComponent = (
        <CooperationEndDateDetails selectedRequest={selectedRequest} modelExpertGrid={modelExpertGrid}
          detailRequestGetWay={DetailRequestGetWay.Expert}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 3:
    case 1:
    case 8:
    case 2:
    case 10:
      customComponent = (
        <DetailGeneral
          selectedRequest={selectedRequest}
          modelExpertGrid={modelExpertGrid}
          detailRequestGetWay={DetailRequestGetWay.Expert}
          closeModal={() => setVisible(false)}
        />
      );
      break; 

    default:
      break;
  }

  // const onChange = (e: RadioChangeEvent, record: IListRequest) => {
  //   setSelectedRequest(record);
  //   setValue(e.target.value);
  //   const determinate = {
  //     id: record.Id,
  //     status: +e.target.value,
  //     response: record.Response,
  //   };
  //   dispatch(
  //     requestDeterminHandler(determinate, () => {
  //       dispatch(fetchListExpertAwaitRequest(modelExpertGrid));
  //     })
  //   );

  //   setData((prev: any) =>
  //     prev?.map((el: any) =>
  //       el.Id !== record.Id
  //         ? el
  //         : {
  //             ...el,
  //             Status: +e.target.value,
  //           }
  //     )
  //   );
  // };

  // const onChangeAll = (e: RadioChangeEvent) => {
  //   setData((prev: any) =>
  //     prev?.map((el: any) => ({
  //       ...el,
  //       Status: +e.target.value,
  //     }))
  //   );
  // };

  // const handleChangeResaon = (e: any, record: any) => {
  //   setData((prev: any) =>
  //     prev?.map((el: any) =>
  //       el.Id !== record
  //         ? el
  //         : {
  //             ...el,
  //             Response: e.target.value,
  //           }
  //     )
  //   );
  // };

  //coloumns Table
  let columns: any = [
    {
      render: (text: any, record: any) => (
        <Space size="middle">
          {FindAccess(userAccessList.Adjusters_ViewRequestDetail) && (
            <div className="detailColum2" onClick={() => detailHandler(record)}>
              <ArrowLeft />

            </div>
          )}

        </Space>
      ),
    },
    {
      render: (text: any, record: any) => (
        <Space size="middle">
          <div>
            <Icon
              iconType="user-tie"
              toolTip="جزئیات کارتابل"
              onClick={() => handleShowCartableDetailModal(record)}
            />
          </div>

        </Space>
      ),
    },
 

    {
      title: "نوع درخواست",
      dataIndex: "RequestTypeDescription",
      key: "RequestTypeDescription",
      width: "10%",
      filters: requestTypesFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "CreationDate",
      key: "CreationDate",
      width: "12%",
      ...getColumnSearchProps("CreationDate"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
      sorter: true
    },
    {
      title: "نام شرکت ",
      dataIndex: "AdjustmentCompanyInfoTitle",
      key: "AdjustmentCompanyInfoTitle",
      width: "9%",

    },
    {
      title: "نام ارزیاب/مدیرعامل",
      dataIndex: "FirstName",
      key: "FirstName",
      ...getColumnSearchProps("FirstName"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
      width: "14%",

    },
    {
      title: "نام خانوادگی ارزیاب/مدیرعامل",
      dataIndex: "FamilyName",
      key: "FamilyName",
      width: "13%",
      ...getColumnSearchProps("FamilyName"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "کدملی",
      dataIndex: "NationalCodeOut",
      key: "NationalCodeOut",
      width: "10%",
      ...getColumnSearchProps("NationalCodeOut"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },

    {
      title: "کد ارزیاب",
      dataIndex: "ApplicantInfoCode",
      key: "ApplicantInfoCode",
      width: "9%",

      ...getColumnSearchProps("ApplicantInfoCode"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    // {
    //   title: "نام کارشناس",
    //   dataIndex: "Expert",
    //   key: "Expert",
    //   width: "9%",

    // },
    // {
    //   title: "نام رئیس",
    //   dataIndex: "Boss",
    //   key: "Boss",
    //   width: "9%",

    // },
    {
      title: "دلیل تغییر رد",
      dataIndex: "Response",
      key: "Response",
      width: "9%",

    },
    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      width: "15%",

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
      setCustomOrder("ApplicantRequest.Id Desc");
    }
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

 
  return (
    <ConfigProvider direction="rtl">
  
      {FindAccess(userAccessList.Adjusters_DetermineRequest) ? (
        <Table 
      
          columns={columns}
          dataSource={data}
          loading={loadingExpertAwaitRequestGrid}
          onChange={handleChange}
          rowKey={(record) => record.Id}
          // scroll={{ x: 1450 }}
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
            emptyText: "درخواستی وجود ندارد.",
          }}
          pagination={{
            pageSize: pageModel.pageSize,
            total: listExpertAwaitRequestGrid?.TotalCount,
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
      ) : (
          <Alert
            type="warning"
            message=""
            description="شما به بخش بررسی نشده درخواست ها دسترسی ندارید."
          />
        )}
      <ConfigProvider direction="rtl">
        <Modal
          title={`جزئیات درخواست ${selectedRequest.RequestTypeDescription} `}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          width={1000}
          centered
          destroyOnClose={true}
        >
          {customComponent}
        </Modal>


        <Modal
          title={`جزئیات ارزیاب ${selectedItemManagmentCartable.FirstName +
            " " +
            selectedItemManagmentCartable.FamilyName
            } `}
          visible={showCartableDetails}
          footer={null}
          onCancel={handleCancelModal}
          width={1200}
          centered
          destroyOnClose={true}
          bodyStyle={{
            height: "500px",
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          {showCartableDetails && (
            selectedItemManagmentCartable?.ApplicantPersonalInfo?.Applicant?.Course?.CourseType?.Id === 2 ?
              <LegalDetail
                selectedItemManagmentCartable={selectedItemManagmentCartable}
                activeTab={"2"}
              /> :
              <Detail
                selectedItemManagmentCartable={selectedItemManagmentCartable}
                activeTab={"13"}
              />


          )}
        </Modal>
      </ConfigProvider>
    </ConfigProvider>
  );
};

export default ExpertGrid;
