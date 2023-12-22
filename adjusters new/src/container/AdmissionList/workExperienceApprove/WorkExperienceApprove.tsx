import React, { useEffect, useState, useMemo, FC } from "react";
import { Table, ConfigProvider, Radio, Button, Select,Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import RowWorkExperience from "../Documents/RowDocument";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";
import {
  getWorkExperienceList,
  sendWrokExperienceList,
} from "../ServicesCartable/AdmissionListServices";
import { useRejectAllBaseInfo } from "../../Adjusters/AdjustersHook";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import {
  IWorkExperienceApprove,
  IAddWorkExperienceApprove,
} from "../../../shared/ulitities/Model/workExperienceApprove";
import { approvalHistory } from "../../../shared/ulitities/Enums/approvalHistory";
import {
  dlWorkExperienceHandler,
  fechListWorkExperienceApprove,
  fetchHistorydocument,
  deleteCartableWorkExperience
} from "../../../redux/actions";
import { messageError, messageSuccess } from "../../../utils/utils";
import {
  ALL_WORK_EXPERIENCE_CARTABLE,
  SUBMIT_CHEKED,
} from "../../../constant/cartableActionTypes";
import Download from "../../../assets/images/download.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
interface IWorkExperienceProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  isManagmentCartable?: boolean;
  activeTabInbox?: string;
  isEvaluatorDesktopInformation?: number;
}

const { Option } = Select;

const WorkExperienceApprove: FC<IWorkExperienceProps> = ({
  oneAdjusterList,
  isFromReportTable,
  activeTabInbox,
  isEvaluatorDesktopInformation, 
}) => {
  const dispatch = useDispatch();
  const [allRadio, setAllRadio] = useState(null);
  const [allWorkExperience, setAllWorkExperience] = useState([] as any);
  const [downloadId, setDownloadId] = useState(0);
  const { data: RejectAllBaseInfo, isLoading } = useRejectAllBaseInfo();
  let userRecognition = Number(localStorage.getItem("userRecognition"));

  const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);
  const [loadingAllWorkExperience, setLoadingAllWorkExperience] = useState(
    false
  );
  const [postWorkExperience, setPostWorkExperience] = useState([] as any);
  const [postWorkExperienceLoading, setPostWorkExperienceLoading] = useState(
    false
  );
  const dlWorkExperiencLoading = useSelector(
    (state: any) => state.dlWorkExperience.loading
  );
  const {deleteCartableWorkExperinceLoading,deleteCartableWorkExperienceInfo} = useSelector(
    (state: any) => state.removeNDraftWorkExperience
  );

  
  const [value, setValue] = useState(0);
  async function fetchWorkExperienceApprove() {
    try {
      setLoadingAllWorkExperience(true);
      const data = await getWorkExperienceList(
        isEvaluatorDesktopInformation === GetWay.desktop
          ? userRecognition
          : oneAdjusterList?.ApplicantId
      );
      let resWorkExperience = data?.Result?.map(
        (workExperience: IWorkExperienceApprove) => {
          let workExper = {
            CompanyId: workExperience.CompanyId,
            CompanyName: workExperience.CompanyName,
            CertificateId: workExperience.CertificateId,
            EndDate:
              workExperience?.EndDate !== null
                ? moment(workExperience?.EndDate.split("T")[0]).format(
                  "jYYYY-jM-jD"
                )
                : null,
            Id: workExperience.Id,
            IsApproved: workExperience.IsApproved,
            Position: workExperience.Position,
            RejectReasonTitle: workExperience.RejectReasonTitle,
            StartDate: moment(workExperience?.StartDate.split("T")[0]).format(
              "jYYYY-jM-jD"
            ),
            StillWorking: workExperience.StillWorking,
          };
          return workExper;
        }
      );
      data && setAllWorkExperience(resWorkExperience);
    } catch (err) {

    } finally {
      setLoadingAllWorkExperience(false);
    }
  }
  useEffect(() => {
      fetchWorkExperienceApprove()

  }, [oneAdjusterList?.ApplicantId,deleteCartableWorkExperienceInfo]);

  async function postListWorkExperience(
    worksExperience: IAddWorkExperienceApprove
  ) {
    try {
      setPostWorkExperienceLoading(true);
      const data = await sendWrokExperienceList(
        worksExperience,
        oneAdjusterList?.ApplicantId
      );
      if (data.IsSucceed === true) {
        messageSuccess("سوابق کاری به درستی آپدیت گردیدند");
        dispatch(fechListWorkExperienceApprove(oneAdjusterList?.ApplicantId));
        dispatch({ type: SUBMIT_CHEKED, payload: true });
      } else {
        messageError(data.Message);
      }
    } catch (err) {

    } finally {
      setPostWorkExperienceLoading(false);
    }
  }
  useEffect(() => {
    dispatch({ type: SUBMIT_CHEKED, payload: false });
  }, []);

  //change Radio Button
  const changeModeHandler = (e: any, id: any) => {
    setAllRadio(null);
    const newDoc = allWorkExperience?.map((el: any) => {
      if (el.Id === id) {
        return {
          ...el,
          IsApproved: e.target.value,
        };
      }
      return el;
    });
    setAllWorkExperience(newDoc);
  };
// remove document=========

const removeCartableWorkExperience = (record: any) => {
  dispatch(deleteCartableWorkExperience(
    record.Id,
    oneAdjusterList?.ApplicantId,
  ))
}


//===============
  //change All RadioButton
  const changeAllMode = (e: any) => {
    setAllRadio(e.target.value);
    const newDoc = allWorkExperience?.map((el: IWorkExperienceApprove) => {
      return {
        ...el,
        IsApproved: e.target.value,
      };
    });
    setAllWorkExperience(newDoc);
  };

  const changeInputHandler = (id: any, value: any) => {
    setValue(value);
    const newDoc = allWorkExperience?.map((el: IWorkExperienceApprove) => {
      if (el.Id === id) {
        return {
          ...el,
          RejectReasonId: value,
        };
      } else {
        return el;
      }
    });
    setAllWorkExperience(newDoc);
  };

  const submitWorkExperienceHandler = () => {
    const dataWorkExperience: IAddWorkExperienceApprove = allWorkExperience
      .filter((el: any) => {
        if (el.IsApproved === false || el.IsApproved) return el;
      })
      ?.map((el: any) => {
        return {
          id: el.Id,
          isApproved: el.IsApproved,
          rejectReasonId: el.IsApproved === false ? el.RejectReasonId : null,
          certificateId: el.CertificateId,
        };
      });
    postListWorkExperience(dataWorkExperience);
    dispatch({
      type: ALL_WORK_EXPERIENCE_CARTABLE,
      payload: dataWorkExperience,
    });
  };

  //download Work Experience
  const dlWorkExperience = (record: any) => {
    setDownloadId(record.CertificateId);
    dispatch(
      dlWorkExperienceHandler(
        isEvaluatorDesktopInformation === GetWay.desktop
          ? userRecognition
          : oneAdjusterList?.ApplicantId,
        record.CertificateId
      )
    );
  };

  let columns = useMemo(() => {
    return [
      {
        title: "شرکت",
        dataIndex: "CompanyName",
      },
      {
        title: "تاریخ شروع",
        dataIndex: "StartDate",
        width: "11%",
      },
      {
        title: "تاریخ پایان",
        dataIndex: "EndDate",
        width: "11%",
      },
      {
        title: "سمت",
        dataIndex: "Position",
        width: "11%",
      },
      {
        title: "عملیات",
        dataIndex: "adjusterType",
        key: "adjusterType",
        width: "17%",
        render: (text: any, record: any) => (
          <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip placement="topLeft" title="حذف مدرک">
            <Button 
            type="text"
            onClick={() => removeCartableWorkExperience(record)}
            icon={<Trash />}
            loading={deleteCartableWorkExperinceLoading}
            >
            </Button>
            {/* <Trash style={{ cursor: "pointer" }}  /> */}
          </Tooltip>
          <Button
            type="text"
            onClick={() => dlWorkExperience(record)}
            loading={
              dlWorkExperiencLoading && downloadId === record.CertificateId
                ? true
                : false
            }
            icon={
              <img
                src={Download}
                alt="download"
                style={{ cursor: "pointer" }}
              />
            }
          ></Button>
          </div>
        ),
      },
      isFromReportTable ||
        oneAdjusterList?.ApplicantId === undefined ||
        activeTabInbox === "2"
        ? {}
        : {
          title: (
            <Radio.Group onChange={changeAllMode} value={allRadio}>
              <Radio value={false}>رد</Radio>
              <Radio value={true}>تایید</Radio>
            </Radio.Group>
          ),
          dataIndex: "IsApproved",
          key: "IsApproved",
          width: "20%",
          render: (value: any, record: any, index: any) => {
            return (
              <Radio.Group
                onChange={(e) => changeModeHandler(e, record.Id)}
                value={value}
              >
                <Radio value={false}>رد</Radio>
                <Radio value={true}>تایید</Radio>
              </Radio.Group>
            );
          },
        },
      isFromReportTable ||
        oneAdjusterList?.ApplicantId === undefined ||
        activeTabInbox === "2"
        ? {}
        : {
          title: "دلیل رد",
          dataIndex: "RejectReasonTitle",
          render: (value: string, record: any) => {
            return (
              <>
                {/* <TextArea
                    disabled={record.IsApproved !== false}
                    defaultValue={value}
                    onBlur={(e: any) => changeInputHandler(e, record.Id)}
                    allowClear
                    autoSize
                  /> */}
                <Select
                  style={{ width: "121px" }}
                  placeholder="انتخاب نمایید"
                  defaultValue={value}
                  onChange={(value) => changeInputHandler(record.Id, value)}
                  loading={isLoading}
                  allowClear
                  dropdownMatchSelectWidth={900}
                >
                  {RejectAllBaseInfo?.Result?.map(
                    ({ Id, Title }: { Id: number; Title: string }) => (
                      <Option key={Id} value={Id}>
                        {Title}
                      </Option>
                    )
                  )}
                </Select>
              </>
            );
          },
        },
    ];
  }, [
    changeInputHandler,
    changeModeHandler,
    changeAllMode,
    allWorkExperience,
    allRadio,
  ]);
  const handelExpand = (record: any, e: any) => {
    var keys = [];
    if (record) {
      keys.push(record.Id);
    }
    setExpandedRowKeys([...keys]);
    dispatch(
      fetchHistorydocument(
        e.CertificateId,
        isEvaluatorDesktopInformation == GetWay.desktop
          ? userRecognition
          : oneAdjusterList?.ApplicantId,
        approvalHistory.workCertificate
      )
    );
  };

  return (
    <div className="documentAdmissionList">
      <ConfigProvider direction="rtl">
        <Table
          dataSource={allWorkExperience} 
          pagination={false}
          columns={columns}
          loading={loadingAllWorkExperience}
          scroll={{ y: 136 }}
          rowKey={(record) => record.Id}
          locale={{emptyText:"لیست شما خالی است"}}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <RowWorkExperience rejectAllBaseInfo={RejectAllBaseInfo} />
              );
            },
            onExpand: (record, e) => {
              handelExpand(record, e);
            },
            expandIcon: (props) => {
              if (props.expanded) {
                return (
                  <a
                    style={{ color: "black" }}
                    onClick={(e) => {
                      props.onExpand(props.record, e);
                    }}
                  >
                    <CaretDownOutlined />
                  </a>
                );
              } else {
                return (
                  <a
                    style={{ color: "black" }}
                    onClick={(e) => {
                      props.onExpand(props.record, e);
                    }}
                  >
                    <CaretLeftOutlined />
                  </a>
                );
              }
            },
          }}
        />

        {oneAdjusterList?.ApplicantId !== undefined &&
          activeTabInbox !== "2" &&
          isEvaluatorDesktopInformation !== GetWay.desktop &&
          !isFromReportTable && (
            <div className="submit marginTop  buttonModal">
              <Button
                type="primary"
                onClick={submitWorkExperienceHandler}
                loading={postWorkExperienceLoading}
              >
                ذخیره
              </Button>
            </div>
          )}
      </ConfigProvider>
    </div>
  );
};

export default WorkExperienceApprove;
