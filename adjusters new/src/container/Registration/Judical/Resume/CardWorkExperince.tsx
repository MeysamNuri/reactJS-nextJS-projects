//libraries
import React, { FC, useState, useEffect } from "react";
import { Row, Col, Collapse, Tooltip, Popconfirm, Button, Spin } from "antd";
import moment from "jalali-moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

//components as icons
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as RemoveItem } from "../../../../assets/images/remove.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";

//redux actions
import {
  uploadJudicalWorkExperienceCertificateDraft,
  uploadJudicalWorkExperienceCertificateEdit,
  fetchJudicalWorkExperienceDraft,
  fetchJudicalWorkExperienceEdit,
  deletJudicalDraftWorkExperienceAction,
  deletJudicalEditWorkExperienceAction,
  deletJudicialDraftWorkExpCertificateAction,
  deletJudicialEditWorkExpCertificateAction,
  disableNextButtonJudicialWorkExperience,
} from "../../../../redux/actions";

//apis
import APIS from "../judicalService";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

//styles
import classes from "./Resume.module.css";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

interface ICardWorkExperienceProps {
  work: any;
  judicalDraftId: number;
  findCompany: any;
  onSubmit: () => void;
  onError: () => void;
  zeroCertificateChecker: any;
}
const { Panel } = Collapse;

const CardWorkExperince: FC<ICardWorkExperienceProps> = ({
  work,
  judicalDraftId,
  findCompany,
  onSubmit,
  onError,
  zeroCertificateChecker,
}) => {
  const dispatch = useDispatch();

  const [listCertificateInfo, setListCertificateInfo] = useState([] as any);
  const [certificate, setCertificate] = useState("");

  const loadingListWorkExperience = useSelector(
    (state: any) => state.judicalListWorkExperience.loading
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

  const resultListWorkExperience = useSelector(
    (state: any) =>
      state?.judicalListWorkExperience?.listJudicalWorkExperienceGuid?.Result
  );

  const uploadWorkExperienceCertificateLoading = useSelector(
    (state: any) => state?.judicalUploadWorkExperience.loading
  );

  const uploadWorkExperienceCertificateHandler = (e: any, work: any) => {
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
            uploadJudicalWorkExperienceCertificateEdit(
              gotIdForMainEdit,
              work.Id,
              file,
              () => {
                dispatch(getCertificateInfoListEdit());
              }
            )
          );
        } else {
          dispatch(
            uploadJudicalWorkExperienceCertificateDraft(
              judicalDraftId,
              work.Id,
              file,
              () => {
                dispatch(getCertificateInfoListDraft());
              }
            )
          );
        }
      }
    );
  };

  async function getCertificateInfoListDraft() {
    try {
      const data = await APIS.fetchJudicalCertificateInfoListDraft(
        judicalDraftId,
        work.Id
      );
      data?.IsSucceed && setListCertificateInfo(data?.Result);
    } catch (err) {
      console.log(err, "error in getting certificate info list");
    }
  }

  async function getCertificateInfoListEdit() {
    try {
      const data = await APIS.fetchJudicalCertificateInfoListEdit(
        gotIdForMainEdit,
        work.Id
      );
      data?.IsSucceed && setListCertificateInfo(data?.Result);
    } catch (err) {
      console.log(err, "error in getting certificate info list");
    }
  }

  const listFileHandler = () => {
    getCertificateInfoListDraft();
  };

  let header = <span onClick={listFileHandler}>لیست فایل های آپلود شده</span>;

  const removeWorkExperinceHandler = () => {
    if (isUserEdit) {
      dispatch(
        deletJudicalEditWorkExperienceAction(gotIdForMainEdit, work.Id, () => {
          dispatch(fetchJudicalWorkExperienceEdit(gotIdForMainEdit));
          zeroCertificateChecker(listCertificateInfo, work.Id, true);
        })
      );
    } else {
      dispatch(
        deletJudicalDraftWorkExperienceAction(judicalDraftId, work.Id, () => {
          dispatch(fetchJudicalWorkExperienceDraft(judicalDraftId));
          zeroCertificateChecker(listCertificateInfo, work.Id, true);
        })
      );
    }
  };

  const removeCertificateHandler = (certificateId: string) => {
    if (isUserEdit) {
      dispatch(
        deletJudicialEditWorkExpCertificateAction(
          gotIdForMainEdit,
          work.Id,
          certificateId,
          () => {
            dispatch(getCertificateInfoListEdit());
          }
        )
      );
    } else {
      dispatch(
        deletJudicialDraftWorkExpCertificateAction(
          judicalDraftId,
          work.Id,
          certificateId,
          () => {
            dispatch(getCertificateInfoListDraft());
          }
        )
      );
    }
  };

  const jwtToken = localStorage.getItem("registrationToken");

  const downloadCertificateHandler = (id: any) => {
    axios({
      url: isUserEdit
        ? `${HttpBaseConstant.url}/applicant/work-experience/certificate/${id}/content?id=${gotIdForMainEdit}`
        : `${HttpBaseConstant.url}/registration/draft/${judicalDraftId}/judicial/work-experience/${work.Id}/certificate/${id}/content`,
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

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      getCertificateInfoListEdit();
    } else {
      getCertificateInfoListDraft();
    }
  }, []);

  useEffect(() => {
    if (listCertificateInfo === null || listCertificateInfo?.length === 0) {
      zeroCertificateChecker(listCertificateInfo, work.Id, false);
      dispatch(disableNextButtonJudicialWorkExperience(true));
    } else {
      zeroCertificateChecker(listCertificateInfo, work.Id, false);
      dispatch(disableNextButtonJudicialWorkExperience(false));
    }
  }, [listCertificateInfo, resultListWorkExperience]);




  return (
    <>
      {loadingListWorkExperience ? (
        <Spin />
      ) : (
        <div
          className={classes.card}
          style={{
            borderRight:
              listCertificateInfo === null || listCertificateInfo?.length == 0
                ? "3px solid red"
                : //"3px solid #FF1010 "
                  "3px solid #83C561",
          }}
        >
          <Row className={classes.rowCard}>
            <Col md={3}>
              {moment(work?.StartDate.split("T")[0]).format("jYYYY-jM-jD")}
            </Col>
            <Col md={3}>
              {work.EndDate !== null
                ? moment(work?.EndDate.split("T")[0]).format("jYYYY-jM-jD")
                : null}
            </Col>
            <Col md={3}>{work?.Position}</Col>
            <Col md={3}>
              {findCompany?.Title ? findCompany?.Title : work?.CompanyName}
            </Col>
            <Col md={6}>
              <Tooltip placement="topLeft" title="بارگذاری فایل">
                <label className={classes.customUpload}>
                  <Upload />
                  <input
                    type="file"
                    onChange={(e) =>
                      uploadWorkExperienceCertificateHandler(e, work)
                    }
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </label>
              </Tooltip>
            </Col>
            <Col md={3}>
              <Popconfirm
                title=" از حذف سابقه کار خود مطمئن هستید؟"
                onConfirm={() => removeWorkExperinceHandler()}
                okText="بله"
                cancelText="خیر"
              >
                <a>
                  <Tooltip placement="topLeft" title="حذف">
                    <Trash />
                  </Tooltip>
                </a>
              </Popconfirm>
            </Col>
            <Col xl={3}>
              {uploadWorkExperienceCertificateLoading && <Spin />}
            </Col>
          </Row>
          {/* {listCertificateInfo === null || listCertificateInfo?.length == 0 ? (
            <Row style={{ color: "red", fontSize: "12px" }}>
              هر سابقه کار باید حداقل دارای یک فایل بارگذاری شده باشد - هیچ
              فایلی در این قسمت بارگذاری نگردیده
            </Row>
          ) : null} */}
          <Collapse
            style={{ textAlign: "right" }}
            bordered={false}
            className="listFile"
          >
            <Panel header={header} key="1">
              <Row className={classes.titleResume}>
                <Col md={6} offset={4}>
                  عنوان
                </Col>
                <Col xl={6}>مشاهده تصویر ارسالی</Col>
                <Col md={3}>حذف</Col>
              </Row>

              {listCertificateInfo === null ||
              listCertificateInfo?.length === 0 ? (
                <p>لطفا فایل سابقه کاری مورد نظر را بارگذاری نمایید</p>
              ) : (
                listCertificateInfo?.map((certi: any) => {
                  return (
                    <Row className={classes.boxUploader} key={certi.Id}>
                      <Col md={6} offset={4}>
                        {certi.Title}
                      </Col>
                      <Col md={6}>
                        <Tooltip placement="topLeft" title="دانلود فایل">
                          <a
                            onClick={() => downloadCertificateHandler(certi.Id)}
                          >
                            <Download />
                          </a>
                        </Tooltip>
                      </Col>
                      <Col md={6}>
                        <Popconfirm
                          title=" از حذف فایل سابقه کار خود مطمئن هستید؟"
                          onConfirm={() => removeCertificateHandler(certi.Id)}
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
                })
              )}
            </Panel>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default CardWorkExperince;
