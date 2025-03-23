//libraries
import React, { useState, useEffect, FC } from "react";
import {
  ConfigProvider,
  Row,
  Col,
  Button,
  Collapse,
  Modal,
  Tooltip,
  Popconfirm,
  Alert,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as RemoveItem } from "../../../../assets/images/remove.svg";

//redux actions
import {
  // sendReferLegal,
  fetchDocumentsDraftLegal,
  fetchDocumentsEditLegal,
  removeDocumentTypeIdDraftLegal,
  removeDocumentTypeIdEditLegal,
  uploadDocumentLegalDraft,
  uploadDocumentLegalEdit,
  downloadDocumentLegalEdit,
  downloadDocumentLegalDraft,
  isComeFromRegistration,
  sendRefer,
  // getRejectReasonListApplicantDocument,
} from "../../../../redux/actions";

//styles
import classes from "./Document.module.css";

//apis
import APIS from "../legalService";

//components
import FinalApprovalModal from "../FinalModal/FinalApprovalModal";

//enums
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

const { Panel } = Collapse;

interface IDocumentsProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const Document: FC<IDocumentsProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [isSendReferSuccess, setIsSendReferSuccess] = useState(false);
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const legalDraftIdState = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId?.Result?.DraftId
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state?.newDraftLegalId?.newLegalId
  );
  const legalDraftId =
    legalDraftIdState !== undefined ? legalDraftIdState : draftIdLocalStorage;

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
    (state: any) => state?.sendReferLegal?.refer?.Message
  );
  const listDocument = useSelector(
    (state: any) => state?.getDocumentsLegal?.getDocuments?.Result
  );
  const loadingDelet = useSelector(
    (state: any) => state?.deleteDocumentLegal?.loading
  );
  const comeFromRegistration = useSelector(
    (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  );
  const registerationReferLoading = useSelector(
    (state: any) => state?.registerationRefer?.loading
  );
  const documentRejectReasonsList = useSelector(
    (state: any) =>
      state?.documentRejectReasons?.rejectReasonListApplicantDocument?.Result
  );

  const getListDocumentsEdit = () => {
    let selectableDocument = {
      applicantId: gotIdForMainEdit,
      adjusterType: adjusterType.legal,
      category: 0,
    };
    dispatch(fetchDocumentsEditLegal(selectableDocument));
  };

  //Handlers

  const uploadDocumentHandler = (e: any, documentTypeId: string) => {
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
            uploadDocumentLegalEdit(
              gotIdForMainEdit,
              file,
              documentTypeId,
              () => {
                getListDocumentsEdit();
              }
            )
          );
        } else {
          dispatch(
            uploadDocumentLegalDraft(legalDraftId, file, documentTypeId, () => {
              dispatch(fetchDocumentsDraftLegal(legalDraftId));
            })
          );
        }
      }
    );
  };

  const removeFileHandlerDraft = (docId: string) => {
    //removeDocumentTypeIdDraft(legalDraftId, docId);
    dispatch(
      removeDocumentTypeIdDraftLegal(legalDraftId, docId, () => {
        dispatch(fetchDocumentsDraftLegal(legalDraftId));
      })
    );
  };
  const removeFileHandlerEdit = (docId: string) => {
    //removeDocumentTypeIdEdit(gotIdForMainEdit, docId)
    dispatch(
      removeDocumentTypeIdEditLegal(gotIdForMainEdit, docId, () => {
        getListDocumentsEdit();
      })
    );
  };

  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };
  const nextHandler = () => {
    onSubmit();
  };

  const downloadDocumentHanlder = (id: string) => {
    if (isUserEdit) {
      dispatch(downloadDocumentLegalEdit(gotIdForMainEdit, id));
    } else {
      dispatch(downloadDocumentLegalDraft(legalDraftId, id));
    }
  };

  const sendReferHandler = () => {
    dispatch(
      sendRefer(gotIdForMainEdit, adjusterType.legal, () => {
        setIsSendReferSuccess(true);
        setIsModalVisible(true);
      })
    );
  };

  const rawFormDownloadHandler = () => {};

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      getListDocumentsEdit();
      // dispatch(getRejectReasonListApplicantDocument(gotIdForMainEdit));
      // setIsLastStatusVisible(true);
    } else {
      dispatch(fetchDocumentsDraftLegal(legalDraftId));
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
    }
  }, [listDocument]);

  return (
    <div className={classes.documensRegister}>
      <ConfigProvider direction="rtl">
        <Alert
          message="مدارک و مستندات"
          type="warning"
          showIcon
          description="لطفا تصویر مدارک و مستندات خود را رنگی و خوانا بارگذاری نمایید."
        />

        <Row gutter={[16, 16]} className={classes.marginTop}>
          {listDocument?.map(
            (document: {
              TypeId: string;
              Title: string;
              Files: any;
              IsRequired: boolean;
            }) => {
              let documentHeader = (
                <div className={classes.titleDocument}>
                  <span>
                    {document?.IsRequired && (
                      <span style={{ color: "red" }}>&#9733;</span>
                    )}
                    {document?.Title}
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
                  <Button type="text">
                    <Tooltip placement="topLeft" title="بارگذاری فایل">
                      <label className={classes.customUpload}>
                        <Upload />
                        <input
                          type="file"
                          onChange={(e) =>
                            uploadDocumentHandler(e, document?.TypeId)
                          }
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </label>
                    </Tooltip>
                  </Button>
                </div>
              );
              return (
                <Col xl={6} key={document?.TypeId}>
                  <Collapse>
                    <Panel header={documentHeader} key="1">
                      <Row>
                        <Col xl={8} className={classes.textCenter}>
                          عنوان
                        </Col>
                        <Col xl={8} className={classes.textCenter}>
                          مشاهده تصویر ارسالی
                        </Col>
                        <Col xl={8} className={classes.textCenter}>
                          حذف
                        </Col>
                      </Row>

                      {document?.Files?.map(
                        (File: { Id: string; Title: string }) => {
                          return (
                            <Row className={classes.fileConent} key={File.Id}>
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
                                        downloadDocumentHanlder(File.Id)
                                      }
                                      download
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
                                  <Button type="text">
                                    <Tooltip placement="topLeft" title="حذف">
                                      <RemoveItem />
                                    </Tooltip>
                                  </Button>
                                </Popconfirm>
                              </Col>
                            </Row>
                          );
                        }
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
              onClick={nextHandler}
              disabled={disableNextButton}
            >
              مرحله بعدی
            </Button>
          )}
          <Button onClick={prevHandler} disabled={isSendReferSuccess}>
            مرحله قبلی
          </Button>
          {/* <Button
              onClick={rawFormDownloadHandler}
              className={classes.downlaodRawForm}
            >
              دانلود فرم خام مستندات
            </Button> */}
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
          <Modal
            title="آخرین وضعیت متقاضی:"
            visible={isLastStatusVisible}
            footer={null}
            onOk={() => setIsLastStatusVisible(false)}
            onCancel={() => setIsLastStatusVisible(false)}
            width={500}
            centered
          >
            {documentRejectReasonsList?.map((i: any) => (
              <div>
                <span>{i?.Title}</span>:<span>{i?.Description}</span>
              </div>
            ))}
          </Modal>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default Document;
