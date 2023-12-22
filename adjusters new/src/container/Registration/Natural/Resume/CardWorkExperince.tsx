import React, { FC, useState, useEffect } from "react";
import {
  Row,
  Col,
  Collapse,
  Tooltip,
  Popconfirm,
  Button,
  Spin,
  // ConfigProvider,
} from "antd";
import moment from "jalali-moment";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { toast } from "react-toastify";

import {
  uploadWorkExperienceCertificateDraft,
  uploadWorkExperienceCertificateEdit,
  fetchWorkExperienceDraft,
  fetchWorkExperienceEdit,
  //fechAllNDraftWorkExperienceCertificate,
  deleteNaturalWorkExperienceActionDraft,
  deleteNaturalWorkExperienceActionEdit,
  deletNaturalWorkExperienceCertificateActionDraft,
  deletNaturalWorkExperienceCertificateActionEdit,
  disableNextButtonNaturalWorkExperience,
} from "../../../../redux/actions";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";
//apis
import APIS from "../NaturalService";
//styles
import classes from "./Resume.module.css";
//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as RemoveItem } from "../../../../assets/images/remove.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";


interface ICardWorkExperienceProps {
  work: any;
  draftId: number;
  findCompany: any;
  dataChild: any;
  zeroCertificateChecker: any;
  getIsApprovedDetails:any
}
const { Panel } = Collapse;

const CardWorkExperince: FC<ICardWorkExperienceProps> = ({
  work,
  draftId,
  findCompany,
  dataChild,
  zeroCertificateChecker,
  getIsApprovedDetails
}) => {
  const dispatch = useDispatch();

  const [listCertificateInfo, setListCertificateInfo] = useState([] as any);
  const [listCerificateLoading, setListCerificateLoading] = useState(false);
  const [error, setError] = useState(0);

  const loadingListWorkExperience = useSelector(
    (state: any) => state.listWorkExperienceId.loading
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

  const listworkExperince = useSelector(
    (state: any) => state.listWorkExperienceId.listWorkExperienceGuid?.Result
  );
  const uploadWorkExperienceCertificateLoading = useSelector(
    (state: any) => state?.uploadWorkExperienceCertificate.loading
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
            uploadWorkExperienceCertificateEdit(
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
            uploadWorkExperienceCertificateDraft(draftId, work.Id, file, () => {
              dispatch(getCertificateInfoListDraft());
            })
          );
        }
      }
    );
  };

  //get ListFileCertificate
  const listFileHandler = () => {
    if (!isUserEdit) {
      getCertificateInfoListDraft();
      dataChild(listCertificateInfo, error);
    }
  };

  let header = <span onClick={listFileHandler}>لیست فایل های آپلود شده</span>;

  // get listCertificateInfo
  async function getCertificateInfoListDraft() {
    setListCerificateLoading(true);
    try {
      const data = await APIS.fetchCertificateInfoListDraft(draftId, work.Id);
      if (data?.Result !== null) {
        data?.IsSucceed && setListCertificateInfo(data?.Result);
      } else {
        setError(data?.Message);
      }
    } catch (err) {
      console.log(err, "errr");
    } finally {
      setListCerificateLoading(false);
    }
  }

  async function getCertificateInfoListEdit() {
    setListCerificateLoading(true);
    try {
      const data = await APIS.fetchCertificateInfoListEdit(
        gotIdForMainEdit,
        work.Id
      );
      if (data.Result !== null) {
        data?.IsSucceed && setListCertificateInfo(data?.Result);
      } else {
        setError(data?.ErrorType);
      }
    } catch (err) {
      console.log(err, "errr");
    } finally {
      setListCerificateLoading(false);
    }
  }

  //remove WorkExperince
  const removeWorkExperinceHandler = () => {
    if (isUserEdit) { 
      dispatch(
        deleteNaturalWorkExperienceActionEdit(gotIdForMainEdit, work.Id, () => {
          dispatch(fetchWorkExperienceEdit(gotIdForMainEdit));
          zeroCertificateChecker(listCertificateInfo, work.Id, true);
        })
      );
    } else {
      dispatch(
        deleteNaturalWorkExperienceActionDraft(draftId, work.Id, () => {
          dispatch(fetchWorkExperienceDraft(draftId));
          zeroCertificateChecker(listCertificateInfo, work.Id, true);
        })
      );
    }
  };

  //remove File Certificate
  const removeCertificateHandler = (certificateId: string) => {
    if (isUserEdit) {
      dispatch(
        deletNaturalWorkExperienceCertificateActionEdit(
          gotIdForMainEdit,
          certificateId,
          () => {
            dispatch(getCertificateInfoListEdit());
          }
        )
      );
    } else {
      dispatch(
        deletNaturalWorkExperienceCertificateActionDraft(
          draftId,
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

  const downloadCertificateHandler = (id: string) => {
    axios({
      url: isUserEdit
        ? `${HttpBaseConstant.url}/applicant/work-experience/certificate/${id}/content?id=${gotIdForMainEdit}`
        : `${HttpBaseConstant.url}/registration/draft/${draftId}/natural/work-experience/${work.Id}/certificate/${id}/content`,
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
      dispatch(disableNextButtonNaturalWorkExperience(true));
    } else {
      zeroCertificateChecker(listCertificateInfo, work.Id, false);
      dispatch(disableNextButtonNaturalWorkExperience(false));
    }
  }, [listCertificateInfo, listworkExperince]);
  let findIsAprove=listCertificateInfo.find((f:any)=>(
    f.IsApproved==false
  ))

  useEffect(()=>{
    getIsApprovedDetails(findIsAprove)
  },[findIsAprove])
  return (
    <>
      {loadingListWorkExperience ? (
        <Spin />
      ) : (
        <div
          className={classes.card}
          style={{
            borderRight:
              listCertificateInfo === null || listCertificateInfo?.length === 0 ||findIsAprove
                ? //"3px solid #FF1010 "
                  "3px solid red"
                : "3px solid #83C561",
          }}
        >
          <Row className={classes.rowCard}>
            <Col xl={3}>
              {work?.StartDate !== undefined || work?.StartDate !== null
                ? moment(work?.StartDate?.split("T")[0]).format("jYYYY-jMM-jD")
                : null}
            </Col>
            <Col xl={3}>
              {work?.EndDate !== null
                ? moment(work?.EndDate?.split("T")[0]).format("jYYYY-jMM-jD")
                : null}
            </Col>
            <Col xl={3}>{work?.Position}</Col>
            <Col xl={5}>{findCompany?.Title ?? work?.CompanyName}</Col>
            <Col xl={6}>
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
            <Col xl={3}>
              <Popconfirm
                title=" از حذف سابقه کار خود مطمئن هستید؟"
                onConfirm={() => removeWorkExperinceHandler()}
                okText="بله"
                cancelText="خیر"
              >
                <Tooltip placement="topLeft" title="حذف">
                  <Trash />
                </Tooltip>
              </Popconfirm>
            </Col>
            <Col xl={3}>
              {uploadWorkExperienceCertificateLoading && <Spin />}
            </Col>
          </Row>
          {/* {listCertificateInfo === null || listCertificateInfo?.length == 0 ? (
            <Row style={{ color: "red", fontSize: "12px" }}>
              هر سابقه کار باید حداقل دارای یک فایل بارگذاری شده باشد - هیچ
              فایلی در این قسمت بارگذاری نکردیده
            </Row>
          ) : null} */}
          <Collapse bordered={false} className="listFile">
            <Panel header={header} key="1">
              <Row className={classes.titleColumn}>
                <Col xl={6} offset={4}>
                  عنوان
                </Col>
                <Col xl={6}>مشاهده تصویر ارسالی</Col>
                <Col xl={3}>حذف</Col>
              </Row>

              {listCertificateInfo === null ||
              listCertificateInfo?.length === 0 ? (
                <p>لطفا فایل سابقه کاری مورد نظر را بارگذاری نمایید</p>
              ) : listCerificateLoading ? (
                <div className={classes.customSpin}>
                  <Spin />
                </div>
              ) : (
                listCertificateInfo?.map((certi: any) => {
                 
                  return (
                    <Row className={classes.boxUploader} key={certi.Id} style={certi?.IsApproved===false?({backgroundColor:"#ff000054"}):{}}>
                      <Col xl={6} offset={4}>
                        {certi.Title}
                      </Col>
                      <Col xl={6}>
                        <Button type="text">
                          <Tooltip
                            placement="topLeft"
                            title="نمایش تصویر ارسالی"
                          >
                            <a
                              onClick={() =>
                                downloadCertificateHandler(certi.Id)
                              }
                            >
                              <Download />
                            </a>
                          </Tooltip>
                        </Button>
                      </Col>
                      <Col xl={3}>
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
