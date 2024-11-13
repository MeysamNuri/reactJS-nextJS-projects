import React, { useState, useEffect, FC } from "react";
import { Button, Row, Col, Table, Popconfirm, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { INote } from "../../../shared/ulitities/Model/note";
import { IAneAdjusterList } from "../../../shared/ulitities/Model/oneAdjuster";
import { GetWay } from "../../../shared/ulitities/Enums/getWay";
import { addNote, fetchNotes, removeNote } from "../../../redux/actions";
import { ReactComponent as Remove } from "../../../assets/images/remove.svg";

interface IAttachment {
  oneAdjusterList?: IAneAdjusterList;
  isFromReportTable?: boolean;
  isEvaluatorDesktopInformation?: number;
}
const { TextArea } = Input;
const Note: FC<IAttachment> = ({
  oneAdjusterList,
  isFromReportTable,
  isEvaluatorDesktopInformation,
}) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [desNote, setDesNote] = useState("");
  const listNotes = useSelector((state: any) => state.note.listNote);
  let userRecognition = Number(localStorage.getItem("userRecognition"));
  const listAttachLoading = useSelector(
    (state: any) => state.attachment.loading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    isEvaluatorDesktopInformation === GetWay.desktop
      ? dispatch(fetchNotes(userRecognition))
      : dispatch(fetchNotes(oneAdjusterList?.ApplicantId));
  }, []);

  //add note
  const addNoteHandler = () => {
    let newNote: INote = {
      applicantId: oneAdjusterList?.ApplicantId,
      title: noteTitle,
      description: desNote,
    };

    dispatch(
      addNote(newNote, () => {
        dispatch(fetchNotes(oneAdjusterList?.ApplicantId));
      })
    );
    setNoteTitle("");
    setDesNote("");
  };
  const changeInputHandler = (e: any) => {
    setNoteTitle(e.target.value);
  };

  //remove note
  const rempoveNoteHandler = (record: any) => {
    dispatch(removeNote(record.Id));
  };

  let columns: any = [
    {
      title: "عنوان",
      dataIndex: "Title",
      width: "30%",
    },

    {
      title: "مشاهده یادداشت",
      dataIndex: "Description",
      width: "60%",
    },
    {
      title: "حذف",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <>
          <Popconfirm
            title="از حذف یادداشت مورد نظر مطمئن هستید؟"
            okText="بله"
            cancelText="خیر"
            onConfirm={() => rempoveNoteHandler(record)}
          >
            <Remove />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="attachment">
      {!isFromReportTable && isEvaluatorDesktopInformation !== GetWay.desktop && (
        <Row className="headerAtachment">
          <Col span={12}>
            <h5 className="titleCol">عنوان یادداشت</h5>
            <Input
              placeholder="عنوان یادداشت"
              onChange={(e: any) => changeInputHandler(e)}
              value={noteTitle}
              allowClear
            />
          </Col>
          <Col span={12}>
            <h5 className="titleCol">یادداشت</h5>
            <div style={{ display: "flex" }}>
              <TextArea
                onChange={(e: any) => setDesNote(e.target.value)}
                placeholder="در اینجا می توانید یادداشت خود را بنویسید."
                value={desNote}
                allowClear
                autoSize
              />
              <Button type="primary" onClick={addNoteHandler}>
                ذخیره
              </Button>
            </div>
          </Col>
        </Row>
      )}
      <Table
        columns={columns}
        dataSource={listNotes?.Result}
        loading={listAttachLoading}
        pagination={false}
        locale={{ emptyText: "یادداشتی مشاهده نگردید." }}
        scroll={{ y: 100 }}
      />
    </div>
  );
};

export default Note;
