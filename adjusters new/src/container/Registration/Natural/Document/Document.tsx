import React, { useState, useEffect, FC } from "react";
import {
  ConfigProvider,
  Row,
  Col,
  Button,
  Collapse,
  Tooltip,
  Popconfirm,
  Spin,
  Modal,
  Alert,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as RemoveItem } from "../../../../assets/images/remove.svg";
import { useHistory } from "react-router-dom";

//redux actions
import {
  fetchWorkExperienceEdit,
  fetchWorkExperienceDraft,
  getListDocumentsDraft,
  getListDocumentsEdit,
  uploadDocumentNaturalDraft,
  uploadDocumentNaturalEdit,
  removeDocumentTypeIdDraft,
  removeDocumentTypeIdEdit,
  downloadDocumentDraft,
  downloadDocumentEdit,
  isComeFromRegistration,
  sendRefer,
  downloadRawFormCriminal,
  downloadRawFormNonAddiction,
  // getRejectReasonListApplicantDocument,
} from "../../../../redux/actions";

//styles
import classes from "./Document.module.css";

//components
import FinalApprovalModal from "../FinalModal/FinalApprovalModal";
import LastStatus from "../../lastStatus/LastStatus";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

//enums
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import {
  workTaskFlowId,
  workFlowTask,
} from "../../../../shared/ulitities/Enums/workTaskFlow";

//apis
import { apiRegistrationToken } from "../../../../httpServices/service";

const { Panel } = Collapse;

interface IDocumentsProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const Document: FC<IDocumentsProps> = ({ onSubmit, onPrev }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [isSendReferSuccess, setIsSendReferSuccess] = useState(false);
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  // const draftIdLocalStorage = useSelector(
  //   (state: any) => state.NewDraftId.newId
  // );
  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");

  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const isUserEdit = localStorage.getItem("userEdit");

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const referMessage = useSelector(
    (state: any) => state?.sendReferNatural?.refer?.Message
  );
  const listDocument = useSelector(
    (state: any) =>
      state?.getListDocumentsNatural?.getListDocumentNatural?.Result
  );
  const loading = useSelector(
    (state: any) => state?.getListDocumentsNatural?.loading
  );
  const removeLoading = useSelector(
    (state: any) => state?.naturalRemoveDocs?.loading
  );

  const loadingUpload = useSelector(
    (state: any) => state?.uploadDocumentNatural?.uploadDocumentNatural?.loading
  );
  // const comeFromRegistration = useSelector(
  //   (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  // );
  const registerationReferLoading = useSelector(
    (state: any) => state?.registerationRefer?.loading
  );
  const downloadRawFormEditNaturalCriminalLoading = useSelector(
    (state: any) => state?.downloadRawFormEditNatural?.loadingCriminalRawForm
  );
  const downloadRawFormEditNaturalNonAdictionLoading = useSelector(
    (state: any) => state?.downloadRawFormEditNatural?.loadingNonAddiction
  );
  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );

  const documentRejectReasonsList = useSelector(
    (state: any) =>
      state?.documentRejectReasons?.rejectReasonListApplicantDocument?.Result
  );

  const uploadDocumentHandler = (e: any, documentTypeId: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];

    fileExtentionValidator(
      e,
      500000,
      ["image/jpg", "image/jpeg", "image/png"],
      () => {
        if (isUserEdit) {
          dispatch(
            uploadDocumentNaturalEdit(
              gotIdForMainEdit,
              documentTypeId,
              file,
              () => {
                dispatch(getListDocumentsEdit(gotIdForMainEdit));
              }
            )
          );
        } else {
          dispatch(
            uploadDocumentNaturalDraft(draftId, documentTypeId, file, () => {
              dispatch(getListDocumentsDraft(draftId));
            })
          );
        }
      }
    );
  };

  //next Step Button
  const nextButtonHandler = () => {
    onSubmit();
  };

  //remove File Handler
  const removeFileHandlerDraft = (docId: string) => {
    dispatch(
      removeDocumentTypeIdDraft(draftId, docId, () => {
        dispatch(getListDocumentsDraft(draftId));
      })
    );
  };
  const removeFileHandlerEdit = (docId: string) => {
    dispatch(
      removeDocumentTypeIdEdit(gotIdForMainEdit, docId, () => {
        dispatch(getListDocumentsEdit(gotIdForMainEdit));
      })
    );
  };

  const prevHandler = () => {
    onPrev();
    if (isUserEdit) {
      dispatch(fetchWorkExperienceEdit(gotIdForMainEdit));
    } else {
      dispatch(fetchWorkExperienceDraft(draftId));
      dispatch(isComeFromRegistration(false));
    }
  };

  const downloadDocumentHandler = (Id: string) => {
    if (isUserEdit) {
      dispatch(downloadDocumentEdit(gotIdForMainEdit, Id));
    } else {
      dispatch(downloadDocumentDraft(draftId, Id));
    }
  };

  const sendReferHandler = () => {
    dispatch(
      sendRefer(gotIdForMainEdit, adjusterType.natural, () => {
        setIsSendReferSuccess(true);
        setIsModalVisible(true);
      })
    );
  };

  const rawFormCriminalRecordDownloadHandler = () => {
    dispatch(downloadRawFormCriminal(gotIdForMainEdit));
  };

  const rawFormNonAddictionDownloadHandler = () => {
    dispatch(downloadRawFormNonAddiction(gotIdForMainEdit));
  };

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(getListDocumentsEdit(gotIdForMainEdit));
      if (
        resultLogin?.ApplicantStatusId ===
        workTaskFlowId?.ReturnToApplicantToCompleteDossier
      ) {
        setIsLastStatusVisible(true);
      }
      // resultLogin?.ApplicantStatusId !==   workTaskFlowId?.ReturnToApplicantToCompleteDossier &&
      //   dispatch(getRejectReasonListApplicantDocument(gotIdForMainEdit));
    } else {
      dispatch(getListDocumentsDraft(draftId));
    }
  }, []);

  useEffect(() => {
    if (listDocument !== undefined) {
      const isRequiredsAndLengths = listDocument?.map(
        (document: {
          TypeId: string;
          Title: string;
          Files: any;
          IsRequired: boolean;
          IsApproved:boolean
        }) => {
          if (document?.IsRequired && document?.Files?.length > 0) {
            return true;
          } else if (document?.IsRequired && document?.Files?.length === 0) {
            return false;
          } else if (!document?.IsRequired && document?.Files?.length > 0) {
            return true;
          } else if (!document?.IsRequired && document?.Files?.length === 0) {
            return true;
          }
        }
      );
      if (isRequiredsAndLengths?.every((i: boolean) => i === true)) {
        setDisableNextButton(false);
      } else {
        setDisableNextButton(true);
      }
      let finIsApproved=listDocument?.find((f:any)=>f.IsApproved==false)
      if(finIsApproved) return setDisableNextButton(true);
    }
  }, [listDocument]);

  return (
    <div className={classes.documensRegister}>
      {resultLogin?.ApplicantStatusId ===
      workTaskFlowId?.ReturnToApplicantToCompleteDossier ? (
        <ConfigProvider direction="rtl">
          <Alert
            message="متقاضی محترم "
            description="لطفا 
          پس از بارگذاری مدارک 
          اصل مدارک سوپیشینه، عدم اعتیاد، تاییدیه سابقه کار رضایت عملکرد عدم رابطه استخدامی ( فقط برای متقاضیانی که در صنعت بیمه مشغول بوده اند( جهت رعایت ماده آئین نامه 85)) 
          را به بیمه مرکزی اداره پذیرش ارزیابان ارسال نمایید"
            type="error"
            showIcon
            className="alertDanger"
          />
          <Alert
            message="مدارک و مستندات"
            type="warning"
            showIcon
            description="لطفا تصویر مدارک و مستندات خود را رنگی و خوانا بارگذاری نمایید."
          />
        </ConfigProvider>
      ) : (
        <ConfigProvider direction="rtl">
          <Alert
            message="مدارک و مستندات"
            type="warning"
            showIcon
            description="لطفا تصویر مدارک و مستندات خود را رنگی و خوانا بارگذاری نمایید."
          />
        </ConfigProvider>
      )}
      {isUserEdit &&
        resultLogin.ApplicantStatusId ==
          workTaskFlowId.ReturnToApplicantToCompleteDossier && (
          <div className={classes.downlaodRawForm}>
            {" "}
            <Button
              onClick={rawFormCriminalRecordDownloadHandler}
              loading={downloadRawFormEditNaturalCriminalLoading}
            >
              دانلود فرم خام سو پیشینه
            </Button>
            <Button
              onClick={rawFormNonAddictionDownloadHandler}
              loading={downloadRawFormEditNaturalNonAdictionLoading}
            >
              دانلود فرم خام عدم اعتیاد
            </Button>
          </div>
        )}

      <ConfigProvider direction="rtl">
        <Spin spinning={loading} delay={500}>
          <Row gutter={[16, 16]} className={classes.marginTop}>
            {listDocument?.map(
              (document: {
                TypeId: string;
                Title: string;
                Files: any;
                IsRequired: boolean;
                IsApproved:boolean
              }) => {
                let documentHeader = (
                  <div className={classes.titleDocument}>
                    <span>
                      {document?.IsRequired && (
                        <span style={{ color: "red" }}>&#9733;</span>
                      )}
                      {document.Title}{" "}
                      {document.Files?.length > 0 ? (
                        <span className={classes.badge}>
                          {document.Files?.length}
                        </span>
                      ) : (
                        <span className={classes.badgeRed}>
                          {document.Files?.length}
                        </span>
                      )}
                    </span>
                    {loadingUpload && <Spin />}

                    <Button type="text"    disabled={document.Files?.length > 0}   >
                      <Tooltip placement="topLeft" title="بارگذاری فایل">
                        <label className={classes.customUpload}>
                          <Upload />
                          <input
                            type="file"
                            onChange={(e) =>
                              uploadDocumentHandler(e, document?.TypeId)
                            }
                            accept="image/png, image/jpeg, image/jpg"
                            disabled={document.Files?.length > 0}
                          />
                        </label>
                      </Tooltip>
                    </Button>
                  </div>
                );
                return (
                  <Col xl={6} key={document.TypeId} offset={1}>
                    <Collapse>
                      <Panel header={documentHeader} key="1"  style={document?.IsApproved===false?({backgroundColor:"#ff000054"}):{}}>
                        <Row className={classes.titleColumn}>
                          <Col xl={8} className={classes.textCenter}>
                            عنوان
                          </Col>
                          <Col xl={8} className={classes.textCenter}>
                            دانلود تصویر
                          </Col>
                          <Col xl={8} className={classes.textCenter}>
                            حذف
                          </Col>
                        </Row>

                        {loading ? (
                          <div className={classes.customSpin}>
                            <Spin />
                          </div>
                        ) : document?.Files?.length === 0 ? (
                          <p className={classes.noFile}>
                            لطفا مدرک مورد نظر را بارگذاری نمایید
                          </p>
                        ) : (
                          document?.Files?.map(
                            (File: { Id: string; Title: string ,IsApproved:boolean}) => {
                              return (
                                <Row
                                  className={classes.fileConent}
                                  key={File.Id}
                                  style={File?.IsApproved===false?({backgroundColor:"#ff000054"}):{}}
                                >
                                  <Col xl={8} className={classes.textCenter}>
                                    {File.Title}
                                  </Col>
                                  <Col xl={8} className={classes.textCenter}>
                                    <Button type="text">
                                      <Tooltip
                                        placement="topLeft"
                                        title="دانلود فایل"
                                      >
                                        <a
                                          onClick={() =>
                                            downloadDocumentHandler(File.Id)
                                          }
                                        >
                                          <Download />
                                        </a>
                                      </Tooltip>
                                    </Button>
                                  </Col>
                                  <Col xl={8} className={classes.textCenter}>
                                    <Popconfirm
                                      title="از حذف سند مورد نظر مطمئن هستید؟"
                                      onConfirm={() =>
                                        isUserEdit
                                          ? removeFileHandlerEdit(File.Id)
                                          : removeFileHandlerDraft(File.Id)
                                      }
                                      okText="بله"
                                      cancelText="خیر"
                                    >
                                      <Button type="text" loading={removeLoading}>
                                        <Tooltip
                                          placement="topLeft"
                                          title="حذف"
                                        >
                                          <RemoveItem />
                                        </Tooltip>
                                      </Button>
                                    </Popconfirm>
                                  </Col>
                                </Row>
                              );
                            }
                          )
                        )}
                      </Panel>
                    </Collapse>
                  </Col>
                );
              }
            )}
          </Row>

          <div className={classes.nextStep}>
            {isUserEdit ? (
              <Button
                type="primary"
                onClick={sendReferHandler}
                loading={registerationReferLoading}
                disabled={isSendReferSuccess || disableNextButton}
              >
                تایید نهایی ویرایش و ارسال به کارشناس پذیرش
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                onClick={nextButtonHandler}
                disabled={disableNextButton}
              >
                مرحله بعدی
              </Button>
            )}

            <Button onClick={prevHandler} disabled={isSendReferSuccess}>
              مرحله قبلی
            </Button>
          </div>
          {/*    <Modal
            title="آخرین وضعیت متقاضی:"
            visible={isLastStatusVisible}
            footer={null}
            onOk={() => setIsLastStatusVisible(false)}
            onCancel={() => setIsLastStatusVisible(false)}
            width={500}
            centered
          > */}
          {/* <LastStatus /> */}
          {/*  {resultLogin?.ApplicantStatusId ===
            workTaskFlowId?.ReturnToApplicantToCompleteDossier ? (
              <LastStatus closModal={() => setIsLastStatusVisible(false)} />
            ) : (
              documentRejectReasonsList?.map((i: any) => (
                <div>
                  <span>{i?.Title}</span>:<span>{i?.Description}</span>
                </div>
              ))
            )}
          </Modal> */}
          <Modal
            title="بیمه مرکزی جمهوری اسلامی ایران"
            visible={isModalVisible}
            onOk={() => {
              setIsModalVisible(false);
              history.push("/adjuster-registration");
            }}
            onCancel={() => {
              setIsModalVisible(false);
              history.push("/adjuster-registration");
            }}
            footer={null}
          >
            <FinalApprovalModal regCode={referMessage} />
          </Modal>
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default Document;
