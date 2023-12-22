//libraries
import React, { FC, useEffect, useState } from "react";
import {
  Row,
  Col,
  Collapse,
  Tooltip,
  Popconfirm,
  Button,
  Space,
  Spin,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//styles
import classes from "./WorkExperience.module.css";

//redux actuator functions
import {
  deleteLegalDraftCardCEOWorkExperienceAction,
  deleteLegalEditCardCEOWorkExperienceAction,
  deleteLegalDraftWorkExpCertificateAction,
  deleteLegalDraftWorkExpCertificateActionEdit,
  fetchCEOWorkExperienceLegal,
  fetchCEOWorkExperienceLegalEdit,
  uploadlegalWorkExperienceCertificate,
  uploadlegalWorkExperienceCertificateEdit,
  disableNextButtonLegalWorkExperience,
  getAllInfoCEOWorkExperienceLegal,
  getAllInfoCEOWorkExperienceLegalEdit, 
} from "../../../../redux/actions";

//components
import moment from "jalali-moment";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as RemoveItem } from "../../../../assets/images/removeItem.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";

//apis
import APIS from "../legalService";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

interface ICardWorkExperienceProps {
  work: any;
  key: any;
  legalDraftId: number;
  findCompany: any;
  certificateListStatus: any;
  handleEdit: any;
  zeroCertificateChecker: any;
}
const { Panel } = Collapse;

const CardWorkExperience: FC<ICardWorkExperienceProps> = ({
  work,
  key,
  legalDraftId,
  findCompany,
  certificateListStatus,
  handleEdit,
  zeroCertificateChecker,
}) => {
  const dispatch = useDispatch();
  const [listCertificateInfo, setListCertificateInfo] = useState([] as any);
  const [loadingContent, setloadingContent] = useState(false);
  const [targetWorkId, setTargetWorkId] = useState("");
  const [targetCertificateId, setTargetCertificateId] = useState("");

  const getDeleteLoadingState = useSelector(
    (state: any) => state.deleteCEOWorkExperienceDraftLegal?.loading
  );
  const getDeleteLoadingCertificateState = useSelector((state: any) => state);
  const listworkGuide = useSelector(
    (state: any) =>
      state.listDraftCEOWorkExperienceLegal.listWorkExperienceLegal?.Result
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

  async function getContentDocumentTypeId() {
    try {
      setloadingContent(true);
      const data = await APIS.getWorkExperienceCertificateHandler(
        legalDraftId,
        work.Id
      );
      const url = window.URL.createObjectURL(
        new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fileUpload.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      // document.body.removeChild(link);
    } catch (err) {
      console.log(err, "errr");
    } finally {
      setloadingContent(false);
    }
  }

  //handlers
  const removeWorkExperinceHandler = () => {
    setTargetWorkId(work.Id);
    if (isUserEdit) {
      dispatch(
        deleteLegalEditCardCEOWorkExperienceAction(
          gotIdForMainEdit,
          work.Id,
          () => {
            dispatch(fetchCEOWorkExperienceLegalEdit(gotIdForMainEdit));
            zeroCertificateChecker(listCertificateInfo, work.Id, true);
          }
        )
      );
    } else {
      dispatch(
        deleteLegalDraftCardCEOWorkExperienceAction(
          legalDraftId,
          work.Id,
          () => {
            dispatch(fetchCEOWorkExperienceLegal(legalDraftId));
            zeroCertificateChecker(listCertificateInfo, work.Id, true);
          }
        )
      );
    }
  };

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
            uploadlegalWorkExperienceCertificateEdit(
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
            uploadlegalWorkExperienceCertificate(
              legalDraftId,
              work.Id,
              file,
              () => {
                dispatch(getCertificateInfoList());
              }
            )
          );
        }
      }
    );
  };

  const removeCertificateHandler = (certificateId: string) => {
    setTargetCertificateId(certificateId);
    if (isUserEdit) {
      dispatch(
        deleteLegalDraftWorkExpCertificateActionEdit(
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
        deleteLegalDraftWorkExpCertificateAction(
          legalDraftId,
          work.Id,
          certificateId,
          () => {
            dispatch(getCertificateInfoList());
          }
        )
      );
    }
  };

  const fileDownloadHandler = (certificateId: string) => {
    getContentDocumentTypeId();
  };

  const editHandler = () => {
    if (isUserEdit) {
      dispatch(getAllInfoCEOWorkExperienceLegalEdit(gotIdForMainEdit, work.Id));
    } else {
      dispatch(getAllInfoCEOWorkExperienceLegal(legalDraftId, work.Id));
    }
    handleEdit();
  };

  const jwtToken = localStorage.getItem("registrationToken");

  const downloadCertificateHandler = (id: any) => {
    axios({
      url: isUserEdit
        ? `${HttpBaseConstant.url}/applicant/work-experience/certificate/${id}/content?id=${gotIdForMainEdit}`
        : `${HttpBaseConstant.url}/registration/draft/${legalDraftId}/legal/work-experience/${work.Id}/certificate/${id}/content`,
      method: "GET",
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

  // get info from API here
  async function getCertificateInfoList() {
    try {
      const data = await APIS.fetchLegalCertificateWorkExperienceList(
        legalDraftId,
        work.Id
      );
      data?.IsSucceed && setListCertificateInfo(data?.Result);
    } catch (err) {
      console.log(err, "errr");
    }
  }

  async function getCertificateInfoListEdit() {
    try {
      const data = await APIS.fetchLegalCertificateWorkExperienceListEdit(
        gotIdForMainEdit,
        work.Id
      );
      data?.IsSucceed && setListCertificateInfo(data?.Result);
    } catch (err) {
      console.log(err, "errr");
    }
  }

  //lifecycle hooks
  useEffect(() => {
    if (isUserEdit) {
      getCertificateInfoListEdit();
    } else {
      getCertificateInfoList();
    }
  }, []);

  useEffect(() => {
    if (
      listCertificateInfo === undefined ||
      listCertificateInfo?.length === 0
    ) {
      return certificateListStatus;
    }
  }, [listCertificateInfo]);

  useEffect(() => {
    if (listworkGuide?.length === 0 || listCertificateInfo?.length === 0) {
      zeroCertificateChecker(listCertificateInfo, work.Id, false);
      dispatch(disableNextButtonLegalWorkExperience(true));
    } else {
      zeroCertificateChecker(listCertificateInfo, work.Id, false);
      dispatch(disableNextButtonLegalWorkExperience(false));
    }
  }, [listCertificateInfo, listworkGuide]);

  return (
    <div
      className={classes.card}
      style={{
        borderRight:
          listCertificateInfo === undefined || listCertificateInfo?.length === 0
            ? "3px solid #83C561"
            : //"3px solid #FF1010 "
              "3px solid #83C561",
      }}
    >
      <Row className={classes.rowCard}>
        <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4}}>
          {moment(work?.StartDate?.split("T")[0]).format("jYYYY-jM-jD")}
        </Col>
        <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4}}>
          {work?.EndDate !== null
            ? moment(work?.EndDate?.split("T")[0]).format("jYYYY-jM-jD")
            : null}
        </Col>
        <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>{work?.Position}</Col>
        <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 4 }} xs={{ span: 4 }}> {findCompany?.Title ?? work?.CompanyName} </Col>
        <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 3 }} md={{ span: 3 }} sm={{ span: 3 }} xs={{ span: 3 }}>
          <Popconfirm
            title=" از حذف این مورد مطمئن هستید؟"
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
        <Col xxl={{ span: 4 }} xl={{ span: 4 }} lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }}>
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
        <Col xl={2}>{/* <Button onClick={editHandler}>ویرایش</Button> */}</Col>
        <Col xl={2}>
          <Space>
            {targetWorkId === work.Id
              ? getDeleteLoadingState && <Spin size="small" />
              : null}
          </Space>
        </Col>
      </Row>

      {listCertificateInfo === undefined ||
      listCertificateInfo?.length === 0 ? (
        <Row style={{ color: "red" }}>
          هر سابقه کار باید حداقل داری یک فایل بارگذاری شده باشد - هیچ فایلی در
          این قسمت بارگذاری نگردیده
        </Row>
      ) : null}
      <Collapse
        style={{ textAlign: "right" }}
        bordered={false}
        className="listFile"
      >
        <Panel header={"لیست اسناد"} key="1">
          {listCertificateInfo?.map((certi: any) => {
            return (
              <Row className={classes.boxUploader} key={certi.Id}>
                <Col xl={6} offset={4}>
                  {certi.Title}
                </Col>
                <Col xl={6}>
                  <Button
                    // onClick={() => fileDownloadHandler(certi.Id)}
                    type="text"
                  >
                    <Tooltip placement="topLeft" title="دانلود فایل">
                      <a
                        onClick={() => downloadCertificateHandler(certi.Id)}
                        download
                      >
                        <Download />
                      </a>
                    </Tooltip>
                  </Button>
                </Col>
                <Col xl={6}>
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

                <Col xl={2}>
                  {targetCertificateId === certi.Id ? (
                    <Spin size="small" />
                  ) : null}
                </Col>
              </Row>
            );
          })}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CardWorkExperience;
