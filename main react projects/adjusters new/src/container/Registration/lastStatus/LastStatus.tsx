import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import {getRejectReasonListApplicantDocument} from '../../../redux/actions'
import { workTaskFlowId } from "../../../shared/ulitities/Enums/workTaskFlow";


interface ILastStatusProps {
  closModal?: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const LastStatus: FC<ILastStatusProps> = ({ closModal }) => {
  // const dispatch = useDispatch();
  // const adjusterStatus = useSelector(
  //   (state: any) =>
  //     state?.sendNatAndRegCodes?.response?.Result?.ApplicantStatusTitle
  // );

  // useEffect(() => {
  //   dispatch(getRejectReasonListApplicantDocument(gotIdForMainEdit))
  // }, [])

  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );
  // const idEditLocalStorage = useSelector(
  //   (state: any) => state?.sendNatAndRegCodes?.editId
  // );
  // const idEditState = useSelector(
  //   (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  // );
  // const gotIdForMainEdit =
  //   idEditState !== undefined ? idEditState : idEditLocalStorage;

  const { loadingRejectReason, rejectReason } = useSelector(
    (state: any) => state?.applicantRejectReasons
  );
  const {
    loadingWorkExperienceRejectReason,
    workExperienceRejectReason,
  } = useSelector((state: any) => state?.workExperienceRejectReasons);

  // const documentRejectReasonsList = useSelector(
  //   (state: any) =>
  //     state?.documentRejectReasons?.rejectReasonListApplicantDocument?.Result
  // );
  const { loading, rejectReasonListApplicantDocument } = useSelector(
    (state: any) => state?.documentRejectReasons
  );

  return (
    <>
      {resultLogin?.ApplicantStatusId ===
      workTaskFlowId?.ReturnToApplicantToCompleteDossier ? (
        <>
          <div>
            ارزیاب محترم, با توجه به تایید مدارک و قبولی در مصاحبه ارزیابی
            خسارت, لطفا نسبت به تکمیل و ارسال مدارک, اقدام کنید
          </div>
          <br />
        </>
      ) : (
        <>
          <h6 style={{ color: "#F7AF3E", fontSize: "1rem" }}>دلایل بازگشت:</h6>
          <ol className="listStyleType">
            {loadingRejectReason ? (
              <div className="example">
                <Spin indicator={antIcon} />
              </div>
            ) : (
              rejectReason?.Result?.map((i: any, index: any) => (
                <li key={index}>{i?.Title}</li>
              ))
            )}
          </ol>
        </>
      )}
      <br />

      {workExperienceRejectReason?.Result?.length !== 0 &&
        resultLogin?.ApplicantStatusId !==
          workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
        loadingWorkExperienceRejectReason === false &&
        workExperienceRejectReason?.Result?.length !== 0 && (
          <h6 style={{ color: "#F7AF3E", fontSize: "1rem" }}>سوابق کاری:</h6>
        )}

      {workExperienceRejectReason?.Result?.length !== 0 &&
        loadingWorkExperienceRejectReason === false &&
        workExperienceRejectReason?.Result?.map((i: any) => (
          <div>{i?.Description}</div>
        ))}
      <br />

      {rejectReasonListApplicantDocument?.Result?.length !== 0 &&
        loading === false && (
          <h6 style={{ color: "#F7AF3E", fontSize: "1rem" }}>
            مدارک و مستندات:
          </h6>
        )}

      <ol className="listStyleType">
        {rejectReasonListApplicantDocument?.Result?.length !== 0 &&
          loading === false &&
          rejectReasonListApplicantDocument?.Result?.map((i: any) => (
            <li>
              <span>{i?.Title}</span>:<span>{i?.Description}</span>
            </li>
          ))}
      </ol>

      <Button
        block
        onClick={closModal}
        style={{ backgroundColor: "#18A979", color: "#fff" }}
      >
        متوجه شدم
      </Button>
    </>
  );
};

export default LastStatus;
