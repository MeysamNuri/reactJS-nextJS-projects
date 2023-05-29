import React, { useEffect, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import { Table, Tooltip, Button, Modal } from "antd";
import { fetchStockholderLegalEditToken } from "../../../../../../redux/actions";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";
import { IStackHolder } from "../../../../../../shared/ulitities/Model/stackHolder";
import { GetWay } from "../../../../../../shared/ulitities/Enums/getWay";
import CooperationendDateModal from './cooperationEndDate'

interface IStockHolderProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  applicantId?: number;
  isStockHolder?: number;
  selectedItemManagmentCartable?: any;
  isEvaluatorDesktopInformation?: number;
  activeTabCompanyMember?: string
  userIdRecognition?: number
}

const StockHolder: FC<IStockHolderProps> = ({
  oneAdjusterList,
  isStockHolder,
  selectedItemManagmentCartable,
  isEvaluatorDesktopInformation,
  activeTabCompanyMember,
  isFromReportTable,
  userIdRecognition
}) => {
  const [visible, setVisible] = useState(false)
  const [selectedStockHolder, setSelectedStockHolder] = useState<any>()
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
      CooperationEndDate:stockHolder?.EndDate===null?null: moment(stockHolder?.EndDate?.split("T")[0]).format(
        "jYYYY-jM-jD"
      ),
      IsLegal: stockHolder.IsLegal ? 'حقوقی' : 'حقیقی'
    };
    return obj;
  });
  //coloumns Table
  let columns: any = [
    {
      title: "نام ",
      dataIndex: "FullName",
      key: "FullName",
      ellipsis: false,
    },
    {
      title: "نوع ",
      dataIndex: "IsLegal",
      key: "IsLegal",
      ellipsis: true,
    },
    {
      title: "کدملی/شناسه ملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      ellipsis: true,
    },
    {
      title: "تاریخ تولد/ثبت",
      dataIndex: "BirthDate",
      key: "BirthDate",
      ellipsis: true,
    },
    {
      title: "تاریخ سهامدار شدن",
      dataIndex: "JoinDate",
      key: "JoinDate",
      ellipsis: true,
    },
    {
      title: "تاریخ پایان همکاری",
      dataIndex: "CooperationEndDate",
      key: "CooperationEndDate",
      ellipsis: true,
    },
    {
      title: "تعداد سهام",
      dataIndex: "ShareAmount",
      key: "ShareAmount",
    },
    {
      title: "عملیات",
      dataIndex: "Operation",
      key: "Operation",
      width: "9%",

      render: (value: string, record: any, index: any) => {
        return (
          <>
            {

              <Tooltip title="تاریخ پایان همکاری">
                <Button onClick={() => handleEndCoorperationModal(record)}> پایان همکاری</Button>
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
        scroll={{ y: 200 }}
        locale={{emptyText:"لیست شما خالی است"}}
        
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
        <CooperationendDateModal isFromStockHolder={true} selectedBoardMember={selectedStockHolder} userIdRecognition={userIdRecognition} closeModal={() => setVisible(false)} />
      </Modal>
    </>
  );
};

export default StockHolder;
