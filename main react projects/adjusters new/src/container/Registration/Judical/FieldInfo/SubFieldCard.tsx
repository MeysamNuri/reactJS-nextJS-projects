//libraries
import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Input, Tooltip, Popconfirm } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";

//redux actions
import {
  inquireSubFieldInfoDraft,
  subFieldInfoJudicialInquireds,
  getFieldInfoDraft,
  getSubFieldInfoJudicialEdit,
  uploadCertificateSubFieldInfoDraft,
  noInquireSubFieldCertificateUploadEdit,
  deleteJudicialSubFieldInfoEdit,
  deleteSubFieldInfoDraft,
  postInquireFeildCertificateJudicialEdit,
} from "../../../../redux/actions";

//components
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
//styles
import classes from "./FieldInfo.module.css";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

//enums
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";

interface ISubFieldCardProps {
  sFeild: any;
  subFieldTitle: string;
  selectedSubFeild: any;
  isExamNotNeeded: boolean;
  subFieldInfoInquiredsArr: any;
  newlyAddedSubFieldCertificateForSecondLicense: any;
}

const SubFieldCard: FC<ISubFieldCardProps> = ({
  sFeild,
  subFieldTitle,
  selectedSubFeild,
  isExamNotNeeded,
  subFieldInfoInquiredsArr,
  newlyAddedSubFieldCertificateForSecondLicense,
}) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [visibleCertificate, setVisibleCertificate] = useState(false);
  const [feildCertificateNo, setFeildCertificateNo] = useState("");
  const [id, setId] = useState(0)
  const [showCertificate, setShowCertificate] = useState({
    subfeildId: 0,
    title: false,
  });
  const [inquired, setInquired] = useState(false);
  const [visibleDownloadButton, setVisibleDownloadButton] = useState(false);

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const draftIdLocalStorage = localStorage.getItem("judicalDraftId");
  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;

  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes.response?.Result
  );

  const certificate = useSelector(
    (state: any) => state.feildCertifacte.certificate?.Result
  );
  const loadingFeildCertificate = useSelector(
    (state: any) => state.feildCertifacte.loading
  );

//   const {loadingInqiury} = useSelector((state: any) =>
//   state.feildCertifacte
 
// );
const {loadingInquireJudical} = useSelector((state: any) =>
state?.judicialNoInquireFieldCertificateUploadEdit

);
const {loadingInqureDraft} = useSelector((state: any) =>
state.inquireSubFieldInfoDraft);

//console.log(loadingInqureDraft,"loadingInqureDraftJudical",id);

//console.log(loadingInquireJudical,"loadingInquireJudical",id);


  const isUserEdit = localStorage.getItem("userEdit");
  // const personalInfo = useSelector((state: any) =>
  //   isUserEdit
  //     ? state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo?.data
  //     : state?.getPersonalInfoDraftNatural?.naturalDraftPersonalInfo
  // );
  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  // const adjustmentSubFiledInfoObjs = useSelector(
  //   (state: any) => state?.judicialGetSubFieldInfoData?.subFields?.Result
  // );

  const isApplicantSecondLicense = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.IsApplicantSecondLicense
  );

  // const handleVisible = () => {
  //   setVisible(!visible);
  // };

  // const certificateHandler = () => {
  //   setVisibleCertificate(!visibleCertificate);
  // };

  const noInquireCertificateUploadHandler = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    fileExtentionValidator(
      e,
      500000,
      ["image/jpg", "image/jpeg", "image/png", "application/pdf"],
      () => {
        if (isUserEdit) {
          dispatch(
            noInquireSubFieldCertificateUploadEdit(
              gotIdForMainEdit,
              sFeild,
              file,
              () => {
                // setShowDownloadButton(true);
                dispatch(
                  getSubFieldInfoJudicialEdit(
                    gotIdForMainEdit,
                    (subFieldId: any) => {
                      setVisibleDownloadButton(true);
                    }
                  )
                );
              }
            )
          );
        } else {
          dispatch(
            uploadCertificateSubFieldInfoDraft(
              adjusterType.judical,
              draftId,
              sFeild,
              file,
              () => {
                dispatch(
                  getFieldInfoDraft(adjusterType.judical, draftId, () => {
                    setVisibleDownloadButton(true);
                  })
                );
              }
            )
          );
        }
      }
    );
  };

  const feildCertificateHandler = (id: number) => { 
    setId(id)
    dispatch(subFieldInfoJudicialInquireds(true, sFeild));
    if (isUserEdit) {
      dispatch(
        postInquireFeildCertificateJudicialEdit(
          gotIdForMainEdit,
          sFeild,
          feildCertificateNo,
          () => {
            //setShowDownloadButton(true);
            dispatch(subFieldInfoJudicialInquireds(true, sFeild));
            setShowCertificate({
              subfeildId: sFeild,
              title: true,
            });
            dispatch(
              getSubFieldInfoJudicialEdit(
                gotIdForMainEdit,
                (subFieldId: any) => {}
              )
            );
            setVisibleDownloadButton(true);
          }
        )
      );
    } else {
      dispatch(
        inquireSubFieldInfoDraft(
          adjusterType.judical,
          draftId,
          sFeild,
          feildCertificateNo,
          () => {
            dispatch(
              getFieldInfoDraft(adjusterType.judical, draftId, () => {
                setVisibleDownloadButton(true);
              })
            );
          }
        )
      );
    }
  };

  const removeSubfeildCertificate = () => {
    selectedSubFeild.filter((item: any) => item === sFeild);
  };

  const jwtToken = localStorage.getItem("registrationToken");
  const downloadCertificateHandler = (id: any) => {
    axios({
      url: isUserEdit
        ? `${HttpBaseConstant.url}/applicant-sub-field-Info-content?id=${gotIdForMainEdit}&fieldId=${sFeild}`
        : `${HttpBaseConstant.url}/registration/draft/${draftId}/adjusterType/${adjusterType.judical}/sub-field-certificate-content?fieldId=${sFeild}`,
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
        deleteJudicialSubFieldInfoEdit(gotIdForMainEdit, sFeild, () => {
          dispatch(getSubFieldInfoJudicialEdit(gotIdForMainEdit, () => {}));
        })
      );
    } else if (!isUserEdit) {
      dispatch(
        deleteSubFieldInfoDraft(adjusterType.judical, draftId, sFeild, () => {
          dispatch(getFieldInfoDraft(adjusterType.judical, draftId, () => {}));
          if (isApplicantSecondLicense) {
            newlyAddedSubFieldCertificateForSecondLicense();
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

  useEffect(() => {
    if (subFieldInfoInquiredsArr !== undefined) {
      const subField = subFieldInfoInquiredsArr.find(
        (i: number) => i === sFeild
      );
      setInquired(subFieldInfoInquiredsArr.includes(sFeild));
    }
  }, [subFieldInfoInquiredsArr]);

  useEffect(() => {}, []);

  return (
    <Row className={classes.collapseCertificateComponent}>
      <Col span={4}>
        <div className={classes.downloadTitle}>{subFieldTitle}</div>
      </Col>

      <Col span={4}>
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
            <Trash />
          </Tooltip>
        </Popconfirm>
      </Col>

      <Col span={8}>
        <Input
           placeholder="شماره گواهینامه را همراه با - وارد نمایید"
          value={feildCertificateNo}
          onChange={(e: any) => setFeildCertificateNo(e.target.value)}
          disabled={
            resultLogin?.ApplicantStatusId ===
            workTaskFlowId?.ReturnToApplicantToCompleteDossier
          }
          
        />
      </Col>

      <Col span={2}>
        {/* {visibleDownloadButton && ( */}
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
        {/* )} */}
      </Col>

      <Col span={2}>
        <label className={classes.customUpload}>
          <Tooltip placement="topLeft" title="بارگذاری فایل">
            <Upload />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) => noInquireCertificateUploadHandler(e)}
              disabled={
                resultLogin?.ApplicantStatusId ===
                workTaskFlowId?.ReturnToApplicantToCompleteDossier
              }
            />
          </Tooltip>
        </label>
      </Col>

      <Col span={4}>
        <Button
          type="primary"
          style={{ fontSize: "12px" }}
          onClick={() => feildCertificateHandler(sFeild)}
          loading={loadingInqureDraft==id || loadingInquireJudical==id}
          disabled={
            resultLogin?.ApplicantStatusId ===
            workTaskFlowId?.ReturnToApplicantToCompleteDossier
          }
        >
          استعلام
        </Button>
      </Col>
    </Row>
  );
};

export default SubFieldCard;
