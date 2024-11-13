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
import axios from "axios";
import FinalApprovalModal from "../FinalModal/FinalApprovalModal";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as RemoveItem } from "../../../../assets/images/remove.svg";
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";
import {
  // sendReferLegal,
  judicialGetListDocumentsDraft,
  judicialGetListDocumentsEdit,
  judicialDeleteDocumentTypeIdDraft,
  JudicialDeleteDocumentTypeIdEdit,
  uploadDocumentJudicialDraft,
  uploadDocumentJudicialEdit,
  isComeFromRegistration,
  sendRefer,
  // getRejectReasonListApplicantDocument,
} from "../../../../redux/actions";
import classes from "./Document.module.css";
import { useHistory } from "react-router-dom";

import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

//enums
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";

const { Panel } = Collapse;

interface IDocumentsProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const Document: FC<IDocumentsProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [loading, setloading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [isSendReferSuccess, setIsSendReferSuccess] = useState(false);
  const [isLastStatusVisible, setIsLastStatusVisible] = useState(false);

  const judicalDraftIdState = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result?.DraftId
  );
  const judicalDraftIdLocalStorage = localStorage.getItem("judicalDraftId");

  const judicalDraftId =
    judicalDraftIdState !== undefined
      ? judicalDraftIdState
      : judicalDraftIdLocalStorage;

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
  const {removeDoc} = useSelector(
    (state: any) => state?.judicialDeleteDocument
  );

  const listDocoment = useSelector(
    (state: any) =>
      state?.judicialGetListDocuments?.getListDocumentJudicial?.Result
  );
  const registerationReferLoading = useSelector(
    (state: any) => state?.registerationRefer?.loading
  );
  const documentRejectReasonsList = useSelector(
    (state: any) =>
      state?.documentRejectReasons?.rejectReasonListApplicantDocument?.Result
  );
  // const deleteDocumentLoading = useSelector(
  //   (state: any) => state?.judicialDeleteDocument?.loading
  // );
  // const comeFromRegistration = useSelector(
  //   (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  // );

  //handlers
  const nextButtonHandler = () => {
    onSubmit();
  };

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
          //uploadDocumentHandlerEdit(e, documentTypeId);
          dispatch(
            uploadDocumentJudicialEdit(
              gotIdForMainEdit,
              documentTypeId,
              file,
              () => {
                dispatch(judicialGetListDocumentsEdit(gotIdForMainEdit));
              }
            )
          );
        } else {
          //uploadDocumentHandlerDraft(e, documentTypeId)
          dispatch(
            uploadDocumentJudicialDraft(
              judicalDraftId,
              documentTypeId,
              file,
              () => {
                dispatch(judicialGetListDocumentsDraft(judicalDraftId));
              }
            )
          );
        }
      }
    );
  };

  const removeFileHandler = (docId: string) => {
    if (isUserEdit) {
      dispatch(
        JudicialDeleteDocumentTypeIdEdit(gotIdForMainEdit, docId, () => {
          dispatch(judicialGetListDocumentsEdit(gotIdForMainEdit));
        })
      );
    } else {
      dispatch(
        judicialDeleteDocumentTypeIdDraft(judicalDraftId, docId, () => {
          dispatch(judicialGetListDocumentsDraft(judicalDraftId));
        })
      );
    }
  };

  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
  };

  const jwtToken = localStorage.getItem("registrationToken");

  const downloadCertificateHandlerDraft = (id: string) => {
    axios({
      url: `${HttpBaseConstant.url}/registration/draft/${judicalDraftId}/judicial/document/${id}/content`,
      method: "GET",
      responseType: "json",
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        const url = `data:image/${response?.data?.Result?.FileExtension};base64,${response?.data?.Result?.Content}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${response?.data?.Result?.Title}.${response?.data?.Result?.FileExtension}`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("error in downloading certificate: ", error);
      });
  };

  const downloadCertificateHandlerEdit = (id: string) => {
    axios({
      url: `${HttpBaseConstant.url}/document/${id}/content?id=${gotIdForMainEdit}`,
      method: "GET",
      responseType: "json",
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        const url = `data:image/${response?.data?.Result?.FileExtension};base64,${response?.data?.Result?.Content}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${response?.data?.Result?.Title}.${response?.data?.Result?.FileExtension}`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("error in downloading certificate: ", error);
      });
  };

  const sendReferHandler = () => {
    dispatch(
      sendRefer(gotIdForMainEdit, adjusterType.judical, () => {
        setIsSendReferSuccess(true);
        setIsModalVisible(true);
      })
    );
  };
  const rawFormDownloadHandler = () => { };

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      dispatch(judicialGetListDocumentsEdit(gotIdForMainEdit));
      // setIsLastStatusVisible(true);
      // dispatch(getRejectReasonListApplicantDocument(gotIdForMainEdit));
    } else {
      dispatch(judicialGetListDocumentsDraft(judicalDraftId));
    }
  }, []);

  useEffect(() => {
    if (listDocoment !== undefined) {
      const isRequiredsAndLengths = listDocoment?.map(
        (document: {
          TypeId: string;
          Title: string;
          Files: any;
          IsRequired: boolean;
          IsApproved: boolean
        }) => {
          if (document?.IsRequired && document?.Files?.length > 0) {
            return true;
          } else if (document?.IsRequired && document?.Files?.length === 0) {
            return false;
          }
           else if (!document?.IsRequired && document?.Files?.length > 0) {
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
      let finIsApproved=listDocoment?.find((f:any)=>f.IsApproved==false)
      if(finIsApproved) return setDisableNextButton(true);
    }
  }, [listDocoment]);

  return (
    <div className={classes.documensRegister}>
      <ConfigProvider direction="rtl">
        <Alert
          message="مدارک و مستندات"
          type="warning"
          showIcon
          description="لطفا تصویر مدارک و مستندات خود را رنگی و خوانا بارگذاری نمایید."
        />
        <Spin spinning={loading} delay={500}>
          <Row gutter={[16, 16]}>
            {listDocoment?.map(
              (document: {
                TypeId: string;
                Title: string;
                Files: any;
                IsRequired: boolean;
                IsApproved: boolean
              }) => {
                let documentHeader = (
                  <div className={classes.titleDocument}>
                    <span>
                      {document?.IsRequired && (
                        <span style={{ color: "red" }}>&#9733;</span>
                      )}
                      {document.Title}
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
                    <Button type="text" key={document?.TypeId}>
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
                  <Col xl={6} key={document.TypeId} offset={1}>
                    <Collapse style={{ marginTop: "15px" }} >
                      <Panel header={documentHeader} key="1">
                        <Row className={classes.titleColumn}>
                          <Col xl={8} className={classes.textCenter}>
                            عنوان
                          </Col>
                          <Col xl={8} className={classes.textCenter}>
                            مشاهده تصویر
                          </Col>
                          <Col xl={8} className={classes.textCenter}>
                            حذف
                          </Col>
                        </Row>

                        {loading ? (
                          <div className={classes.customSpin}>
                            <Spin />
                          </div>
                        ) : document?.Files?.length == 0 ? (
                          <p className={classes.noFile}>
                            لطفا مدرک مورد نظر را بارگذاری نمایید
                          </p>
                        ) : (
                              document?.Files?.map(
                                (File: { Id: string; Title: string, IsApproved: boolean }) => {
                                  return (
                                    <Row className={classes.fileConent}
                                      style={File?.IsApproved === false ? ({ backgroundColor: "#ff000054" }) : {}}
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
                                                isUserEdit
                                                  ? downloadCertificateHandlerEdit(
                                                    File.Id
                                                  )
                                                  : downloadCertificateHandlerDraft(
                                                    File.Id
                                                  )
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
                                            removeFileHandler(File.Id)
                                          }
                                          okText="بله"
                                          cancelText="خیر"
                                        >
                                          <Button type="text" loading={removeDoc}>
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
            {/* <Button
              onClick={rawFormDownloadHandler}
              className={classes.downlaodRawForm}
            >
              دانلود فرم خام مستندات
            </Button> */}
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
          </div>
        </Spin>
      </ConfigProvider>
    </div>
  );
};

export default Document;
