//libraries
import React, { useState, useEffect, FC } from "react";

import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Input,
  ConfigProvider,
  Tooltip,
  // Popover,
  Popconfirm,
  Checkbox,
  Spin,
  Alert,
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import {Icon} from 'sanhab-components-library'
//redux actions
import {
  getFieldInfoDraft,
  postFieldInfoDraft,
  postIsExamNotNeededDraft,
  postSubFieldInfoDraft,
  // deleteSubFieldInfoDraft,
  inquireFieldInfoDraft,
  uploadCertificateFieldInfoDraft,
  //inquireJudicalCertificate,
  getJudicialAdjustmentFieldInfoEdit,
  isComeFromRegistration,
  // getWorkLocationInfoEditJudical,
  deleteSpecializedFieldInfoJudicialEdit,
  postApplicantFieldInfoJudicialEdit,
  // noInquireCertificateUploadJudicialDraft,
  // noInquireCertificateUploadJudicialEdit,
  // getJudicalProfilePicDraft,
  // fetchJudicalFamilyMemberDraft,
  // getPersonalInfoJudicialDraft,
  getSubFieldBasedOnFieldJudicial,
  subFieldInfoJudicialInquireds,
  getSubFieldInfoJudicialEdit,
  //getSubFieldInfoEdit,
  // getSpecializedFieldInfoEdit,
  //postIsExamNotNeededEdit,
  postIsExamNotNeededEditJudicial,
  noInquireCertificateUploadEdit,
  fetchAllAdjustmentField,
} from "../../../../redux/actions";
import { LoadingOutlined } from "@ant-design/icons";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

//components
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
//import { ReactComponent as RemoveItem } from "../../../../assets/images/removeItem.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
// import SubFieldCard from "./SubFieldCard";
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

//apis
import APIS from "../judicalService";

//hooks
import usePrevious from "../../../../hooks/usePrevious";
//import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

//enums
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";
import classes from "./FieldInfo.module.css";

const { Option } = Select;

interface IFeildInfoProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const FieldInfo: FC<IFeildInfoProps> = ({ onSubmit, onPrev }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [selectedField, setSelectedField] = useState(0);
  const [selectedSubFields, setSelectedSubFields] = useState([] as any);
  const [resultCertificate, SetResultCertificate] = useState({
    IsSucceed: false,
    Result: { Title: "" },
  });
  const [certificateNo, setCertificateNo] = useState("");
  //const [disableNextButton, setDisableNextButton] = useState(true);
  const [isExamNotNeeded, setIsExamNotNeeded] = useState(false);
  const [
    isAllFieldsAndSubFieldsInquired,
    setIsAllFieldsAndSubFieldsInquired,
  ] = useState(false);
  const [claimedScore, setClaimedScore] = useState(0);
  const [visibleDownloadButton, setVisibleDownloadButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const [
    newlyAddedSubFieldCertificateForSecondLicense,
    setNewlyAddedSubFieldCertificateForSecondLicense,
  ] = useState(0);
  const [
    disableNextButtonForSecondLicense,
    setDisableNextButtonForSecondLicense,
  ] = useState(true);

  const [isFieldInquiredOrUploaded, setIsFieldInquiredOrUploaded] = useState(
    false
  );

  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes?.response?.Result
  );

  const judicalDraftIdState = useSelector(
    (state: any) => state.newJudicalDraftId.newJudicalId?.Result?.DraftId
  );
  const judicalDraftIdLocalStorage = localStorage.getItem("judicalDraftId");

  const judicalDraftId =
    judicalDraftIdState !== undefined
      ? judicalDraftIdState
      : judicalDraftIdLocalStorage;

  const isApplicantSecondLicense = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.IsApplicantSecondLicense
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
  const gotJudicialAdjustmentFieldInfo = useSelector(
    (state: any) => state?.judicalFeildInfo?.judicalFeildInfo
  );
  const allFieldInfo = useSelector(
    (state: any) => state?.judicalFeildInfo?.judicalFeildInfo?.Result
  );
  const noInquireCertificateJudicialUploadLoading = useSelector(
    (state: any) => state?.judicialNoInquireCertificateJudicialUpload?.loading
  );
  // const specializedField = useSelector(
  //   (state: any) => state?.judicialspecializedField?.specializedField
  // );
  const specializedField = useSelector(
    (state: any) => state?.specializedField?.specializedField
  );

  // const comeFromRegistration = useSelector(
  //   (state: any) => state?.isComeFromRegistration?.isComeFromRegistration
  // );
  const resultSubFieldBasedOnField = useSelector(
    (state: any) =>
      state?.judicialGetSubFieldBasedOnFieldJudicial
        ?.getSubFieldBasedOnFieldJudicial?.Result
  );
  const resultSubFieldBasedOnFieldLoading = useSelector(
    (state: any) => state?.judicialGetSubFieldBasedOnFieldJudicial?.loading
  );
  // let subFieldsIdAndTitlesArr = specializedField?.Result?.map((item: any) => [
  //   item?.Id,
  //   item?.Title,
  // ]);
  const subFieldInfoInquiredsArr = useSelector(
    (state: any) => state?.judicialSubFieldInfoInquireds?.isSubFieldInfoInquired
  );
  const gotSelectedFieldId = useSelector(
    (state: any) =>
      state?.judicialGetSelectedFieldInfo?.data?.Result?.AdjustmentField
  );
  // const gotSelectedRequestDate = useSelector(
  //   (state: any) =>
  //     state?.judicialGetSelectedFieldInfo?.data?.Result?.PermitRequestDate
  // );
  const fieldInfoData = useSelector(
    (state: any) => state?.getFieldInfoData?.data?.Result
  );
  const subFieldInfoIdsArrayData = fieldInfoData?.SubFields?.map(
    (i: any) => i?.FieldId
  );
  const inquireFieldInfoLoading = useSelector(
    (state: any) => state?.inquireFieldInfoDraft?.loading
  );
  const adjustmentSubFiledInfoObjs = useSelector(
    (state: any) => state?.judicialGetSubFieldInfoData?.subFields?.Result
  );
  const certificateUploadLoading = useSelector(
    (state: any) => state?.judicialNoInquireFieldCertificateUploadEdit?.loading
  );

  //get ListDocuments
  // async function getCerti80Draft() {
  //   try {
  //     // setloading(true);
  //     const data = await APIS.getJudicaLInquire80HoursDraft(
  //       judicalDraftId,
  //       certificateNo
  //     );
  //     data && SetResultCertificate(data);
  //   } catch (err) {
  //     console.log(err, "certificate error");
  //   } finally {
  //     // setloading(false);
  //   }
  // }

  async function getCerti80Edit() {
    try {
      setLoading(true);
      const data = await APIS.getJudicaLInquire80HoursEdit(
        gotIdForMainEdit,
        certificateNo,
        selectedField
      );
      if (data.IsSucceed == true) {
        data && SetResultCertificate(data);
        toast.success("استعلام صحیح گواهینامه", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(data.Message, {
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
      setLoading(false);
    }
  }

  // const oldAdjFieldArray = isUserEdit
  //   ? gotJudicialAdjustmentFieldInfo?.Result?.map(
  //       (i: any) => i?.AdjustmentField
  //     )
  //   : null;

  const onFinish = () => {
    onSubmit();
  };

  const prevHandler = () => {
    onPrev();
    dispatch(isComeFromRegistration(false));
    // if (!isUserEdit && !isApplicantSecondLicense) {
    //   dispatch(
    //     getPersonalInfoJudicialDraft(judicalDraftId, () => {
    //       onPrev();
    //     })
    //   );
    //   dispatch(fetchJudicalFamilyMemberDraft(judicalDraftId));
    //   dispatch(getJudicalProfilePicDraft(judicalDraftId));
    // } else {
    //   onPrev();
    // }
  };

  const changeFieldHandler = (value: number) => {
    setSelectedField(value);
    dispatch(getSubFieldBasedOnFieldJudicial(value));
    setSelectedSubFields([]);
    dispatch(subFieldInfoJudicialInquireds(false, []));
    form.setFieldsValue({
      subFields: [],
    });
    if (isUserEdit) {
      dispatch(
        deleteSpecializedFieldInfoJudicialEdit(
          gotIdForMainEdit,
          prevSelectedField,
          () => {
            setSelectedField(value);
          },
          () => {
            dispatch(
              postApplicantFieldInfoJudicialEdit(
                gotIdForMainEdit,
                value,
                isExamNotNeeded,
                () => {
                  dispatch(
                    getJudicialAdjustmentFieldInfoEdit(
                      gotIdForMainEdit,
                      (fieldId: number) => {
                        setSelectedField(fieldId);
                        dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
                        form.setFieldsValue({
                          adjustmentField: fieldId,
                        });
                      }
                    )
                  );
                }
              )
            );
          },
          () => {
            dispatch(
              postApplicantFieldInfoJudicialEdit(
                gotIdForMainEdit,
                value,
                isExamNotNeeded,
                () => {
                  dispatch(
                    getJudicialAdjustmentFieldInfoEdit(
                      gotIdForMainEdit,
                      (fieldId: number) => {
                        setSelectedField(fieldId);
                        dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
                        form.setFieldsValue({
                          adjustmentField: fieldId,
                        });
                      }
                    )
                  );
                }
              )
            );
          }
        )
      );
    } else if (!isUserEdit) {
      let infoField = {
        adjustmentFieldId: value,
        isExamNotNeeded: isExamNotNeeded,
      };
      dispatch(
        postFieldInfoDraft(
          adjusterType.judical,
          judicalDraftId,
          infoField,
          () => {
            dispatch(
              getFieldInfoDraft(adjusterType.judical, judicalDraftId, () => {})
            );
          }
        )
      );
    }
  };

  const examNotNeededHandler = (e: any) => {
    setIsExamNotNeeded(e?.target?.checked);
    let infoField = {
      adjustmentFieldId: selectedField,
      isExamNotNeeded: e?.target?.checked,
    };
    if (isUserEdit) {
      let dataToPost = {
        id: gotIdForMainEdit,
        fieldId: selectedField,
        isExamNotNeeded: e?.target?.checked,
      };
      dispatch(
        postIsExamNotNeededEditJudicial(dataToPost, () => {
          dispatch(
            getJudicialAdjustmentFieldInfoEdit(
              gotIdForMainEdit,
              (fieldId: number) => {
                setSelectedField(fieldId);
                dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
                form.setFieldsValue({
                  adjustmentField: fieldId,
                });
              }
            )
          );
        })
      );
    } else if (!isUserEdit) {
      let isExam = { isExamNotNeeded: e?.target?.checked };
      dispatch(
        postFieldInfoDraft(
          adjusterType.judical,
          judicalDraftId,
          infoField,
          () => {
            dispatch(
              postIsExamNotNeededDraft(
                adjusterType.judical,
                judicalDraftId,
                isExam,
                () => {
                  dispatch(
                    getFieldInfoDraft(
                      adjusterType.judical,
                      judicalDraftId,
                      () => {}
                    )
                  );
                }
              )
            );
          }
        )
      );
    }
  };

  const inquireCertificateHandlerDraft = () => {
    dispatch(
      inquireFieldInfoDraft(
        adjusterType.judical,
        judicalDraftId,
        certificateNo,
        () => {
          dispatch(
            getFieldInfoDraft(adjusterType.judical, judicalDraftId, () => {})
          );
        }
      )
    );
  };
  const inquireCertificateHandlerEdit = () => {
    getCerti80Edit();
  };

  const jwtToken = localStorage.getItem("registrationToken");

  const downloadCertificateHandler = (id: any) => {
    axios({
      url: isUserEdit
        ? `${HttpBaseConstant.url}/applicant-field-info-specialized-content?id=${gotIdForMainEdit}`
        : `${HttpBaseConstant.url}/registration/draft/${judicalDraftId}/adjusterType/${adjusterType.judical}/80hour-certificate-content`,
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

  const prevSelectedField = usePrevious(selectedField);

  const noInquireCertificateUploadHandler = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];
    fileExtentionValidator(
      e,
      500000,
      ["image/jpg", "image/jpeg", "image/png","pdf"],
      () => {
        if (isUserEdit) {
          dispatch(
            noInquireCertificateUploadEdit(
              gotIdForMainEdit,
              file,
              selectedField,
              () => {
                setIsFieldInquiredOrUploaded(true);
                // dispatch(disableNextButtonFieldInfoJudicial(false));
                // setShowDownloadButton(true);
                dispatch(
                  getJudicialAdjustmentFieldInfoEdit(
                    gotIdForMainEdit,
                    (fieldId: number) => {
                      setSelectedField(fieldId);
                      dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
                      form.setFieldsValue({
                        adjustmentField: fieldId,
                      });
                    }
                  )
                );
              }
            )
          );
        } else {
          dispatch(
            uploadCertificateFieldInfoDraft(
              adjusterType.judical,
              judicalDraftId,
              file,
              () => {
                setIsFieldInquiredOrUploaded(true);
                dispatch(
                  getFieldInfoDraft(
                    adjusterType.judical,
                    judicalDraftId,
                    () => {}
                  )
                );
              }
            )
          );
        }
      }
    );
  };

  // const deleteButtonClickedHandler = () => {
  //   toast.success("حذف موفقیت آمیز فایل", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const changeSubFieldsHandler = (value: any) => {
    if (value.length <= 2) {
      setSelectedSubFields(value);
    }

    if (isUserEdit) {
      dispatch(
        postApplicantFieldInfoJudicialEdit(
          gotIdForMainEdit,
          value[value.length - 1],
          isExamNotNeeded,
          () => {
            dispatch(
              getJudicialAdjustmentFieldInfoEdit(
                gotIdForMainEdit,
                (fieldId: number) => {
                  setSelectedField(fieldId);
                  dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
                  form.setFieldsValue({
                    adjustmentField: fieldId,
                  });
                }
              )
            );
            dispatch(
              getSubFieldInfoJudicialEdit(
                gotIdForMainEdit,
                (subFieldId: any) => {
                  setSelectedSubFields(subFieldId);
                  form.setFieldsValue({
                    subFields: subFieldId,
                  });
                }
              )
            );
          }
        )
      );
    } else if (!isUserEdit) {
      let subFieldsArr = { subFields: value };
      dispatch(
        postSubFieldInfoDraft(
          adjusterType.judical,
          judicalDraftId,
          subFieldsArr,
          () => {
            dispatch(
              getFieldInfoDraft(adjusterType.judical, judicalDraftId, () => {})
            );
            if (isApplicantSecondLicense) {
              setNewlyAddedSubFieldCertificateForSecondLicense(
                newlyAddedSubFieldCertificateForSecondLicense + 1
              );
            }
          }
        )
      );
    }
  };

  const claimedScoreHandler = (e: any) => {
    ////////////////////////////////////////////////////////////////////////////////
    setClaimedScore(e.target.value);
  };
  const submitScoreHandler = () => {
    ///////////////////////////////////////////////////////////////////////////////
    //test ///
  };
  const newlyAddedSubFieldCertificateForSecondLicenseFunction = () => {
    setNewlyAddedSubFieldCertificateForSecondLicense(
      newlyAddedSubFieldCertificateForSecondLicense - 1
    );
  };

  let adjustmentField = {
    isActive: true,
  };

  //lifecyclehooks
  useEffect(() => {
    dispatch(fetchAllAdjustmentField(adjustmentField));
    if (isUserEdit) {
      setIsFieldInquiredOrUploaded(true);
      dispatch(
        getJudicialAdjustmentFieldInfoEdit(
          gotIdForMainEdit,
          (fieldId: number) => {
            setSelectedField(fieldId);
            dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
            form.setFieldsValue({
              adjustmentField: fieldId,
            });
          }
        )
      );
      dispatch(
        getSubFieldInfoJudicialEdit(gotIdForMainEdit, (subFieldId: any) => {
          setSelectedSubFields(subFieldId);
          form.setFieldsValue({
            subFields: subFieldId,
          });
        })
      );
    } else if (!isUserEdit) {
      if (isApplicantSecondLicense) {
        // setIsFieldInquiredOrUploaded(true)
        dispatch(
          getFieldInfoDraft(
            adjusterType.judical,
            judicalDraftId,
            (fieldId: number) => {
              setSelectedField(fieldId);
              dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
              form.setFieldsValue({
                adjustmentField: fieldId,
              });
            }
          )
        );
      } else if (!isApplicantSecondLicense) {
        dispatch(
          getFieldInfoDraft(
            adjusterType.judical,
            judicalDraftId,
            (fieldId: number) => {
              setSelectedField(fieldId);
              dispatch(getSubFieldBasedOnFieldJudicial(fieldId));
              form.setFieldsValue({
                adjustmentField: fieldId,
              });
            }
          )
        );
      }
    }
  }, []);

  useEffect(() => {
    if (fieldInfoData?.IsInquired) {
      setIsFieldInquiredOrUploaded(true);
    }
    if (
      gotJudicialAdjustmentFieldInfo?.Result?.Course80HourDocumentId !== null
    ) {
      setVisibleDownloadButton(true);
    } else {
      setVisibleDownloadButton(false);
    }
    if (!isUserEdit) {
      const isSubFieldsInquiredArray = fieldInfoData?.SubFields?.map(
        (subField: any) => subField?.IsInquired
      );
      const isFalseInSubFieldsInquiredArray = isSubFieldsInquiredArray?.includes(
        false
      );
      if (fieldInfoData?.IsInquired && !isFalseInSubFieldsInquiredArray) {
        setIsAllFieldsAndSubFieldsInquired(true);
      } else {
        setIsAllFieldsAndSubFieldsInquired(false);
      }
      setSelectedSubFields(subFieldInfoIdsArrayData);
      setIsExamNotNeeded(fieldInfoData?.IsExamNotNeeded);
      form.setFieldsValue({
        adjustmentField:
          fieldInfoData?.AdjustmentFieldId !== 0
            ? fieldInfoData?.AdjustmentFieldId
            : undefined,
        subFields: subFieldInfoIdsArrayData,
      });
      if (isApplicantSecondLicense) {
        if (newlyAddedSubFieldCertificateForSecondLicense === 0) {
          setDisableNextButtonForSecondLicense(true);
        } else {
          setDisableNextButtonForSecondLicense(false);
        }
      }
    } else if (isUserEdit) {
      const adjustmentSubFiledInfoDocumentIdsArr = adjustmentSubFiledInfoObjs?.map(
        (obj: {
          SubFieldId: number;
          SubFieldTitle: string;
          DocumentId: string;
        }) => obj?.DocumentId
      );

      if (
        gotJudicialAdjustmentFieldInfo?.Result?.Course80HourDocumentId !== null
      ) {
        if (gotJudicialAdjustmentFieldInfo?.Result?.IsExamNotNeeded === true) {
          setIsAllFieldsAndSubFieldsInquired(true);
        } else if (
          adjustmentSubFiledInfoDocumentIdsArr !== undefined &&
          !adjustmentSubFiledInfoDocumentIdsArr?.includes(null)
        ) {
          setIsAllFieldsAndSubFieldsInquired(true);
        } else {
          setIsAllFieldsAndSubFieldsInquired(false);
        }
      } else if (
        gotJudicialAdjustmentFieldInfo?.Result?.Course80HourDocumentId === null
      ) {
        setIsAllFieldsAndSubFieldsInquired(false);
      }
    }
  }, [
    fieldInfoData,
    gotJudicialAdjustmentFieldInfo,
    adjustmentSubFiledInfoObjs,
    noInquireCertificateJudicialUploadLoading,
    certificateUploadLoading,
  ]);

  useEffect(() => {
    if (allFieldInfo !== undefined && allFieldInfo !== null && isUserEdit) {
      form.setFieldsValue({
        adjustmentField: allFieldInfo?.AdjustmentFieldId,
      });
    }
    // else if (gotSelectedFieldId !== undefined && !isUserEdit) {
    //   setFieldId(gotSelectedFieldId);
    //   if (
    //     gotSelectedRequestDate !== "0001-01-01T00:00:00" &&
    //     gotSelectedFieldId !== 0
    //   ) {
    //     form.setFieldsValue({
    //       adjustmentField: gotSelectedFieldId,
    //       permitRequestDate: moment(gotSelectedRequestDate.split("T")[0]),
    //     });
    //   }
    // }
  }, [gotSelectedFieldId, allFieldInfo, selectedField]);

  useEffect(() => {
    if (isUserEdit) {
      const adjustmentSubFiledInfoIdsArr = adjustmentSubFiledInfoObjs?.map(
        (obj: {
          SubFieldId: number;
          SubFieldTitle: string;
          DocumentId: string;
        }) => obj?.SubFieldId
      );
      form.setFieldsValue({ subFields: adjustmentSubFiledInfoIdsArr });
      setSelectedSubFields(adjustmentSubFiledInfoIdsArr);
    } else if (!isUserEdit) {
    }
  }, [adjustmentSubFiledInfoObjs]);

  return (
    <ConfigProvider direction="rtl">
      <Form onFinish={onFinish} form={form}>
        <Row justify="space-around">
          <Col xs={23} sm={23} md={10} offset={1}>
            <Form.Item
              name="adjustmentField"
              label="زمینه تخصصی"
              rules={[
                {
                  required: true,
                  message: "انتخاب زمینه تخصصی الزامی است",
                },
              ]}
              className={classes.formLableFeildInfo}
              labelCol={{ xxl: 5, xl: 7, md: 8 }}
            >
              <Select
                onChange={changeFieldHandler}
                placeholder="انتخاب نمایید"
                disabled={
                  resultLogin?.ApplicantStatusId ===
                    workTaskFlowId?.ReturnToApplicantToCompleteDossier ||
                  isApplicantSecondLicense
                }
                // allowClear={true}
              >
                {specializedField?.Result?.map(
                  (field: { AdjustmentFieldId: number; Title: string }) => (
                    <Option
                      key={field.AdjustmentFieldId}
                      value={field.AdjustmentFieldId}
                    >
                      {field.Title}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="isExamNotNeeded"
              valuePropName="checked"
              style={{ textAlign: "right" }}
            >
              <Checkbox
                onChange={examNotNeededHandler}
                disabled={
                  resultLogin?.ApplicantStatusId ===
                  workTaskFlowId?.ReturnToApplicantToCompleteDossier
                }
              >
                به دلیل داشتن{" "}
                <span style={{ color: "red" }}>5 سال سابقه کاری</span> از صنعت
                بیمه معاف از آزمون کتبی می باشم
              </Checkbox>
            </Form.Item>

            <div style={{ marginBottom: "15px" }}>
              {!isApplicantSecondLicense && (
                 <Alert
                 message={
                  <>
                    <h3 style={{fontWeight:"bolder"}}>به دو روش زیر میتوانید گواهینامه خود را ارائه نمایید :</h3>
                    <p>1- وارد کردن شماره گواهینامه و زدن دکمه استعلام <span>(پیشنهاد می شود)</span></p>
                    <p>2- بارگذاری گواهینامه و زدن دکمه  <span>(در صورت در دسترس بودن)</span></p>
                    <p style={{color:"red"}}>لطفا مدارک را خوانا و رنگی بارگذاری نمایید</p>
                  </>

                }
                 type="warning"
                 showIcon
               />
                /*  <>
                  <strong> استعلام یا بارگذاری گواهینامه  (لطفا تصویر مدارک و مستندات خود را رنگی و خوانا بارگذاری
                    نمایید) الزامی میباشد</strong>
                 
                </> */
              )}
            </div>

            <div className={classes.collapseCertificate}>
              <span>
                در صورت عدم وجود کد استعلام, گواهینامه خود را بارگذاری نمایید.
              </span>

              <label className={classes.customUpload}>
              
                <Tooltip placement="topLeft" title="بارگذاری فایل">
                <div style={{backgroundColor:"#1890ff",color:"white" ,padding:"10px"}}>
                 <span style={{marginLeft:"10px"}}>   بارگذاری مستند</span>
                  <Icon iconType="upload" color="white" size="small"/>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => noInquireCertificateUploadHandler(e)}
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                        workTaskFlowId?.ReturnToApplicantToCompleteDossier ||
                      isApplicantSecondLicense
                    }
                    accept="image/png, image/jpeg, image/jpg,.pdf"
                  />
                  </div>
                </Tooltip>
              </label>

              {visibleDownloadButton && (
                <Tooltip placement="topLeft" title="مشاهده تصویر ارسالی">
                  <a onClick={downloadCertificateHandler}>
                    <Download />
                  </a>
                </Tooltip>
              )}

              {/* <Popconfirm
                title=" از حذف تصویر ارسالی مطمئن هستید؟"
                onConfirm={() => deleteButtonClickedHandler()}
                okText="بله"
                cancelText="خیر"
                disabled={
                  resultLogin?.ApplicantStatusId ===
                    workTaskFlowId?.ReturnToApplicantToCompleteDossier ||
                  isApplicantSecondLicense
                }
              >
                <Tooltip placement="topLeft" title="حذف">
                  <Trash />
                </Tooltip>
              </Popconfirm> */}
            </div>

            <div className={classes.inquireCertificate}>
               <span>گواهی نامه آزمون 80 ساعته </span>
              <div className={classes.certificate}>
                <Input
                  placeholder="شماره گواهینامه"
                  value={certificateNo}
                  onChange={(e) => setCertificateNo(e.target.value)}
                  className={classes.inputCertificate}
                  disabled={
                    resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier ||
                    isApplicantSecondLicense
                  }
                />
                {visibleDownloadButton && (
                  <Button type="text">
                    <Tooltip placement="topLeft" title="دانلود فایل">
                      <a onClick={downloadCertificateHandler}>
                        <Download />
                      </a>
                    </Tooltip>
                  </Button>
                )}

                <div className={classes.buttonLeft}>
                  <Button
                    onClick={
                      isUserEdit
                        ? inquireCertificateHandlerEdit
                        : inquireCertificateHandlerDraft
                    }
                    loading={isUserEdit ? loading : inquireFieldInfoLoading}
                    type="primary"
                    block
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                        workTaskFlowId?.ReturnToApplicantToCompleteDossier ||
                      isApplicantSecondLicense
                    }
                  >
                    استعلام
                  </Button>
                </div>
              </div>
            </div>

            {/* <div className={classes.collapseCertificate}>
                <span>در صورت نیاز, نمره خود را اعلام نمایید.</span>
                <Input
                  onChange={claimedScoreHandler}
                  placeholder="نمره کسب شده"
                  value={claimedScore}
                />
                <Button onClick={submitScoreHandler}>ثبت نمره</Button>
              </div> */}
          </Col>
          <Col xs={12} sm={23} md={10} offset={1}>
            {/* <Form.Item
                name="permitRequestDate"
                label="تاریخ درخواستی صدور پروانه"
                rules={[
                  {
                    required: true,
                    message: "انتخاب تاریخ الزامی است",
                  },
                ]}
              >
                <DatePicker2 placeholder="انتخاب تاریخ" />
              </Form.Item> */}

            <Form.Item
              name="subFields"
              label="زیر رشته زمینه تخصصی"
              rules={[
                {
                  //required: !isExamNotNeeded,
                  required: true,
                  message: "انتخاب زیر رشته زمینه تخصصی الزامی است",
                },
              ]}
              //className={classes.formLableFeildInfo}
              labelCol={{ xxl: 8, xl: 11, md: 15, sm: 19 }}
            >
              {resultSubFieldBasedOnFieldLoading ? (
                <Spin indicator={antIcon} />
              ) : (
                <Select
                  placeholder="انتخاب نمایید"
                  mode="multiple"
                  // allowClear
                  onChange={changeSubFieldsHandler}
                  className={classes.subFieldSelectOption}
                  removeIcon={() => <></>}
                  maxTagCount={2}
                >
                  {resultSubFieldBasedOnField?.map(
                    (subField: {
                      AdjustmentFieldId: number;
                      Title: string;
                    }) => (
                      <Option
                        key={subField.AdjustmentFieldId}
                        value={subField.AdjustmentFieldId}
                      >
                        {subField.Title}
                      </Option>
                    )
                  )}
                </Select>
              )}
            </Form.Item>
            <Alert
              message="کارشناسان محترم قوه قضائیه "
              description=" لطفا برای انتخاب زیر رشته از گزینه مندرج در پروانه کارشناسی قوه قضائیه استفاده نمایید"
              type="warning"
              showIcon
            />
            <Alert
              message="کارشناسان محترم دادگستری"
              description=" لطفا برای انتخاب زیر رشته از گزینه مندرج در پروانه کارشناسی رسمی و دادگستری استفاده نمایید"
              type="warning"
              showIcon
              style={{marginTop:"15px"}}
            />

            {/* {selectedSubFields?.length > 0 && (
              <Alert
                message="شماره گواهینامه را با فرمت دقیق همراه با - وارد نمایید"
                type="warning"
                showIcon
              />
            )}  */}

            {/* {selectedSubFields?.map((subFeildId: number) => {
              let subFieldTitle = resultSubFieldBasedOnField?.find(
                (i: any) => i?.AdjustmentFieldId === subFeildId
              );
              return (
                <>
                  <SubFieldCard
                    sFeild={subFeildId}
                    subFieldTitle={subFieldTitle?.Title}
                    selectedSubFeild={selectedSubFields}
                    isExamNotNeeded={isExamNotNeeded}
                    subFieldInfoInquiredsArr={subFieldInfoInquiredsArr}
                    newlyAddedSubFieldCertificateForSecondLicense={
                      newlyAddedSubFieldCertificateForSecondLicenseFunction
                    }
                  />
                </>
              );
            })} */}
          </Col>
        </Row>
        <div className={classes.nextStep}>
          <Button onClick={prevHandler}>مرحله قبلی</Button>
          {/* <Button
            type="primary"
            htmlType="submit"
            disabled={
              isApplicantSecondLicense? disableNextButtonForSecondLicense : resultLogin?.ApplicantStatusId === workTaskFlowId.ReturnToApplicantToCompleteDossier ? true
                : !isAllFieldsAndSubFieldsInquired
            }
          >
            مرحله بعدی
          </Button> */}
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isFieldInquiredOrUploaded}
          >
            مرحله بعدی
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};

export default FieldInfo;
