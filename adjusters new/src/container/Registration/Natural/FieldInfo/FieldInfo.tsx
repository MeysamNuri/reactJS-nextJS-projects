//libraries
import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import classes from "./FieldInfo.module.css";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Input,
  ConfigProvider,
  Tooltip,
  Popconfirm,
  Checkbox,
  Spin,
  Alert,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adjusterType } from "../../../../shared/ulitities/Enums/adjusterTypeId";
import { Icon } from 'sanhab-components-library'
//redux actions
import {
  postFieldInfoDraft,
  getFieldInfoDraft,
  uploadCertificateFieldInfoDraft,
  inquireFieldInfoDraft,
  postSubFieldInfoDraft,
  postIsExamNotNeededDraft,
  inquireCertificateEdit,
  getPersonalInfoNaturalDraft,
  getAllFamilyMember,
  getProfilePicDraftNatural,
  getSpecializedFieldInfoEdit,
  getSubFieldInfoEdit,
  deleteSpecializedFieldInfoEdit,
  postApplicantFieldInfoEdit,
  noInquireCertificateUploadEdit,
  getSubFieldBasedOnFieldNatural,
  isComeFromRegistration,
  disableNextButtonFieldInfoNatural,
  subFieldInfoNaturalInquireds,
  postIsExamNotNeededEdit,
  fetchAllAdjustmentField,
} from "../../../../redux/actions";
import { ReactComponent as Download } from "../../../../assets/images/download.svg";
import { ReactComponent as Upload } from "../../../../assets/images/upload.svg";
import { ReactComponent as Trash } from "../../../../assets/images/trash.svg";
import CollapseCertificate from "./CollapseCertificate";

//hooks
import usePrevious from "../../../../hooks/usePrevious";

//functions
import fileExtentionValidator from "../../../../shared/ulitities/fileExtentionValidator";

//http constants
import HttpBaseConstant from "../../../../controler/services/HttpBaseConstant";

//enums
import { workTaskFlowId } from "../../../../shared/ulitities/Enums/workTaskFlow";

const { Option } = Select;
interface IFieldInfoProps {
  onSubmit: () => void;
  onPrev: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FieldInfo: FC<IFieldInfoProps> = ({ onSubmit, onPrev }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [selectedSubFields, setSelectedSubFields] = useState([] as any);
  const [selectedField, setSelectedField] = useState(0);
  const [certificateNo, setCertificateNo] = useState("");
  const [isExamNotNeeded, setIsExamNotNeeded] = useState(false);
  const [certificateFileName,setCertificateFileName]=useState("")
  const [
    isAllFieldsAndSubFieldsInquired,
    setIsAllFieldsAndSubFieldsInquired,
  ] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [
    newlyAddedSubFieldCertificateForSecondLicense,
    setNewlyAddedSubFieldCertificateForSecondLicense,
  ] = useState(0);
  const [
    disableNextButtonForSecondLicense,
    setDisableNextButtonForSecondLicense,
  ] = useState(true);
  const [
    isSubFieldUploadedOrInquired,
    setIsSubFieldUploadedOrInquired,
  ] = useState(false);

  const resultLogin = useSelector(
    (state: any) => state.sendNatAndRegCodes?.response?.Result
  );
  const loadingFieldInfo = useSelector(
    (state: any) => state?.feildInfo?.loading
  );
  const adjustmentFiledInfo = useSelector(
    (state: any) => state?.feildInfo?.feildInfo?.Result
  );

  const { loading } = useSelector(
    (state: any) => state?.noInquireCertificateUpload
  );

  const adjustmentSubFiledInfoObjs = useSelector(
    (state: any) => state?.feildInfo?.subFieldInfo?.Result
  );
  const isUserEdit = localStorage.getItem("userEdit");

  const idEditState = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.response?.Result?.Id
  );
  const idEditLocalStorage = useSelector(
    (state: any) => state?.sendNatAndRegCodes?.editId
  );
  //const response2222 = useSelector((state: any) => state.sendNatAndRegCodes);
  const { response } = useSelector((state: any) => state.sendNatAndRegCodes);

  const gotIdForMainEdit =
    idEditState !== undefined ? idEditState : idEditLocalStorage;

  const draftIdState = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.DraftId
  );
  const draftIdLocalStorage = localStorage.getItem("naturalDraftId");

  const draftId =
    draftIdState !== undefined ? draftIdState : draftIdLocalStorage;
  const isApplicantSecondLicense = useSelector(
    (state: any) => state.NewDraftId.newId?.Result?.IsApplicantSecondLicense
  );
  const resultSubFieldBasedOnField = useSelector(
    (state: any) =>
      state?.getSubFieldBasedOnFieldNatural?.getSubFieldBasedOnFieldNatural
        ?.Result
  );
  const resultSubFieldBasedOnFieldLoading = useSelector(
    (state: any) => state?.getSubFieldBasedOnFieldNatural?.loading
  );
  const specializedField = useSelector(
    (state: any) => state?.specializedField?.specializedField
  );

  const subFieldInfoInquiredsArr = useSelector(
    (state: any) => state?.subFieldInfoInquiredsNatural?.isSubFieldInfoInquired
  );
  const fieldInfoData = useSelector(
    (state: any) => state?.getFieldInfoData?.data?.Result
  );
  const subFieldInfoIdsArrayData = fieldInfoData?.SubFields?.map(
    (i: any) => i?.FieldId
  );

  const inquireFieldInfoLoading = useSelector(
    (state: any) => state?.certifacte80Hour?.loading
  );


  const onFinish = () => {
    onSubmit();
  };

  //handlers
  const inquireCertificateHandler = () => {
    if (isUserEdit) {
      dispatch(
        inquireCertificateEdit(
          gotIdForMainEdit,
          certificateNo,
          selectedField,
          () => {
            dispatch(disableNextButtonFieldInfoNatural(false));
            setShowDownloadButton(true);
            dispatch(
              getSpecializedFieldInfoEdit(
                gotIdForMainEdit,
                (fieldId: number) => {
                  setSelectedField(fieldId);
                  dispatch(getSubFieldBasedOnFieldNatural(fieldId));
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
        inquireFieldInfoDraft(
          adjusterType.natural,
          draftId,
          certificateNo,
          () => {
            dispatch(
              getFieldInfoDraft(adjusterType.natural, draftId, () => { })
            );
            setShowDownloadButton(true);
          }
        )
      );
    }
  };


  const prevHandler = () => {
    onPrev();
    if (!isUserEdit && !isApplicantSecondLicense) {
      dispatch(getPersonalInfoNaturalDraft(draftId));
      dispatch(getAllFamilyMember(draftId));
      dispatch(getProfilePicDraftNatural(draftId));
      dispatch(isComeFromRegistration(false));
    }
  };

  const changeFieldHandler = (value: number) => {
    setSelectedField(value);
    dispatch(getSubFieldBasedOnFieldNatural(value));
    setSelectedSubFields([]);
    dispatch(subFieldInfoNaturalInquireds(false, []));
    form.setFieldsValue({
      subFields: [],
    });
    if (isUserEdit) {
      dispatch(
        deleteSpecializedFieldInfoEdit(
          gotIdForMainEdit,
          prevSelectedField,
          () => {
            setSelectedField(value);
          },
          () => {
            dispatch(
              postApplicantFieldInfoEdit(
                gotIdForMainEdit,
                value,
                isExamNotNeeded,
                () => {
                  dispatch(
                    getSpecializedFieldInfoEdit(
                      gotIdForMainEdit,
                      (fieldId: number) => {
                        setSelectedField(fieldId);
                        dispatch(getSubFieldBasedOnFieldNatural(fieldId));
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
              postApplicantFieldInfoEdit(
                gotIdForMainEdit,
                value,
                isExamNotNeeded,
                () => {
                  dispatch(
                    getSpecializedFieldInfoEdit(
                      gotIdForMainEdit,
                      (fieldId: number) => {
                        setSelectedField(fieldId);
                        dispatch(getSubFieldBasedOnFieldNatural(fieldId));
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
        postFieldInfoDraft(adjusterType.natural, draftId, infoField, () => {
          dispatch(getFieldInfoDraft(adjusterType.natural, draftId, () => { }));
        })
      );
    }
  };

  const prevSelectedField = usePrevious(selectedField);

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
        postIsExamNotNeededEdit(dataToPost, () => {
          dispatch(
            getSpecializedFieldInfoEdit(gotIdForMainEdit, (fieldId: number) => {
              setSelectedField(fieldId);
              dispatch(getSubFieldBasedOnFieldNatural(fieldId));
              form.setFieldsValue({
                adjustmentField: fieldId,
              });
            })
          );
        })
      );
    } else if (!isUserEdit) {
      let isExam = { isExamNotNeeded: e?.target?.checked };
      dispatch(
        postFieldInfoDraft(adjusterType.natural, draftId, infoField, () => {
          dispatch(
            postIsExamNotNeededDraft(
              adjusterType.natural,
              draftId,
              isExam,
              () => {
                dispatch(
                  getFieldInfoDraft(adjusterType.natural, draftId, () => { })
                );
              }
            )
          );
        })
      );
    }
  };

  const changeSubFieldsHandler = (value: any) => {
    if (value.length <= 2) {
      setSelectedSubFields(value);
    }

    if (isUserEdit) {
      dispatch(
        postApplicantFieldInfoEdit(
          gotIdForMainEdit,
          value[value.length - 1],
          isExamNotNeeded,
          () => {
            dispatch(
              getSpecializedFieldInfoEdit(
                gotIdForMainEdit,
                (fieldId: number) => {
                  setSelectedField(fieldId);
                  dispatch(getSubFieldBasedOnFieldNatural(fieldId));
                  form.setFieldsValue({
                    adjustmentField: fieldId,
                  });
                }
              )
            );
            dispatch(
              getSubFieldInfoEdit(gotIdForMainEdit, (subFieldId: any) => {
                setSelectedSubFields(subFieldId);
                form.setFieldsValue({
                  subFields: subFieldId,
                });
              })
            );
          }
        )
      );
    } else if (!isUserEdit) {
      let subFieldsArr = {
        subFields: value,
      };
      dispatch(
        postSubFieldInfoDraft(
          adjusterType.natural,
          draftId,
          subFieldsArr,
          () => {
            dispatch(
              getFieldInfoDraft(adjusterType.natural, draftId, () => { })
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

  const noInquireCertificateUploadHandler = (e: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
    let file = fileName[0];

    setCertificateFileName(file?.name)
    fileExtentionValidator(
      e,
      500000,
      ["image/jpg", "image/jpeg", "image/png"],
      () => {
        if (isUserEdit) {
          dispatch(
            noInquireCertificateUploadEdit(
              gotIdForMainEdit,
              file,
              selectedField,
              () => {
                dispatch(disableNextButtonFieldInfoNatural(false));
                setShowDownloadButton(true);
                dispatch(
                  getSpecializedFieldInfoEdit(
                    gotIdForMainEdit,
                    (fieldId: number) => {
                      setSelectedField(fieldId);
                      dispatch(getSubFieldBasedOnFieldNatural(fieldId));
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
              adjusterType.natural,
              draftId,
              file,
              () => {
                dispatch(
                  getFieldInfoDraft(adjusterType.natural, draftId, () => { })
                );
                setShowDownloadButton(true);
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
        ? `${HttpBaseConstant.url}/applicant-field-info-specialized-content?id=${gotIdForMainEdit}`
        : `${HttpBaseConstant.url}/registration/draft/${draftId}/adjusterType/${adjusterType.natural}/80hour-certificate-content`,
      method: "GET",
      responseType: "json",
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((response) => {
        if (response?.data?.IsSucceed === true) {
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

  // const deleteButtonHandler = () => {
  //   dispatch(disableNextButtonFieldInfoNatural(true));
  //   setShowDownloadButton(false);
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

  const newlyAddedSubFieldCertificateForSecondLicenseFunction = () => {
    setNewlyAddedSubFieldCertificateForSecondLicense(
      newlyAddedSubFieldCertificateForSecondLicense - 1
    );
  };

  const isSubFieldUploadedOrInquiredFunction = (i: boolean) => {
    setIsSubFieldUploadedOrInquired(i);
  };

  let adjustmentFiled = {
    isActive: true,
  };
  let adjustmentFiledAll = {
    isActive: null,
  };

  //lifecycle hooks
  useEffect(() => {
    if (isApplicantSecondLicense) {
      dispatch(fetchAllAdjustmentField(adjustmentFiledAll));
    } else {
      dispatch(fetchAllAdjustmentField(adjustmentFiled));
    }

    if (isUserEdit) {
      dispatch(
        getSpecializedFieldInfoEdit(gotIdForMainEdit, (fieldId: number) => {
          setSelectedField(fieldId);
          dispatch(getSubFieldBasedOnFieldNatural(fieldId));
          form.setFieldsValue({
            adjustmentField: fieldId,
          });
        })
      );
      dispatch(
        getSubFieldInfoEdit(gotIdForMainEdit, (subFieldId: any) => {
          setSelectedSubFields(subFieldId);
          form.setFieldsValue({
            subFields: subFieldId,
          });
        })
      );
    } else if (!isUserEdit) {
      if (isApplicantSecondLicense) {
        dispatch(
          getFieldInfoDraft(
            adjusterType.natural,
            draftId,
            (fieldId: number) => {
              setSelectedField(fieldId);
              dispatch(getSubFieldBasedOnFieldNatural(fieldId));
              form.setFieldsValue({
                adjustmentField: fieldId,
              });
            }
          )
        );
      } else if (!isApplicantSecondLicense) {
        dispatch(
          getFieldInfoDraft(
            adjusterType.natural,
            draftId,
            (fieldId: number) => {
              setSelectedField(fieldId);
              dispatch(getSubFieldBasedOnFieldNatural(fieldId));
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
          if (isExamNotNeeded) {
            setDisableNextButtonForSecondLicense(false);
          } else if (!isExamNotNeeded) {
            if (isSubFieldUploadedOrInquired) {
              setDisableNextButtonForSecondLicense(false);
            } else {
              setDisableNextButtonForSecondLicense(true);
            }
          }
        }
      } else {
        if (newlyAddedSubFieldCertificateForSecondLicense === 0) {
          setDisableNextButtonForSecondLicense(true);
          if (isExamNotNeeded == false && showDownloadButton == false) {
            setIsAllFieldsAndSubFieldsInquired(false);
          } else if (isExamNotNeeded == true && showDownloadButton == false) {
            setIsAllFieldsAndSubFieldsInquired(true);
          } else if (isExamNotNeeded == true && showDownloadButton == true) {
            setIsAllFieldsAndSubFieldsInquired(false);
          } else if (isExamNotNeeded == false && showDownloadButton == true) {
            setIsAllFieldsAndSubFieldsInquired(true);
          }
        } else {
          if (isExamNotNeeded) {
            setDisableNextButtonForSecondLicense(false);
          } else if (!isExamNotNeeded) {
            if (isSubFieldUploadedOrInquired) {
              setDisableNextButtonForSecondLicense(false);
            } else {
              setDisableNextButtonForSecondLicense(true);
            }
          }
        }
      }
    } else if (isUserEdit) {
      if (adjustmentFiledInfo?.Course80HourDocumentId !== null) {
        setShowDownloadButton(true);
      } else {
        setShowDownloadButton(false);
      }
  
      
      const adjustmentSubFiledInfoDocumentIdsArr = adjustmentSubFiledInfoObjs?.map(
        (obj: {
          SubFieldId: number;
          SubFieldTitle: string;
          DocumentId: string;
          IsApproved: boolean;
        }) => obj?.DocumentId
      );
  
      if (adjustmentFiledInfo?.Course80HourDocumentId !== null) {
        if (adjustmentFiledInfo?.IsExamNotNeeded === true && adjustmentFiledInfo?.IsApproved !== false) {
          setIsAllFieldsAndSubFieldsInquired(true);
        } else if (
          adjustmentSubFiledInfoDocumentIdsArr !== undefined &&
          !adjustmentSubFiledInfoDocumentIdsArr?.includes(null) && adjustmentFiledInfo?.IsApproved !== false

        ) {
          setIsAllFieldsAndSubFieldsInquired(true);
          
        }

        else {
          setIsAllFieldsAndSubFieldsInquired(false);
        }

      } else if (adjustmentFiledInfo?.Course80HourDocumentId === null) {
        setIsAllFieldsAndSubFieldsInquired(false);
      }
      let findIsApprove: any = null
      findIsApprove = adjustmentSubFiledInfoObjs?.find((f: any) => (f.IsApproved == false))
      if (findIsApprove !== null && findIsApprove !== undefined) return setIsAllFieldsAndSubFieldsInquired(false)

    }
  }, [
    fieldInfoData,
    adjustmentFiledInfo,
    adjustmentSubFiledInfoObjs,
    isSubFieldUploadedOrInquired,
  ]);

  useEffect(() => {
    if (isUserEdit) {
      const adjustmentSubFiledInfoIdsArr = adjustmentSubFiledInfoObjs?.map(
        (obj: {
          SubFieldId: number;
          SubFieldTitle: string;
          DocumentId: string;
          IsApproved: boolean;
        }) => obj?.SubFieldId
      );
      form.setFieldsValue({ subFields: adjustmentSubFiledInfoIdsArr });
      setSelectedSubFields(adjustmentSubFiledInfoIdsArr);
    } else if (!isUserEdit) {
    }
  }, [adjustmentSubFiledInfoObjs]);

  return (
    <ConfigProvider direction="rtl">
      {
        loadingFieldInfo ? <Spin style={{ width: "100%", margin: "30px auto" }} />
          :

          <Form onFinish={onFinish} form={form}>
            <Row justify="space-around">
              <Col xs={23} sm={23} md={24} lg={12} xl={12} >
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
                    placeholder="انتخاب نمایید"
                    onChange={changeFieldHandler}
                    disabled={
                      resultLogin?.ApplicantStatusId ===
                      workTaskFlowId?.ReturnToApplicantToCompleteDossier
                      //  ||response?.Result?.LicenseType === 2
                    }
                  // allowClear
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
                {
                  adjustmentFiledInfo?.IsApproved == false ?
                    <Alert showIcon type="error" message="گواهینامه بارگذاری شده شما رد شده است" />
                    :
                    null
                }
                <Form.Item name="isExamNotNeeded" style={{ textAlign: "right" }}>

                  <Checkbox
                    onChange={examNotNeededHandler}
                    checked={isExamNotNeeded}
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
                          <h3 style={{ fontWeight: "bolder" }}>به دو روش زیر میتوانید گواهینامه خود را ارائه نمایید :</h3>
                          <p>1- وارد کردن شماره گواهینامه و زدن دکمه استعلام <span>(پیشنهاد می شود)</span></p>
                          <p>2- بارگذاری گواهینامه و زدن دکمه  <span>(در صورت در دسترس بودن)</span></p>
                          <p style={{ color: "red" }}>لطفا مدارک را خوانا و رنگی بارگذاری نمایید</p>
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
                  <span>گواهینامه خود را بارگذاری نمایید.</span>

                  <label className={classes.customUpload}>
                    {
                      loading ? <Spin /> :
                        <Tooltip placement="topLeft" title="بارگذاری مستند">

                          <div style={{ backgroundColor: "#1890ff", color: "white", padding: "10px" }}>
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

                  {/*     {showDownloadButton && ( */}
                  <Tooltip placement="topLeft" title="مشاهده تصویر ارسالی">
                    <span>{certificateFileName}</span>
                    <Button
                      onClick={downloadCertificateHandler}
                      type="text"
                      disabled={
                        resultLogin?.ApplicantStatusId ===
                        workTaskFlowId?.ReturnToApplicantToCompleteDossier
                      }
                    >
                      <Download />
                    </Button>
                  </Tooltip>
                  {/* )} */}
                  {/* <Popconfirm
                title=" از حذف تصویر ارسالی مطمئن هستید؟"
                onConfirm={() => deleteButtonHandler()}
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
              </Popconfirm> */}
                </div>
                <Form.Item>
                  <div className={classes.collapseCertificate}>
                    <span style={{ fontSize: "13px" }}>گواهی نامه آزمون 80 ساعته </span>
                    <Input
                      style={{ width: "50%" }}
                      placeholder="شماره گواهینامه"
                      value={certificateNo}
                      onChange={(e) => setCertificateNo(e.target.value)}
                      className={classes.inputCertificate80Hour}
                      disabled={
                        resultLogin?.ApplicantStatusId ===
                        workTaskFlowId?.ReturnToApplicantToCompleteDossier
                      }
                    />
                    {/*  {showDownloadButton && ( */}
                    <div>
                      <Button
                        type="text"
                        disabled={
                          resultLogin?.ApplicantStatusId ===
                          workTaskFlowId?.ReturnToApplicantToCompleteDossier
                        }
                      >
                        <Tooltip placement="topLeft" title="دانلود فایل">
                          <a
                            onClick={() =>
                              downloadCertificateHandler(certificateNo)
                            }
                          >
                            <Download />
                          </a>
                        </Tooltip>
                      </Button>
                    </div>
                    {/*  )} */}
                    <Button
                      onClick={inquireCertificateHandler}
                      loading={inquireFieldInfoLoading}
                      disabled={
                        resultLogin?.ApplicantStatusId ===
                        workTaskFlowId?.ReturnToApplicantToCompleteDossier
                      }
                      type="primary"
                    >
                      استعلام
                </Button>
                  </div>
                </Form.Item>
              </Col>
              <Col xs={23} sm={23} md={24} lg={11} xl={11}>
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
                  className={classes.formLableFeildInfo}
                  labelCol={{ xxl: 8, xl: 11, md: 15, sm: 19 }}
                >
                  {resultSubFieldBasedOnFieldLoading ? (
                    <Spin indicator={antIcon} />
                  ) : (
                      <Select
                        placeholder="انتخاب نمایید"
                        mode="multiple"
                        maxTagCount={2}
                        onChange={changeSubFieldsHandler}
                        disabled={
                          resultLogin?.ApplicantStatusId ===
                          workTaskFlowId?.ReturnToApplicantToCompleteDossier
                        }
                        loading={resultSubFieldBasedOnFieldLoading}
                        removeIcon={() => <></>}
                        notFoundContent={
                          resultSubFieldBasedOnField == null &&
                          "زیر رشته ای موجود نیست"
                        }
                      >
                        {resultSubFieldBasedOnField?.map(
                          (subField: {
                            AdjustmentFieldId: number;
                            Title: string;
                          }) => (
                            <Option
                              key={subField?.AdjustmentFieldId}
                              value={subField?.AdjustmentFieldId}
                            >
                              {subField.Title}
                            </Option>
                          )
                        )}
                      </Select>
                    )}
                </Form.Item>

                {selectedSubFields?.length > 0 && (
                  <Alert
                    message="شماره گواهینامه را با فرمت دقیق همراه با - وارد نمایید"
                    type="warning"
                    showIcon
                  />
                )}


                {selectedSubFields?.map((subFeildId: number) => {
                  let subFieldTitle = resultSubFieldBasedOnField?.find(
                    (i: any) => i?.AdjustmentFieldId === subFeildId
                  );
                  return (

                    <>
                      <CollapseCertificate
                        sFeild={subFeildId}
                        adjustmentSubFiledInfoObjs={adjustmentSubFiledInfoObjs}
                        response={response}
                        resultSubFieldBasedOnField={resultSubFieldBasedOnField}
                        subFieldTitle={subFieldTitle?.Title}
                        selectedSubFeild={selectedSubFields}
                        isExamNotNeeded={isExamNotNeeded}
                        subFieldInfoInquiredsArr={subFieldInfoInquiredsArr}
                        newlyAddedSubFieldCertificateForSecondLicense={
                          newlyAddedSubFieldCertificateForSecondLicenseFunction
                        }
                        isSubFieldUploadedOrInquiredFunction={
                          isSubFieldUploadedOrInquiredFunction
                        }
                      />
                    </>
                  );
                })}
              </Col>
            </Row>
            <div className={classes.nextStep}>
              <Button onClick={prevHandler}>مرحله قبلی</Button>
              {/* ثبت نام ارزیاب پروانه دوم */}
              {isApplicantSecondLicense ? (
                <Button
                  type="primary"
                  htmlType="submit"
                // loading={loadingFieldInfo}
                // disabled={!isAllFieldsAndSubFieldsInquired}
                >
                  مرحله بعدی{" "}
                </Button>
              ) : //ویرایش ارزیاب پروانه دوم
                response?.Result?.LicenseType === 2 ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loadingFieldInfo}
                    disabled={!isAllFieldsAndSubFieldsInquired}
                  >
                    مرحله بعدی
                  </Button>
                ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadingFieldInfo}
                      // disabled={
                      //   isApplicantSecondLicense === undefined
                      //     ? response?.Result?.LicenseType !== 2
                      //     : disableNextButtonForSecondLicense
                      //     ? resultLogin?.ApplicantStatusId ===
                      //       workTaskFlowId.ReturnToApplicantToCompleteDossier
                      //       ? true
                      //       : !isAllFieldsAndSubFieldsInquired
                      //     : false
                      // }

                      disabled={
                        isApplicantSecondLicense
                          ? disableNextButtonForSecondLicense
                          : resultLogin?.ApplicantStatusId ===
                            workTaskFlowId?.ReturnToApplicantToCompleteDossier
                            ? true
                            : !isAllFieldsAndSubFieldsInquired
                      }
                    >
                      مرحله بعدی
                    </Button>
                  )}
              {/* <Button
            type="primary"
            htmlType="submit"
            loading={loadingFieldInfo}
            // disabled={
            //   isApplicantSecondLicense === undefined
            //     ? response?.Result?.LicenseType !== 2
            //     : disableNextButtonForSecondLicense
            //     ? resultLogin?.ApplicantStatusId ===
            //       workTaskFlowId.ReturnToApplicantToCompleteDossier
            //       ? true
            //       : !isAllFieldsAndSubFieldsInquired
            //     : false
            // }

            disabled={
              isApplicantSecondLicense
                ? disableNextButtonForSecondLicense
                : resultLogin?.ApplicantStatusId ===
                  workTaskFlowId?.ReturnToApplicantToCompleteDossier
                ? true
                : !isAllFieldsAndSubFieldsInquired
            }

            // disabled={
            //   resultLogin?.ApplicantStatusId ===
            //     workTaskFlowId?.ReturnToApplicantToCompleteDossier ||
            //   isApplicantSecondLicense
            // }
          >
            مرحله بعدی
          </Button> */}
            </div>
          </Form>
      }
    </ConfigProvider>
  );
};

export default FieldInfo;
