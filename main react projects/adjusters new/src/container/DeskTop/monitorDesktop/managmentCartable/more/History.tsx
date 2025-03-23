import React, { useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tooltip, Button, Collapse } from "antd";
import moment from "jalali-moment";
import {
  fetchHistoryStatuses,
  dlFileHandler,
} from "../../../../../redux/actions";
import { IHistoryChangeStatus } from "../../../../../shared/ulitities/Model/desktop/status";
import { STATUSES_HISTORY_SUCCESS } from "../../../../../constant/desktop";
import Download from "../../../../../assets/images/download.svg";

interface IHistoryProps {
  selectedItemManagmentCartable: any;
  closeModal?: () => void;
  activeTab?: string;
}

const { Panel } = Collapse;

const History: FC<IHistoryProps> = ({
  selectedItemManagmentCartable,
  activeTab,
}) => {
  const dispatch = useDispatch();
  let { statusesHistory, loadingStatusesHistory } = useSelector(
    (state: any) => state.allChangeStatusReason
  );

  // let { loadingDownload } = useSelector((state: any) => state.uploadFile);

  let dataSource = statusesHistory?.Result?.map(
    (history: IHistoryChangeStatus) => {
      let obj = {
        Id: history.Id,
        key: history.Id,
        ApplicantId: history.ApplicantId,
        NewStatusDescription: history?.NewStatusDescription,
        OldStatusDescription: history?.OldStatusDescription,
        ChangeStatusReason: history?.ChangeStatusReason?.Title??"-",
        Description: history?.Description,
        FileDescriptionId: history?.FileDescriptionId,
        User:history?.User ?(history?.User?.Person?.FirstName +" "+history?.User?.Person?.LastName ):"-" ,
        Files: history?.Files,
        ChangeStatusDate: moment(
          history?.ChangeStatusDate?.split("T")[0]
        ).format("jYYYY-jMM-jDD"),
      };
      return obj;
    }
  );

  useEffect(() => {
    dispatch({
      type: STATUSES_HISTORY_SUCCESS,
      payload: null,
    });
  }, [selectedItemManagmentCartable.ApplicantId, activeTab]);

  useEffect(() => {
    dispatch(fetchHistoryStatuses(selectedItemManagmentCartable.ApplicantId));
  }, [selectedItemManagmentCartable.ApplicantId, activeTab]);

  //download Files
  const dlDocument = (file: any) => {
    dispatch(dlFileHandler(file.Id));
  };

  //coloumns Table
  let columns: any = [
    {
      title: "نام کاربر تغییر دهنده",
      dataIndex: "User",
      key: "User",
      width: "13%",
    },
    {
      title: "وضعیت قبلی",
      dataIndex: "OldStatusDescription",
      key: "OldStatusDescription",
      width: "11%",
    },

    {
      title: "وضعیت جدید",
      dataIndex: "NewStatusDescription",
      key: "NewStatusDescription",
      width: "11%",
    },
    {
      title: "دلیل تغییر وضعیت",
      dataIndex: "ChangeStatusReason",
      key: "ChangeStatusReason",
      width: "13%",
    },

    {
      title: "تاریخ تبدیل وضعیت",
      dataIndex: "ChangeStatusDate",
      key: "ChangeStatusDate",
      width: "13%",
    },
    {
      title: "توضیحات",
      dataIndex: "Description",
      key: "Description",
      width: "15%",
    },
    {
      title: " فایل های ارسالی",
      dataIndex: "adjusterType",
      key: "adjusterType",
      width: "20%",
      render: (text: any, record: any) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {record?.Files == null ? (
              "فایلی آپلود نگردیده است"
            ) : (
              <Collapse defaultActiveKey={["1"]} ghost className="collapse-panel-custom-whit"   >
                <Panel header="لیست فایل های آپلود شده" key={record.Id}>
                  {record?.Files == null
                    ? "فایلی آپلود نگردیده است"
                    : record?.Files?.map((file: any) => {
                        return (
                          <Tooltip
                            placement="topLeft"
                            title="مشاهده فایل ارسال شده"
                            key={file.Id}
                          >
                            <div className={"List-uploded"}>
                            <Button
                              type="text"
                              onClick={() => dlDocument(file)}
                              key={file.Id}
                              icon={
                                <img
                                  src={Download}
                                  style={{ cursor: "pointer" }}
                                  alt="download"
                                />
                              }
                            >
                             <span className="class-name"> {file.FileName}</span>
                            </Button>
                            </div>
                          </Tooltip>
                        );
                      })}
                </Panel>
              </Collapse>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loadingStatusesHistory}
        scroll={{x:1100}}
        style={{
          height: "284px",
          maxHeight: "284px",
          overflowY: "scroll",
        }}
        locale={{
          emptyText: "تاریخچه وضعیتی یافت نشد",
        }}
      />
    </>
  );
};

export default History;
