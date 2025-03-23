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
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { FindAccess } from "sanhab-components-library";
import DetailBoardMember from "../../requests/detailRequest/DetailBoardMember";
import DetailEstablishedBranches from "../../requests/detailRequest/DetailEstablishBranches";
import DetailWorkLocation from "../detailRequest/DetailWorkLocation";
import DetailAddPerson from "../detailRequest/DetailAddPerson";
import DetailBranchManger from "../detailRequest/DetailBranchManager";
import DetailGeneral from "../detailRequest/DetailGeneral";
import {
  // fetchListRequest,
  detailRequesById,
  fetchListMyRequest,
} from "../../../../../redux/actions";
import { IListRequest } from "../../../../../shared/ulitities/Model/desktop/request";
import { userAccessList } from "../../../../../shared/ulitities/Enums/userAccessList";
import { filterAdvanceOperator } from "../../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg";
interface INotReviewProps {
  activeReview?: string;
}

const NotReviewed: FC<INotReviewProps> = ({ activeReview }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  // const [value, setValue] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const [filterList, setFilterList] = useState<any>([]);
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  const [data, setData] = useState();

  const {
    listMyRequestGrid,
    loadingMylistRequestGrid,
    listRequestType,
  } = useSelector((state: any) => state.request);

  useEffect(() => {
    setData(
      listMyRequestGrid?.Result?.map((request: IListRequest) => {
        return {
          ...request,
          key: request.Id,
          Response: request.Response,
          Description: request.Description,
          AdjusterCode:request.ApplicantPersonalInfo.Applicant.AdjusterCode,
          CreationDate: moment(request.CreationDate.split("T")[0]).format(
            "jYYYY-jMM-jDD"
          ),
        };
      })
    );
  }, [listMyRequestGrid]);

  const page = {
    firstPageSize: pageModel.pageSize,
    pageSize: pageModel.pageSize,
    pageIndex: pageModel.pageIndex,
    orderBy: "Id",
    filters:
      filterList.length === 0
        ? [
            {
              operator: filterAdvanceOperator.Equal,
              propertyName: "EvaluationStatus",
              value: 0,
            },
          ]
        : filterList,
  };

  useEffect(() => {
    activeReview === "2" && dispatch(fetchListMyRequest(page));
  }, [pageModel, activeReview, filterList]);

  let requestTypesFilter = listRequestType?.Result?.map(
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
  switch (selectedRequest?.RequestType) {
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
  //       dispatch(fetchListRequest(page));
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
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      // width: "70%",
    },
    {
      /* title: (
        <Radio.Group onChange={(e) => onChangeAll(e)}>
          <Radio value={3}>تایید</Radio>
          <Radio value={2}>رد</Radio>
        </Radio.Group>
      ), */
      // title: "عملیات",
      // render: (text: any, record: any) => {
      //   return (
      //     <div style={{ display: "flex" }}>
      //       <Radio.Group
      //         onChange={(e) => onChange(e, record)}
      //         value={record.Status}
      //         style={{ width: "19%" }}
      //       >
      //         <Radio value={3}>تایید</Radio>
      //         <Radio value={2}>رد</Radio>
      //       </Radio.Group>
      //       <TextArea
      //         autoSize
      //         allowClear
      //         onChange={(e) => handleChangeResaon(e, record.Id)}
      //         // style={{width:'50px',height:"32px"}}
      //         className="textArea"
      //       />
      //     </div>
      //   );
      // },
    },
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
    let filteredIndictmentList = [
      {
        operator: filterAdvanceOperator.Equal,
        propertyName: "EvaluationStatus",
        value: 0,
      },
    ] as any;
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
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loadingMylistRequestGrid}
        onChange={handleChange}
        rowKey={(record) => record.Id}
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
          total: listMyRequestGrid?.TotalCount,
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
    </div>
  );
};

export default NotReviewed;
