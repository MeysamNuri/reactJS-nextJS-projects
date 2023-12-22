import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  ConfigProvider,
  Switch,
  Popconfirm,
  Tooltip,
  Checkbox,
  Alert,
  // Popover,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FindAccess } from "sanhab-components-library";
import CreateDocument from "./CreateDocument";
import {
  useAllDocument,
  useDeletDocument,
  useUpdateIsActive,
  useUpdateAdjusterTypeRequire,
  useUpdateDocumentTypeSituation,
  useFilterDocument,
} from "../AdjustersHook";
import { userAccessList } from "../../../shared/ulitities/Enums/userAccessList";
// import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
// import Filters from "./Filter";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
// import { ReactComponent as Filter } from "../../../assets/images/filter.svg";
import "./Document.css";

const Document = () => {
  const [seletedDocument, setSeletedDocument] = useState(0);
  const [filterDocument, { status }] = useFilterDocument();
  const [visible, setVisible] = useState(false);
  // const [filter, setFilter] = useState(false);
  const [filterList, setFilterList] = useState<any>([]);
  // const [visibleFilter, setVisibleFilter] = useState(false);
  const { data: allDocuments, isLoading } = useAllDocument();
  const [remove] = useDeletDocument();
  const [updateIsvisible, { status: statusIsvisible }] = useUpdateIsActive();
  const [
    updateRequire,
    { status: statusIsRequire },
  ] = useUpdateAdjusterTypeRequire();
  const [updateDocumentTypeSituation] = useUpdateDocumentTypeSituation();

  const changeIsvisible = (relAdjuster: any, doc: any, e: any) => {
    let updateRel = {
      documentTypeId: doc.Id,
      adjusterTypeId: relAdjuster.AdjusterType.CourseTypeId,
      isVisible: e.target.checked,
    };
    updateIsvisible(updateRel);
  };

  let filterDoc = allDocuments?.Result?.map((doc: any) => {
    let degree = {
      key: doc.Id,
      text: doc.Title,
      value: doc.Id,
    };
    return degree;
  });
  const changeAdjusterTypeRequire = (
    relAdjuster: any,
    doc: any,
    checked: boolean
  ) => {
    let updateAdjusterTypeRequire = {
      documentTypeId: doc.Id,
      adjusterTypeId: relAdjuster.AdjusterType.CourseTypeId,
      isRequired: checked,
    };
    updateRequire(updateAdjusterTypeRequire);
  };

  const changeDocumentSituationId = (
    relAdjuster: any,
    doc: any,
    checked: any
  ) => {
    let updateDocSituation = {
      documentTypeId: doc.Id,
      adjusterTypeId: relAdjuster.AdjusterType.CourseTypeId,
      DocumentSituationId: checked,
    };
    updateDocumentTypeSituation(updateDocSituation);
  };

  let dataDocument = allDocuments?.Result?.map(
    (doc: { Id: string; Title: string; RelatedAdjusterTypes: any }) => {
      let document = {
        key: doc.Id,
        id: doc.Id,
        Title: doc.Title,
        adjusterType: doc?.RelatedAdjusterTypes?.map(
          (relAdjuster: {
            IsRequired: boolean;
            IsVisible: boolean;
            DocumentSituationId: number;
            DocumentSituationTitle: string;
            AdjusterType: { CourseTypeId: number; Title: string };
          }) => (
            <span
              key={relAdjuster.AdjusterType.CourseTypeId}
              className="nav-item-title"
            >
              <span className="adjusterTitle">
                {relAdjuster.AdjusterType.Title}
              </span>
              <Switch
                checkedChildren="اجباری"
                unCheckedChildren="غیر اجباری"
                defaultChecked={relAdjuster.IsRequired ? true : false}
                className="ToggleButton"
                onChange={(checked) =>
                  changeAdjusterTypeRequire(relAdjuster, doc, checked)
                }
              />
              {/* <Switch
                checkedChildren="قابل رویت"
                unCheckedChildren="غیر قابل رویت"
                defaultChecked={relAdjuster.IsVisible ? true : false}
                className="ToggleButton"
              /> */}
              <Tooltip title="قابل رویت" overlayClassName="popAction">
                <Checkbox
                  defaultChecked={relAdjuster.IsVisible ? true : false}
                  onChange={(e) => changeIsvisible(relAdjuster, doc, e)}
                />
              </Tooltip>
              <Switch
                checkedChildren="تکمیل پرونده"
                unCheckedChildren="ثبت ارزیاب"
                defaultChecked={relAdjuster.DocumentSituationId ? true : false}
                className="ToggleButton"
                onChange={(checked) =>
                  changeDocumentSituationId(relAdjuster, doc, checked)
                }
              />
            </span>
          )
        ),
      };
      return document;
    }
  );

  //edit Document
  // const editDocumentHandler = () => {
  //   setVisible(true);
  // };

  //romove Documet
  const removeDocHandler = (record: any) => {
    let findDoc = allDocuments?.Result.find(
      (item: any) => item.Id === record.id
    );

    let adjusterTypeIds = findDoc?.RelatedAdjusterTypes?.map(
      (item: any) => item.AdjusterType.Id
    );
    let ff = adjusterTypeIds[0];
    let yy = adjusterTypeIds[1];
    let kk = adjusterTypeIds[2];

    let tt: any = { ff, yy, kk };
    remove(record.id, tt);
  };

  let columns = [
    {
      title: FindAccess(userAccessList.Adjusters_DeleteDocumentType)
        ? "عملیات"
        : "",
      dataIndex: "Title",
      editable: true,
      filters: filterDoc,
    },
    {
      title: "نوع ارزیاب(اجباری یا غیر اجباری بودن مدارک)",
      dataIndex: "adjusterType",
      className: "adjusterRequire",
      // width: "50%",
    },

    {
      title: "عملیات",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <div className="operations">
            {/* <a className="action" onClick={editDocumentHandler}>
              <img src={edit} alt="edit" />
            </a> */}
            {dataDocument.length >= 1 &&
              FindAccess(userAccessList.Adjusters_DeleteDocumentType) && (
                <Popconfirm
                  title="از حذف سند  مورد نظر مطمئن هستید؟"
                  onConfirm={() => removeDocHandler(record)}
                  okText="بله"
                  cancelText="خیر"
                >
                  <Tooltip title="حذف" overlayClassName="popAction">
                    <a className="action">
                      <Trash />
                    </a>
                  </Tooltip>
                </Popconfirm>
              )}
          </div>
        </Space>
      ),
    },
  ];

  //visible Modal
  const showCreateDocumentHandler = () => {
    setVisible(true);
  };

  //select Row
  const docRowSelection = (selected: any) => {
    setSeletedDocument(selected);
  };

  //فیلتر
  // const filterHandler = () => {
  //   setFilter(!filter);
  // };

  // const handleVisibleFilterChange = (visible: any) => {
  //   setVisibleFilter(visible);
  // };

  // const hideFilter = () => setVisibleFilter(false);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [] as any;
    if (filters.Title != null) {
      let first = [...filters.Title].shift();
      let last = [...filters.Title].pop();
      let fitrstIndex = filters.Title.indexOf(first);
      let lastIndex = filters.Title.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "DocumentId",
          operator: 1,
          value: filters?.Title[0],
        });
      }

      if (filters.Title.length > 1) {
        for (let i = 0; i < filters.Title.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "DocumentId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.Title.length - 1) {
            filteredIndictmentList.push({
              propertyName: "DocumentId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.Title.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "DocumentId",
              operator: 1,
              value: filters?.Title[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    // setFilterList(filteredIndictmentList);

    let filter = {
      filters: filteredIndictmentList,
    };

    filterDocument(filter);
  };


  return (
    <div className="document">
      <div className="buttonDoc">
        {FindAccess(userAccessList.Adjusters_CreateDocumentType) && (
          <Button
            type="primary"
            className="createModal"
            onClick={showCreateDocumentHandler}
            icon={<PlusOutlined />}
          >
            ایجاد مدارک
          </Button>
        )}
        {/*    <Popover
          content={
            <Filters
              closeFilter={() => setFilter(false)}
              hideFilter={hideFilter}
              allDocuments={allDocuments}
            />
          }
          title="جستجو"
          trigger="click"
          visible={visibleFilter}
          onVisibleChange={handleVisibleFilterChange}
          overlayClassName="popoverCustomDc"
          placement="left"
        >
          <Button
            type="primary"
            onClick={filterHandler}
            className="filter centerFlex"
            icon={<Filter />}
            style={{ display: "flex", alignItems: "center" }}
          >
            جستجو
          </Button>
        </Popover> */}
      </div>
      {FindAccess(userAccessList.Adjusters_ViewDocumentType) ? (
        <ConfigProvider direction="rtl">
          <Table
            dataSource={dataDocument}
            pagination={false}
            columns={columns}
            loading={isLoading}
            onChange={handleChange}
            onRow={(record) => {
              return {
                onClick: () => {
                  docRowSelection(record);
                },
              };
            }}
            locale={{
              filterReset: (
                <span
                  onClick={() => {
                    document
                      .querySelector(".ant-dropdown")!
                      .classList.add("ant-dropdown-hidden");
                    setFilterList([]);
                  }}
                >
                  باز نشانی
                </span>
              ),
              filterConfirm: "جستجو",
              filterEmptyText: "یافت نشد",
              emptyText: "مدارکی یافت نشد.",
            }}
            // rowClassName={() => "editable-row"}
          />
          <Modal
            title="ایجاد مدارک"
            visible={visible}
            footer={null}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={500}
          >
            <CreateDocument
              closeModal={() => setVisible(false)}
              filterList={filterList}
            />
          </Modal>
        </ConfigProvider>
      ) : (
        <Alert
          type="warning"
          description="شما به مشاهده مدارک دسترسی ندارید."
          message=""
        />
      )}
    </div>
  );
};

export default Document;
