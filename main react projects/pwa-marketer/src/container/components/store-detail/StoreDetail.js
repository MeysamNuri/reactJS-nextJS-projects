import React, { useState } from "react";
import "../style.css";
import { Input, Button, Icon, Select } from "antd";
import {
  setMarketerName,
  setStoreName,
  setBirthdate,
  setFatherName,
  setIdFrom,
  setIdentificationNumber,
  setNationalId,
  setReceiverFName,
  setReceiverLName,
  setRefArray,
} from "../../Actions/FormAction";
import { connect } from "react-redux";
import { DatePicker } from "react-advance-jalaali-datepicker";
import Partner from "../partner/Partner";

const initialState = {
  displayStoreTxt: "none",
  displayRecfTxt: "none",
  displayReclTxt: "none",
  displayIdTxt: "none",
  displayIdenTxt: "none",
  displayFromTxt: "none",
  displayFtxt: "none",
  displayDateTxt: "none",
  showPartnerDetail: false,
};
const { Option } = Select;

const StoreDetail = React.forwardRef((props, ref) => {
  const {
    marketerList,
    setMarketerName,
    setStoreName,
    setBirthdate,
    setFatherName,
    setIdFrom,
    setIdentificationNumber,
    setNationalId,
    setReceiverFName,
    setReceiverLName,
    FormReducer,
    setRefArray,
  } = props;

  const [
    {
      displayStoreTxt,
      displayRecfTxt,
      displayReclTxt,
      displayIdTxt,
      displayIdenTxt,
      displayFromTxt,
      displayFtxt,
      displayDateTxt,
      showPartnerDetail,
    },
    setState,
  ] = useState(initialState);
  // console.log(ref);
  // const ref = useRef()
  const DatePickerInput = (props) => {
    return <input className="popo" {...props} value={FormReducer.birthdate} />;
  };
  const change = (unix, formatted) => {
    const preDate = parseInt(formatted.slice(0, 4));
    if (preDate <= 1398) {
      setState((prevState) => ({ ...prevState, displayDateTxt: "none" }));

      setBirthdate(formatted);
    } else {
      setState((prevState) => ({ ...prevState, displayDateTxt: "block" }));
    }
  };

  function removeArr(txt) {
    const index = FormReducer.refArray.indexOf(txt);
    if (index > -1) {
      FormReducer.refArray.splice(index, 1);
    }
  }

  function handleValidateInput(e) {
    const name = e.target.name;
    const regString = new RegExp("^[آ-یs]+");
    const numberRegex = new RegExp("^[0-9]*$");
    const farsiNumber = new RegExp("^[\u06F0-\u06F90-9]+$");

    switch (name) {
      case "store_name":
        if (
          FormReducer.storeName?.length > 1 &&
          regString.test(FormReducer.storeName)
        ) {
          setState((prevState) => ({ ...prevState, displayStoreTxt: "none" }));
          removeArr("sName");
        } else {
          setState((prevState) => ({ ...prevState, displayStoreTxt: "block" }));
          setRefArray([...FormReducer.refArray, "sName"]);
        }
        break;
      case "receiverf_name":
        if (
          FormReducer.receiverFName?.length > 2 &&
          regString.test(FormReducer.receiverFName)
        ) {
          setState((prevState) => ({ ...prevState, displayRecfTxt: "none" }));
          removeArr("rName");
        } else {
          setState((prevState) => ({ ...prevState, displayRecfTxt: "block" }));
          setRefArray([...FormReducer.refArray, "rfName"]);
        }
        break;
        case "receiverl_name":
        if (
          FormReducer.receiverLName?.length > 2 &&
          regString.test(FormReducer.receiverLName)
        ) {
          setState((prevState) => ({ ...prevState, displayReclTxt: "none" }));
          removeArr("rName");
        } else {
          setState((prevState) => ({ ...prevState, displayReclTxt: "block" }));
          setRefArray([...FormReducer.refArray, "rlName"]);
        }
        break;
      case "id_from":
        if (
          FormReducer.idFrom?.length > 1 &&
          regString.test(FormReducer.idFrom)
        ) {
          setState((prevState) => ({ ...prevState, displayFromTxt: "none" }));
          removeArr("from");
        } else {
          setState((prevState) => ({ ...prevState, displayFromTxt: "block" }));
          setRefArray([...FormReducer.refArray, "from"]);
        }
        break;
      case "father_name":
        if (
          FormReducer.fatherName?.length > 2 &&
          regString.test(FormReducer.fatherName)
        ) {
          setState((prevState) => ({ ...prevState, displayFtxt: "none" }));
          removeArr("fName");
        } else {
          setState((prevState) => ({ ...prevState, displayFtxt: "block" }));
          setRefArray([...FormReducer.refArray, "fName"]);
        }
        break;
      case "id_national":
        if (
          FormReducer.nationalId?.length === 10 &&
          (numberRegex.test(FormReducer.nationalId) ||
            farsiNumber.test(FormReducer.nationalId))
        ) {
          setState((prevState) => ({ ...prevState, displayIdTxt: "none" }));
          removeArr("id");
        } else {
          setState((prevState) => ({ ...prevState, displayIdTxt: "block" }));
          setRefArray([...FormReducer.refArray, "id"]);
        }
        break;
      case "identification":
        if (
          numberRegex.test(FormReducer.identificationNumber) ||
          farsiNumber.test(FormReducer.identificationNumber)
        ) {
          setState((prevState) => ({ ...prevState, displayIdenTxt: "none" }));
          removeArr("iden");
        } else {
          setState((prevState) => ({ ...prevState, displayIdenTxt: "block" }));
          setRefArray([...FormReducer.refArray, "iden"]);
        }
        break;
        default:
          break;
    }
  }
  function onChange(value) {
    setState((prevState) => ({ ...prevState, storeType: value }));
  }

  return (
    <div className="input-divider">
      <div>
        <Select
          showSearch
          style={{ width: 200, margin: "15px 0" }}
          placeholder="نام بازاریاب"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option?.props?.name.indexOf(input) >= 0
          }
        >
          {marketerList && Array.isArray(marketerList)
            ? marketerList.map((item) => (
                <Option
                  value={item.id.toString()}
                  name={item.f_name + " " + item.l_name}
                  onClick={() => setMarketerName(item.id)}
                  key={'key_'+item.id.toString()}

                >
                  {(item.f_name||'') + " " + (item.l_name||'')}
                </Option>
              ))
            : ""}
        </Select>

        <Input
          onChange={(e) => setStoreName(e.target.value)}
          name="store_name"
          onBlur={(e) => handleValidateInput(e)}
          value={FormReducer.storeName}
          placeholder="نام صنف"
          ref={ref}
        />
        <p className="error-txt" style={{ display: displayStoreTxt }}>
          * لطفا نام فروشگاه را به درستی وارد نمایید
        </p>

        <Input
          onChange={(e) => setReceiverFName(e.target.value)}
          name="receiverf_name"
          onBlur={(e) => handleValidateInput(e)}
          value={FormReducer.receiverFName}
          placeholder="نام پذیرنده"
          // ref={rNameRef}
        />
        <p className="error-txt" style={{ display: displayRecfTxt }}>
          * لطفا نام پذیرنده را به درستی وارد نمایید
        </p>
        <Input
          onChange={(e) => setReceiverLName(e.target.value)}
          name="receiverl_name"
          onBlur={(e) => handleValidateInput(e)}
          value={FormReducer.receiverLName}
          placeholder="نام خانوادگی پذیرنده"
          // ref={rNameRef}
        />
        <p className="error-txt" style={{ display: displayReclTxt }}>
          * لطفا نام خانوادگی پذیرنده را به درستی وارد نمایید
        </p>
        <Input
          onChange={(e) => setNationalId(e.target.value)}
          name="id_national"
          onBlur={(e) => handleValidateInput(e)}
          value={FormReducer.nationalId}
          placeholder="کد ملی"
          // ref={idRef}
        />
        <p className="error-txt" style={{ display: displayIdTxt }}>
          * لطفا کد ملی را به صورت عدد و بدون حروف اضافه و نشانه وارد نمایید
        </p>

        <Input
          onChange={(e) => setIdentificationNumber(e.target.value)}
          value={FormReducer.identificationNumber}
          name="identification"
          onBlur={(e) => handleValidateInput(e)}
          placeholder="شماره شناسنامه"
          // ref={idenRef}
        />
        <p className="error-txt" style={{ display: displayIdenTxt }}>
          * لطفا شماره شناسنامه را به صورت عدد و بدون حروف اضافه و نشانه وارد
          نمایید
        </p>

        <Input
          onChange={(e) => setIdFrom(e.target.value)}
          name="id_from"
          onBlur={(e) => handleValidateInput(e)}
          value={FormReducer.idFrom}
          placeholder="صادره از"
          // ref={fromRef}
        />
        <p className="error-txt" style={{ display: displayFromTxt }}>
          * لطفا محل صدور شناسنامه خود را به درستی وارد نمایید
        </p>

        <Input
          onChange={(e) => setFatherName(e.target.value)}
          name="father_name"
          onBlur={(e) => handleValidateInput(e)}
          value={FormReducer.fatherName}
          placeholder="نام پدر"
          // ref={fNameRef}
        />
        <p className="error-txt" style={{ display: displayFtxt }}>
          * لطفا نام پدر را به درستی وارد نمایید
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "10px 0 0px 0",
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
            id="datePicker1"
            preSelected="1398/11/15"
            cancelOnBackgroundClick={true}
          />
          <Icon type="calendar" className="date-icon" />
        </div>
        <p className="error-txt" style={{ display: displayDateTxt }}>
          *تاریخ انتخاب شده معتبر نیست
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button
            style={{ margin: "10px 0" }}
            type="primary"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                showPartnerDetail: !showPartnerDetail,
              }))
            }
          >
            ثبت شریک
          </Button>
        </div>
        <Partner show={showPartnerDetail} />
      </div>
    </div>
  );
});

const mapStateToProps = (store) => ({
  FormReducer: store.FormReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setStoreName: (storeName) => dispatch(setStoreName(storeName)),
  setReceiverFName: (receiverf) => dispatch(setReceiverFName(receiverf)),
  setReceiverLName: (receiverl) => dispatch(setReceiverLName(receiverl)),
  setNationalId: (id) => dispatch(setNationalId(id)),
  setIdentificationNumber: (idNumber) =>
    dispatch(setIdentificationNumber(idNumber)),
  setFatherName: (fatherName) => dispatch(setFatherName(fatherName)),
  setBirthdate: (birthdate) => dispatch(setBirthdate(birthdate)),
  setIdFrom: (idFrom) => dispatch(setIdFrom(idFrom)),
  setRefArray: (ref) => dispatch(setRefArray(ref)),
  setMarketerName: (name) => dispatch(setMarketerName(name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail);
