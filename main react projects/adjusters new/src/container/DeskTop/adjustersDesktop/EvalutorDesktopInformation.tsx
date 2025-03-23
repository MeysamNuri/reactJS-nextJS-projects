import React from "react";
import AdjusterInfoDetail from "../../AdmissionList/Legal/InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import AdjusterInfoDetailNatural from "../../AdmissionList/Natural/InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import AdjusterInfoDetailJudical from "../../AdmissionList/Judicial/InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";

const EvaluatorDesktopInformation = () => {
  let userRecognitionAdjuster = Number(
    localStorage.getItem("userRecognitionAdjusterType")
  );

  return (
    <div  style={{padding:"20px"}} >     
      {userRecognitionAdjuster == adjusterType.natural ? ( 
        <AdjusterInfoDetailNatural
          isEvaluatorDesktopInformation={GetWay.desktop}
        />
      ) : userRecognitionAdjuster == adjusterType.judical ? (
        <AdjusterInfoDetailJudical
          isEvaluatorDesktopInformation={GetWay.desktop}
        />
      ) : (
        <AdjusterInfoDetail isEvaluatorDesktopInformation={GetWay.desktop} />
      )}
    </div>
  ); 
};

export default EvaluatorDesktopInformation;
