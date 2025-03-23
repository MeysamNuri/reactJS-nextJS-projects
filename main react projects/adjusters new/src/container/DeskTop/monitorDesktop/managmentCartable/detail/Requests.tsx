import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Space, ConfigProvider, Input, Button } from "antd";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "jalali-moment";

import {
  fetchListRequestTypes,
  //fetchListReviewedRequest,
  fetchListRequest,
} from "../../../../../redux/actions";
import { IListRequest } from "../../../../../shared/ulitities/Model/desktop/request";
import { ReactComponent as ArrowLeft } from "../../../../../assets/images/arrowLeft.svg";
//import { ReactComponent as Attachment } from "../../../../../assets/images/attachment.svg";
import { SET_LIST_REQUEST } from "../../../../../constant/desktop";

interface IRequestProps {
  applicantId?: number;
  isManagmentCartable?: boolean;
}
const Requests: FC<IRequestProps> = ({ applicantId, isManagmentCartable }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filterList, setFilterList] = useState<any>(
    isManagmentCartable
      ? [
          {
            propertyName: "ApplicantId",
            operator: 1,
            value: applicantId,
          },
        ]
      : []
  );
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    pageIndex: 1,
  });
  const lisRequestType = useSelector(
    (state: any) => state.request.listRequestType?.Result
  );
  const { listRequestGrid, loadinglistRequestGrid } = useSelector(
    (state: any) => state.request
  );

  let requestTypeFilter = lisRequestType?.map((requestType: any) => {
    let fieldName = {
      key: requestType.Value,
      text: requestType.Description,
      value: requestType.Value,
    };
    return fieldName;
  });

  let data = listRequestGrid?.Result?.map((request: IListRequest) => {
    let obj = {
      Id: request.Id,
      key: request.Id,
      RequestType: request.RequestTypeDescription,
      Description: request.Description,
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
    filters: filterList,
  };

  useEffect(() => {
    dispatch(fetchListRequest(page));
    dispatch({ type: SET_LIST_REQUEST, payload: page });
  }, [pageModel, filterList]);

  useEffect(() => {
    dispatch(fetchListRequestTypes());
  }, []);

  //جزئیات درخواست
  const detailHandler = (record: any) => {
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

  //coloumns Table
  let columns: any = [
    {
      title: "نوع درخواست",
      dataIndex: "RequestType",
      key: "RequestType",
      width: "30%",
      filters: requestTypeFilter,
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "CreationDate",
      key: "CreationDate",
      width: "15%",
    },

    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      width: "50%",
    },
  ];

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;
    isManagmentCartable
    ? filteredIndictmentList.push({
        propertyName: "ApplicantId",
        operator: 1,
        value: applicantId,
      })
    : ([] as any);

    if (filters.RequestType !== null) {
      let first = [...filters.RequestType].shift();
      let last = [...filters.RequestType].pop();
      let fitrstIndex = filters.RequestType.indexOf(first);
      let lastIndex = filters.RequestType.indexOf(last);

      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "RequestType",
          operator: 1,
          value: filters?.RequestType[0],
        });
      }

      if (filters.RequestType.length > 1) {
        for (let i = 0; i < filters.RequestType.length; i++) {
          //اولی
          if (i === fitrstIndex) {
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
          if (i === filters.RequestType.length - 1) {
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
        loading={loadinglistRequestGrid}
        onChange={handleChange}
        pagination={{
          pageSize: pageModel.pageSize,
          total: listRequestGrid?.TotalCount,
          showSizeChanger: true,
          size: "small",
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
    </div>
  );
};

export default Requests;
