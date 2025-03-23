import React, { FC } from "react";
import InformationAdjuster from "./InformationAdjuster";
import TerminateActionExpert from "./TerminateActionExpert";
import TerminateActionBoss from "./TerminateActionBoss";
import { DetailRequestGetWay } from "../../../../../shared/ulitities/Enums/detailRequest";
import DownloadFiles from "../../../downloadFiles";

interface IDetailGeneralProps {
  selectedRequest: any;
  modelExpertGrid?: any;
  detailRequestGetWay?: any;
  closeModal?:()=>void
}
const DetailGeneral: FC<IDetailGeneralProps> = ({
  selectedRequest,
  modelExpertGrid,
  detailRequestGetWay,
  closeModal
}) => {
  return (
    <div>
      <InformationAdjuster selectedRequest={selectedRequest} />
      <DownloadFiles />
      {detailRequestGetWay === DetailRequestGetWay.Expert && (
        <TerminateActionExpert
          selectedRequest={selectedRequest}
          modelExpertGrid={modelExpertGrid} 
          closeModal={closeModal}
        />
      )}
      {detailRequestGetWay === DetailRequestGetWay.Boss && (
        <TerminateActionBoss
          selectedRequest={selectedRequest}
          modelExpertGrid={modelExpertGrid}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default DetailGeneral;
