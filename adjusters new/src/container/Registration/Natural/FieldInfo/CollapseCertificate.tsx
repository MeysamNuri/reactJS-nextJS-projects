//libraries
import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Input, Tooltip, Popconfirm, Alert ,Spin} from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { Icon } from 'sanhab-components-library'


//redux actions
import {
  inquireSubFieldInfoDraft,
  sendInquireFeildCertificateEdit,
  uploadCertificateSubFieldInfoDraft,
  getFieldInfoDraft,
  noInquireSubFieldCertificateUploadEdit,
  subFieldInfoNaturalInquireds,
  deleteNaturalSubFieldInfoEdit,
  getSubFieldInfoEdit,
  deleteSubFieldInfoDraft,
} from "../../../../redux/actions";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import classes from "./FieldInfo.module.css";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

//enums
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";


interface ICollapseCertificatProps {
  sFeild: any;
  subFieldTitle: string;
  selectedSubFeild: any;
  isExamNotNeeded: boolean;
  subFieldInfoInquiredsArr: any;
  newlyAddedSubFieldCertificateForSecondLicense: any;
  isSubFieldUploadedOrInquiredFunction: any;
  response: any;
  resultSubFieldBasedOnField: any,
  adjustmentSubFiledInfoObjs?: any
}

const CollapseCertificate: FC<ICollapseCertificatProps> = ({
  sFeild,
  subFieldTitle,
  newlyAddedSubFieldCertificateForSecondLicense,
  isSubFieldUploadedOrInquiredFunction,
  adjustmentSubFiledInfoObjs
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleCertificate, setVisibleCertificate] = useState(false);
  const [feildCertificateNo, setFeildCertificateNo] = useState("");
  const [id, setId] = useState(0)
  const [inquiry, setInquiry] = useState(false)
  const [showCertificate, setShowCertificate] = useState({
    subfeildId: 0,
    title: false,
  });
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );
  const draftIdLocalStorage = useSelector(
    (state: any) => state.NewDraftId.newId
  );
  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const loadingFeildCertificate = useSelector(
    (state: any) => state.feildCertifacte.loading
  );
  const { loading } = useSelector(
    (state: any) => state?.noInquireSubFieldCertificateResultPostUploadEdit
  );
  const isUserEdit = localStorage.getItem("userEdit");

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const inquireSubLoading = useSelector((state: any) =>
    state?.feildCertifacte?.loadingInqiury

  );

  const { loadingInqureDraft } = useSelector((state: any) =>
    state.inquireSubFieldInfoDraft);

  const isApplicantSecondLicense = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.IsApplicantSecondLicense
  );



  const subFieldInquireHandler = (id: number) => {
    setInquiry(true)
    setId(id)
    if (isUserEdit) {
      dispatch(
        sendInquireFeildCertificateEdit(gotIdForMainEdit,
          sFeild,
          feildCertificateNo,
          () => {
            setShowDownloadButton(true);
            setInquiry(false)
            dispatch(subFieldInfoNaturalInquireds(true, sFeild));
            setShowCertificate({
              subfeildId: sFeild,
              title: true,
            });
            dispatch(
              getSubFieldInfoEdit(gotIdForMainEdit, (subFieldId: any) => { })
            );
          }
        )
      );
    } else {
      dispatch(
        inquireSubFieldInfoDraft(
          adjusterType.natural,
          draftId,
          sFeild,
          feildCertificateNo,
          () => {
            setShowDownloadButton(true);
            dispatch(
              getFieldInfoDraft(adjusterType.natural, draftId, () => { })
            );
            setShowCertificate({
              subfeildId: sFeild,
              title: true,
            });
            if (isApplicantSecondLicense) {
              isSubFieldUploadedOrInquiredFunction(true);
            }
          }
        )
      );
    }
  };



  const noInquireCertificateUploadHandler = (e: any) => {
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
            noInquireSubFieldCertificateUploadEdit(
              gotIdForMainEdit,
              sFeild,
              file,
              () => {
                setShowDownloadButton(true);
                dispatch(
                  getSubFieldInfoEdit(gotIdForMainEdit, (subFieldId: any) => { })
                );
              }
            )
          );
        } else {
          dispatch(
            uploadCertificateSubFieldInfoDraft(
              adjusterType.natural,
              draftId,
              sFeild,
              file,
              () => {
                setShowDownloadButton(true);
                dispatch(
                  getFieldInfoDraft(adjusterType.natural, draftId, () => { })
                );
                if (isApplicantSecondLicense) {
                  isSubFieldUploadedOrInquiredFunction(true);
                }
              }
            )
          );
        }
      }
    );
  };

  const jwtToken = localStorage.getItem("registrationToken");

  const downloadCertificateHandler = (id: any) => {
    axios({
      url: isUserEdit
        ? `${HttpBaseConstant.url}/applicant-sub-field-Info-content?id=${gotIdForMainEdit}&fieldId=${sFeild}`
        : `${HttpBaseConstant.url}/registration/draft/${draftId}/adjusterType/${adjusterType.natural}/sub-field-certificate-content?fieldId=${sFeild}`,
      method: "GET",
      responseType: "json",
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        if (response?.data?.IsSucceed === true) {
          // toast.success(`${response?.data?.Message}`, {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          const url = `data:image/${response?.data?.Result?.FileExtension};base64,${response?.data?.Result?.Content}`;
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${response?.data?.Result?.Title}.${response?.data?.Result?.FileExtension}`
          );
          document.body.appendChild(link);
          link.click();
        } else if (response?.data?.IsSucceed === false) {
          toast.error(`${response?.data?.Message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("error in downloading certificate: ", error);
      });
  };

  const deleteButtonHandler = () => {
    if (isUserEdit) {
      dispatch(
        deleteNaturalSubFieldInfoEdit(gotIdForMainEdit, sFeild, () => {
          dispatch(getSubFieldInfoEdit(gotIdForMainEdit, () => { }));
        })
      );
    } else if (!isUserEdit) {
      dispatch(
        deleteSubFieldInfoDraft(adjusterType.natural, draftId, sFeild, () => {
          dispatch(getFieldInfoDraft(adjusterType.natural, draftId, () => { }));
          if (isApplicantSecondLicense) {
            newlyAddedSubFieldCertificateForSecondLicense();
            isSubFieldUploadedOrInquiredFunction(false);
          }
        })
      );
    }
  };

  //lifecycle hooks
  useEffect(() => {
    setShowCertificate({
      subfeildId: sFeild,
      title: true,
    });
  }, []);

  useEffect(() => {
    if (loadingFeildCertificate == false) {
      setVisibleCertificate(false);
      setFeildCertificateNo("");
    }
  }, [loadingFeildCertificate]);

  let findIsAprrove: any = null
  useEffect(() => {
    findIsAprrove = adjustmentSubFiledInfoObjs?.find((f: any) => f.IsApproved == false)
  }, [adjustmentSubFiledInfoObjs])
  return (

    <div>

      <Row className={classes.approvedDoc}>
        {
          findIsAprrove ?
            <Alert style={{ width: "100%" }} showIcon type="error" message="گواهینامه بارگذاری شده شما رد شده است" />
            :
            null
        }
        <Col className={classes.collapseCertificateComponent}>
          <Row>
            <Col xxl={{ span: 5 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 3 }}>
              <div className={classes.downloadTitle}>{subFieldTitle}</div>
            </Col>
            <Col xxl={{ span: 5 }} xl={{ span: 3 }} lg={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 3 }}>


              <Popconfirm
                title=" از حذف زیر رشته مطمئن هستید؟"
                onConfirm={deleteButtonHandler}
                okText="بله"
                cancelText="خیر"
                disabled={
                  resultLogin?.ApplicantStatusId ===
                  workTaskFlowId?.ReturnToApplicantToCompleteDossier
                }
              >
                <Tooltip placement="topLeft" title="حذف">
                  <Button
                    //disabled={response?.Result?.LicenseType === 2}
                    icon={<Trash />}
                    type="text"
                  ></Button>
                </Tooltip>
              </Popconfirm>

            </Col>
            <Col xxl={{ span: 12 }} xl={{ span: 16 }} lg={{ span: 15 }} md={{ span: 15 }} sm={{ span: 15 }} xs={{ span: 17 }}>
              <Input
                placeholder="شماره گواهینامه را همراه با - وارد نمایید"
                size="small"
                value={feildCertificateNo}
                onChange={(e) => setFeildCertificateNo(e.target.value)}
                disabled={
                  resultLogin?.ApplicantStatusId ===
                  workTaskFlowId?.ReturnToApplicantToCompleteDossier
                }
                className={classes.inputCertificate}
              />

            </Col>
            <Col xxl={{ span: 2 }} xl={{ span: 1 }} lg={{ span: 1 }} md={{ span: 1 }} sm={{ span: 1 }} xs={{ span: 4 }}>
              <div>
                <Button type="text">
                  <Tooltip placement="topLeft" title="دانلود فایل">
                    <a
                      onClick={() =>
                        downloadCertificateHandler(showCertificate?.subfeildId)
                      }
                    >
                      <Download />
                    </a>
                  </Tooltip>
                </Button>
              </div>
            </Col>

            <Col style={{ margin: "10px 0" }} xl={{ span: 6 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>

              <label className={classes.customUpload}>
                {
                  loading ? <Spin /> :
                    <Tooltip placement="topLeft" title="بارگذاری فایل">
                      <div style={{ backgroundColor: "#1890ff", color: "white", padding: "10px", width: "150px" }}>
                        <span style={{ marginLeft: "10px" }}>   بارگذاری مستند</span>
                        <Icon iconType="upload" color="white" size="small" />
                        <input
                          style={{ display: "none" }}
                          type="file"
                          onChange={(e) => noInquireCertificateUploadHandler(e)}
                          disabled={
                            resultLogin?.ApplicantStatusId ===
                            workTaskFlowId?.ReturnToApplicantToCompleteDossier
                          }
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </div>
                    </Tooltip>
                }
              </label>
            </Col>
          </Row>
          <Row style={{ position: "absolute", left: "10px", bottom: "25px" }}>

            <Button
              type="primary"
              style={{ fontSize: "12px" }}
              onClick={() => subFieldInquireHandler(sFeild)}
              loading={inquireSubLoading == id || loadingInqureDraft == id && inquiry}
              disabled={
                resultLogin?.ApplicantStatusId ===
                workTaskFlowId?.ReturnToApplicantToCompleteDossier
              }
            >
              استعلام
              </Button>

          </Row>
        </Col>
      </Row>

    </div>

  );
};

export default CollapseCertificate;
