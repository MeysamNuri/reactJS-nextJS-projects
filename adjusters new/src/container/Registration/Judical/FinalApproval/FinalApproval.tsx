import React, { FC, useState, useEffect } from "react";
import { Button, Space, Spin, ConfigProvider, Row, Col, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

//services
import APIS from "../judicalService";

//components
import PersonalInfoFeedback from "./PersonalInfoFeedback";
import CardPersonalInfoFeedback from "./CardPersonalInfoFeedback";
import FieldInfoFeedback from "./FieldInfoFeedback";
import WorkLocationFeedback from "./WorkLocationFeedback";
import WorkExperiencesFeedback from "./WorkExperiencesFeedback";
import DocumentsFeedback from "./DocumentsFeedback";
import FinalApprovalModal from "../FinalModal/FinalApprovalModal";

//misc
import errors from "../../../../assets/errorsList/finalApprovalRegistration/finalApprovalErrors";

//styles
import classes from "./FinalApproval.module.css";

//redux actions
import { isComeFromRegistration } from "../../../../redux/actions";

interface IFinalApprovalProps {
  onPrev: () => void;
}

const FinalApproval: FC<IFinalApprovalProps> = ({ onPrev }) => {
  const dispatch = useDispatch();

  const [dataState, setDataState] = useState([] as any);
  const [dataLoading, setDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const judicalDraftIdState = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result?.DraftId
  );
  const judicalDraftIdLocalStorage = localStorage.getItem("judicalDraftId");
  const judicalDraftId =
    judicalDraftIdState !== undefined
      ? judicalDraftIdState
      : judicalDraftIdLocalStorage;

  const finalizeHandler = () => {
    registerationHandler();
  };
  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };

  async function registerationHandler() {
   
    try {
      setFinalLoading(true);
      const data = await APIS.registerationjudicalFinalize(judicalDraftId);
      if (data.IsSucceed === true) {
        let result = data.Result;
        setFinalLoading(false);

        setRegCode(result?.RegestrationCode);
        setIsModalVisible(true);
        setDisableButtons(true);
      } else if (data.IsSucceed === false) {
        toast.error(data.Message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDisableButtons(false);
      }
    } catch (err) {
      setFinalLoading(false);
      setDisableButtons(false);
 
    } finally {
      setFinalLoading(false);
    }
  }

  async function getAllInfoForFinalApproval() {
    try {
      setDataLoading(true);
      const data = await APIS.registerationJudicalGetAllinfo(judicalDraftId);
      if (data.IsSucceed === true) {
        setDataState(data);
      } else if (data.IsSucceed === false) {
        toast.error(`${data.Message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
  
    } finally {
      setDataLoading(false);
    }
  }

  //lifecyclehooks here:
  useEffect(() => {
    getAllInfoForFinalApproval();
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
        {dataState.IsSucceed && (
          <div>
            <p>
              اطلاعات زیر را به دقت خوانده و در صورت تایید روی تایید نهایی کلیک
              کنید
            </p>

            <PersonalInfoFeedback
              personalInfo={dataState.Result.PersonalInfo}
            />
            <div className={classes.step}>
              <p className={classes.title}>:اعضای خانواده</p>
              <CardPersonalInfoFeedback
                familyMembers={dataState?.Result?.PersonalInfo?.FamilyMembers}
              />
            </div>

            <FieldInfoFeedback fieldlInfo={dataState.Result.FieldInfo} />

            <WorkLocationFeedback
              workLocation={dataState.Result.WorkLocationInfo}
            />

             {/* <div className={classes.step}>
              <p className={classes.title}>:سوابق کاری</p>
              <WorkExperiencesFeedback dataState={dataState} />
            </div>  */}

            {/* <div className={classes.step}>
              <p className={classes.title}>مدارک و مستندات</p>
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
        <div className={classes.button}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={finalizeHandler}
            disabled={disableButtons}
            loading={finalLoading}
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
