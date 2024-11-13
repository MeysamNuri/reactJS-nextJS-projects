import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Space,
  ConfigProvider,
  Modal,
  Button,
  Input,
  Radio
} from "antd";
import moment from "jalali-moment";
import { Icon } from 'sanhab-components-library'
import Detail from "../../managmentCartable/detail/Detail";
import LegalDetail from "../../managmentCartable/legal/Detail";
import BoardMemberBoss from "../../../adjustersDesktop/requests/detailRequest/boardMemberBoss";
import BoardMemberBossDeputy from "../../../adjustersDesktop/requests/detailRequest/boardMemberBossDeputy";
import ChangeManagerReuestDetails from "../../../adjustersDesktop/requests/detailRequest/changeManagerRequest";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import Highlighter from "react-highlight-words";
import DetailBoardMember from "../../../adjustersDesktop/requests/detailRequest/DetailBoardMember";
import DatePicker2 from "../../../../../components/UI/DatePicker/DatePicker";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import DetailGeneral from "../../../adjustersDesktop/requests/detailRequest/DetailGeneral";
import { IListRequest } from "../../../../../shared/ulitities/Model/desktop/request";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
import DetailEstablishedBranches from "../../../adjustersDesktop/requests/detailRequest/DetailEstablishBranches";
import DetailWorkLocation from "../../../adjustersDesktop/requests/detailRequest/DetailWorkLocation";
import DetailEditStockHolder from "../../../adjustersDesktop/requests/detailRequest/editStockHolderDetails";
import DetailAddPerson from "../../../adjustersDesktop/requests/detailRequest/DetailAddPerson";
import CooperationEndDateDetails from "../../../adjustersDesktop/requests/detailRequest/cooperationEndDate";
import DetailBranchManger from "../../../adjustersDesktop/requests/detailRequest/DetailBranchManager";
import NewStockHolderDetails from "../../../adjustersDesktop/requests/detailRequest/newStockHolderDetails";
import DetailCapialIncrease from "../../../adjustersDesktop/requests/detailRequest/capitalDetails";
import ReActiveDetails from "../../../adjustersDesktop/requests/detailRequest/reActiveDetails";
import {
  fetchListRequest,
  detailRequesById,
  fetchListApplicantRequestStatus
} from "../../../../../redux/actions";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg";

interface IReviewrops {
  activeReview?: number
}
const AllView: FC<IReviewrops> = ({ activeReview }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [startCreationDate, setStartCreationDate] = useState<any>(null);
  const [endCreationDate, setEndCreationDate] = useState<any>(null);
  const [showCartableDetails, setShowCartableDetails] = useState(false)
  const [customOrder, setCustomOrder] = useState<any>("ApplicantRequest.Id Desc");
  const [filterState, setFilterState] = useState<number>(7)
  const [selectedItemManamentCartable, setSelectedItemManamentCartable] = useState({} as any);
  const [dataIndex, setDataIndex] = useState("");
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });
  const {
    listRequestGrid,
    loadinglistRequestGrid,
    ApplicantRequestFilters,
    applicantRequestStatus
  } = useSelector((state: any) => state.request);
  const [filterList, setFilterList] = useState<any>([]);
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchListApplicantRequestStatus())
  }, [])

  let data = listRequestGrid?.Result?.map((request: IListRequest) => {
    let obj = {
      ...request,
      Id: request.Id,
      key: request.Id,
      Expert: request?.Expert ? (request?.Expert?.Person?.FirstName + " " + request?.Expert?.Person?.LastName) : "-",
      Boss: request?.Boss ? (request?.Boss?.Person?.FirstName + " " + request?.Boss?.Person?.LastName) : "-",
      RequestType: request.RequestType,
      RequestTypeDescription: request.RequestTypeDescription,
      ApplicantInfoCode: request.ApplicantPersonalInfo?.Applicant?.AdjusterCode,
      Description: request.Description,
      Response: request.Response ?? "-",
      Status: request.Status,
      StatusDescription: request.StatusDescription,
      CreationDate: moment(request.CreationDate.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
      FirstName: request.ApplicantPersonalInfo.Person.FirstName,
      FamilyName: request.ApplicantPersonalInfo.Person.FamilyName,
      NationalCodeOut: request.ApplicantPersonalInfo.Person.NationalCodeOut,
      AdjustmentCompanyInfoTitle:request?.ApplicantPersonalInfo?.Applicant?.AdjustmentCompanyInfoTitle??'-',
    };
    return obj;
  });

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
  let applicantRequestStatusFilter = applicantRequestStatus?.Result?.map(
    (requestType: { Value: number; Description: string }) => {
      let data = {
        key: requestType.Value,
        value: requestType.Value,
        text: requestType.Description,
      };
      return data;
    }
  );

  const handleShowCartableDetailModal = (record: any) => {
    setShowCartableDetails(!showCartableDetails)
    setSelectedItemManamentCartable(record)


  }
  const handleCancelModal = () => {
    setShowCartableDetails(false)
  }
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
    let page = {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: customOrder,
      filters: filterList,
    };
    if(filterList.length>0||!activeReview){
      dispatch(fetchListRequest(page));
    }
 
  }, [pageModel, filterList, dataIndex, customOrder]);

  //جزئیات درخواست
  const detailHandler = (record: any) => {
    dispatch(detailRequesById(record.Id));
    setSelectedRequest(record);
    setVisible(true);
  };
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
                  dataIndex === "FirstName" ? "نام" :
                    dataIndex === "FamilyName" ? "نام خانوادگی" :
                      dataIndex === "NationalCodeOut" ? "کدملی" :
                        dataIndex === "StatusDescription" ? "وضعیت"

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
  //coloumns Table
  let columns: any = [
    {
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="detailColum2" onClick={() => detailHandler(record)}>
            <ArrowLeft />
          </div>
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
      sorter: true
    },

    {
      title: "نام شرکت ",
      dataIndex: "AdjustmentCompanyInfoTitle",
      key: "AdjustmentCompanyInfoTitle",
      width: "10%",

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
      width: "9%",
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
    {
      title: "نام رئیس",
      dataIndex: "Boss",
      key: "Boss",
      width: "9%",

    },
    {
      title: "وضعیت",
      dataIndex: "StatusDescription",
      key: "StatusDescription",
      width: "8%",
      filters: applicantRequestStatusFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
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

  let customComponent = null;
  switch (selectedRequest?.RequestType) {
    case 4:
      customComponent = <DetailBoardMember
        selectedRequest={selectedRequest}
        detailRequestGetWay={DetailRequestGetWay.all}
        closeModal={() => setVisible(false)} />;
      break;
    case 6:
      customComponent = (
        <DetailEstablishedBranches selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 7:
      customComponent = (
        <DetailWorkLocation selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 5:
      customComponent = <DetailAddPerson selectedRequest={selectedRequest} />;
      break;
      case 9:
        customComponent = (
          <DetailBranchManger selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)}/>
        );
        break;
      case 12:
        customComponent = (
          <ReActiveDetails selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)}/>
        );
        break;
    case 13:
      customComponent = (
        <NewStockHolderDetails selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
      case 14:
        customComponent = (
          <DetailCapialIncrease selectedRequest={selectedRequest} 
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)}/>
        );
        break;
    case 18:
      customComponent = (
        <DetailEditStockHolder selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 15:
      customComponent = (
        <ChangeManagerReuestDetails selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
      case 19:
        customComponent = (
          <CooperationEndDateDetails selectedRequest={selectedRequest} 
          detailRequestGetWay={DetailRequestGetWay.all}
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
          detailRequestGetWay={DetailRequestGetWay.all}
        />
      );
      break;
    case 16:
      customComponent = (
        <BoardMemberBoss selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
    case 17:
      customComponent = (
        <BoardMemberBossDeputy selectedRequest={selectedRequest}
          detailRequestGetWay={DetailRequestGetWay.all}
          closeModal={() => setVisible(false)} />
      );
      break;
    default:
      break;
  }

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
    if (filters.ApplicantInfoCode != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.AdjusterCode",
        operator: filterState,
        value: filters?.ApplicantInfoCode[0],
      });
    }

    if (filters.FirstName != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.FirstName",
        operator: filterState,
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
        operator: filterState,
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
    if (filters.StatusDescription != null) {
      let first = [...filters.StatusDescription].shift();
      let last = [...filters.StatusDescription].pop();
      let fitrstIndex = filters.StatusDescription.indexOf(first);
      let lastIndex = filters.StatusDescription.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "Status",
          operator: 1,
          value: filters?.StatusDescription[0],
        });
      }

      if (filters.StatusDescription.length > 1) {
        for (let i = 0; i < filters.StatusDescription.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "Status",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.StatusDescription.length - 1) {
            filteredIndictmentList.push({
              propertyName: "Status",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (
            i !== filters.StatusDescription.length - 1 &&
            i !== fitrstIndex
          ) {
            filteredIndictmentList.push({
              propertyName: "Status",
              operator: 1,
              value: filters?.StatusDescription[i],
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
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loadinglistRequestGrid}
        onChange={handleChange}
        // scroll={{ x: 1550 }}
        pagination={{
          pageSize: pageModel.pageSize,
          total: listRequestGrid.TotalCount,
          showTotal: (total) => `تعداد کل : ${total} `,
          showSizeChanger: true,
          onChange: (current: any, pageSize: any) =>
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
          emptyText: "درخواستی وجود ندارد.",
        }}
      />
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
      </ConfigProvider>
      <ConfigProvider direction="rtl">
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
    </>
  );
};

export default AllView;
