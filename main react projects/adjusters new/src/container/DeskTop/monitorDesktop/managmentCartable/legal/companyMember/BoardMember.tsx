import React, { FC, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Tooltip, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import moment from "jalali-moment";
import { fetchListBoardMember } from "../../../../../../redux/actions";
import { IBoardMember } from "../../../../../../shared/ulitities/Model/boardMember";
import { RESET_LIST_BOARD_MEMBER } from "../../../../../../constant/cartableActionTypes";
import CooperationendDateModal from '../../../../../AdmissionList/Legal/InformationAdjuster/AdjusterInfoDetail/CompanyMembers/cooperationEndDate'

interface IBoardMemberProps {
  activeTabCompanyMember?: string;
  selectedItemManagmentCartable?: any;
  isEvaluatorDesktopInformation?: number;
}
const BoardMember: FC<IBoardMemberProps> = ({
  selectedItemManagmentCartable,
  activeTabCompanyMember,
  isEvaluatorDesktopInformation
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataIndex, setDataIndex] = useState("");
  const searchInput = useRef<any>(null);
  const [visible, setVisible] = useState(false)
  const [selectedBoardMemer, setSelectedBoardMember] = useState<any>()
  const dispatch = useDispatch();
  const listMember = useSelector(
    (state: any) => state.listBoardMember.listBoardMember
  );
  const memberLoading = useSelector(
    (state: any) => state.listBoardMember.loading
  );
  const [pageModel, setPageModel] = useState({
    pageSize: 3,
    pageIndex: 1,
  });
  useEffect(() => {
    activeTabCompanyMember == "1" &&
      dispatch(fetchListBoardMember(selectedItemManagmentCartable.ApplicantId));
    return () => {
      dispatch({ type: RESET_LIST_BOARD_MEMBER });
    };
  }, [activeTabCompanyMember]);

  const handleEndCoorperationModal = (value: any) => {
    setVisible(true)
    setSelectedBoardMember(value)
  }

  let dataSource = listMember?.Result?.map((member: IBoardMember) => {
    let dataMember = {
      AppointmentDate: member?.AppointmentDate == null ? null : moment(member?.AppointmentDate.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      FounderId: member?.FounderId,
      Description: member.Description,
      FullName: member.IdentityInfo.FullName,
      Id: member.Id,
      NationalCode: member.IdentityInfo.NationalCodeOut,
      PositionTitle: member.PositionTitle,
      CooperationEndDate: member.CooperationEndDate === null ? null : moment(member.CooperationEndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      AdjusterCode: member.AdjusterCode,
      SpecializedFieldTitle: member.SpecializedFieldTitle,
      Mobile: member.Mobile,
      PositionId: member.PositionId,
      // ProfilePic: `data:image/jpeg;base64,` + member.ProfilePic,
    };
    return dataMember;
  });
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
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ellipsis: false,

      ...getColumnSearchProps("NationalCode"),
      filterSearch: true,
      onFilter: (value: string, record: any) => record.NationalCode?.startsWith(value),
    },
    {
      title: "کد ارزیابی",
      dataIndex: "AdjusterCode",
      key: "AdjusterCode",
      width: "12%",
    },
    {
      title: "تلفن همراه",
      dataIndex: "Mobile",
      key: "Mobile",
      width: "10%",
    },
    {
      title: "رشته تخصصی",
      dataIndex: "SpecializedFieldTitle",
      key: "SpecializedFieldTitle",

      width: "12%",
    },
    {
      title: "سمت",
      dataIndex: "PositionTitle",
      key: "PositionTitle",
      width: "15%",
    },
    {
      title: "تاریخ انتصاب",
      dataIndex: "AppointmentDate",
      key: "AppointmentDate",
      // ellipsis: true,
      width: "13%",
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "CooperationEndDate",
      key: "CooperationEndDate",
      // ellipsis: true,
      width: "18%",
    },
    {
      title: "عملیات",
      dataIndex: "Operation",
      key: "Operation",
      width: "12%",

      render: (value: string, record: any, index: any) => {
        return (
          <>
            {
              record.PositionId !== 3 && record.PositionId !== 1 && record.PositionId !== 7 && record.CooperationEndDate === null ?
                <Tooltip title="تاریخ پایان همکاری">
                  <Button onClick={() => handleEndCoorperationModal(record)} style={{ width: "100px", fontSize: "11px" }}> پایان همکاری</Button>

                </Tooltip> : null

            }

          </>
        );
      },
    },
  ]; 

  return (
    <div>
      <Table
       
        columns={columns}
        dataSource={dataSource}
        loading={memberLoading}
        scroll={{ x: 1100 }}
        pagination={{
          pageSize: pageModel.pageSize,
          total: listMember?.Result?.TotalCount,
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

      <Modal
        title={` تاریخ پایان همکاری ` + selectedBoardMemer?.FullName}
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
          isFromStockHolder={false}
          selectedBoardMember={selectedBoardMemer}
          closeModal={() => setVisible(false)} />
      </Modal>
    </div>
  );
};

export default BoardMember;
