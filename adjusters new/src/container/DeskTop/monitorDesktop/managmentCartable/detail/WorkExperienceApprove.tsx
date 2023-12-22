import React, { useEffect, useState, useMemo, FC } from "react";
import { Table, ConfigProvider, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { CaretDownOutlined, CaretLeftOutlined } from "@ant-design/icons";
import RowWorkExperience from "../../../../AdmissionList/Documents/RowDocument";
import {
  getWorkExperienceList,
} from "../../../../AdmissionList/ServicesCartable/AdmissionListServices";
import { IAneAdjusterList } from "../../../../../shared/ulitities/Model/oneAdjuster";
import {
  IWorkExperienceApprove,
} from "../../../../../shared/ulitities/Model/workExperienceApprove";
import { approvalHistory } from "../../../../../shared/ulitities/Enums/approvalHistory";
import {
  dlWorkExperienceHandler,
  fetchHistorydocument,
} from "../../../../../redux/actions";
import { ReactComponent as Download } from "../../../../../assets/images/download.svg";

interface IWorkExperienceProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  applicantId?: number;
  selectedAdjuster?:any;
  isManagmentCartable?:boolean
}


const WorkExperienceApprove: FC<IWorkExperienceProps> = ({selectedAdjuster}) => {
  const dispatch = useDispatch();
  const [allWorkExperience, setAllWorkExperience] = useState([] as any);
  const [downloadId, setDownloadId] = useState(0);
  const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);
  const [loadingAllWorkExperience, setLoadingAllWorkExperience] = useState(
    false
  );

  const dlWorkExperiencLoading = useSelector(
    (state: any) => state.dlWorkExperience.loading
  );

  async function fetchWorkExperienceApprove() {
    try {
      setLoadingAllWorkExperience(true);
      const data = await getWorkExperienceList(selectedAdjuster.ApplicantId );
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
    fetchWorkExperienceApprove();
  }, [selectedAdjuster?.ApplicantId]);



  //download Work Experience
  const dlWorkExperience = (record: any) => {
    setDownloadId(record.CertificateId);
    dispatch(
      dlWorkExperienceHandler(
        selectedAdjuster.ApplicantId,
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
      },
      {
        title: "تاریخ پایان",
        dataIndex: "EndDate",
      },
      {
        title: "سمت",
        dataIndex: "Position",
      },
      {
        title: "مشاهده تصویر ارسالی",
        dataIndex: "adjusterType",
        key: "adjusterType",
        width: "20%",
        render: (text: any, record: any) => (
          <Button
            type="text"
            onClick={() => dlWorkExperience(record)}
            loading={
              dlWorkExperiencLoading && downloadId === record.CertificateId
                ? true
                : false
            }
            icon={<Download style={{ cursor: "pointer" }} />}
          ></Button>
        ),
      },
     
    ];
  }, [
    allWorkExperience,

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
        selectedAdjuster.ApplicantId,
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
          expandable={{
            expandedRowRender: (record) => {
              return <RowWorkExperience />;
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
      </ConfigProvider>
    </div>
  );
};

export default WorkExperienceApprove;
