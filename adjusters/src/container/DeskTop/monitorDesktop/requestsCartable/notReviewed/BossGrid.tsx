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
} from "antd";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import Detail from "../../managmentCartable/detail/Detail";
import LegalDetail from "../../managmentCartable/legal/Detail";
import { Icon } from 'sanhab-components-library'
import DatePicker2 from "../../../../../components/UI/DatePicker/DatePicker";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import ChangeManagerReuestDetails from "../../../adjustersDesktop/requests/detailRequest/changeManagerRequest";
import { FindAccess } from "sanhab-components-library";
import BoardMemberBoss from "../../../adjustersDesktop/requests/detailRequest/boardMemberBoss";
import BoardMemberBossDeputy from "../../../adjustersDesktop/requests/detailRequest/boardMemberBossDeputy";
import DetailBoardMember from "../../../adjustersDesktop/requests/detailRequest/DetailBoardMember";
import DetailEstablishedBranches from "../../../adjustersDesktop/requests/detailRequest/DetailEstablishBranches";
import DetailWorkLocation from "../../../adjustersDesktop/requests/detailRequest/DetailWorkLocation";
import DetailAddPerson from "../../../adjustersDesktop/requests/detailRequest/DetailAddPerson";
import DetailBranchManger from "../../../adjustersDesktop/requests/detailRequest/DetailBranchManager";
import NewStockHolderDetails from "../../../adjustersDesktop/requests/detailRequest/newStockHolderDetails";
import DetailEditStockHolder from "../../../adjustersDesktop/requests/detailRequest/editStockHolderDetails";
import DetailGeneral from "../../../adjustersDesktop/requests/detailRequest/DetailGeneral";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
import DetailCapialIncrease from "../../../adjustersDesktop/requests/detailRequest/capitalDetails";
import ReActiveDetails from "../../../adjustersDesktop/requests/detailRequest/reActiveDetails";
import {
  detailRequesById,
  fetchListBossAwaitRequest,
} from "../../../../../redux/actions";
import { IListRequest } from "../../../../../shared/ulitities/Model/desktop/request";
// import { IListRequest } from "../../../../../shared/ulitities/Enums/";
import { userAccessList } from "../../../../../shared/ulitities/Enums/userAccessList";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg";
interface INotReviewProps {
  activeAwait?: string;
  activeReview?: number
}

// const { TextArea } = Input;
const BossGrid: FC<INotReviewProps> = ({ activeAwait ,activeReview}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [startCreationDate, setStartCreationDate] = useState<any>(null);
  const [endCreationDate, setEndCreationDate] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const [dataIndex, setDataIndex] = useState("");
  const [filterList, setFilterList] = useState<any>([]);
  const [showCartableDetails, setShowCartableDetails] = useState(false)
  const [customOrder, setCustomOrder] = useState<any>(null);
  const [selectedItemManamentCartable, setSelectedItemManamentCartable] = useState({} as any);
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [data, setData] = useState();
  const handleShowCartableDetailModal = (record: any) => {
    setShowCartableDetails(!showCartableDetails)
    setSelectedItemManamentCartable(record)

  }
  const handleCancelModal = () => {
    setShowCartableDetails(false)
  }
  const {
    listBossAwaitRequestGrid,
    loadingBossAwaitRequestGrid,
    ApplicantRequestFilters,
  } = useSelector((state: any) => state.request);


  useEffect(() => {
    setData(
      listBossAwaitRequestGrid?.Result?.map((request: IListRequest) => {
        return {
          ...request,
          key: request.Id,
          Response: request.Response ?? "-",
          Expert: request?.Expert ? (request?.Expert?.Person?.FirstName + " " + request?.Expert?.Person?.LastName) : "-",
          Boss: request?.Boss ? (request?.Boss?.Person?.FirstName + " " + request?.Boss?.Person?.LastName) : "-",
          FirstName: request.ApplicantPersonalInfo?.Person?.FirstName,
          FamilyName: request.ApplicantPersonalInfo?.Person?.FamilyName,
          ApplicantInfoCode: request.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
          Description: request.Description,
          NationalCodeOut: request.ApplicantPersonalInfo?.Person?.NationalCode,
          CreationDate: moment(request.CreationDate.split("T")[0]).format(
            "jYYYY-jMM-jDD"
          ),
          AdjustmentCompanyInfoTitle:request?.ApplicantPersonalInfo?.Applicant?.AdjustmentCompanyInfoTitle??'-',
        };
      })
    );
  }, [listBossAwaitRequestGrid]);


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
    else{
    
      setFilterList([])
   
    }

  }, [activeReview,customOrder])
  const modelBossGrid = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: customOrder,
    filters: filterList,
  };

  useEffect(() => {
    if(filterList.length>0||!activeReview){
      activeAwait === "2" && dispatch(fetchListBossAwaitRequest(modelBossGrid));
    }
   
  }, [pageModel, activeAwait, filterList, dataIndex, customOrder]);

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
          </div>) : (
            <Input
              placeholder={`جستجو ${dataIndex === "RequestTypeId" ? "نوع درخواست" :
                dataIndex === "ApplicantInfoCode" ? "کد ارزیاب" :
                  dataIndex === "FirstName" ? "نام" :
                    dataIndex === "FamilyName" ? "نام خانوادگی" :
                      dataIndex === "NationalCodeOut" ? "کدملی"

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
            پاک کردن
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
  };

  let customComponent = null;
  switch (selectedRequest?.RequestType) {
    case 4:
      customComponent = <DetailBoardMember
        selectedRequest={selectedRequest}
        modelExpertGrid={modelBossGrid}
        detailRequestGetWay={DetailRequestGetWay.Boss}
        closeModal={() => setVisible(false)} />;
      break;
      case 6:
      customComponent = (
        <DetailEstablishedBranches selectedRequest={selectedRequest} modelExpertGrid={modelBossGrid}
        detailRequestGetWay={DetailRequestGetWay.Boss}
        closeModal={() => setVisible(false)}/>
      );
      break;
    case 7:
      customComponent = (
        <DetailWorkLocation selectedRequest={selectedRequest} modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 5:
      customComponent = <DetailAddPerson selectedRequest={selectedRequest} />;
      break;
      case 9:
        customComponent = (
          <DetailBranchManger selectedRequest={selectedRequest}  modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)}/>
        );
        break;
      case 12:
        customComponent = (
          <ReActiveDetails selectedRequest={selectedRequest}  modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)}/>
        );
        break;
      case 13:
        customComponent = (
          <NewStockHolderDetails selectedRequest={selectedRequest}  modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)}/>
        );
        break;
        case 14:
          customComponent = (
            <DetailCapialIncrease selectedRequest={selectedRequest}  modelExpertGrid={modelBossGrid}
            detailRequestGetWay={DetailRequestGetWay.Boss}
            closeModal={() => setVisible(false)}/>
          );
          break;
        case 18:
          customComponent = (
            <DetailEditStockHolder selectedRequest={selectedRequest}  modelExpertGrid={modelBossGrid}
            detailRequestGetWay={DetailRequestGetWay.Boss}
            closeModal={() => setVisible(false)}/>
          );
          break;
    case 15:
      customComponent = (
        <ChangeManagerReuestDetails selectedRequest={selectedRequest} modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
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
          modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)}
        />
      );
      break;
    case 16:
      customComponent = (
        <BoardMemberBoss selectedRequest={selectedRequest} modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 17:
      customComponent = (
        <BoardMemberBossDeputy selectedRequest={selectedRequest} modelExpertGrid={modelBossGrid}
          detailRequestGetWay={DetailRequestGetWay.Boss}
          closeModal={() => setVisible(false)} />
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
      width: "9%",
      ...getColumnSearchProps("CreationDate"),
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
      width: "9%",

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
    },
    {
      title: "کد ارزیاب",
      dataIndex: "ApplicantInfoCode",
      key: "ApplicantInfoCode",
      width: "9%",
      ...getColumnSearchProps("ApplicantInfoCode"),

    },
    {
      title: "نام کارشناس",
      dataIndex: "Expert",
      key: "Expert",
      width: "9%",

    },
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
    // {
    //   /* title: (
    //     <Radio.Group onChange={(e) => onChangeAll(e)}>
    //       <Radio value={3}>تایید</Radio>
    //       <Radio value={2}>رد</Radio>
    //     </Radio.Group>
    //   ), */
    //   title: "عملیات",
    //   render: (text: any, record: any) => {
    //     return (
    //       <div style={{ display: "flex" }}>
    //         <Radio.Group
    //           onChange={(e) => onChange(e, record)}
    //           value={record.Status}
    //           style={{ width: "19%" }}
    //         >
    //           <Radio value={3}>تایید</Radio>
    //           <Radio value={2}>رد</Radio>
    //         </Radio.Group>
    //         {/*  {(value === 2 && record.Id === selectedRequest.Id) ||
    //         (value === 3 && record.Id === selectedRequest.Id) ? ( */}
    //         <TextArea
    //           autoSize
    //           allowClear
    //           onChange={(e) => handleChangeResaon(e, record.Id)}
    //           // style={{width:'50px',height:"32px"}}
    //           className="textArea"
    //         />
    //         {/*  ) : null} */}
    //       </div>
    //     );
    //   },
    // },
    {
      render: (text: any, record: any) => (
        <Space size="middle">
          {FindAccess(userAccessList.Adjusters_ViewRequestDetail) && (
            <div className="detailColum" onClick={() => detailHandler(record)}>
              <ArrowLeft />
            </div>
          )}
        </Space>
      ),
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
    if (filters.ApplicantInfoCode != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.AdjusterCode",
        operator: 7,
        value: filters?.ApplicantInfoCode[0],
      });
    }

    if (filters.FirstName != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.FirstName",
        operator: 7,
        value: filters?.FirstName[0],
      });
    }
    if (filters.NationalCodeOut != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.NationalCode",
        operator: 1,
        value: filters?.NationalCodeOut[0],
      });
    }
    if (filters.FamilyName != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.FamilyName",
        operator: 7,
        value: filters?.FamilyName[0],
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
              operand: 1,
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
    <div>
      {FindAccess(userAccessList.Adjusters_DetermineRequest) ? (
        <Table
          columns={columns}
          dataSource={data}
          loading={loadingBossAwaitRequestGrid}
          onChange={handleChange}
          rowKey={(record) => record.Id}
          scroll={{ x: 1450 }}
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
            total: listBossAwaitRequestGrid?.TotalCount,
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
          title={`جزئیات ارزیاب ${selectedItemManamentCartable.FirstName +
            " " +
            selectedItemManamentCartable.FamilyName
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
            selectedItemManamentCartable?.ApplicantPersonalInfo?.Applicant?.Course?.CourseType?.Id === 2 ?
              <LegalDetail
                selectedItemManagmentCartable={selectedItemManamentCartable}
                activeTab={"2"}
              /> :
              <Detail
                selectedItemManagmentCartable={selectedItemManamentCartable}
                activeTab={"13"}
              />
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default BossGrid;
