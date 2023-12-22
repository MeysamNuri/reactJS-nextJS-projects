import React, { useEffect, useState, useRef, FC } from "react";
import { Table, ConfigProvider, Button, Space, Input,Image ,Radio} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "jalali-moment";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { fetchMessageGrid } from "../../../redux/actions";
import { IMessage } from "../../../shared/ulitities/Model/meesage";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import { filterAdvanceOperator } from '../../../shared/ulitities/Enums/advanceSearchOperator';

const Message = () => {
  const dispatch = useDispatch();
  const { loadingGrid, listGridMessage } = useSelector(
    (state: any) => state.message
  );
  const [pageModel, setPageModel] = useState({
    pageIndex: 1,
    pageSize: 25,
  });
  const [filterList, setFilterList] = useState<any>([]);
  const searchInput = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [customOrder, setCustomOrder] = useState<any>("Id DESC");
  const [createMessageDate,setCreateMessageDate]=useState<any>(null)
  const [endCreateMessageDate,setEndCreateMessageDate]=useState<any>(null)
  const [dataIndex, setDataIndex] = useState("");
  const [filterState, setFilterState] = useState<number>(7)
  let sms = listGridMessage?.Result?.map((message: IMessage) => {
    let obj = {
      key: message.Id,
      CreatedDate: moment(message?.CreatedDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      Text: message.Text,
      IsDraft: message.IsDraft,
      IsGroup: message.IsGroup,
      IsRead: message.IsRead,
      SenderId: message.SenderId,
      FullName: message?.ApplicantPersonalInfo?.Person?.FullName,
      NationalCodeOut: message.ApplicantPersonalInfo.Person.NationalCodeOut,
      AdjusterCode:message.ApplicantPersonalInfo.Applicant.AdjusterCode,
      ProfilePic:message.ApplicantPersonalInfo.ProfilePic == null
        ? "ندارد"
        : `data:image/jpeg;base64,` + message.ApplicantPersonalInfo.ProfilePic,
    };
    return obj;
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setDataIndex(dataIndex);
    if ((dataIndex = "CreatedDate")) {
      filterList.push({
        propertyName: "CreatedDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: moment(createMessageDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
      });
      filterList.push({
        propertyName: "CreatedDate",
        operator: filterAdvanceOperator.LessOrEqual,
        value: moment(endCreateMessageDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",

      });
    }
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    setFilterList([]);
    clearFilters();
    setSearchText("");
    setFilterState(7)
    setDataIndex("")
    setCreateMessageDate(null)
    setEndCreateMessageDate(null)
  };
  
  const radioCahnge = (e: any, clearFilters: any) => {

    setFilterState(e.target.value)
    setSearchText("");
    setDataIndex("")
    setCreateMessageDate(null)
    setEndCreateMessageDate(null)
    clearFilters();
 
  }
  //از تاریخ 
  const handleCreateMessageDate = (value: any) => {
    setCreateMessageDate(value);
  };

  //تا تاریخ 
  const handleEndCreateMessageDate = (value: any) => {
    setEndCreateMessageDate(value);
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
          {
          dataIndex === "CreatedDate" ? (
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <DatePicker2
                placeholder="از تاریخ"
                value={createMessageDate}
                onChange={(value: any) => handleCreateMessageDate(value)}
              />
              <DatePicker2
                placeholder="تا تاریخ"
                value={endCreateMessageDate}
                onChange={(value: any) => handleEndCreateMessageDate(value)}
              />
            </div>
          ) :
          <>
        <Input
          ref={searchInput}
          placeholder={`جستجو ${
            // dataIndex === "NationalCodeOut" ? "کد ملی" :
            dataIndex === "AdjusterCode" ? "کد ارزیاب" :
            dataIndex === "Text" ? "متن" :
             null}`}
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
        <Radio.Group onChange={(e: any) => radioCahnge(e, clearFilters)} defaultValue={7}>
        <Radio value={7}>شامل</Radio>
        <Radio value={1}>برابر</Radio>

      </Radio.Group>
      </>
        }
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

  //coloumns Table
  let columns: any = [
    {
      title: "نمایش عکس",
      dataIndex: "ProfilePic",
      key: "ProfilePic",
      width: "10%",
      render: (value: string, record: any, index: any) => {
        return (
          <>
            {record.ProfilePic == "ندارد" ? (
              "ارسال نگردیده است"
            ) : (
              <Image
              width={50}
              height={50}
              style={{ borderRadius: "5px" }}
              src={ record.ProfilePic}
              alt="profilePic"
            />
            )}
          </>
        );
      },
    },

    {
      title: "تاریخ ایجاد",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      width: "10%",
      sorter: true,
      ...getColumnSearchProps("CreatedDate"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filterList?.length>0 ? "#E64848" : undefined }} />
      ),
    },

    {
      title: "نام خانوادگی",
      dataIndex: "FullName",
      key: "FullName",
      width: "12%",
    },
    {
      title: "کدملی",
      dataIndex: "NationalCodeOut",
      key: "NationalCodeOut",
     width: "10%",
    //  ...getColumnSearchProps("NationalCodeOut"),
    //  filterIcon: (filters: any) => (
    //    <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
    //  ),
    },
    {
      title: "کد ارزیابی",
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      width: "10%",
      ...getColumnSearchProps("AdjusterCode"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "متن پیام",
      dataIndex: "Text",
      key: "Text",
      //width: "16%",
      ...getColumnSearchProps("Text"),
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
  ];

  useEffect(() => {
    let dataModel = {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: customOrder,
      filters: filterList,
    };

    dispatch(fetchMessageGrid(dataModel));
  }, [pageModel, filterList,customOrder,dataIndex]);

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    if (sorter.field == "CreatedDate") {
      if (sorter.order == "ascend") {
        setCustomOrder("Id");
      }
      if (sorter.order == "descend" && sorter.order !== "ascend") {
        setCustomOrder("Id DESC");
      }
    } else {
      setCustomOrder("Id DESC");
    }
    let filteredIndictmentList = [] as any;
    if (filters.AdjusterCode != null) {
      filteredIndictmentList.push({
        propertyName: "Applicant.AdjusterCode",
        operator: filterState,
        value: filters?.AdjusterCode[0],
      });
    }
    if (filters.NationalCodeOut != null) {
      filteredIndictmentList.push({
        propertyName: "NationalCodeOut",
        operator: filterState,
        value: filters?.NationalCodeOut[0],
      });
    }
    if (filters.Text != null) {
      filteredIndictmentList.push({
        propertyName: "Text",
        operator: filterState,
        value: filters?.Text[0],
      });
    }
    setFilterList(filteredIndictmentList);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <ConfigProvider direction="rtl">
        <Table
          columns={columns}
          dataSource={sms}
          onChange={handleTableChange}
          loading={loadingGrid}
          pagination={{
            pageSize: pageModel.pageSize,
            total: listGridMessage?.TotalCount,
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
            emptyText:
              listGridMessage?.IsSucceed === false
                ? listGridMessage.Message
                : "پیامی وجود ندارد",
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Message;
