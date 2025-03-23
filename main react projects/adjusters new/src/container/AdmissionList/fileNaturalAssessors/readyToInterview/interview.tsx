import React, { useState, useEffect, FC, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Table, ConfigProvider, Button, Space, Input } from "antd";
import { IIntervewers } from "../../../../shared/ulitities/Model/interviewers";
import {
  sendInterviewers,
  fetchInterviewers,
  filterInterviewers,
} from "../../ServicesCartable/AdmissionListServices";
import { IAdmisionExpert } from "../../../../shared/ulitities/Model/score";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { messageSuccess, messageError } from "../../../../utils/utils";
import {
  fetchInterviewSession,
  fetchAdmistionListExpert,
  cartableReportAllInfo,
} from "../../../../redux/actions";
import InterviewApplicant from "../../Interview/InterviewApplicant";

interface IInterviewProps {
  ApplicantId: number;
  CartableId: number;
  modelReport: any;
  closeModal: any;
  isCartable:boolean
}

const Interview: FC<IInterviewProps> = ({
  ApplicantId,
  CartableId,
  modelReport,
  closeModal,
  isCartable
}) => {
  const dispatch = useDispatch();
  const [selectedInterviewers, setSelectedInterviewers] = useState([] as any);
  const [sendListInterviewer, setSendListInterviewer] = useState([] as any);
  const [valRepresentativeName, setValRepresentativeName] = useState(1);
  const [listInterViewers, setlistInterViewers] = useState([] as any);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const searchInput = useRef<any>(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterList, setFilterList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [dataFilter, setDataFilter] = useState([] as any);
  const interviewTimId = useSelector(
    (state: any) => state.score.interviewSession?.Result
  );

  const listAddmissitionExpert = useSelector(
    (state: any) => state.fileAssiner.admissitionList?.Result
  );

  useEffect(() => {
    dispatch(fetchInterviewSession(ApplicantId));
  }, []);

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
          placeholder={`جستجو ${
            dataIndex === "FirstName"
              ? "نام"
              : dataIndex === "FamilyName"
              ? "نام خانوادگی"
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

  let dataInterview = {
    agentId: valRepresentativeName,
    cartableId: CartableId,
    applicantId: ApplicantId,
    interviewSessionId: interviewTimId,
    interviewerIds: selectedInterviewers,
  };

  async function postListInterviewer() {
    try {
      setLoading(true);
      const data = await sendInterviewers(dataInterview);
      if (data.IsSucceed === false) {
        messageError(data.Message);
      } else {
        data && setSendListInterviewer(data?.Result);
        messageSuccess("مصاحبه کننده با موفقیت ذخیره گردید");
        closeModal();
        dispatch(cartableReportAllInfo(modelReport, adjusterType.natural,()=>{}));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  //لیست مصاحبه کنندگان
  async function getListInterviewer() {
    try {
      setInterviewLoading(true);
      const data = await fetchInterviewers();
      data && setlistInterViewers(data?.Result);
    } catch (err) {
    } finally {
      setInterviewLoading(false);
    }
  }

  async function filterListInterviewer(filter: any) {
    try {
      setLoading(true);
      const data = await filterInterviewers(filter);
      if (data.IsSucceed === false) {
        messageError(data.Message);
      } else {
        data && setDataFilter(data?.Result);
        // messageSuccess("مصاحبه کننده با موفقیت ذخیره گردید");
        // getListInterviewer();
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getListInterviewer();
    dispatch(fetchAdmistionListExpert());
  }, []);

  // list interviewers
  let interviewers = listInterViewers?.map((interviewer: IIntervewers) => {
    let interview = {
      key: interviewer.Id,
      id: interviewer.Id,
      FirstName: interviewer.FirstName,
      FamilyName: interviewer.FamilyName,
    };
    return interview;
  });

  let filterinterviewers = dataFilter?.map((interviewer: IIntervewers) => {
    let interview = {
      key: interviewer.Id,
      id: interviewer.Id,
      FirstName: interviewer.FirstName,
      FamilyName: interviewer.FamilyName,
    };
    return interview;
  });

  //coloumns Table
  let columns: any = [
    {
      title: "نام",
      dataIndex: "FirstName",
      key: "FirstName",
      ellipsis: true,
      ...getColumnSearchProps("FirstName"),
      filterSearch: true,
      onFilter: (value:any, record:any) => record.FirstName.includes(value),
    },

    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "FamilyName",
      ellipsis: true,
      ...getColumnSearchProps("FamilyName"),
      filterSearch: true,
      onFilter: (value:any, record:any) => record.FamilyName.includes(value),
    },
  ];

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedInterviewers(selectedRowKeys);
  };

  let rowSelection = {
    selectedInterviewers,
    onChange: onSelectChange,
  };
  const submitInterviewrsHandler = () => {
    postListInterviewer();
  };

  //نام نمایندگان
  const changeAdmisionHandler = (e: any) => {
    setValRepresentativeName(e.target.value);
  };

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
    // let filter = {
    //   filters: filteredIndictmentList,
    // };
    // filterListInterviewer(filter);
  };

  return (
    <div>
      <InterviewApplicant applicantId={ApplicantId} />
      <div className="agent">
        <label> نام نمایندگان :</label>
        <select
          placeholder="انتخاب نمایید"
          style={{ width: 200, border: "1px solid #cccccc" }}
          onChange={changeAdmisionHandler}
        >
          {listAddmissitionExpert?.map((admision: IAdmisionExpert) => {
            return (
              <option key={admision.UserId} value={admision.UserId}>
                {admision.UserName}
              </option>
            );
          })}
        </select>
      </div>

      <ConfigProvider direction="rtl">
        <Table
          columns={columns}
          dataSource={
            dataFilter.length == 0 ? interviewers : filterinterviewers
          }
          pagination={false}
          loading={interviewLoading}
          scroll={{ y: 200 }}
          rowSelection={rowSelection}
          onChange={handleChange}
        />
      </ConfigProvider>
      <div className="submit marginTop">
        <Button
          type="primary"
          loading={loading}
          onClick={submitInterviewrsHandler}
        >
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default Interview;
