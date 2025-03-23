import React, { useEffect, useState, FC, useRef } from "react";
import { Table, ConfigProvider, Button, Space, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "jalali-moment";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { fetchSupervisionSmsOutBoxListApplicantId } from "../../../redux/actions";
import { ISms } from "../../../shared/ulitities/Model/sms";
import { smsType } from "../../../shared/ulitities/Enums/sms";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";

interface ISmsOutProps {
  applicantId?: number;
}

const Sms: FC<ISmsOutProps> = ({ applicantId }) => {
  const dispatch = useDispatch();
  const {
    supervisionsmsOutBoxListApplicantId,
    loadingSupervisionSmsOutBoxListApplicantId,
  } = useSelector((state: any) => state.smsOutBoxList);
  const [pageModel, setPageModel] = useState({
    pageIndex: 1,
    pageSize: 3,
  });
  const [filterList, setFilterList] = useState<any>([]);
  const searchInput = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  let sms = supervisionsmsOutBoxListApplicantId?.Result?.map((sms: ISms) => {
    let obj = {
      key: sms.Id,
      SendDate: moment(sms?.SendDate.split("T")[0]).format("jYYYY-jM-jD"),
      Body: sms.Body,
      Subject: sms.Subject,
      Reciver: sms.Reciver,
      ApplicantName: sms.ApplicantName,
      SenderName: sms.SenderName,
      SmsTypeEnum:
        String(sms.SmsTypeEnum) == smsType.Individual
          ? "فردی"
          : String(sms.SmsTypeEnum) == smsType.Group
          ? "گروهی"
          : "سیستمی",
          
      TrackingCode: sms.TrackingCode==='OK' ?'': sms.TrackingCode,
    };
    return obj;
  });

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
          placeholder={`جستجو ${dataIndex === "Reciver" ? "تلفن همراه" : null}`}
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

  //coloumns Table
  let columns: any = [
    {
      title: "نوع پیام",
      dataIndex: "SmsTypeEnum",
      key: "SmsTypeEnum",
      width: "13%",
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
      width: "13%",
    },
    {
      title: "فرستنده پیام",
      dataIndex: "SenderName",
      key: "SenderName",
      width: "16%",
    },
    // {
    //   title: "گیرنده پیام",
    //   dataIndex: "ApplicantName",
    //   key: "ApplicantName",
    //   width: "11%",
    // },
    {
      title: "تلغن همراه",
      dataIndex: "Reciver",
      key: "Reciver",
      ...getColumnSearchProps("Reciver"),
    },
    {
      title: "متن پیام",
      dataIndex: "Body",
      key: "Body",
      //width: "30%",
    },
    {
      title: "کد پیگیری",
      dataIndex: "TrackingCode",
      key: "TrackingCode",
      width: "10%",
    },
  ];

  useEffect(() => {
    let dataModel = {
      applicantId: applicantId,
      pageSize: pageModel.pageSize,
      pageNo: pageModel.pageIndex,
      filters: filterList,
    };

    dispatch(fetchSupervisionSmsOutBoxListApplicantId(dataModel));
  }, [pageModel,filterList]);

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;
    if (filters.Reciver != null) {
      filteredIndictmentList.push({
        propertyName: "Reciver",
        operator: 1,
        value: filters?.Reciver[0],
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
          onChange={handleTableChange}
          loading={loadingSupervisionSmsOutBoxListApplicantId}
          pagination={{
            pageSize: pageModel.pageSize,
            total: supervisionsmsOutBoxListApplicantId?.TotalCount,
            showSizeChanger: true,
            size: "small",
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
              supervisionsmsOutBoxListApplicantId?.IsSucceed === false
                ? supervisionsmsOutBoxListApplicantId.Message
                : "پیامی وجود ندارد",
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Sms;
