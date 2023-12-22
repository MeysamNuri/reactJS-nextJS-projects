import React, { useEffect, FC, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table, Tooltip, Button, Modal, Input, Space } from "antd";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { fetchStockholderLegalEditToken } from "../../../../../../redux/actions";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";
import { IStackHolder } from "../../../../../../shared/ulitities/Model/stackHolder";
import { GetWay } from "../../../../../../shared/ulitities/Enums/getWay";
import CooperationendDateModal from './cooperationEndDate'
import { ReactComponent as Xls } from "../../../../../../assets/images/xls.svg";

interface IStockHolderProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  applicantId?: number;
  isStockHolder?: number;
  selectedItemManagmentCartable?: any;
  isEvaluatorDesktopInformation?: number;
  activeTabCompanyMember?: string
  userIdRecognition?: number,
  activeTab?: string
}

const StockHolder: FC<IStockHolderProps> = ({
  oneAdjusterList,
  isStockHolder,
  selectedItemManagmentCartable,
  isEvaluatorDesktopInformation,
  activeTabCompanyMember,
  isFromReportTable,
  userIdRecognition,
  activeTab
}) => {
  const [visible, setVisible] = useState(false)
  const [selectedStockHolder, setSelectedStockHolder] = useState<any>()
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataIndex, setDataIndex] = useState("");
  const searchInput = useRef<any>(null);
  const handleEndCoorperationModal = (value: any) => {
    setVisible(true)
    setSelectedStockHolder(value)
  }

  const dispatch = useDispatch();
  const { listStockholderLegal, loading } = useSelector(
    (state: any) => state.listDraftStockholderLegal
  );

  useEffect(() => {
    if (isEvaluatorDesktopInformation === GetWay.desktop) {
      dispatch(fetchStockholderLegalEditToken(userIdRecognition));
    } else if (isEvaluatorDesktopInformation === GetWay.admission || isFromReportTable) {
      dispatch(fetchStockholderLegalEditToken(oneAdjusterList?.ApplicantId));
    }
  }, []);

  useEffect(() => {
    activeTabCompanyMember === "2" &&
      isEvaluatorDesktopInformation === GetWay.managmentCatable &&
      dispatch(fetchStockholderLegalEditToken(selectedItemManagmentCartable?.ApplicantId));
  }, [activeTabCompanyMember]);

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    setDataIndex(dataIndex);

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
          placeholder={`جستجو ${dataIndex === "FullName"
            ? "نام خانوادگی"
            : dataIndex === "NationalCode"
              ? "کد ملی"

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
  let data = listStockholderLegal?.Result?.map((stockHolder: IStackHolder) => {
    let obj = {
      key: stockHolder.Id,
      FullName: stockHolder.FullName,
      BirthDate: moment(stockHolder.BirthDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      Id: stockHolder.Id,
      JoinDate: moment(stockHolder?.JoinDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      NationalCode: stockHolder?.NationalCode,
      ShareAmount: stockHolder?.ShareAmount,
      CooperationEndDate: stockHolder?.EndDate === null ? null : moment(stockHolder?.EndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      IsLegal: stockHolder.IsLegal ? 'حقوقی' : 'حقیقی'
    };
    return obj;
  });
  //coloumns Table
  let columns: any = [
    {
      title: "نام و نام خانوادگی ",
      dataIndex: "FullName",
      key: "FullName",
      width: "16%",
      ...getColumnSearchProps("FullName"),
      filterSearch: true,
      onFilter: (value: string, record: any) => (record.FullName?.endsWith(value) || record.FullName?.startsWith(value)),
    },
    {
      title: "نوع ",
      dataIndex: "IsLegal",
      key: "IsLegal",
      width: "10%"
    },
    {
      title: "کدملی/شناسه ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "16%",
      ...getColumnSearchProps("NationalCode"),
      filterSearch: true,
      onFilter: (value: string, record: any) => record.NationalCode?.startsWith(value),
    },
    {
      title: "تاریخ تولد/ثبت",
      dataIndex: "BirthDate",
      key: "BirthDate",
      width: "15%"

    },
    {
      title: "تاریخ سهامدار شدن",
      dataIndex: "JoinDate",
      key: "JoinDate",
      width: "15%"
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "CooperationEndDate",
      key: "CooperationEndDate",
      width: "17%"
    },
    {
      title: "تعداد سهام",
      dataIndex: "ShareAmount",
      key: "ShareAmount",
      width: "14%"
    },
    {
      title: "عملیات",
      dataIndex: "Operation",
      key: "Operation",
      width: "8%",

      render: (value: string, record: any, index: any) => {
        return (
          <>
            {

              <Tooltip title="تاریخ پایان همکاری">
                <Button onClick={() => handleEndCoorperationModal(record)} style={{ width: "100px", fontSize: "11px" }}> پایان همکاری</Button>

              </Tooltip>

            }

          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        loading={loading}
        // scroll={{ y: 400 }}
        locale={{ emptyText: "لیست شما خالی است" }}

      />

      <Modal
        title={` تاریخ پایان همکاری ` + selectedStockHolder?.FullName}
        visible={visible}
        footer={null}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        width={800}

      >
        <CooperationendDateModal
         selectedItemManagmentCartable={selectedItemManagmentCartable} 
          isEvaluatorDesktopInformation={isEvaluatorDesktopInformation}
          activeTabCompanyMember={activeTabCompanyMember}
          activeTab={activeTab} isFromStockHolder={true}
          selectedBoardMember={selectedStockHolder}
          userIdRecognition={userIdRecognition}
          closeModal={() => setVisible(false)} />
      </Modal>
    </>
  );
};

export default StockHolder;
