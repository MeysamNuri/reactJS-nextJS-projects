import React, { useEffect, useState, FC, useRef } from "react";
import { Table, ConfigProvider, Input, Button, Space,Radio } from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { fetchSupervisionSmsOutBoxList } from "../../../redux/actions";
import { ISms } from "../../../shared/ulitities/Model/sms";
import { smsType } from "../../../shared/ulitities/Enums/sms";
import DatePicker2 from "../../../components/UI/DatePicker/DatePicker";
import { filterAdvanceOperator } from '../../../shared/ulitities/Enums/advanceSearchOperator';

interface ISmsProps {
  isManagmentCartable?: boolean;

}

const DesktopSmsOutBox: FC<ISmsProps> = ({ isManagmentCartable }) => {
  const dispatch = useDispatch();
  const { supervisionSmsOutBoxList, loadingSupervisionSmsOutBoxList } = useSelector(
    (state: any) => state.smsOutBoxList
  );
  const [filterList, setFilterList] = useState<any>([]);
  const searchInput = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [customOrder, setCustomOrder] = useState<any>("Id");
  const [sendMessageDate, setSendMessageDate] = useState<any>(null)
  const [endSendMessageDate, setEndSendMessageDate] = useState<any>(null)
  const [dataIndex, setDataIndex] = useState("");
  const [filterState, setFilterState] = useState<number>(7)
  const [pageModel, setPageModel] = useState({
    pageIndex: 1,
    pageSize: isManagmentCartable ? 2 : 25,
  });

  let sms = supervisionSmsOutBoxList?.Result?.map((sms: ISms) => {
    let obj = {
      key: sms.Id,
      SendDate: moment(sms?.SendDate.split("T")[0]).format("jYYYY-jM-jD"),
      Body: sms.Body,
      Reciver: sms.Reciver,
      ApplicantName: sms.ApplicantName,
      SenderName: sms.SenderName,
      Subject: sms.Subject,
      SmsTypeEnum:
        String(sms.SmsTypeEnum) === smsType.Individual
          ? "فردی"
          : String(sms.SmsTypeEnum) === smsType.Group
            ? "گروهی"
            : "سیستمی",
      TrackingCode: sms.TrackingCode === 'OK' ? '' : sms.TrackingCode,
    };
    return obj;
  });

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setDataIndex(dataIndex);
    if ((dataIndex = "SendDate")) {
      filterList.push({
        propertyName: "SendDate",
        operator: filterAdvanceOperator.GreaterOrEqual,
        value: moment(sendMessageDate?.toDate()).format("YYYY-MM-DD") + "T00:00:00",
      });
      filterList.push({
        propertyName: "SendDate",
        operator: filterAdvanceOperator.LessOrEqual,
        value: moment(endSendMessageDate?.toDate()).format("YYYY-MM-DD") + "T23:59:00",

      });
    }
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    if (dataIndex === "SendDate") {
      setFilterList([])
      setSendMessageDate(null)
      setEndSendMessageDate(null)
    }
    setFilterList([]);
    clearFilters();
    setSearchText("");
    setDataIndex("")
    setFilterState(7)
  };
  const radioCahnge = (e: any, clearFilters: any) => {

    setFilterState(e.target.value)
    setSearchText("");
    setDataIndex("")
    setSendMessageDate(null)
    setEndSendMessageDate(null)
    clearFilters();
 
  }
  //از تاریخ ارسال
  const handleSendMessageDate = (value: any) => {
    setSendMessageDate(value);
  };

  //تا تاریخ ارسال
  const handleEndSendMessageDate = (value: any) => {
    setEndSendMessageDate(value);
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
          dataIndex === "SendDate" ? (
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <DatePicker2
                placeholder="از تاریخ"
                value={sendMessageDate}
                onChange={(value: any) => handleSendMessageDate(value)}
              />
              <DatePicker2
                placeholder="تا تاریخ"
                value={endSendMessageDate}
                onChange={(value: any) => handleEndSendMessageDate(value)}
              />
            </div>
          ) :
<>
            <Input
              ref={searchInput}
              placeholder={`جستجو ${dataIndex === "Reciver" ? "تلفن همراه" :
                  dataIndex === "Body" ? "متن" :
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
      title: "نوع پیام",
      dataIndex: "SmsTypeEnum",
      key: "SmsTypeEnum",
      width: "10%",
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
      filters: [
        {
          text: "فردی",
          value: "0",
        },
        {
          text: "گروهی",
          value: "1",
        },
        {
          text: "سیستمی",
          value: "2",
        },
      ],
    },
    // {
    //   title: "عنوان پیام",
    //   dataIndex: "Subject",
    //   key: "Subject",
    //   width: "11%",

    // },
    {
      title: "تاریخ ارسال",
      dataIndex: "SendDate",
      key: "SendDate",
      width: "10%",
      ...getColumnSearchProps("SendDate"),
      // sorter:true
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filterList?.length > 0 ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "فرستنده پیام",
      dataIndex: "SenderName",
      key: "SenderName",
      width: "12%",
    },
    {
      title: "گیرنده پیام",
      dataIndex: "ApplicantName",
      key: "ApplicantName",
      width: "12%",
    },
    {
      title: "تلفن همراه",
      dataIndex: "Reciver",
      key: "Reciver",
      ...getColumnSearchProps("Reciver"),
      width: "7%",
      filterIcon: (filters: any) => (
        <FilterFilled style={{ color: filters ? "#E64848" : undefined }} />
      ),
    },
    {
      title: "متن پیام",
      dataIndex: "Body",
      key: "Body",
      ...getColumnSearchProps("Body"),
      //width: "30%",
    },
    {
      title: "کد پیگیری",
      dataIndex: "TrackingCode",
      key: "TrackingCode",
      width: "10%",
    },
  ];

  let dataModel = {
    pageSize: pageModel.pageSize,
    pageNo: pageModel.pageIndex,
    filters: filterList,
  };

  useEffect(() => {
    dispatch(fetchSupervisionSmsOutBoxList(dataModel));
  }, [pageModel, filterList, customOrder, dataIndex]);

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    if (sorter.field == "SendDate") {
      if (sorter.order == "ascend") {
        setCustomOrder("Id Desc");
      }
      if (sorter.order == "descend") {
        setCustomOrder("Id");
      }
    } else {
      setCustomOrder("Id");
    }
    let filteredIndictmentList = [] as any;
    if (filters.Reciver != null) {
      filteredIndictmentList.push({
        propertyName: "Reciver",
        operator: filterState,
        value: filters?.Reciver[0],
      });
    }

    if (filters.Body != null) {
      filteredIndictmentList.push({
        propertyName: "Body",
        operator: filterState,
        value: filters?.Body[0],
      });
    }
    if (filters.SmsTypeEnum != null) {
      let first = [...filters.SmsTypeEnum].shift();
      let last = [...filters.SmsTypeEnum].pop();
      let fitrstIndex = filters.SmsTypeEnum.indexOf(first);
      let lastIndex = filters.SmsTypeEnum.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "SmsTypeEnum",
          operator: 1,
          value: Number(filters?.SmsTypeEnum[0]),
        });
      }

      if (filters.SmsTypeEnum.length > 1) {
        for (let i = 0; i < filters.SmsTypeEnum.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "SmsTypeEnum",
              operator: 1,
              value: Number(first),
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.SmsTypeEnum.length - 1) {
            filteredIndictmentList.push({
              propertyName: "SmsTypeEnum",
              operator: 1,
              value: Number(last),
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.SmsTypeEnum.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "SmsTypeEnum",
              operator: 1,
              value: Number(filters?.SmsTypeEnum[i]),
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
      <ConfigProvider direction="rtl">
        <Table
          columns={columns}
          dataSource={sms}
          loading={loadingSupervisionSmsOutBoxList}
          onChange={handleTableChange}
          pagination={{
            pageSize: pageModel.pageSize,
            total: supervisionSmsOutBoxList?.TotalCount,
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
            emptyText: "پیامی وجود ندارد.",
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default DesktopSmsOutBox;
