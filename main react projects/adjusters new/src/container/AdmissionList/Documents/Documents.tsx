import React, { useEffect, useState, useMemo, FC, useRef } from "react";
import { Table, ConfigProvider, Radio, Button, Tooltip, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CaretDownOutlined, CaretLeftOutlined, EyeOutlined, LoadingOutlined
} from "@ant-design/icons";
import { Icon } from 'sanhab-components-library'
import {
  getDocumentsList,
  senDocumentsList,
} from "../ServicesCartable/AdmissionListServices";
import RowDocument from "./RowDocument";
import {
  dlDocumentHandler,
  fetchDocumentApprove,
  updateDocument,
  fetchHistorydocument,
  removeUploadedCartableDocuments,
  handleRemoveShowPic
} from "../../../redux/actions";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { useRejectAllBaseInfo } from "../../Adjusters/AdjustersHook";
import {
  messageSuccess,
  messageError,
} from "../../../utils/utils";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";
import { IAddDocumentApprove } from "../../../shared/ulitities/Model/documentApprove";
import { approvalHistory } from "../../../shared/ulitities/Enums/approvalHistory";
import {
  ALL_DOCUMENT_CARTABLE,
  SUBMIT_CHEKED,
} from "../../../constant/cartableActionTypes";
import Download from "../../../assets/images/download.svg";
import UploadIcon from "../../../assets/images/upload.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import removeItem from "../../../assets/images/remove.svg";
import ImageCropComponent from './cropImage'
interface IDocumentsProps {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  activeTabInbox?: string;
  isEvaluatorDesktopInformation?: number;
}

const { Option } = Select;

const Documents: FC<IDocumentsProps> = ({
  oneAdjusterList,
  isFromReportTable,
  activeTabInbox,
  isEvaluatorDesktopInformation,
}) => {
  const dispatch = useDispatch();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let userRecognition = Number(localStorage.getItem("userRecognition"));
  const [rotate, setRotate] = useState(0)
  const [allRadio, setAllRadio] = useState(null);
  const [allDocuments, setAllDocuments] = useState([] as any);
  const [loadingAllDocuments, setLoadingAllDocuments] = useState(false);
  // const [postDocuments, setPostDocuments] = useState([] as any);
  const [postDocumentsLoading, setPostDocumentsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [downloadId, setDownloadId] = useState<any>(0);
  const [expandedRowKeys, setExpandedRowKeys] = useState([] as any);

  const downloadedPicRoute = useSelector(
    (state: any) => state.dlDocument.dlDocument
  );

  const downLoadDocumentLoading = useSelector(
    (state: any) => state.dlDocument.loading
  );
  const rotatePicFunc = () => {
    setRotate(rotate + 90)
  }
  const { data: RejectAllBaseInfo, isLoading } = useRejectAllBaseInfo();
  const [valueChanged, setValueChanged] = useState(false);
  // const {submitCheked} = useSelector((state: any) => state.listNaturalCartable);

  async function getDocuments() {
    try {
      setLoadingAllDocuments(true);
      const data = await getDocumentsList(
        isEvaluatorDesktopInformation === GetWay.desktop
          ? userRecognition
          : oneAdjusterList?.ApplicantId
      );
      data && setAllDocuments(data?.Result);
    } catch (err) {
    } finally {
      setLoadingAllDocuments(false);
    }
  }

  async function postListDocuments(documents: IAddDocumentApprove) {
    try {
      setPostDocumentsLoading(true);
      const data = await senDocumentsList(
        documents,
        oneAdjusterList?.ApplicantId
      );
      if (data.IsSucceed === true) {
        messageSuccess("اسناد به درستی آپدیت گردیدند");
        dispatch({ type: SUBMIT_CHEKED, payload: true });
        dispatch(fetchDocumentApprove(oneAdjusterList?.ApplicantId));
      } else {
        messageError(data.Message);
      }
    } catch (err) {
    } finally {
      setPostDocumentsLoading(false);
    }
  }


  useEffect(() => {
    getDocuments();
  }, [oneAdjusterList?.ApplicantId]);

  //change RadioButton
  const changeModeHandler = (e: any, id: any) => {
    setValueChanged(true);
    setAllRadio(null);
    const newDoc = allDocuments?.map((el: any) => {
      if (el.Id === id) {
        return {
          ...el,
          IsApproved: e.target.value,
        };
      }
      return el;
    });

    setAllDocuments(newDoc);
  };

  //change All RadioButton
  const changeAllMode = (e: any) => {
    setValueChanged(true);
    setAllRadio(e.target.value);
    const newDoc = allDocuments?.map((doc: any) => {
      return {
        ...doc,
        IsApproved: e.target.value,
      };
    });
    setAllDocuments(newDoc);
  };

  //download Document
  const dlDocument = (record: any) => {
    setDownloadId(record.Id);
    setVisible(true)
    dispatch(
      dlDocumentHandler(
        isEvaluatorDesktopInformation == GetWay.desktop
          ? userRecognition
          : oneAdjusterList?.ApplicantId,
        record.Id
      )
    );
  };

  // remove document=========

  const removeDocuments = (record: any) => {
    dispatch(removeUploadedCartableDocuments(
      isEvaluatorDesktopInformation == GetWay.desktop
        ? userRecognition
        : oneAdjusterList?.ApplicantId,
      record.Id,
      getDocuments
    ))
  }


  //===============

  const updateDocumentHandler = (e: any, record: any) => {
    let fileName = [];
    fileName.push(e.target.files[0]);
  
    let file = fileName[0];
 

    dispatch(updateDocument(oneAdjusterList?.ApplicantId, record.Id, file));
  };

  //console.log(allDocuments, "allDocuments");

  const changeInputHandler = (id: any, value: any) => {
    setValueChanged(true);
    // setValue(value)
    const newDoc = allDocuments?.map((el: any) => {
      if (el.Id === id) {
        return { ...el, RejectReasonId: value };
      } else {
        return el;
      }
    });
    setAllDocuments(newDoc);
  };

  useEffect(() => {
    setValueChanged(false);
    dispatch({ type: SUBMIT_CHEKED, payload: false });
  }, []);

  let columns = useMemo(() => {
    return [

      {
        title: "نام مستند",
        dataIndex: "DocumentTypeTitle",
        width: "35%",
        key: "Id",
      },

      {
        title: "عملیات",
        dataIndex: "adjusterType",
        key: "adjusterType",
        render: (text: any, record: any) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip placement="topLeft" title="حذف مدرک">
              <Trash style={{ cursor: "pointer" }} onClick={() => removeDocuments(record)} />
            </Tooltip>
            <Tooltip placement="topLeft" title="مشاهده فایل ارسال شده">

              {/* <Button 
                type="text"
                onClick={() => dlDocument(record)}
                loading={downLoadDocumentLoading && downloadId === record.Id}
                icon={<img src={Download} style={{ cursor: "pointer" }} />}
              ></Button> */}
              {
              record.Id==downloadId&& downLoadDocumentLoading ?
                  <Spin indicator={antIcon} /> :
                  <EyeOutlined
                    className="hoverIcon"
                    style={{
                      color: "#7987A1",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "10px"
                    }} 
                    onClick={() => dlDocument(record)}

                  />
              }

            </Tooltip>
            {oneAdjusterList?.ApplicantId !== undefined &&
              activeTabInbox !== "2" ? (
                <Tooltip placement="topLeft" title="بارگذاری فایل">
                  <label className="customFileUploadNoBorder">
                    <img src={UploadIcon} alt="upload" />
                    {/* <Upload /> */}
                    <input
                      type="file"
                      onChange={(e) => updateDocumentHandler(e, record)}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </label>
                </Tooltip>
              ) : null}
          </div>
        ),
      },
      isFromReportTable ||
        oneAdjusterList?.ApplicantId === undefined ||
        activeTabInbox === "2"
        ? {}
        : {
          title: (
            <Radio.Group onChange={changeAllMode} value={allRadio}>
              <Radio value={false}>رد</Radio>
              <Radio value={true}>تایید</Radio>

            </Radio.Group>
          ),
          dataIndex: "IsApproved",
          key: "IsApproved",
          render: (value: any, record: any) => {
            return (
              <Radio.Group
                onChange={(e) => changeModeHandler(e, record.Id)}
                value={value}
              >
                <Radio value={false}>رد</Radio>
                <Radio value={true}>تایید</Radio>
              </Radio.Group>
            );
          },
        },
      isFromReportTable ||
        oneAdjusterList?.ApplicantId === undefined ||
        activeTabInbox === "2"
        ? {}
        : {
          title: "دلیل رد",
          dataIndex: "RejectReasonTitle",
          render: (value: string, record: any, index: any) => {
            return (
              <>
                <Select
                  style={{ width: "152px" }}
                  placeholder="انتخاب نمایید"
                  defaultValue={value}
                  onChange={(value) => changeInputHandler(record.Id, value)}
                  loading={isLoading}
                  allowClear
                  dropdownMatchSelectWidth={900}
                >
                  {RejectAllBaseInfo?.Result?.map(
                    ({ Id, Title }: { Id: number; Title: string }) => (
                      <Option key={Id} value={Id}>
                        {Title}
                      </Option>
                    )
                  )}
                </Select>
                {/* <TextArea
                    disabled={record.IsApproved !== false}
                    defaultValue={value}
                    onBlur={(e: any) => changeInputHandler(e, record.Id)}
                    autoSize
                    allowClear
                  /> */}
              </>
            );
          },
        },
    ];
  }, [
    changeInputHandler,
    changeModeHandler,
    changeAllMode,
    allDocuments,
    allRadio,
    activeTabInbox,
  ]);

  const submitDocumentHandler = () => {
    const dataDocument: IAddDocumentApprove = allDocuments
      .filter((el: any) => {
        if (el.IsApproved === false || el.IsApproved) return el;
      })
      ?.map((el: any) => {
        return {
          id: el.Id,
          isApproved: el.IsApproved,
          rejectReasonId: el.IsApproved === false ? el.RejectReasonId : null,
        };
      });
    valueChanged && postListDocuments(dataDocument);
    dispatch({ type: ALL_DOCUMENT_CARTABLE, payload: dataDocument });
  };

  const handelExpand = (record: any, e: any) => {
    var keys = [];
    if (record) {
      keys.push(record.Id);
    }
    setExpandedRowKeys([...keys]);
    dispatch(
      fetchHistorydocument(
        e.Id,
        isEvaluatorDesktopInformation === GetWay.desktop
          ? userRecognition
          : oneAdjusterList?.ApplicantId,
        approvalHistory.document
      )
    );
  };
  const removeShowPic = () => {
    dispatch(handleRemoveShowPic())
    setRotate(0)
  }





  return (
    <div className="documentAdmissionList">

      <Table
        dataSource={allDocuments}
        pagination={false}
        columns={columns}
        loading={loadingAllDocuments}
        scroll={{ y: 180 }}
        rowKey={(record) => record.Id}
        expandable={{
          expandedRowRender: (record) => {
            return <RowDocument rejectAllBaseInfo={RejectAllBaseInfo} />;
          },
          onExpand: (record, e) => {
            handelExpand(record, e);
          },

          expandIcon: (props) => {
            if (props.expanded) {
              return (
                <a
                  style={{ color: "black" }}
                  onClick={(e) => {
                    props.onExpand(props.record, e);
                  }}
                >
                  <CaretDownOutlined />
                </a>
              );
            } else {
              return (
                <a
                  style={{ color: "black" }}
                  onClick={(e) => {
                    props.onExpand(props.record, e);
                  }}
                >
                  <CaretLeftOutlined />
                </a>
              );
            }
          },
        }}

      />
      {
        downloadedPicRoute &&
        <div className="download-prewiew-pic-container">
          <div style={{ padding: "15px" }}>
            <img onClick={removeShowPic} src={removeItem} />
            <Button style={{ marginRight: "10px" }} type="primary" onClick={rotatePicFunc}>
              <span style={{ marginLeft: "8px" }}>چرخش</span>
              <Icon iconType="sync" color="white" size="small" />
            </Button>

          </div>

          <div style={{ position: "absolute", top: "5%", right: "12%" }}>
            <div
              className="image-crop-holder"
            >
              <ImageCropComponent downloadedPicRoute={downloadedPicRoute} rotate={rotate} oneAdjusterList={oneAdjusterList} downloadId={downloadId} />
            </div>

          </div>
        </div>
      }
      {!downloadedPicRoute && oneAdjusterList?.ApplicantId !== undefined &&
        activeTabInbox !== "2" && !isFromReportTable ? (
          <div className="submit marginTop buttonModal ">
            <Button
              type="primary"
              loading={postDocumentsLoading}
              onClick={submitDocumentHandler}
            >
              ذخیره
            </Button>
          </div>
        ) : null}


    </div>
  );
};

export default Documents;
