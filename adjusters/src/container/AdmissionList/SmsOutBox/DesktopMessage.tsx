import React, { useEffect, useState, useRef, FC } from "react";
import { Table, ConfigProvider, Button, Space, Input,Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";
import moment from "jalali-moment";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { fetchMessageGrid } from "../../../redux/actions";
import { IMessage } from "../../../shared/ulitities/Model/meesage";

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
    },
    {
      title: "کد ارزیابی",
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      width: "10%",
    },
    {
      title: "متن پیام",
      dataIndex: "Text",
      key: "Text",
      //width: "16%",
    },
  ];

  useEffect(() => {
    let dataModel = {
      firstPageSize: pageModel.pageSize,
      pageSize: pageModel.pageSize,
      pageIndex: pageModel.pageIndex,
      orderBy: "Id",
      filters: filterList,
    };

    dispatch(fetchMessageGrid(dataModel));
  }, [pageModel, filterList]);

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    // let filteredIndictmentList = [] as any;
    // if (filters.Reciver != null) {
    //   filteredIndictmentList.push({
    //     propertyName: "Reciver",
    //     operator: 1,
    //     value: filters?.Reciver[0],
    //   });
    // }
    // if (filters.SmsTypeEnum != null) {
    //   let first = [...filters.SmsTypeEnum].shift();
    //   let last = [...filters.SmsTypeEnum].pop();
    //   let fitrstIndex = filters.SmsTypeEnum.indexOf(first);
    //   let lastIndex = filters.SmsTypeEnum.indexOf(last);
    //   if (fitrstIndex == lastIndex) {
    //     filteredIndictmentList.push({
    //       propertyName: "SmsTypeEnum",
    //       operator: 1,
    //       value: Number(filters?.SmsTypeEnum[0]),
    //     });
    //   }
    //   if (filters.SmsTypeEnum.length > 1) {
    //     for (let i = 0; i < filters.SmsTypeEnum.length; i++) {
    //       //اولی
    //       if (i == fitrstIndex) {
    //         filteredIndictmentList.push({
    //           propertyName: "SmsTypeEnum",
    //           operator: 1,
    //           value: Number(first),
    //           operand: 1,
    //           isOpenGroup: true,
    //           isCloseGroup: false,
    //         });
    //       }
    //       //آخری
    //       if (i == filters.SmsTypeEnum.length - 1) {
    //         filteredIndictmentList.push({
    //           propertyName: "SmsTypeEnum",
    //           operator: 1,
    //           value: Number(last),
    //           operand: 0,
    //           isOpenGroup: false,
    //           isCloseGroup: true,
    //         });
    //       }
    //       //منهای اخری
    //       if (i !== filters.SmsTypeEnum.length - 1 && i !== fitrstIndex) {
    //         filteredIndictmentList.push({
    //           propertyName: "SmsTypeEnum",
    //           operator: 1,
    //           value: Number(filters?.SmsTypeEnum[i]),
    //           operand: 1,
    //           isOpenGroup: false,
    //           isCloseGroup: false,
    //         });
    //       }
    //     }
    //   }
    // }
    // setFilterList(filteredIndictmentList);
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
