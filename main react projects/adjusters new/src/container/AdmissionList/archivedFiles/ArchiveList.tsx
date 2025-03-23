import React, { useState, useEffect, useMemo, FC,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button,Table,Input,Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { fetchListArchive, sendReasonReffer } from "../../../redux/actions";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { IReffer } from "../../../shared/ulitities/Model/reffer";

interface INaturalProps {
  activeTab: string;
}

const Archive: FC<INaturalProps> = ({ activeTab }) => {
  let numActiveTab = Number(activeTab);

  const dispatch = useDispatch();
  const [downloadId, setDownloadId] = useState(0);
  const [filterList, setFilterList] = useState<any>([]);
  const searchInput = useRef<any>(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pageModel, setPageModel] = useState({
    pageSize: 20,
    pageIndex: 1,
    firstPageSize: 20,
  });

  const { loading } = useSelector((state: any) => state.reffer);

  const { listArchive, loadingArchive } = useSelector(
    (state: any) => state.listArchive
  );

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    //setDataIndexiColumn(dataIndex);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
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
          placeholder={`جستجو ${
            dataIndex === "StatusTitle"
              ? "وضعیت"
              : dataIndex === "FirstName"
              ? "نام"
              : dataIndex === "FamilyName"
              ? "نام خانوادگی"
              : dataIndex === "NationalCode"
              ? "کد ملی"
              : dataIndex === "RegistrationCode"
              ? "کد رهگیری"
              : dataIndex === "AdjusterCode"
              ? "کد ارزیابی"
              : dataIndex === "AdjustmentFieldTitle"
              ? "زمینه تخصصی"
              : null
          }`}
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
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            باز نشانی
          </Button>
          {/*  <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    /*   filterIcon: (filtered: any) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ), */
    /* onFilter: (value: any, record: any) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },  */
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




  let dataModel = useMemo(() => {
    return {
      adjusterTypeId:
        activeTab === "1"
          ? adjusterType.natural
          : activeTab === "3"
          ? adjusterType.judical
          : activeTab === "2"
          ? adjusterType.legal
          : null,

      advancedSearchModel: {
        firstPageSize: pageModel.firstPageSize,
        pageSize: pageModel.pageSize,
        pageIndex: pageModel.pageIndex,
        // orderBy: "Id",
        filters: filterList,
      },
    };
  }, [pageModel, adjusterType, activeTab]);

  useEffect(() => {
    dispatch(fetchListArchive(dataModel));
  }, [pageModel.pageIndex, pageModel.pageSize,filterList]);

  const referHandler = (record: any) => {
    let rejectReffer: IReffer = {
      adjusterTypeId:
        numActiveTab === 1
          ? adjusterType.natural
          : numActiveTab === 2
          ? adjusterType.legal
          : numActiveTab === 3
          ? adjusterType.judical
          : null,
      applicantId: record.ApplicantId,
      answer: "Accept",
      //message: null,
      id: record.CartableId,
    };
    setDownloadId(record.ApplicantId);
    dispatch(
      sendReasonReffer(rejectReffer, () => {
        dispatch(fetchListArchive(dataModel));
      })
    );
  };

  const referHandlerToInterviewInvitation = (record: any) => {
    let rejectReffer: IReffer = {
      adjusterTypeId:
        numActiveTab === 1
          ? adjusterType.natural
          : numActiveTab === 2
          ? adjusterType.legal
          : numActiveTab === 3
          ? adjusterType.judical
          : null,
      applicantId: record.ApplicantId,
      answer: "Return",
      //message: null,
      id: record.CartableId,
    };
    setDownloadId(record.ApplicantId+1024);
    dispatch(
      sendReasonReffer(rejectReffer, () => {
        dispatch(fetchListArchive(dataModel));
      })
    );
  };

  //coloumns Table
  let columns: any = [
    {
      title: "کدرهگیری",
      dataIndex: "RegistrationCode",
      key: "RegistrationCode",
      ...getColumnSearchProps("RegistrationCode"),
      //width: "5%",
    },
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      ...getColumnSearchProps("FirstName"),
      //width: "20%",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      ...getColumnSearchProps("FamilyName"),
      //width: "20%",
    },
    {
      title: "کد ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ...getColumnSearchProps("NationalCode"),
      //width: "10%",
    },

    {
      title: "دوره",
      dataIndex: "CourseTitle",
      key: "CourseTitle",
      //...getColumnSearchProps("CourseTitle"),
      //width: "20%",
    },

    {
      title: "خروج از بایگانی",
      render: (text: any, record: any) => (
        <>
          <Button
            type="primary"
            onClick={() => referHandler(record)}
            loading={loading && downloadId === record.ApplicantId}
          >
           برگشت
          </Button>
          <Button
            type="primary"
            onClick={() => referHandlerToInterviewInvitation(record)}
            loading={loading && downloadId === record.ApplicantId+1024}
          >
           برگشت به دعوت به مصاحبه
          </Button>
        </>
      ),
    },
  ];





  const handleChange = (pagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;

    if (filters.FamilyName != null) {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: 1,
        value: filters?.FamilyName[0],
      });
    }

    if (filters.FirstName != null) {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: 1,
        value: filters?.FirstName[0],
      });
    }

    if (filters.NationalCode != null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }

    if (filters.RegistrationCode != null) {
      filteredIndictmentList.push({
        propertyName: "RegistrationCode",
        operator: 1,
        value: filters?.RegistrationCode[0],
      });
    }
    if (filters.AdjusterCode != null) {
      filteredIndictmentList.push({
        propertyName: "AdjusterCode",
        operator: 1,
        value: filters?.AdjusterCode[0],
      });
    }
    if (filters.CourseTitle != null) {
      filteredIndictmentList.push({
        propertyName: "CourseId",
        operator: 1,
        value: filters?.CourseTitle[0],
      });
    }



    if (filters.AdjustmentFieldTitle != null) {
      let first = [...filters.AdjustmentFieldTitle].shift();
      let last = [...filters.AdjustmentFieldTitle].pop();
      let fitrstIndex = filters.AdjustmentFieldTitle.indexOf(first);
      let lastIndex = filters.AdjustmentFieldTitle.indexOf(last);

      if (fitrstIndex === lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjustmentFieldId",
          operator: 1,
          value: filters?.AdjustmentFieldTitle[0],
        });
      }

      if (filters.AdjustmentFieldTitle.length > 1) {
        for (let i = 0; i < filters.AdjustmentFieldTitle.length; i++) {
          //اولی
          if (i === fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i === filters.AdjustmentFieldTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (
            i !== filters.AdjustmentFieldTitle.length - 1 &&
            i !== fitrstIndex
          ) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: filters?.AdjustmentFieldTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    setFilterList(filteredIndictmentList);
    //setFilteredInfo(filters);

    //setFilteredInfo(filters);
    // setSortedInfo(sorter);
  };


  return (
    <Table
      columns={columns}
      onChange={handleChange}
      dataSource={listArchive?.Result.CartableItems}
      loading={loadingArchive}
      locale={{ emptyText: "پرونده بایگانی جهت ارجاع وجود ندارد" }}
      pagination={{
        pageSize: pageModel.pageSize,
        total: listArchive?.TotalCount,
        showSizeChanger: true,
        onChange: (current: number, pageSize: any) =>
          setPageModel({
            ...pageModel,
            pageIndex: current,
            pageSize: pageSize,
          }),
        locale: { items_per_page: "/ صفحه" },
      }}
    />
  );
};

export default Archive;
