import React, { useState } from "react";
import { Modal, Button, Input, Radio } from "antd";
import Poz from "../poz/Poz";
import { connect } from "react-redux";
import AddBank from "./AddBank";
import {
  setPozModalRadio,
  setTerminal,
  addPozDetail,
  setBankId,
  setSheba,
  setTerminalImg,
} from "../../Actions/FormAction";
import { axiosInstance as axios } from "../../config/axios";

function PozModal({
  setPozModalRadio,
  setTerminal,
  addPozDetail,
  FormReducer,
  setBankId,
  setSheba,
  setTerminalImg,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayWarningTxt, setDisplayWarningTxt] = useState("none");
  const [displayTerminalTxt, setDisplayTerminalTxt] = useState("none");
  const [loading, setLoading] = useState("none");

  function handleSavePozDetail() {
    if (
      FormReducer.terminalNumber !== "" &&
      FormReducer.bankId !== "" &&
      FormReducer.pozModalRadio !== "" &&
      FormReducer.selectedPoz !== "" &&
      FormReducer.selectedBank !== ""
    ) {
      addPozDetail();
      setModalVisible(false);
      setTerminal("");
      setBankId("");
      setSheba("");
    } else {
      setDisplayWarningTxt("block");
    }
  }

  function handleValidateNumber() {
    const numberRegex = new RegExp("^[0-9]*$");
    const farsiNumber = new RegExp("^[\u06F0-\u06F90-9]+$");
    if (
      FormReducer.terminalNumber?.length !== "" &&
      (numberRegex.test(FormReducer.terminalNumber) ||
        farsiNumber.test(FormReducer.terminalNumber))
    ) {
      setDisplayTerminalTxt("none");
    } else {
      setDisplayTerminalTxt("block");
    }
  }

  let formData;
  function handlUploadTerminalImg(e) {
    formData = new FormData();
    formData.append("terminal_image", e.target.files[0]);
  }

  function fileChangedHandler() {
    setLoading("flex");
    axios
      .post("marketer/terminal/image/upload", formData)
      .then((res) => {
        setLoading("none");
        setTerminalImg(res.data.data.terminal_image_name);
      })
      .catch((err) => {
        alert("لطفا فایل تصویر آپلود نمایید");
      });
  }

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        افزودن پوز
      </Button>
      <Modal
        title="عملیات افزودن پوز"
        centered
        visible={modalVisible}
        onOk={handleSavePozDetail}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" onClick={handleSavePozDetail}>
            اضافه کردن
          </Button>,
        ]}
      >
        <div className="terminal-loading" style={{ display: loading }}>
          <p>لطفا منتظر بمانید ...</p>
        </div>
        <div className="modal-div terminal">
          <Poz />
          <Input
            placeholder="شماره ترمینال"
            value={FormReducer.terminalNumber}
            onChange={(e) => setTerminal(e.target.value)}
            onBlur={handleValidateNumber}
            className="terminalNum"
            maxLength={20}
          />
          <form id="terminal">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "20px",
                marginRight: "8px",
              }}
            >
              <label className="terminal-lable" htmlFor="terminal-img">
                انتخاب فایل
                <input
                  type="file"
                  id="terminal-img"
                  onChange={(e) => handlUploadTerminalImg(e)}
                  style={{ width: "70%", marginLeft: "10px" }}
                />
              </label>
              <Button
                onClick={fileChangedHandler}
                type="primary"
                style={{ marginTop: "10px" }}
              >
                ارسال
              </Button>
            </div>
          </form>
        </div>
        <p
          className="error-txt"
          style={{ display: displayTerminalTxt, textAlign: "center" }}
        >
          شماره ترمینال باید بدون حروف اضافه و عدد باشد
        </p>
        <div className="addBank-div" style={{ margin: "15px 0" }}>
          <Radio.Group
            onChange={(e) => setPozModalRadio(e.target.value)}
            className="poz-radio"
          >
            <Radio value={"static"}>ثابت</Radio>
            <Radio value={"dynamic"}>سیار</Radio>
          </Radio.Group>
        </div>
        <div className="modal-div" style={{ flexDirection: "column" }}>
          <div
            className="addBank-div sheba-div"
            style={{
              border: "1px dotted darkgray",
              padding: "5px 8px",
              marginBottom: "10px",
              borderRadius: "9px",
            }}
          >
            <AddBank />
          </div>
          <p
            style={{
              display: displayWarningTxt,
              float: "right",
              margin: "10px 0",
            }}
            className="error-txt"
          >
            *لطفا فیلد های مورد نظر را پر کنید
          </p>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (store) => ({
  FormReducer: store.FormReducer,
});
const mapDispatchToProps = (dispatch) => ({
  setPozModalRadio: (pozr) => dispatch(setPozModalRadio(pozr)),
  setTerminal: (terminal) => dispatch(setTerminal(terminal)),
  addPozDetail: () => dispatch(addPozDetail()),
  setBankId: () => dispatch(setBankId()),
  setSheba: () => dispatch(setSheba()),
  setTerminalImg: (img) => dispatch(setTerminalImg(img)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PozModal);
