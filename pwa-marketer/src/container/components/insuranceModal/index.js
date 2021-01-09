import React, { useState } from "react";
import { Modal, Button, Input, Icon } from "antd";
import { DatePicker } from "react-advance-jalaali-datepicker";
import { useSelector, useDispatch } from "react-redux";
import {
  setInsBirthdate,
  setFNameLName,
  setInsFatherName,
  setIdeNum,
  setInsuranceNum,
  setInsNationalId,
  setRel,
  setInsuranceArr,
} from "./action";

const initialState = {
  displayFnameLnameTxt: "none",
  displayBirthTxt: "none",
  displayFatherNameTxt: "none",
  displayIdeTxt: "none",
  displayNationalIdTxt: "none",
  displayInsuranceNumTxt: "none",
  displayReltxt: "none",
};

function InsuranceModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [
    {
      displayFnameLnameTxt,
      displayBirthTxt,
      displayFatherNameTxt,
      displayIdeTxt,
      displayNationalIdTxt,
      displayInsuranceNumTxt,
      displayReltxt,
    },
    setState,
  ] = useState(initialState);
  const [displayWarningTxt, setDisplayWarningTxt] = useState("none");

  const dispatch = useDispatch();
  const full_name = useSelector((state) => state.insuranceReducer.full_name);
  const birth_certificate_number = useSelector(
    (state) => state.insuranceReducer.birth_certificate_number
  );
  const father_name = useSelector(
    (state) => state.insuranceReducer.father_name
  );
  const relationship = useSelector(
    (state) => state.insuranceReducer.relationship
  );
  const birth_date = useSelector((state) => state.insuranceReducer.birth_date);
  const national_id = useSelector(
    (state) => state.insuranceReducer.national_id
  );
  const notebook_number = useSelector(
    (state) => state.insuranceReducer.notebook_number
  );

  const DatePickerInput = (props) => {
    return <input className="popo" {...props} value={birth_date} />;
  };
  const change = (unix, formatted) => {
    const preDate = parseInt(formatted.slice(0, 4));
    if (preDate <= 1399) {
      setState((prevState) => ({ ...prevState, displayBirthTxt: "none" }));
      dispatch(setInsBirthdate(formatted));
    } else {
      setState((prevState) => ({ ...prevState, displayBirthTxt: "block" }));
    }
  };

  function handleValidateInput(e) {
    const name = e.target.name;
    // const regString = new RegExp("^[آ-یs]+");
    const numberRegex = new RegExp("^[0-9]*$");
    const farsiNumber = new RegExp("^[\u06F0-\u06F90-9]+$");

    switch (name) {
      case "full_name":
        if (full_name?.length > 1) {
          setState((prevState) => ({
            ...prevState,
            displayFnameLnameTxt: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayFnameLnameTxt: "block",
          }));
        }
        break;
      case "father_name":
        if (father_name?.length > 2) {
          setState((prevState) => ({
            ...prevState,
            displayFatherNameTxt: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayFatherNameTxt: "block",
          }));
        }
        break;
      case "national_id":
        if (
          national_id?.length === 10 &&
          (numberRegex.test(national_id) || farsiNumber.test(national_id))
        ) {
          setState((prevState) => ({
            ...prevState,
            displayNationalIdTxt: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayNationalIdTxt: "block",
          }));
        }
        break;
      case "birth_certificate_number":
        if (
          numberRegex.test(birth_certificate_number) ||
          farsiNumber.test(birth_certificate_number)
        ) {
          setState((prevState) => ({ ...prevState, displayIdeTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayIdeTxt: "block" }));
        }
        break;
      case "notebook_number":
        if (
          numberRegex.test(notebook_number) ||
          farsiNumber.test(notebook_number)
        ) {
          setState((prevState) => ({
            ...prevState,
            displayInsuranceNumTxt: "none",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            displayInsuranceNumTxt: "block",
          }));
        }
        break;
      case "relationship":
        if (relationship?.length > 2) {
          setState((prevState) => ({ ...prevState, displayReltxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayReltxt: "block" }));
        }
        break;
      default:
        break;
    }
  }

  const handleAddInsuranceArr = () => {
    if (
      full_name !== "" &&
      national_id !== "" &&
      father_name !== "" &&
      relationship !== "" &&
      birth_date !== "" &&
      birth_certificate_number !== "" &&
      notebook_number !== ""
    ) {
      dispatch(setInsuranceArr());
      setModalVisible(false);
      dispatch(setFNameLName(""));
      dispatch(setInsBirthdate(""));
      dispatch(setInsFatherName(""));
      dispatch(setIdeNum(""));
      dispatch(setInsuranceNum(""));
      dispatch(setInsNationalId(""));
      dispatch(setRel(""));
    } else {
      setDisplayWarningTxt('block');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        افزودن افراد تحت تکفل
      </Button>
      <Modal
        title="افراد تحت تکفل"
        centered
        visible={modalVisible}
        onOk={handleAddInsuranceArr}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddInsuranceArr}>
            اضافه کردن
          </Button>,
        ]}
      >
        <Input
          placeholder="نام و نام خانوادگی"
          value={full_name}
          name="full_name"
          onChange={(e) => dispatch(setFNameLName(e.target.value))}
          onBlur={(e) => handleValidateInput(e)}
          className="terminalNum"
        />
        <p className="error-txt" style={{ display: displayFnameLnameTxt }}>
          * لطفا نام و نام خانوادگی را به درستی وارد نمایید
        </p>
        <Input
          placeholder="کد ملی"
          value={national_id}
          name="national_id"
          onChange={(e) => dispatch(setInsNationalId(e.target.value))}
          onBlur={(e) => handleValidateInput(e)}
          className="terminalNum"
        />
        <p className="error-txt" style={{ display: displayNationalIdTxt }}>
          * لطفا کدملی را به درستی وارد نمایید
        </p>
        <Input
          placeholder="نام پدر"
          value={father_name}
          name="father_name"
          onChange={(e) => dispatch(setInsFatherName(e.target.value))}
          onBlur={(e) => handleValidateInput(e)}
          className="terminalNum"
        />
        <p className="error-txt" style={{ display: displayFatherNameTxt }}>
          * لطفا نام پدر را به درستی وارد نمایید
        </p>
        <Input
          placeholder="نسبت"
          value={relationship}
          name="relationship"
          onChange={(e) => dispatch(setRel(e.target.value))}
          onBlur={(e) => handleValidateInput(e)}
          className="terminalNum"
        />
        <p className="error-txt" style={{ display: displayReltxt }}>
          * لطفا نسبت را به درستی وارد نمایید
        </p>
        <Input
          placeholder="شماره شناسنامه"
          value={birth_certificate_number}
          name="birth_certificate_number"
          onChange={(e) => dispatch(setIdeNum(e.target.value))}
          onBlur={(e) => handleValidateInput(e)}
          className="terminalNum"
        />
        <p className="error-txt" style={{ display: displayIdeTxt }}>
          * لطفا شماره شناسنامه را به درستی وارد نمایید
        </p>
        <Input
          placeholder="شماره دفترچه(بیمه پایه)"
          value={notebook_number}
          name="notebook_number"
          onChange={(e) => dispatch(setInsuranceNum(e.target.value))}
          onBlur={(e) => handleValidateInput(e)}
          className="terminalNum"
        />
        <p className="error-txt" style={{ display: displayInsuranceNumTxt }}>
          * لطفا شماره دفترچه را به درستی وارد نمایید
        </p>
        <div className="date-picker-div">
          <p>تاریخ تولد : </p>
          <DatePicker
            inputComponent={DatePickerInput}
            placeholder="انتخاب تاریخ"
            format="jYYYY/jMM/jDD"
            onChange={change}
            id="datePicker2"
            preSelected="1398/11/15"
            cancelOnBackgroundClick={true}
          />
          <Icon type="calendar" className="date-icon" />
        </div>
        <p className="error-txt" style={{ display: displayBirthTxt }}>
          *تاریخ انتخاب شده معتبر نیست
        </p>
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
      </Modal>
    </div>
  );
}

export default InsuranceModal;
