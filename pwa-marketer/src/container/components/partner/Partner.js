import React, { useState } from "react";
import {
  setPartnerBirthdate,
  setPartnerReceiverFName,
  setPartnerReceiverLName,
  setPartnerNationalId,
  setPartnerIdentificationNumber,
  setPartnerIdFrom,
  setPartnerFatherName,
  addPartnerDetail,
} from "../../Actions/FormAction";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
import { DatePicker } from "react-advance-jalaali-datepicker";
import "../style.css";

const initialState = {
  displayStoreTxt: "none",
  displayRecfTxt: "none",
  displayReclTxt: "none",
  displayIdTxt: "none",
  displayIdenTxt: "none",
  displayFromTxt: "none",
  displayFtxt: "none",
  displayDateTxt: "none",
  partners: 0,
  displayPartnerTxt: "none",
};
function Partner({
  setPartnerBirthdate,
  setPartnerReceiverFName,
  setPartnerReceiverLName,
  setPartnerNationalId,
  setPartnerIdentificationNumber,
  setPartnerIdFrom,
  setPartnerFatherName,
  addPartnerDetail,
  show,
  FormReducer,
}) {
  const [
    {
      displayRecfTxt,
      displayReclTxt,
      displayIdTxt,
      displayIdenTxt,
      displayFromTxt,
      displayFtxt,
      displayDateTxt,
      partners,
      displayPartnerTxt,
    },
    setState,
  ] = useState(initialState);

  const DatePickerInput = (props) => {
    return (
      <input className="popo" {...props} value={FormReducer.partnerBirthdate} />
    );
  };

  const change = (unix, formatted) => {
    const preDate = parseInt(formatted.slice(0, 4));
    if (preDate <= 1398) {
      setState((prevState) => ({ ...prevState, displayDateTxt: "none" }));

      setPartnerBirthdate(formatted);
    } else {
      setState((prevState) => ({ ...prevState, displayDateTxt: "block" }));
    }
  };

  function setPartner(e) {
    e.preventDefault();
    addPartnerDetail();
    setState((prevState) => ({ ...prevState, partners: partners + 1 }));
    setState((prevState) => ({ ...prevState, displayPartnerTxt: "block" }));
    setPartnerBirthdate("");
    setPartnerReceiverFName('');
    setPartnerReceiverLName('');
    setPartnerNationalId("");
    setPartnerIdentificationNumber("");
    setPartnerIdFrom("");
    setPartnerFatherName("");
  }

  function handleValidateInput(e) {
    const name = e.target.name;
    const regString = new RegExp("^[آ-یs]+");
    const numberRegex = new RegExp("^[0-9]*$");
    const farsiNumber = new RegExp("^[\u06F0-\u06F90-9]+$");

    switch (name) {
      case "receiverf_name":
        if (
          FormReducer.partnerReceiverFName.length > 2 &&
          regString.test(FormReducer.partnerReceiverFName)
        ) {
          setState((prevState) => ({ ...prevState, displayRecfTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayRecfTxt: "block" }));
        }
        break;
      case "receiverl_name":
        if (
          FormReducer.partnerReceiverLName?.length > 2 &&
          regString.test(FormReducer.partnerReceiverLName)
        ) {
          setState((prevState) => ({ ...prevState, displayReclTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayReclTxt: "block" }));
        }
        break;
      case "id_from":
        if (
          FormReducer.partnerIdFrom?.length > 2 &&
          regString.test(FormReducer.partnerIdFrom)
        ) {
          setState((prevState) => ({ ...prevState, displayFromTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayFromTxt: "block" }));
        }
        break;
      case "father_name":
        if (
          FormReducer.partnerFatherName?.length > 2 &&
          regString.test(FormReducer.partnerFatherName)
        ) {
          setState((prevState) => ({ ...prevState, displayFTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayFTxt: "block" }));
        }
        break;
      case "id_national":
        if (
          FormReducer.partnerNationalId?.length === 10 &&
          (numberRegex.test(FormReducer.partnerNationalId) ||
            farsiNumber.test(FormReducer.partnerNationalId))
        ) {
          setState((prevState) => ({ ...prevState, displayIdTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayIdTxt: "block" }));
        }
        break;
      case "identification":
        if (
          numberRegex.test(FormReducer.partnerIdentification) ||
          farsiNumber.test(FormReducer.partnerIdentification)
        ) {
          setState((prevState) => ({ ...prevState, displayIdenTxt: "none" }));
        } else {
          setState((prevState) => ({ ...prevState, displayIdenTxt: "block" }));
        }
        break;
        default:
          break;
    }
  }

  return (
    <div
      style={{
        display: show ? "flex" : "none",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <Input
        onChange={(e) => setPartnerReceiverFName(e.target.value)}
        name="receiverf_name"
        onBlur={(e) => handleValidateInput(e)}
        value={FormReducer.partnerReceiverFName}
        placeholder="نام پذیرنده"
      />
      <p className="error-txt" style={{ display: displayRecfTxt }}>
        * لطفا نام پذیرنده را به درستی وارد نمایید
      </p>
      <Input
        onChange={(e) => setPartnerReceiverLName(e.target.value)}
        name="receiverl_name"
        onBlur={(e) => handleValidateInput(e)}
        value={FormReducer.partnerReceiverLName}
        placeholder="نام خانوادگی پذیرنده"
      />
      <p className="error-txt" style={{ display: displayReclTxt }}>
        * لطفا نام خانوادگی پذیرنده را به درستی وارد نمایید
      </p>

      <Input
        onChange={(e) => setPartnerNationalId(e.target.value)}
        name="id_national"
        onBlur={(e) => handleValidateInput(e)}
        value={FormReducer.partnerNationalId}
        placeholder="کد ملی"
      />
      <p className="error-txt" style={{ display: displayIdTxt }}>
        * لطفا کد ملی را به صورت عدد و بدون حروف اضافه و نشانه وارد نمایید
      </p>

      <Input
        onChange={(e) => setPartnerIdentificationNumber(e.target.value)}
        value={FormReducer.partnerIdentification}
        name="identification"
        onBlur={(e) => handleValidateInput(e)}
        placeholder="شماره شناسنامه"
      />
      <p className="error-txt" style={{ display: displayIdenTxt }}>
        * لطفا شماره شناسنامه را به صورت عدد و بدون حروف اضافه و نشانه وارد
        نمایید
      </p>

      <Input
        onChange={(e) => setPartnerIdFrom(e.target.value)}
        name="id_from"
        onBlur={(e) => handleValidateInput(e)}
        value={FormReducer.partnerIdFrom}
        placeholder="صادره از"
      />
      <p className="error-txt" style={{ display: displayFromTxt }}>
        * لطفا محل صدور شناسنامه خود را به درستی وارد نمایید
      </p>

      <Input
        onChange={(e) => setPartnerFatherName(e.target.value)}
        name="father_name"
        onBlur={(e) => handleValidateInput(e)}
        value={FormReducer.partnerFatherName}
        placeholder="نام پدر"
      />
      <p className="error-txt" style={{ display: displayFtxt }}>
        * لطفا نام پدر را به درستی وارد نمایید
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "10px 0 20px 0",
          position: "relative",
          alignSelf: "flex-start",
        }}
      >
        <p>تاریخ تولد : </p>
        <DatePicker
          inputComponent={DatePickerInput}
          placeholder="انتخاب تاریخ"
          format="jYYYY/jMM/jDD"
          onChange={change}
          id="datePicker3"
          preSelected="1398/11/15"
          cancelOnBackgroundClick={true}
        />
        <Icon type="calendar" className="date-icon" />
      </div>
      <p className="error-txt" style={{ display: displayDateTxt }}>
        *تاریخ انتخاب شده معتبر نیست
      </p>
      <Button
        style={{ margin: "10px 0" }}
        type="primary"
        onClick={(e) => setPartner(e)}
      >
        ثبت
      </Button>
      <p style={{ display: displayPartnerTxt }}>{`تعداد شرکا: ${partners}`}</p>
    </div>
  );
}

const mapStateToProps = (store) => ({
  FormReducer: store.FormReducer,
});
const mapDispatchToProps = (dispatch) => ({
  setPartnerBirthdate: (birth) => dispatch(setPartnerBirthdate(birth)),
  setPartnerReceiverFName: (recieverl) =>
    dispatch(setPartnerReceiverFName(recieverl)),
  setPartnerReceiverLName: (recieverl) =>
    dispatch(setPartnerReceiverLName(recieverl)),
  setPartnerNationalId: (national) => dispatch(setPartnerNationalId(national)),
  setPartnerIdentificationNumber: (iden) =>
    dispatch(setPartnerIdentificationNumber(iden)),
  setPartnerIdFrom: (from) => dispatch(setPartnerIdFrom(from)),
  setPartnerFatherName: (father) => dispatch(setPartnerFatherName(father)),
  addPartnerDetail: () => dispatch(addPartnerDetail()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Partner);
