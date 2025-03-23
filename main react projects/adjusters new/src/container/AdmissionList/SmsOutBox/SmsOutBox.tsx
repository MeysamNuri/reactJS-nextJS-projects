import React, { useEffect, useState, FC, useRef } from "react";
import { Table, ConfigProvider, Input, Button, Space } from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { fetchSmsOutBoxList, fetchAddmissionSmsOutBoxList } from "../../../redux/actions";
import { ISms } from "../../../shared/ulitities/Model/sms";
import { smsType } from "../../../shared/ulitities/Enums/sms";

interface ISmsProps {
  isManagmentCartable?: boolean;
  applicantId: number
}

const SmsOutBox: FC<ISmsProps> = ({ isManagmentCartable, applicantId }) => {
  const dispatch = useDispatch();
  const { smsOutBoxList, loading, supervisionSmsOutBoxList } = useSelector(
    (state: any) => state.smsOutBoxList
  );
  const [filterList, setFilterList] = useState<any>([]);
  const searchInput = useRef<any>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [smsData, setSmsData] = useState<any>([])
  const [pageModel, setPageModel] = useState({
    pageIndex: 1,
    pageSize: isManagmentCartable ? 2 : 20,
  });
  useEffect(() => {
    if (supervisionSmsOutBoxList) {
      setSmsData(supervisionSmsOutBoxList?.Result?.map((sms: ISms) => {
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
        };
        return obj;
      }))

    }
    if (smsOutBoxList) {
      setSmsData(smsOutBoxList?.Result?.map((sms: ISms) => {
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
        };
        return obj;
      }))

    }
  }, [smsOutBoxList, supervisionSmsOutBoxList])

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
      width: "12%",
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
      width: "15%",
    },
    {
      title: "گیرنده پیام",
      dataIndex: "ApplicantName",
      key: "ApplicantName",
      width: "14%",
    },
    {
      title: "تلفن همراه",
      dataIndex: "Reciver",
      key: "Reciver",
      ...getColumnSearchProps("Reciver"),
      width: "15%",
    },
    {
      title: "متن پیام",
      dataIndex: "Body",
      key: "Body",
      //width: "30%",
    },
  ];

  let dataModel = {
    pageSize: pageModel.pageSize,
    pageNo: pageModel.pageIndex,
    applicantId: applicantId,
    filters: filterList.length == 0 ? [] : filterList,
  };

  useEffect(() => {
    isManagmentCartable ?
      dispatch(fetchSmsOutBoxList(dataModel)) :
      dispatch(fetchAddmissionSmsOutBoxList(dataModel))

  }, [pageModel, filterList]);

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
          dataSource={smsData}
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            pageSize: pageModel.pageSize,
            total: supervisionSmsOutBoxList?.TotalCount || smsOutBoxList?.TotalCount,
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

export default SmsOutBox;
