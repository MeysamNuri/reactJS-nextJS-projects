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
  Radio,
  Tabs,
} from "antd";
import type { RadioChangeEvent } from "antd";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { FindAccess } from "sanhab-components-library";
import {
  // fetchListRequestTypes,
  fetchListRequest,
  requestDeterminHandler,
} from "../../../../redux/actions";
import { IListRequest } from "../../../../shared/ulitities/Model/desktop/request";
import { userAccessList } from "../../../../shared/ulitities/Enums/userAccessList";
import { filterAdvanceOperator } from "../../../../shared/ulitities/Enums/advanceSearchOperator";
import { ReactComponent as ArrowLeft } from "../../../../assets/images/arrowLeft.svg";
interface INotReviewProps {
  activeReview?: string;
}
const { TextArea } = Input;
const { TabPane } = Tabs;

const ExtendLicense: FC<INotReviewProps> = ({ activeReview }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(1);
  const [visibleDoc, setVisibleDoc] = useState(false);
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
    listRequestGrid,
    loadinglistRequestGrid,
    listRequestType,
  } = useSelector((state: any) => state.request);

  useEffect(() => {
    setData(
      listRequestGrid?.Result?.map((request: IListRequest) => {
        return {
          ...request,
          key: request.Id,
          Response: request.Response,
          RequestType: request.RequestTypeDescription,
          Description: request.Description,
          CreationDate: moment(request.CreationDate.split("T")[0]).format(
            "jYYYY-jMM-jDD"
          ),
        };
      })
    );
  }, [listRequestGrid]);

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
              propertyName: "Status",
              value: 1,
            },
            {
              operator: filterAdvanceOperator.Equal,
              propertyName: "RequestType",
              value: 1,
            },
          ]
        : filterList,
  };

  useEffect(() => {
   dispatch(fetchListRequest(page));
  }, [pageModel, filterList]);



  let requestTypes = listRequestType?.Result?.map(
    (requestType: { Id: number; Title: string }) => {
      let data = {
        key: requestType.Id,
        Id: requestType.Id,
        text: requestType.Title,
        value: requestType.Title,
      };
      return data;
    }
  );

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

 

  const onChange = (e: RadioChangeEvent, record: IListRequest) => {
    setSelectedRequest(record);
    setValue(e.target.value);
    const determinate = {
      id: record.Id,
      status: +e.target.value,
      response: record.Response,
    };
    dispatch(
      requestDeterminHandler(determinate, () => {
        dispatch(fetchListRequest(page));
      })
    );

    setData((prev: any) =>
      prev?.map((el: any) =>
        el.Id !== record.Id
          ? el
          : {
              ...el,
              Status: +e.target.value,
            }
      )
    );
  };

  // const onChangeAll = (e: RadioChangeEvent) => {
  //   setData((prev: any) =>
  //     prev?.map((el: any) => ({
  //       ...el,
  //       Status: +e.target.value,
  //     }))
  //   );
  // };

  const handleChangeResaon = (e: any, record: any) => {
    setData((prev: any) =>
      prev?.map((el: any) =>
        el.Id !== record
          ? el
          : {
              ...el,
              Response: e.target.value,
            }
      )
    );
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نوع درخواست",
      dataIndex: "RequestType",
      key: "RequestType",
      width: "9%",
      filters: requestTypesFilter,
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "CreationDate",
      key: "CreationDate",
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
      title: "عملیات",
      render: (text: any, record: any) => {
        return (
          <div style={{ display: "flex" }}>
            <Radio.Group
              onChange={(e) => onChange(e, record)}
              value={record.Status}
              style={{ width: "19%" }}
            >
              <Radio value={3}>تایید</Radio>
              <Radio value={2}>رد</Radio>
            </Radio.Group>
            {/*  {(value === 2 && record.Id === selectedRequest.Id) ||
            (value === 3 && record.Id === selectedRequest.Id) ? ( */}
            <TextArea
              autoSize
              allowClear
              onChange={(e) => handleChangeResaon(e, record.Id)}
              // style={{width:'50px',height:"32px"}}
              className="textArea"
            />
            {/*  ) : null} */}
          </div>
        );
      },
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
        propertyName: "Status",
        value: 1,
      },
    ] as any;
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
              operand: 1,
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
      {FindAccess(userAccessList.Adjusters_DetermineRequest) ? (
        <Table
          columns={columns}
          dataSource={data}
          loading={loadinglistRequestGrid}
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
            total: listRequestGrid?.TotalCount,
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
     
     
    </div>
  );
};

export default ExtendLicense;

