import React, { FC } from "react";
import { IAneAdjusterList } from "../../shared/ulitities/Model/oneAdjuster";
import {
  Table,
  Button,
  Space,
  Modal,
  Pagination,
  ConfigProvider,
  Popconfirm,
  Tooltip,
  Input,
} from "antd";
import moment from "jalali-moment";

interface IIndicatorProps {
  oneAdjusterList: IAneAdjusterList;
  closeModal: any;
}
const Indicator: FC<IIndicatorProps> = ({ oneAdjusterList }) => {
  let dataSource = oneAdjusterList?.ApplicantForbiddens?.map((item: any) => {
    let obj = {
      Id: item.Id,
      key: item.ApplicantId,
      ApplicantId: item.ApplicantId,
      ForbiddenResult: item.ForbiddenResult,
      Flag: item.Flag,
      CreationDateTime: moment(item?.CreationDateTime?.split("T")[0]).format(
        "jYYYY-jMM-jDD"
      ),
    };
    return obj;
  });
 //coloumns Table
 let columns: any = [
  
    {
      title: "تاریخ به روز رسانی شاخص",
      dataIndex: "CreationDateTime",
      key: "CreationDateTime",
      width: "10%",
    },
    
    {
      title: "شرح شاخص",
      dataIndex: "ForbiddenResult",
      key: "ForbiddenResult",
      width: "15%",
    },
    
  ];



  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        
      />
    </div>
  );
};

export default Indicator;
