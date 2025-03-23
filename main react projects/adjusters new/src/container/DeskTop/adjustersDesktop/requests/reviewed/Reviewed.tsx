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
import Highlighter from "react-highlight-words";
import moment from "jalali-moment";
import { FindAccess } from "sanhab-components-library";
import DetailBoardMember from "../../requests/detailRequest/DetailBoardMember";
import DetailEstablishedBranches from "../../requests/detailRequest/DetailEstablishBranches";
import DetailWorkLocation from "../detailRequest/DetailWorkLocation";
import DetailAddPerson from "../detailRequest/DetailAddPerson";
import DetailBranchManger from "../detailRequest/DetailBranchManager";
import DetailGeneral from "../detailRequest/DetailGeneral";
import DetailCeo from "../detailRequest/DetailCeo";
// import DlDocuments from "../detailRequest/DlDocuments";
import {
  fetchListRequestTypes,
  detailRequesById,
  getBaseInfo,
  fetchListMyRequest,
} from "../../../../../redux/actions";
import { IListRequest } from "../../../../../shared/ulitities/Model/desktop/request";
import { userAccessList } from "../../../../../shared/ulitities/Enums/userAccessList";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg";
import { SET_LIST_REQUEST } from "../../../../../constant/desktop";

interface IReviewProps {
  activeReview?: string;
}

const Reviewed: FC<IReviewProps> = ({ activeReview }) => {
  const dispatch = useDispatch();
  //let userIdRecognition =Number(localStorage.getItem("userRecognition"));
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const [filterList, setFilterList] = useState<any>([]);
  const [pageModel, setPageModel] = useState({
    pageSize: 15,
    pageIndex: 1,
  });
  const lisRequestType = useSelector(
    (state: any) => state.request.listRequestType?.Result
  );
  const { listMyRequestGrid, loadingMylistRequestGrid } = useSelector(
    (state: any) => state.request
  );

  let findRequestItem = lisRequestType?.find(
    (request: any) => request.Description === selectedRequest.RequestType
  );

  let data = listMyRequestGrid?.Result?.map((request: IListRequest) => {
    let obj = {
      Id: request.Id,
      key: request.Id,
      RequestType: request.RequestTypeDescription,
      Description: request.Description,
      Response: request.Response,
      StatusDescription: request.StatusDescription,
      AdjusterCode:request.ApplicantPersonalInfo.Applicant.AdjusterCode,
      CreationDate: moment(request.CreationDate.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
    };
    return obj;
  });

  let page = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: "Id",
    filters:
      filterList.length === 0
        ? [
            {
              operator: filterAdvanceOperator.NotEqual,
              propertyName: "EvaluationStatus",
              value: 0,
            },
          ]
        : filterList,
  };

  useEffect(() => {
    activeReview === "1" && dispatch(fetchListMyRequest(page));
    dispatch({ type: SET_LIST_REQUEST, payload: page });
  }, [pageModel, activeReview, filterList]);

  useEffect(() => {
    dispatch(fetchListRequestTypes());
  }, []);

  let requestTypesFilter = lisRequestType?.map(
    (requestType: { Value: number; Description: string }) => {
      let data = {
        key: requestType.Value,
        value: requestType.Value,
        text: requestType.Description,
      };
      return data;
    }
  );

  //جزئیات درخواست
  const detailHandler = (record: any) => {
    dispatch(detailRequesById(record.Id));
    setSelectedRequest(record);
    setVisible(true);
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`جستجو ${
            dataIndex === "RequestTypeId" ? "نوع درخواست" : null
          }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
           باز نشانی
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
    setSearchedColumn(dataIndex);
    setSearchText(selectedKeys[0]);
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  let customComponent = null;
  switch (findRequestItem?.Value) {
    case 4:
      customComponent = <DetailBoardMember selectedRequest={selectedRequest} />;
      break;
    case 6:
      customComponent = (
        <DetailEstablishedBranches selectedRequest={selectedRequest} />
      );
      break;
    case 7:
      customComponent = (
        <DetailWorkLocation selectedRequest={selectedRequest} />
      );
      break;
    case 5:
      customComponent = <DetailAddPerson selectedRequest={selectedRequest} />;
      break;
    case 9:
      customComponent = (
        <DetailBranchManger selectedRequest={selectedRequest} />
      );
      break;
    case 15:
      customComponent = <DetailCeo selectedRequest={selectedRequest} />;
      break;
    case 3:
    case 1:
    case 8:
    case 2:
    case 10:
      customComponent = <DetailGeneral selectedRequest={selectedRequest} />;
      break;

    default:
      break;
  }

  //coloumns Table
  let columns: any = [
    {
      title: "نوع درخواست",
      dataIndex: "RequestType",
      key: "RequestType",
      width: "15%",
      filters: requestTypesFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "کد ارزیابی",
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      width: "10%",
      //...getColumnSearchProps("AdjusterCode")
      
    },

    {
      title: "تاریخ ثبت",
      dataIndex: "CreationDate",
      key: "CreationDate",
      width: "12%",
    },
    {
      title: "دلیل رد یا تایید",
      dataIndex: "Response",
      key: "Response",
      width: "14%",
    },
    {
      title: "وضعیت",
      dataIndex: "StatusDescription",
      key: "StatusDescription",
      width: "14%",
    },

    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      width: "50%",
    },
    /*  {
      title: "مستندات",
      render: (text: any, record: any) => (
        <a className="action">
          <Attachment onClick={() => attachmentHandler(record)} />
        </a>
      ),
    }, */
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

  useEffect(() => {
    dispatch(getBaseInfo());
  }, []);
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [
      {
        operator: filterAdvanceOperator.NotEqual,
        propertyName: "EvaluationStatus",
        value: 0,
      },
    ] as any;

/* 
    if (filters.AdjusterCode != null) {
      filteredIndictmentList.push({
        propertyName: "AdjusterCode",
        operator: filterAdvanceOperator.Like,
        value: filters?.AdjusterCode[0],
      });
    } */
    if (filters.RequestType != null) {
      let first = [...filters.RequestType].shift();
      let last = [...filters.RequestType].pop();
      let fitrstIndex = filters.RequestType.indexOf(first);
      let lastIndex = filters.RequestType.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "RequestType",
          operator: 1,
          value: filters?.RequestType[0],
        });
      }

      if (filters.RequestType.length > 1) {
        for (let i = 0; i < filters.RequestType.length; i++) {
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
          if (i == filters.RequestType.length - 1) {
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
          if (i !== filters.RequestType.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "RequestType",
              operator: 1,
              value: filters?.RequestType[i],
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
        dataSource={data}
        loading={loadingMylistRequestGrid}
        onChange={handleChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: listMyRequestGrid?.TotalCount,
          showSizeChanger: true,
          showTotal: (total) => `تعداد کل : ${total} `,
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
          title={`جزئیات درخواست ${selectedRequest.RequestType} `}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          width={1000}
          centered
          destroyOnClose={true}
          // bodyStyle={{height:"600px"}}
        >
          {customComponent}
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Reviewed;
