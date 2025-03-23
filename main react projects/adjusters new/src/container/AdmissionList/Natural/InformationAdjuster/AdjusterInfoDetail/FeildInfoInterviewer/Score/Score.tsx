import React, { useState, FC, useEffect } from "react";
import {
  ConfigProvider,
  Button,
  Row,
  Col,
  Spin,
  Empty,
  Tooltip,
  Badge,
  Collapse,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UsergroupDeleteOutlined } from "@ant-design/icons";
import ScoreInput from "./ScoreInput";
import NewInput from "./NewInput";
import ListUploadFiles from "./listFileUploade";
import {
  sendReasonReffer,
  fetchInterviewSession,
  fetchListInterviewerScore,
  fetchListNaturalCartable,
  fetchInterviewerScore,
  updateScoreInterviewer,
  addInterviewerScore,
  interviewMinutesUploader,
  cartableReportAllInfo,
  fetchDocumentFileInterview,
} from "../../../../../../../redux/actions";
import { messageWarning } from "../../../../../../../utils/utils";
import { IAneAdjusterList } from "../../../../../../../shared/ulitities/Model/oneAdjuster";
import { IFetchScore } from "../../../../../../../shared/ulitities/Model/score";
import { adjusterType } from "../../../../../../../shared/ulitities/Enums/adjusterTypeId";
import { ReactComponent as Upload } from "../../../../../../../assets/images/upload.svg";
import "./Score.css";

interface IpScoreBoard {
  closeModal: () => void;
  oneAdjusterList?: IAneAdjusterList;
  isInterviewInvitation?: boolean;
  modelReport?: any;
}
const { Panel } = Collapse;
const Score: FC<IpScoreBoard> = ({
  closeModal,
  oneAdjusterList,
  isInterviewInvitation,
  modelReport,
}) => {
  const dispatch = useDispatch();
  const [resQuestion, setResQuestion] = useState([] as any);
  // const [submit, setSubmit] = useState(false);
  const [submitScore, setSubmitScore] = useState({} as any);
  const dataModel = useSelector(
    (state: any) => state.listNaturalCartable.modelCartable
  );
  const { scoreList } = useSelector((state: any) => state.fetchScore);
  const { updateLoading } = useSelector((state: any) => state.updateScore);
  const { addScoreLoading } = useSelector((state: any) => state.addScore);
  const { interviewerLoading, interviewerList } = useSelector(
    (state: any) => state.listInterviewerScore
  );
  const { documentFileInterviewId } = useSelector((state: any) => state.score);
  const absenceLoading = useSelector(
    (state: any) => state.score.loadingAbsense
  );
 
  const interviewTimId = useSelector(
    (state: any) => state.score.interviewSession?.Result
  );

  let absent = {
    id: oneAdjusterList?.CartableId,
    adjusterTypeId: adjusterType.natural,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Absence",
    parameter: "string",
    message: null,
    rejectReasonIds: null,
    rejectReasonTitle: "",
  };

  const questionHandler = (question: any) => {
    let interviewrs: any = [];
    interviewrs.push(question);
  };

  let interviewerScore = resQuestion?.map((item: any) => {
    return {
      interviewerId: item.id,
      interviewSessionId: interviewTimId,
      score: item.score,
      id: item.idScore,
    };
  });

  const updateScore = (id: number, value: string, findScore: IFetchScore) => {
    let newList = [...resQuestion];
    const index = newList.find((el) => el.id === id);
    if (index) {
      findScore?.Id
        ? (newList = newList.map((el: any) =>
            el.id === id ? { ...el, score: value, idScore: findScore?.Id } : el
          ))
        : (newList = newList.map((el: any) =>
            el.id === id ? { ...el, score: value } : el
          ));
    } else {
      newList.push({ id, score: value });
    }
    setResQuestion(newList);
  };

  let score = {
    cartableId: oneAdjusterList?.CartableId,
    applicantId: oneAdjusterList?.ApplicantId,
    interviewerScores: interviewerScore,
  };

  let scoreUpdate = {
    cartableId: oneAdjusterList?.CartableId,
    applicantId: oneAdjusterList?.ApplicantId,
    interviewerScores: submitScore,
  };

  //غایب
  const absentHandler = () => {
    dispatch(
      sendReasonReffer(absent, () => {
        dispatch(fetchListNaturalCartable(dataModel, () => {}));
      })
    );
  };

  //ولیدیشن نمره
  let updateListScore = () => {
    submitScore?.find((item: any) => item?.Score === "")
      ? messageWarning("همه نمرات را باید پر نمایید")
      : isInterviewInvitation
      ? dispatch(
          updateScoreInterviewer(scoreUpdate, () => {
            dispatch(
              cartableReportAllInfo(modelReport, adjusterType.natural, () =>
                closeModal()
              )
            );
          })
        )
      : dispatch(
          updateScoreInterviewer(scoreUpdate, () => {
            dispatch(fetchListNaturalCartable(dataModel, () => {}));
          })
        );
  };

  //ثبت نمره
  const submitScoreHandler = () => {
    // setSubmit(true);
    oneAdjusterList?.Average!== null &&  oneAdjusterList?.Average!==0
      ? updateListScore()
      : isInterviewInvitation
      ? dispatch(
          addInterviewerScore(
            score,
            () => {
              dispatch(fetchInterviewerScore(oneAdjusterList.ApplicantId));
            },
            () => {
              dispatch(
                cartableReportAllInfo(modelReport, adjusterType.natural, () =>
                  closeModal()
                )
              );
            }
          )
        )
      : dispatch(
          addInterviewerScore(
            score,
            () => {
              dispatch(fetchInterviewerScore(oneAdjusterList.ApplicantId));
            },
            () => {
              dispatch(fetchListNaturalCartable(dataModel, () => {}));
            }
          )
        );
  };

  //لیست نمرات-لیست نام نمایندگان-زمان مصاحبه تعیین شده
  useEffect(() => {
    dispatch(fetchInterviewSession(oneAdjusterList?.ApplicantId));
    dispatch(fetchListInterviewerScore(oneAdjusterList?.ApplicantId));
    dispatch(fetchDocumentFileInterview(oneAdjusterList?.ApplicantId));
  }, []);

  let findScoreNotNull = scoreList?.Result?.find(
    (item: any) => item.Score !== null
  );

  const handleUpload = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    let fileNames = e.target.files && e.target.files[0]?.name;
    dispatch(
      interviewMinutesUploader(
        oneAdjusterList?.ApplicantId,
        file,
        fileNames,
        () => {
          dispatch(fetchDocumentFileInterview(oneAdjusterList?.ApplicantId));
        }
      )
    );
  };

  let header = (
    <Badge
      size="default"
      count={documentFileInterviewId?.Result?.length}
      style={{ left: "267px", top: "-5px", backgroundColor: '#52c41a'  }}
    >
      لیست صورتجلسه های بارگذاری شده
    </Badge>
  );
  return (
    <div>
      <div className="nextStep absent">
        <Tooltip placement="bottom" title="بارگذاری فرم صورتجلسه مصاحبه">
          <label className="customFileUpload"  style={{width:"250px"}}  >
            <Upload />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) => handleUpload(e)}
              accept=".jpg,.jpeg,.png"
            />
            بارگذاری فرم صورتجلسه مصاحبه 
          </label>
        </Tooltip>
        <Button type="primary" onClick={absentHandler} loading={absenceLoading}>
          غیبت از مصاحبه
        </Button>
      </div>

      {documentFileInterviewId?.Result !== null && (
        <Collapse>
          <Panel header={header} key="1">
            <ListUploadFiles
              documentFileInterviewId={documentFileInterviewId}
              oneAdjusterList={oneAdjusterList}
            />
          </Panel>
        </Collapse>
      )}
      {interviewerLoading ? (
        <div className="customSpin">
          <Spin />
        </div>
      ) : (
        <div className="score">
          <ConfigProvider direction="rtl">
            <Row className="rowHeader">
              <Col span={12} className="colBorder bold">
                نام مصاحبه کنندگان
              </Col>
              <Col span={4} className="colBorder bold">
                بازه نمره
              </Col>
              <Col span={8} className="colBorder noPadding bold">
                <Row>
                  <Col span={8}>نمره</Col>
                </Row>
              </Col>
            </Row>
            {interviewerList?.Result?.InterviewerOutVMs === 0 ? (
              <Empty
                description="مصاحبه کننده ای تعریف نشده است"
                image={<UsergroupDeleteOutlined />}
                imageStyle={{ fontSize: "12px" }}
              />
            ) : findScoreNotNull?.Score !== null ? (
              interviewerList?.Result?.InterviewerOutVMs.map(
                (interview: {
                  Id: number;
                  FirstName: string;
                  FamilyName: string;
                }) => {
                  return (
                    <Row
                      className="questionRow"
                      key={interview.Id}
                      onClick={() => questionHandler(interview)}
                    >
                      <Col span={12} className="colBorder">
                        {interview.FirstName + " " + interview.FamilyName}
                      </Col>
                      <Col span={4} className="colBorder">
                        0-100
                      </Col>
                      <Col span={8} className="colBorder noPadding">
                        <Row className="driver">
                          <Col span={24} style={{ display: "flex" }}>
                            <ScoreInput
                              submitScore={submitScore}
                              setSubmitScore={setSubmitScore}
                              updateScore={updateScore}
                              interview={interview}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                }
              )
            ) : (
              interviewerList?.Result?.InterviewerOutVMs?.map(
                (interview: {
                  Id: number;
                  FirstName: string;
                  FamilyName: string;
                }) => {
                  return (
                    <Row
                      className="questionRow"
                      key={interview.Id}
                      onClick={() => questionHandler(interview)}
                    >
                      <Col span={12} className="colBorder">
                        {interview.FirstName + " " + interview.FamilyName}
                      </Col>
                      <Col span={4} className="colBorder">
                        0-100
                      </Col>
                      <Col span={8} className="colBorder noPadding">
                        <Row className="driver">
                          <Col span={24} style={{ display: "flex" }}>
                            <NewInput
                              updateScore={updateScore}
                              interview={interview}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                }
              )
            )}
          </ConfigProvider>
        </div>
      )}
      <div className="nextStep">
        <Button
          type="primary"
          loading={updateLoading || addScoreLoading}
          onClick={submitScoreHandler}
        >
          ذخیره
        </Button>
      </div>
    </div>
  );
};

export default Score;
