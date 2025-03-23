//libraries
import React, { FC, useEffect, useState } from "react";
import { ConfigProvider, Button, Space, Spin, Row, Col, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

//styles
import classes from "./FinalApproval.module.css";

//components
import CompanyInfoFeedback from "./CompanyInfoFeedback";
import WorkLocationFeedback from "./WorkLocationFeedback";
import BoardMembersFeedback from "./BoardMembersFeedback";
import WorkExperiencesFeedback from "./WorkExperiencesFeedback";
import EmployeesFeedback from "./EmployeesFeedback";
import StockholderFeedback from "./StockholderFeedback";
import DocumentsFeedback from "./DocumentsFeedback";
import FinalApprovalModal from "../FinalModal/FinalApprovalModal";

//redux actions
import {
  registerationFinalizeLegal,
  getAllInfoForFinalApprovalLegal,
  isComeFromRegistration,
} from "../../../../redux/actions";

interface IFinalApprovalProps {
  onPrev: () => void;
}

const FinalApproval: FC<IFinalApprovalProps> = ({ onPrev }) => {
  const dispatch = useDispatch();

  //const [dataState, setDataState] = useState({} as any);
  //const [dataLoading, setDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //const [regCode, setRegCode] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  //const [finalLoading, setFinalLoading] = useState(false);

  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

  const regCode = useSelector(
    (state: any) =>
      state?.registrationFinalizeLegal?.registrationFinalizeLegal?.Result
        ?.RegestrationCode
  );

  const regFinalizeLoading = useSelector(
    (state: any) => state?.registrationFinalizeLegal?.loading
  );

  const dataState = useSelector(
    (state: any) =>
      state?.getAllInfoFinalApprovalLegal?.getAllInfoForFinalApproval
  );
  const dataLoading = useSelector(
    (state: any) => state?.getAllInfoFinalApprovalLegal?.loading
  );
  const finalLoading = useSelector(
    (state: any) => state?.getAllInfoFinalApprovalLegal?.loading
  );

  const finalizeHandler = () => {
    registerationHandler();
  };
  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };

  const registerationHandler = () => {
    dispatch(
      registerationFinalizeLegal(
        legalDraftId,
        () => {},
        () => {
          setIsModalVisible(true);
          setDisableButtons(true)
        },
        () => {}
      )
    );
  };

  //lifecyclehooks
  useEffect(() => {
    dispatch(getAllInfoForFinalApprovalLegal(legalDraftId));
  }, []);

  return (
    <ConfigProvider direction="rtl">
      <div className={classes.root}>
        <h1>تایید</h1>
        {dataLoading && (
          <Space size="middle" className={classes.loading}>
            <Spin size="default" tip="در حال به روز رسانی لیست ..." />
          </Space>
        )}
        {dataState?.IsSucceed && (
          <div style={{ display: "block" }}>
            <p>
              اطلاعات زیر را به دقت خوانده و در صورت تایید روی تایید نهایی کلیک
              کنید
            </p>
            <CompanyInfoFeedback
              AdjustmentCompanyInfo={dataState.Result.AdjustmentCompanyInfo}
            />
            <WorkLocationFeedback
              WorkLocation={dataState.Result.WorkLocationInfo}
            />
            <div className={classes.step}>
              <p className={classes.title}>:عضو هیئت مدیره</p>

              <BoardMembersFeedback
                boardMembers={dataState?.Result?.BoardMembers}
              />
            </div>

            <div className={classes.step}>
              <p className={classes.title}>:سوابق مدیر عامل</p>

              <WorkExperiencesFeedback
                workExperiences={dataState?.Result?.WorkExperiences}
              />
            </div>

            <div className={classes.step}>
              <p className={classes.title}>:سهامداران</p>
              <StockholderFeedback
                stockholders={dataState?.Result?.Stockholders}
              />
            </div>

            <div className={classes.step}>
              <p className={classes.title}>:کارکنان</p>
              <EmployeesFeedback Employees={dataState?.Result?.Employees} />
            </div>

            {/* <div className={classes.step}>
              <p className={classes.title}>:مدارک و مستندات</p>
              <Row>
                <Col sm={3}></Col>
                <Col sm={3}>نام سند</Col>
                <Col xl={6}>مشاهده تصویر ارسالی</Col>
              </Row>
              {dataState?.Result?.Documents?.map((i: any) => (
                <DocumentsFeedback document={i} />
              ))}
            </div> */}
          </div>
        )}

        <div className={classes.buttonsContainer}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={finalizeHandler}
            disabled={disableButtons}
            loading={finalLoading || regFinalizeLoading}
          >
            تایید نهایی
          </Button>
          <Button onClick={prevHandler} disabled={disableButtons}>
            مرحله قبلی
          </Button>
        </div>
        <Modal
          title="بیمه مرکزی جمهوری اسلامی ایران"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <FinalApprovalModal regCode={regCode} />
        </Modal>
      </div>
    </ConfigProvider>
  );
};
export default FinalApproval;
